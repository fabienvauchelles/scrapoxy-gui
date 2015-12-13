export default class Service {
    constructor($q) {
        'ngInject';

        this.$q = $q;
    }


    login(password) {
        return this.$q((resolve, reject) => {
            if (!password || password.length <= 0) {
                return reject('Password is empty');
            }

            const hash = btoa(password);

            localStorage.setItem('token', hash);

            resolve();
        });
    }


    getToken() {
        try {
            return localStorage.getItem('token');
        }
        catch (err) {
            return;
        }
    }


    logout() {
        try {
            localStorage.removeItem('token');
        }
        catch (err) {
            // Ignore
        }
        finally {
            return this.$q.resolve();
        }
    }
}
