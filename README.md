### html-webpack-combo-plugin
combo js css in htmls of 'html webpack plugin' creation

#### Installation

```
npm install  html-webpack-combo-plugin --save-dev
```

#### Usage

Require the plugin in your webpack config:


```
var ComboPlugin = require('html-webpack-combo-plugin');
```

Add the plugin to your webpack config as follows:



```
plugins: [
  new ComboPlugin({
      baseUri: `http://test.domain.com/??`,
      splitter: ',',
      replaceCssDomain: `test.domain.com`,
      replaceScriptDomain: `test.domain.com`
  })
]
```


#### Configuration

  - `baseUri`:(required) the result domain for combo script or link domain
  - `splitter`:(default , ) splitter split every combo file
  - `replaceCssDomain`:(required) replaceCssDomain is need to replace css domain
  - `replaceScriptDomain`:(required) replaceCssDomain is need to replace js domain

#### demo

  - before 

  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>demo</title>
      <script src="http://test.domain.com/base.min.js" data-ignore="true"></script>
      <link rel="stylesheet" href="http://test.domain.com/css/common.css" />
      <link rel="stylesheet" href="http://test.domain.com/css/index.css" />
  </head>

  <body>
      <script src="http://test.domain.com/lib/es5-shim.min.js" charset="utf-8"></script>
      <script src="http://test.domain.com/lib/es5-sham.min.js" charset="utf-8"></script>
  </body>

  </html>
  ```

  - webpack.conf.js

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const ComboPlugin = require('../../index')
  module.exports = {
      entry: './example/src/index.js',
      output: {
          filename: './example/dest/index.js'
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: './example/src/index.html',
              filename: './example/dest/index.html'
          }),
          new ComboPlugin({
              baseUri: `http://test.domain.com/??`,
              splitter: ',',
              replaceCssDomain: `test.domain.com`,
              replaceScriptDomain: `test.domain.com`
          })

      ]
  };
  ```

  - after

  ```html

  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>demo</title>
      <script src="http://test.domain.com/base.min.js" data-ignore="true"></script>
      <link rel="stylesheet" href="http://test.domain.com/??css/common.css,css/index.css" />
      
  </head>

  <body>
      <script type="text/javascript" src="http://test.domain.com/??lib/es5-shim.min.js,lib/es5-sham.min.js,./example/dest/index.js"></script>
      
  </body>

  </html> 
  ```