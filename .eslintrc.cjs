module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "settings": {
        "react": {
            "version": "detect"
        },
        "import/resolver": {
            "typescript": {}
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "eslint-config-prettier",
        "plugin:import/recommended",
        "plugin:import/typescript"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "import"
    ],
    "rules": {
        "react/prop-types": "off",
        "import/no-named-as-default": "off",
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                "groups": [
                    ["builtin", "external"],
                    ["internal"],
                    ["sibling", "parent", "index"],
                    "object",
                    // Then the rest: internal and external type
                ]
            }
        ]
    }
}
