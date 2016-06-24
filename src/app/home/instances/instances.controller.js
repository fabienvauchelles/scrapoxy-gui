import InstancesScalingController from './scaling/scaling.controller';


export default class Controller {
    constructor($log, $uibModal, InstancesCacheService, ScalingCacheService, ToastService) {
        'ngInject';

        this.$log = $log;
        this.$uibModal = $uibModal;
        this.InstancesCacheService = InstancesCacheService;
        this.ScalingCacheService = ScalingCacheService;
        this.ToastService = ToastService;

        this.instances = [];

        this.scaling = {
            min: 0,
            required: 0,
            max: 0,
        };

        this.InstancesCacheService
            .getAllInstances()
            .then((instances) => {
                this.instances = instances;
            })
            .catch((err) => {
                this.$log.error(err);
                this.ToastService.error('Cannot load instances');
            });

        this.ScalingCacheService
            .getScaling()
            .then((scaling) => {
                this.scaling = scaling;
            })
            .catch((err) => {
                this.$log.error(err);
                this.ToastService.error('Cannot load scaling');
            });
    }


    openScalingModal() {
        const modalInstance = this.$uibModal.open({
            templateUrl: 'app/home/instances/scaling/scaling.html',
            controller: InstancesScalingController,
            controllerAs: 'vm',
            animation: false,
            resolve: {
                scaling: () => _.cloneDeep(this.scaling),
            },
        });

        modalInstance
            .result
            .then(
                (scaling) => this.ScalingCacheService
                    .updateScaling(scaling)
                    .catch((err) => {
                        this.$log.error(err);
                        this.ToastService.error(`Cannot update scaling: ${err}`);
                    })
            );
    }


    scaleMin() {
        const scaling = _.cloneDeep(this.scaling);
        scaling.required = scaling.min;

        this.ScalingCacheService
            .updateScaling(scaling)
            .catch((err) => {
                this.$log.error(err);
                this.ToastService.error(`Cannot update scaling: ${err}`);
            });
    }


    scaleMax() {
        const scaling = _.cloneDeep(this.scaling);
        scaling.required = scaling.max;

        this.ScalingCacheService
            .updateScaling(scaling)
            .catch((err) => {
                this.$log.error(err);
                this.ToastService.error(`Cannot update scaling: ${err}`);
            });
    }
}
