export default class Controller {
    constructor($log, InstancesCacheService, ToastService) {
        'ngInject';

        this.$log = $log;
        this.InstancesCacheService = InstancesCacheService;
        this.ToastService = ToastService;

        this.instances = [];
        this.connexions = [];

        this.InstancesCacheService
            .getAllInstances()
            .then((instances) => {
                this.instances = instances;
            })
            .catch((err) => {
                this.$log.error(err);
                this.ToastService.error('Cannot load instances');
            });
    }
}
