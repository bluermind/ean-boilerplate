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
    "lodash": "npm:lodash-node@2.4.1",
    "text": "github:systemjs/plugin-text@^0.0.2",
    "moment": "github:moment/moment@^2.8.3",
    "angular": "github:angular/bower-angular@^1.3.0-rc.5",
    "npm:base64-js@0.0.7": {},
    "npm:inherits@2.0.1": {},
    "npm:ieee754@1.1.4": {},
    "npm:Base64@0.2.1": {},
    "npm:lodash-node@2.4.1": {},
    "github:jspm/nodelibs@0.0.3": {
      "Base64": "npm:Base64@0.2",
      "base64-js": "npm:base64-js@0.0",
      "ieee754": "npm:ieee754@^1.1.1",
      "inherits": "npm:inherits@^2.0.1",
      "json": "github:systemjs/plugin-json@master"
    },
    "angular-moment": "github:capaj/angular-moment@^0.8.2",
    "github:capaj/angular-moment": "github:capaj/angular-moment@^0.8.3",
    "jquery": "github:components/jquery@^2.1.1",
    "angular-mocks": "github:angular/bower-angular-mocks@^1.3.0-rc.5"
  }
});

System.config({
  "versions": {
    "npm:lodash-node": "2.4.1",
    "github:systemjs/plugin-text": "0.0.2",
    "github:jspm/nodelibs": "0.0.3",
    "github:moment/moment": "2.8.3",
    "github:angular/bower-angular": "1.3.0-rc.5",
    "npm:base64-js": "0.0.7",
    "npm:inherits": "2.0.1",
    "npm:ieee754": "1.1.4",
    "npm:Base64": "0.2.1",
    "github:systemjs/plugin-json": "master",
    "github:capaj/angular-moment": "0.8.3",
    "github:components/jquery": "2.1.1",
    "github:angular/bower-angular-mocks": "1.3.0-rc.5"
  }
});

