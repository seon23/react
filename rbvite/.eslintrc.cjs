module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // off로 끈 이유는, useEffect에서 plusCount가 dep array인 count를 계속 바꾸어서 무한 루프가 돌았기 때문.
    // 그런데 useCallback 쓸 때는 켜는 게 맞다. -> 결론 켜는 게 맞고 counter-context의 plusCount에 useCallback을 걸어주면 된다. (231218 강의 참고)
    // 'react-hooks/exhaustive-deps': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
  settings: {
    react: { version: 'detect' }, // for react version warnning
  },
};
