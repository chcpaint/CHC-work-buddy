// Minimal ESLint v9 flat config for frontend (browser, React, Vite).
// Frontend doesn't have eslint installed yet — the workflow's `npm run lint --if-present`
// will short-circuit since the binary isn't there. This file is here for completeness
// when someone adds eslint to devDependencies later.

export default [
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Blob: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        AbortController: 'readonly',
        AbortSignal: 'readonly',
        // Timers
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        // Custom events
        CustomEvent: 'readonly',
        Event: 'readonly',
        // Speech API (used in App.jsx)
        SpeechRecognition: 'readonly',
        webkitSpeechRecognition: 'readonly',
        SpeechSynthesisUtterance: 'readonly',
        speechSynthesis: 'readonly',
        // Console
        console: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-empty': ['warn', { allowEmptyCatch: true }],
      'no-prototype-builtins': 'off',
    },
  },
];
