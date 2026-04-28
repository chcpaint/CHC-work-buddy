// Minimal ESLint v9 flat config for backend (Node.js, ESM).
// Goal: catch real bugs (undefined globals, unused imports), don't be opinionated about style.

export default [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        // Node.js globals
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // Timers (Node + browser)
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        // Web platform (Node 18+)
        URL: 'readonly',
        URLSearchParams: 'readonly',
        fetch: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        TextEncoder: 'readonly',
        TextDecoder: 'readonly',
      },
    },
    rules: {
      // Real-bug rules
      'no-undef': 'error',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_|^next$',  // express middleware often takes (err, req, res, next) but doesn't use next
        varsIgnorePattern: '^_',
      }],
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-redeclare': 'error',
      'no-cond-assign': 'error',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-constant-condition': ['warn', { checkLoops: false }],
      // Style rules off (not opinionated here)
      'no-console': 'off',
      'no-prototype-builtins': 'off',
    },
  },
];
