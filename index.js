function ComboPlugin (options) {

    options = options || {};
    this.options = options;
}

ComboPlugin.prototype.apply = function (compiler) {
    let self = this;
    compiler.plugin('compilation', function (compilation) {
        if (compilation.hooks) {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('ComboPlugin', (htmlPluginData, callback) => {

                htmlPluginData.html = combo(htmlPluginData.html, self.options);

                callback(null, htmlPluginData)
            })
        } else {
            compilation.plugin('html-webpack-plugin-after-html-processing', function (htmlPluginData, callback) {

                htmlPluginData.html = combo(htmlPluginData.html, self.options);
                callback(null, htmlPluginData);
            });
        }

    });


};

const combo = (html, options) => {
    // console.log(util.inspect(options, { showHidden: true, depth: null }))
    options = options || {};
    let baseUri = options.baseUri
    var chunk = String(html);
    var src = {
        scripts: [],
        links: []
    };

    var genComboScriptUriTag = function () {
        var uri = baseUri + src.scripts.join(options.splitter || ';');
        var scriptTag = '<script type="text/javascript" src="' + uri + '"></script>';
        var async = options.async || false;

        if (chunk.match('<!--combo async:false-->')) {
            async = false;
        }

        if (chunk.match('<!--combo async:true-->')) {
            async = true;
        }

        if (async === true) {
            scriptTag = '<script type="text/javascript" src="' + uri + '" async="async"></script>';
        }

        return scriptTag;
    };

    var genComboLinkUriTag = function () {
        var uri = baseUri + src.links.join(options.splitter || ',');
        var linkTag = '<link rel="stylesheet" href="' + uri + '" />';
        return linkTag;
    };

    var group = (chunk.replace(/[\r\n]/g, '').match(/<\!\-\-\[if[^\]]+\]>.*?<\!\[endif\]\-\->/igm) || []).join('');

    var scriptProcessor = function ($, $1) {
        // 增加忽略属性
        if ($.match('data-ignore="true"')) {
            return $;
        }

        // 忽略CSS条件
        if (group && group.indexOf($) !== -1) {
            return $;
        }

        if ($.match(/\/\//igm)) {
            var matchs;
            if (options.replaceScriptDomain) {
                // replaceScriptDomain为需要被替换的域名，覆盖默认正则
                var reg = new RegExp('^(http(s)?:)?\/\/' + options.replaceScriptDomain + '\/', 'igm');
                matchs = $1.match(reg);
            } else {
                matchs = $1.match(/^(http(s)?:)?\/\/test.domain.com\//igm);
            }
            if (matchs) {
                src.scripts.push($1.replace(matchs[0], ''));
            } else {
                return $;
            }
        } else {
            src.scripts.push($1.replace(/(.+\/)?[^\/]+\/\.\.\//igm, '$1'));
        }

        if (src.scripts.length === 1) {
            return '<%%%SCRIPT_HOLDER%%%>';
        }

        return '';
    };

    var linkProcessor = function ($, $1) {
        // 增加忽略属性
        if ($.match('data-ignore="true"')) {
            return $;
        }

        if ($.match(/\/\//igm)) {
            var matchs;
            if (options.replaceCssDomain) {
                // replaceCssDomain为需要被替换的域名，覆盖默认正则
                var reg = new RegExp('^(http(s)?:)?\/\/' + options.replaceCssDomain + '\/', 'igm');
                matchs = $1.match(reg);
            } else {
                matchs = $1.match(/^(http(s)?:)?\/\/yccmtmwap.10101111.com\//igm);
            }
            if (matchs) {
                src.links.push($1.replace(matchs[0], ''));
            } else {
                return $;
            }
        } else {
            src.links.push($1.replace(/(.+\/)?[^\/]+\/\.\.\//igm, '$1'));
        }

        if (src.links.length === 1) {
            return '<%%%STYLES_HOLDER%%%>';
        }

        return '';
    };


    chunk = chunk.replace(/<script[^>]+?src="([^"]+)"[^>]*><\/script>/igm, scriptProcessor);
    chunk = chunk.replace(/<link[^>]+?href="([^"]+?)"[^>]+?rel="stylesheet"[^>]*>/igm, linkProcessor);
    chunk = chunk.replace(/<link[^>]+?rel="stylesheet"[^>]+?href="([^"]+?)"[^>]*>/igm, linkProcessor);

    chunk = chunk.replace('<%%%SCRIPT_HOLDER%%%>', genComboScriptUriTag());
    chunk = chunk.replace('<%%%STYLES_HOLDER%%%>', genComboLinkUriTag());
    return chunk;
}

module.exports = ComboPlugin;