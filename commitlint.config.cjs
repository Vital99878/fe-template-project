module.exports = {
  extends: ['@commitlint/config-conventional'],
  formatter: './scripts/commitlint-formatter.cjs',
  rules: {
    // scope опционален, но если указан — должен быть из списка
    'scope-enum': [
      2,
      'always',
      [
        'tooling',
        'repo',
        'config',
        'ci',
        'app',
        'router',
        'api',
        'query',
        'mocks',
        'shared',
        'ui',
        'entities',
        'features',
        'widgets',
        'pages',
        'docs',
      ],
    ],
    // стиль scope: kebab-case (shared-ui, auth-flow и т.д.)
    'scope-case': [2, 'always', 'kebab-case'],
  },
};
