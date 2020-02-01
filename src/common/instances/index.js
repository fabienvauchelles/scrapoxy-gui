export default class Service {
    constructor(Restangular) {
        'ngInject';

        this.BASE = Restangular.all('instances');
    }


    getAllInstances() {
        return this.BASE.getList();
    }


    deleteInstance(name) {
        const payload = {name};

        return this.BASE
            .all('stop')
            .post(payload);
    }
}
