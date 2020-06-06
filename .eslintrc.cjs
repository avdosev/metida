module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "plugins": ["prettier"],
    "extends": [
        "airnb",
        "airbnb/hooks",
        "prettier",
        "prettier/react",
        "plugin:prettier/recommended",
        "eslint:recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "overrides": [
        {
            "files": ["**/*.ts", "**/*.tsx"],
            "parser": "typescript-eslint-parser",
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
                ]

            }
        }
    ]


};