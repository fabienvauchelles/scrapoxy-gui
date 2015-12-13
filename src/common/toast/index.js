export default class Service {
    constructor() {
        'ngInject';

        toastr.options.timeOut = 2000;
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = false;
    }


    success(text) {
        toastr.success(text);
    }


    warning(text) {
        toastr.warning(text);
    }


    error(text) {
        toastr.error(text);
    }
}
