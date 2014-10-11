System.import('main').then(function() {
    if (!angular.mock) {
        angular.bootstrap(document, ['app']);
        console.log("boot");
    }
}, function(e) {
    console.error(e);
});