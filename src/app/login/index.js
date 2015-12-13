const app = angular.module('myApp.login', [
    'ui.router',
]);


/*
 * Configuration
 */
import tokenInterceptor from './token/token.interceptor';
import tokenRoute from './token/token.route';

app
    .config(tokenInterceptor)
    .run(tokenRoute);


/*
 * Route
 */
import route from './login.route';

app
    .config(route);


/*
 * Service
 */
import AuthService from './auth';
app
    .service('AuthService', AuthService);


export default app;
