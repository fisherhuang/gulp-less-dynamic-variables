var through2 = require('through2'),
    path = require('path'),
    fs = require('fs');

module.exports = (options) => {
    return through2.obj({ objectMode: true, allowHalfOpen: false }, (file, enc, cb) => {
        var variablesContent = "";

        var contents = [];

        if (file.isNull())
            callback();

        if (options.variableType && options.variableType.trim().length > 0)
            switch (options.variableType.toLowerCase()) {
                case 'stringfile':
                    var _str = fs.readFileSync(options.variableContent, { encoding: 'utf-8' });

                    if (options.isJosnData) {
                        var _jsonStr = "";
                        var obj = JSON.parse(_str)[options.variableKey]
                        if (obj) {
                            Object.keys(obj).forEach(function(key) {
                                _jsonStr = _jsonStr + key + ":" + obj[key] + ";";
                            });
                            contents.push(_jsonStr);
                        } else {
                            console.log(options.variableKey + '变量不存在');
                        }
                    } else
                        contents.push(_str);
                    break;
                case 'stringcontent':
                    contents.push(options.variablesContent)
                    break;
                default:
                    contents.push(fs.readFileSync(options.variableContent, { encoding: 'utf8' }));
                    break;
            } else
                contents.push(fs.readFileSync(options.variableContent, { encoding: 'utf8' }));

        contents.push(file.contents.toString());

        file.contents = new Buffer(contents.join('\n'));

        cb(null, file)
    })
};
