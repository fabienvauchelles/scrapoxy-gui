export default class Controller {
    constructor($uibModalInstance, scaling) {
        'ngInject';

        this.$uibModalInstance = $uibModalInstance;
        this.scaling = scaling;
    }


    ok() {
        this.$uibModalInstance.close(this.scaling);
    }


    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}
