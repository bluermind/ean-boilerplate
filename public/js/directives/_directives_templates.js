//you probably don't need this file if you have angular templates in your IDE, otherwise this can be useful
// THIS FILE IS NOT LOADED

.directive('',
    function () {
        var directiveDefinitionObject = {
            compile: function compile(tElement, tAttrs, transclude) {

                return function (scope, element, attrs) {
                }
            }
        };
    return directiveDefinitionObject;
    }
)

.directive('', function () {
    return function (scope, element, attrs) {

    }
})

.directive('', function (obj) {
   return{
       transclude: true,
       scope: {
           attr1: '@',             // the title uses the data-binding from the parent scope
           attr2: '&',              // create a delegate onOk function
           attr3: '&',          // create a delegate onCancel function
           attr4: '='            // set up visible to accept data-binding
       },
       restrict: 'EA',
       replace: true,
       link: function (scope, element, attrs) {

       }
   };
});