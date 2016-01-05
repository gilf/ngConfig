ngConfig
==============

A simple configuration service for AngularJS 1 apps.

Copyright (C) 2015, Gil Fink <gil@sparxys.com>

Installation
------------

You can choose your preferred method of installation:
* Download from github: [ngConfig.min.js](https://github.com/gilf/ngConfig/blob/master/ngConfig.min.js)

Usage
-----
Include **ngConfig.js** in your application.

```html
<script src="components/ngConfig/ngConfig.js"></script>
```

Add the module `ngConfig` as a dependency to your app module:

```js
var myapp = angular.module('myapp', ['ngConfig']);
```

### configuration service
Use the APIs that the configuration service exposes to use your application configuration.
In the API you have four functions:
* init(): initializes the configuration service.
  If you are loading the configuration from file, by default the configuration service will look a file called config.json which exists in a config folder -'config/config.json'.
  Usage example:

  ```js
  config.init().then(function() {

  });
  ```

* isInitialized(): checks whether the configuration object was loaded into memory.
  Usage example:

  ```js
  if (!config.isInitialized()) {
    config.init().then(function() {

    });
  }
  ```

* getConfigByKey(key): retrieve a configuration according to the supplied key.
  ```js
  var val = config.getConfigByKey('key');
  ```

* setConfigOfKey(key, value): sets the configuration of the supplied key to new configuration.
  When you set the key in a scenario of loading the configurations from file, only the in-memory object is updated (the value isn't saved to the configuration file).
  ```js
  config.setConfigOfKey('key', 'value');
  ```

You can configure the configuration file Uri by using the **setConfigUri** function when you configure your module.
  ```js
  var app = angular.module('app', ['ngConfig']);
  app.config(['configProvider', function (configProvider) {
    configProvider.setConfigUri('config/yourFileName.json');
  }]);
  ```
You can use localStorage to hold your configurations. Use **useLocalStorageForConfig** with an application prefix string to use localStorage.
  ```js
  var app = angular.module('app', ['ngConfig']);
  app.config(['configProvider', function (configProvider) {
    configProvider.useLocalStorageForConfig('myAppName');
  }]);
  ```

An example of a configuration file:
```js
{
  "config1": 15,
  "config2": false,
  "config3": "config3",
  "config4": [],
  "config5": {}
}
```

As shown in the Following Post:
-----
http://blogs.microsoft.co.il/gilf/2015/06/22/building-a-simple-angularjs-configuration-service/

License
----

Released under the terms of the [MIT License](LICENSE).