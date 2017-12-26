### html-webpack-combo-plugin
combo js css in htmls of 'html webpack plugin' creation

#### Installation

```
npm install  html-webpack-combo-plugin --save-dev
```

#### Usage

Require the plugin in your webpack config:


```
var HtmlWebpackComboPlugin = require('html-webpack-combo-plugin');
```

Add the plugin to your webpack config as follows:



```
plugins: [
  new ComboPlugin({
    baseUri: `${domai}??`,
    splitter: ',',
    replaceCssDomain: hostname,
    replaceScriptDomain: hostname
  })
]
```


#### Configuration

  - `baseUri`:(required) the result domain for combo script or link domain
  - `splitter`:(default , ) splitter split every combo file
  - `replaceCssDomain`:(required) replaceCssDomain is need to replace css domain
  - `replaceScriptDomain`:(required) replaceCssDomain is need to replace js domain

#### demo