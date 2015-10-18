(function(global) {
    'use strict';

    global.iconsHelper = (global.module || {}).exports = {
        getStatus: getStatus,
        isAlive: isAlive,
        getCloudType: getCloudType,
    };


    ////////////

    function getStatus(status) {
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

    function isAlive(alive) {
        if (alive) {
            return 'icon-alive';
        }
        else {
            return 'icon-dead';
        }
    }

    function getCloudType(type) {
        switch (type) {
            case 'awsec2': {
                return 'icon-aws-ec2';
            }

            case 'ovhcloud': {
                return 'icon-ovh-cloud';
            }

            default: {
                return 'icon-unknown';
            }
        }
    }

})(this);
