System.config({
  "paths": {
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "ean-boilerplate/*": "ean-boilerplate/*.js",
    "*": "*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@^1.3.2",
    "angular-mocks": "github:angular/bower-angular-mocks@^1.3.2",
    "angular-moment": "github:capaj/angular-moment@^0.8.2",
    "github:capaj/angular-moment": "github:capaj/angular-moment@^0.8.3",
    "jquery": "github:components/jquery@^2.1.1",
    "lodash": "npm:lodash-node@2.4.1",
    "moment": "github:moment/moment@^2.8.3",
    "text": "github:systemjs/plugin-text@^0.0.2",
    "github:jspm/nodelibs@0.0.3": {
      "Base64": "npm:Base64@0.2",
      "base64-js": "npm:base64-js@0.0",
      "ieee754": "npm:ieee754@^1.1.1",
      "inherits": "npm:inherits@^2.0.1",
      "json": "github:systemjs/plugin-json@master"
    },
    "npm:Base64@0.2.1": {},
    "npm:base64-js@0.0.7": {},
    "npm:ieee754@1.1.4": {},
    "npm:inherits@2.0.1": {},
    "npm:lodash-node@2.4.1": {}
  }
});

System.config({
  "versions": {
    "github:angular/bower-angular": "1.3.2",
    "github:angular/bower-angular-mocks": "1.3.2",
    "github:capaj/angular-moment": "0.8.3",
    "github:components/jquery": "2.1.1",
    "github:jspm/nodelibs": "0.0.3",
    "github:moment/moment": "2.8.3",
    "github:systemjs/plugin-json": "master",
    "github:systemjs/plugin-text": "0.0.2",
    "npm:Base64": "0.2.1",
    "npm:base64-js": "0.0.7",
    "npm:ieee754": "1.1.4",
    "npm:inherits": "2.0.1",
    "npm:lodash-node": "2.4.1"
  }
});

