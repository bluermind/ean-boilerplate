window.jQuery = window.$ = require('./lib/jquery/dist/jquery.min');

require('./lib/angular/angular');
require('./lib/angular-route/angular-route');
require('./lib/angular-touch/angular-touch');
require('./lib/angular-moment/angular-moment');
require('./lib/angularLocalStorage-nc/dist/angularLocalStorage.min');
require('./lib/es6-shim/es6-shim');

requireGlob('./js/**/*.js');

