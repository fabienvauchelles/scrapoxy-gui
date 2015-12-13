export default function Directive() {
    'ngInject';

    const directive = {
        restrict: 'E',
        templateUrl: 'app/home/navbar/navbar.html',
        scope: {},
        controller: Controller,
        controllerAs: 'vm',
        bindToController: {},
    };

    return directive;
}


////////////

class Controller {
    constructor($state, AuthService) {
        'ngInject';

        this.$state = $state;
        this.AuthService = AuthService;
    }


    logout() {
        this.AuthService
            .logout()
            .then(() => this.$state.go('login'));
    }

}
