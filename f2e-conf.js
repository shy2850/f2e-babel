var path = require('path');
var output = path.join(__dirname, '../f2e-babel-out/');
exports.localhost = {
    root: path.join(__dirname, './'),
    include: "\\$include\\[[\"'\\s]*([^\"'\\s]+)[\"'\\s]*\\]",
    runJsBefore: true,
    runJs: false,
    // https://babeljs.io/docs/plugins/
    babel: {
        plugins: ['babel-plugin-transform-es2015-modules-amd'],
        presets: ['react', 'es2015']
    },
    agent: {
        get: function (pathname) {
            if (pathname.match(/\.js$/)) {
                return {
                    host: 'localhost',
                    port: 8080,
                    // 方便调试 jsx
                    path: function (req) {
                        var url = req.path.replace(/\.js$/, '.jsx');
                        return url;
                    }
                }
            }
        }
    },
    port: 8080,
    output: output
};
exports.localhost1 = {
    root: output,
    port: 8081
};
