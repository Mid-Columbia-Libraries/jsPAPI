# jsPAPI  |  A JavaScript Polaris API Wrapper

* [Project Status](#status)
* [Documentation](#docs)
* [Contact](#contact)
* [Installation](#install)
* [Initialization](#init)
* [Configuration](#config)
* [Usage](#usage)
* [FAQ / Troubleshooting](#faq)

---

## <a name="status"></a>Project Status

jsPAPI is currently in development under v 0.0.1

jsPAPI currently implements the bib and catalog related public methods of the Polaris API, patron and staff authentication, and a flexible module core.

Protected method implementation is coming soon, in the mean time all Polaris API methods can be invoked manually via the jsPAPI.call() method.

Roadmap:

* Modular loader core: 95%
* Documentation: Complete for implemented methods
* Unit Tests: next major release
* Protected methods: work in progress

---

## <a name="docs"></a>Documentation

Developer documentation of public methods is available in `./docs` or [online](https://mid-columbia-libraries.github.io/jsPAPI/):

---

## <a name="contact"></a>Contact

jsPAPI is developed and maintained by Vance Cole at Mid-Columbia Libraries in Washington State. If you need help or have questions please feel free to contact me, [vcole@midcolumbialibraries.org](mailto:vcole@midcolumbialibraries.org).

Pull requests are welcome, especially for quality implementations of the various protected API methods.

---

## <a name="install"></a>Installation

### For NodeJS

jsPAPI is not yet published to NPM.

You can install jsPAPI by cloning the repository or by downloading the compiled package.

If you want to extend the API or use jsPAPI in a NodeJS application you should probably clone the source repo. You will need [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) to install dependencies:

``` Bash
    git clone https://github.com/Mid-Columbia-Libraries/jsPAPI jspapi
    cd jspapi
    npm install
```

You may want to copy `config.example.js` to `config.js` to set up your environment variables such as your API Server, key, AccessID and Domain. Alternatively, you can pass the needed config params at initialization, see: [initialization](#init).

``` Bash
    cp config.example.js config.js
```

See [configuration](#config) for a list of valid configuration options.

### For Browsers

If you want to be able to use jsPAPI from your web application, you can simply extract the base or minified version from `./dist` and include it in your HTML:

``` HTML
    <script src="js-polaris-api.min.js"></script>
```

---
    
## <a name="init"></a>Initialization

jsPAPI is namespaced under the global `jsPAPI`.

To start using the API you will need to create an instance of the jsPAPI class and pass it configuration for your API Server. This can be accomplished by either editing your config.js file, or passing parameters to the instance when you create it:

``` Javascript
    // Most configuration options have reasonable defaults
    // The below example shows the essential params you need
    // to set which are specific to your organization
    var config = {
        accessid: 'your-web-app',
        key: 'W3CV1V1H-GBUC-3E3P-QP42-1M9CODN0LHVU',
        orgid: '1',
        server: 'catalog.midcolumbialibraries.org',
        domain: 'MCL-LIB',
    };

    // Initialize an API instance with the config
    var myApi = new Papi({ config });
```

---

## <a name="config"></a>Configuration

### The following values are required

Your accessid and api key can be found or created in the Polaris Web Admin Tool under the `PAPI Key Management` tab, or provided by Polaris.

Your server is the domain (without scheme) that your server is listening on, for example `catalog.my-library.org`

Your domain is the domain that Polaris uses to authenticate staff, in the Polaris ILS Client your domain will be listed under your User name and Password fields during log on. Domain, Key and AccessID are not necessary if you are using only public methods of the API and have enabled Patron Only level authentication on your server, [see here](#disable-key) for details.

* server
* accessid
* key
* domain

### The following values have sane defaults which should work in most cases, but can be overridden if needed

* appid - 100
* orgid - 1
* scheme - https://
* path - PAPIService/REST
* version - v1
* lang - 1033
* encode - 'application/json'
* accept - 'application/json'
* logging - true
* authlvl - all

---
    
## <a name="usage"></a>Usage

Once initialized you can start calling the API using the various methods available. All API calls will be returned as an asynchronous promise supporting .then() and .catch() chaining. For more information on Promises, see [Using Promises]('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises'). Here is an example of a simple API call to the bibSearchKW method which will return items with the word `dogs` in the title field:

``` Javascript
    // Search for items with 'dogs' in the title
    myApi.bibSearchKW('dogs', 'TI')
        .then(function(response){
            console.log(response.data);
        })
        .catch(function(error){
            console.log('Oops, something went wrong');
        });
```

You can also have the promise call your own callback function when it returns, for example here is a call to the more complex bibSearch() function which would return items with Author=Tolkien but NOT title=Hobbit:

``` Javascript
// Search for items with 'dogs' in the title
    test.bibSearch([['AND','AU','tolkien'],['NOT','TI','hobbit']])
        .then(myThenFunction)
        .catch(myCatchFunction);

    var myThenFunction = function(response) {
        console.log(response.data);
    }

    var myCatchFunction = function(error) {
        console.error(error);
    }
```

NOTE: The .then() block will invoke your callback function automatically. Do NOT directly invoke the function in the then() block unless you understand closures and intend to invoke one, example:

``` Javascript
    // This probably does not do what you think it does, do not do this unless you are intending to invoke a closure
    test.bibSearch([['AND','AU','tolkien'],['NOT','TI','hobbit']])
        .then(myThenFunction(response))
        .catch(myCatchFunction(error));
```

For examples of each public funtion see the respective function documentation page.

---
    
## <a name="faq"></a>FAQ / Troubleshooting

### I am trying to run the API in my NodeJS project but I am getting an error like `Error: Cannot find module ...` or `... is not recognized as an internal or external command...`

You probably forgot to install dependencies. Run:

``` Bash
    npm install
```

### My browser console says something about `XMLHttpRequest cannot load` ... and `CORS`, `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods` or `Access-Control-Allow-Headers`

By default the Polaris API server that Innovative sets up for you does not set headers to allow AJAX requests originating on cross domain origins. Mostly only client-side code running in browsers will care about this, NodeJS or other back-end services generally will happily accept responses cross domain.

You can add the required headers by editing `web.config` in your PAPIService\REST directory, usually at `C:\Program Files\Polaris\{version}\PAPIService\REST\web.config`. Add the following code somewhere in between `<system.webServer>` and `</system.webserver>`

``` XML
<!-- Allow CORS -->
    <httpProtocol>
        <customHeaders>
        <add name="Access-Control-Allow-Origin" value="*" />
        <add name="Access-Control-Allow-Methods" value="GET,PUT,POST,DELETE,PATCH,OPTIONS" />
        <add name="Access-Control-Allow-Headers" value="Authorization, PolarisDate" />
        </customHeaders>
    </httpProtocol>
```

You will need to restart IIS for this to take effect. Open a command prompt with administrator priviledges and type:

``` Powershell
    iisreset
```

You may also encounter this issue if you are trying to make API requests from an HTML file running locally on your machine, for example `file:///C:/Users/you/Desktop/myPage.html`. This is a security restriction in certain browsers such as Chrome. You can fix this by hosting your development file on some sort of web server. If you installed jsPAPI and its development dependencies with NPM you can use the built in development server:

``` Bash
    npm run start
```

### <a name="disable-key"></a>I want to call the Polaris API's public methods such as bibGet() and bibSearch() directly from the browser, but I don't want to release our API key

Edit `appsettings.config` in your PAPIService\REST directory, usually at `C:\Program Files\Polaris\{version}\PAPIService\REST\appsettings.config`. Change the line that says:

``` XML
    <add key="AuthenticationLevel" value="ALL"/>
```

to

``` XML
    <add key="AuthenticationLevel" value="PATRON"/>
```

You will need to restart IIS for this to take effect. Open a command prompt with administrator priviledges and type:

``` Powershell
    iisreset
```

Now you can initialize the PolarisAPI with the config parameter "authlvl":"patron" and you will be able to call public methods without an access key.

### What is the built-in development server and how do I use it?

jsPAPI uses Webpack to bundle for deployment to browsers and includes a setup to use the Webpack Development & Hot Reload Server. To start the server, run:

``` Bash
    npm run start
```

This will bundle and regenerate the `./dist` directory. Now open your browser to the development URL webpack provides (default http://localhost:8080/). Changes you make to the API library and custom folders will automatically repack and reload. Exit the server by pressing `ctrl-c` or `cmd c`

### I want to extend or modify JS-Polaris-API, how do I do so?

You can add custom modules to `./lib/custom` and they will be loaded after stock modules. Your custom modules can either implement new functions which will work alongside the default methods, or you can replace default methods. To get started, copy an existing method from `./lib/modules` and edit the contents. If you need to rebuild the distribution bundle for use in a web based project run:

``` Bash
    npm run build
```

or

``` Bash
    npm run watch
```

### My browser or server console says something about `401 Unauthorized`

There are a number of causes for this.

* Make sure you provided a valid API Key, AccessID and Domain when you initialized your API.
* If you are trying to call a patron or staff protected method, ensure you provided a valid and not-expired authentication token from `authenticatePatron` or `authenticateStaff()`
* If you tried using an HTTP Scheme, try HTTPS.
* Make sure your system time is set correctly on both your client and server machines
* Your IIS server could be configured to deny requests to the API from outside your local network 
* Check your IIS logs on the Polaris API Server for hints