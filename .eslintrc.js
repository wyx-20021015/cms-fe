module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: ['react'],
  rules: {
    // 关闭必须声明返回值类型的规则,允许ts自行推导
    '@typescript-eslint/explicit-function-return-type': 'off',
    // 关闭async函数必须返回promise的规则
    '@typescript-eslint/no-misused-promises': 'off',
    // 关闭必须使用interface而不能使用type的规则
    '@typescript-eslint/consistent-type-definitions': 'off',
    // 关闭禁止使用非空断言的规则
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
