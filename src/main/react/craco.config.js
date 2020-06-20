const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#3273DC',
                            'border-radius-base': '4px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};