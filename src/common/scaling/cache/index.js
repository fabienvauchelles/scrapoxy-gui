export default class Service {
    constructor($q, $log, $rootScope, ScalingService, ToastService) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.$rootScope = $rootScope;
        this.ScalingService = ScalingService;
        this.ToastService = ToastService;

        this._scaling = void 0;
        this._scalingPromise = void 0;

        this._unwatchScalingUpdated = void 0;
        this._unwatchScalingError = void 0;
    }


    getScaling() {
        if (this._scaling) {
            return this.$q.when(this._scaling);
        }

        if (this._scalingPromise) {
            return this._scalingPromise;
        }

        this._scalingPromise = this.ScalingService
            .getScaling()
            .then((newScaling) => {
                this._scaling = newScaling;

                this._unwatchScalingUpdated = this.$rootScope.$on('scaling:updated', (ev, newScalingData) => {
                    _.merge(this._scaling, newScalingData);

                    this.ToastService.success('Scaling updated.');
                });

                this._unwatchScalingError = this.$rootScope.$on('scaling:error', (ev, err) => {
                    this.ToastService.error(err);
                });

                return this._scaling;
            });
    }


    stop() {
        if (this._unwatchScalingError) {
            this._unwatchScalingError();
            this._unwatchScalingError = void 0;
        }

        if (this._unwatchScalingUpdated) {
            this._unwatchScalingUpdated();
            this._unwatchScalingUpdated = void 0;
        }

        this._scaling = void 0;
        this._scalingPromise = void 0;
    }


    updateScaling(newScaling) {
        return this.ScalingService.updateScaling(newScaling);
    }
}
