export default class Service {
    constructor(Restangular) {
        'ngInject';

        this.BASE = Restangular.all('stats');
    }


    getAll(retention) {
        const qs = {};

        if (retention) {
            qs.retention = retention;
        }

        return this.BASE
            .getList(qs)
            .then((data) => data.plain());
    }
}
