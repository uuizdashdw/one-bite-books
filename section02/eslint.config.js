module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        // 'no-undef': 'error', // 필요에 따라 주석 해제
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                useTabs: true,
                tabWidth: 2,
                trailingComma: 'all',
                printWidth: 80, // 수정된 부분
                bracketSpacing: true,
                arrowParens: 'avoid',
            },
        ],
    },
};
