export default class Service {
    constructor() {
        'ngInject';
    }


    getStatus(status) {
        switch (status) {
            case 'started': {
                return 'icon-started';
            }

            case 'stopped': {
                return 'icon-stopped';
            }

            case 'starting': {
                return 'icon-starting';
            }

            case 'stopping': {
                return 'icon-stopping';
            }

            default: {
                return 'icon-unknown';
            }
        }
    }


    isAlive(alive) {
        if (alive) {
            return 'icon-alive';
        }
        else {
            return 'icon-dead';
        }
    }


    getProviderType(type) {
        switch (type) {
            case 'awsec2': {
                return 'icon-awsec2';
            }

            case 'ovhcloud': {
                return 'icon-ovhcloud';
            }

            default: {
                return 'icon-unknown';
            }
        }
    }
}
