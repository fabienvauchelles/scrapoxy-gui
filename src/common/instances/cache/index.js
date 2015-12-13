export default class Service {
    constructor($q, $log, $rootScope, IconsService, InstancesService, ToastService) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.IconsService = IconsService;
        this.InstancesService = InstancesService;
        this.ToastService = ToastService;

        this._instances = void 0;
        this._instancesPromise = void 0;

        this._unwatchStatusUpdated = void 0;
        this._unwatchAliveUpdated = void 0;
    }


    getAllInstances() {
        const self = this;

        if (self._instances) {
            return self.$q.when(self._instances);
        }

        if (self._instancesPromise) {
            return self._instancesPromise;
        }

        self._instancesPromise = self.InstancesService
            .getAllInstances()
            .then((newInstances) => {
                self._instances = newInstances.map(
                    (d) => ({content: d})
                );

                self._unwatchStatusUpdated = self.$rootScope.$on('status:updated', instanceUpdated);
                self._unwatchAliveUpdated = self.$rootScope.$on('alive:updated', instanceUpdated);

                return self._instances;
            });


        ////////////

        function instanceUpdated(ev, instance) {
            const idx = _.findIndex(self._instances, {content: {name: instance.name}});
            if (idx >= 0) {
                if (instance.status === 'removed') {
                    self._instances.splice(idx, 1);

                    self.ToastService.success(`Instance ${instance.name} removed.`);
                }
                else {
                    const msg = getMessage(self._instances[idx].content, instance);

                    self._instances[idx].content = instance;

                    if (msg) {
                        self.ToastService.success(msg);
                    }
                }
            }
            else if (instance.status !== 'removed') {
                const container = {
                    content: instance,
                };

                self._instances.push(container);

                self.ToastService.success(`Instance ${instance.name} created.`);
            }
            else {
                self.$log.error(`Unknown instance ${instance.name} removed.`);
            }


            ////////////

            function getMessage(oldInstance, newInstance) {
                const msgs = [`Instance ${newInstance.name} updated.`];

                if (oldInstance.status !== newInstance.status) {
                    msgs.push(
                        `<i class="icon ${self.IconsService.getStatus(oldInstance.status)}"></i>
                        to
                        <i class="icon ${self.IconsService.getStatus(newInstance.status)}"></i>`
                    );
                }

                if (oldInstance.alive !== newInstance.alive) {
                    msgs.push(
                        `<i class="icon ${self.IconsService.isAlive(oldInstance.alive)}"></i>
                        to
                        <i class="icon ${self.IconsService.isAlive(newInstance.alive)}"></i>`
                    );
                }

                return msgs.join('<br/>\n');
            }
        }
    }


    stop() {
        if (this._unwatchStatusUpdated) {
            this._unwatchStatusUpdated();
            this._unwatchStatusUpdated = void 0;
        }

        if (this._unwatchAliveUpdated) {
            this._unwatchAliveUpdated();
            this._unwatchAliveUpdated = void 0;
        }

        this._instances = void 0;
        this._instancesPromise = void 0;
    }


    deleteInstance(name) {
        return this.InstancesService.deleteInstance(name);
    }
}
