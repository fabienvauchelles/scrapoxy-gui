export default function Directive() {
    'ngInject';

    const directive = {
        restrict: 'E',
        templateUrl: 'app/home/instances/instance/instance.html',
        scope: {},
        controller: Controller,
        controllerAs: 'vm',
        bindToController: {
            container: '=',
        },
    };

    return directive;
}


////////////

class Controller {
    constructor(IconsService, InstancesCacheService, ToastService) {
        'ngInject';

        this.InstancesCacheService = InstancesCacheService;
        this.IconsService = IconsService;
        this.ToastService = ToastService;
    }


    kill() {
        this.InstancesCacheService
            .deleteInstance(this.container.content.name)
            .then(() => {
                this.ToastService.success(`Remove ${this.container.content.name} asked.`)
            })
            .catch((err) => {
                this.ToastService.error(err.data)
            });
    }
}
