var bc = 'public/lib/';
var moduleFile = 'public/js/app.js';

var appFiles = [
    'public/js/routes.js',
    //animations
    'public/js/animations/*.js',
    //directives
    'public/js/directives/*.js',
    //FACTORIES
    'public/js/factories/*.js',
    //Services
    'public/js/services/*.js',
    //FILTERS
    'public/js/filters/*.js',
    // CONTROLLERS
    'public/js/controllers/*.js',
    '!public/js/**/_*.*'
];

var forConcat = appFiles.slice(0);
forConcat.unshift(moduleFile);

if (module.exports) {
    module.exports = {
        concat: forConcat,
        development: {
            1: [
                'public/js/preload/*.js',
                bc + 'array-sugar/array-sugar.js',
                bc + '**/moment.js',
                bc + '**/jquery.min.js'
            ],
            2: [bc + '**/angular.js', 'public/js/bootstrap/*.js'],
            3: [
                bc + '**/ng-tools.js',
                bc + '**/angular-touch.js',
                bc + '**/angular-moment.js',
                bc + '**/angularLocalStorage.js',
                bc + '**/angular-animate.js',
                bc + '**/angular-route.js',
                moduleFile
            ],
            4: appFiles //all the concatenated files loaded asynchronously
        },
        production: {
            1: [
                'public/js/preload/*.min.js',
                bc + 'array-sugar/array-sugar.js',
                bc + '**/moment.min.js', bc + '**/jquery.min.js'
            ],
            2: [bc + '**/angular.min.js', 'public/js/bootstrap/*.js'],
            3: [
                bc + '**/ng-tools.min.js',
                bc + '**/angular-touch.min.js',
                bc + '**/angular-moment.min.js',
                bc + '**/angularLocalStorage.min.js',
                bc + '**/angular-animate.min.js',
                bc + '**/angular-route.min.js',
                'public/built/<%= pkg.name %>-<%= pkg.version %>.min.js'
            ]
        }
    };
}
