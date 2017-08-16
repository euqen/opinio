module.exports = {
    extends: 'airbnb-base',
    env: {
        node: true,
        mocha: true,
    },
    settings: {
        'import/resolver': {
            node: {
                // add repository's root directory to the app module search path
                moduleDirectory: ['node_modules', './', './src'],
            },
        },
    },
    rules: {
        'no-underscore-dangle': ['error', { allow: ['_id'] }], // unable to avoid usage of MongoDB hardcoded ID field name
    }
};
