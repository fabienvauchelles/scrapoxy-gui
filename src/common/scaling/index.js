export default class Service {
    constructor(Restangular) {
        'ngInject';

        this.BASE = Restangular.one('scaling');
    }


    getScaling() {
        return this.BASE
            .get()
            .then((data) => data.plain());
    }


    updateScaling(newScaling) {
        return this.BASE
            .patch(newScaling)
            .then((data) => {
                if (!data) {
                    return newScaling;
                }

                return data.plain();
            });
    }
}
