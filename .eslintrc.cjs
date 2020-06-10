
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"

    },
    "rules": {
        "no-console": "off",
        // "quotes": ["warn", "single"],
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "after-used",
                "ignoreRestSiblings": false
            }
        ],
        "no-prototype-builtins": 1,


    }

};