export default class Controller {
    constructor($state, AuthService, ToastService) {
        'ngInject';

        this.$state = $state;
        this.AuthService = AuthService;
        this.ToastService = ToastService;

        // Credentials
        this.password = '';
    }


    login() {
        this.AuthService.login(this.password)
            .then(
            () => this.$state.go('home.instances')
        )
            .catch(
            () => this.ToastService.error('Invalid password')
        );
    }
}
