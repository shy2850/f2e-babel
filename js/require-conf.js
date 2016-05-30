/**
 * @file 统一配置文件
 * @author shy2850
 */
(function () {
    var paths = {
        'css': '//apps.bdimg.com/libs/require-css/0.1.8/css',
        'react': 'lib/react',
        'react-dom': 'lib/react-dom',
        'react-redux': 'lib/react-redux',
        'redux-thunk': 'lib/redux-thunk',
        'redux': 'lib/redux'
    };
    require.config({
        baseUrl: '/js',
        paths: paths,
        shim: {
            'react-dom': {
                deps: ['react']
            },
            'react-redux': {
                deps: ['react', 'redux']
            },
            'redux-thunk': {
                deps: ['redux']
            }
        }
    });
})();