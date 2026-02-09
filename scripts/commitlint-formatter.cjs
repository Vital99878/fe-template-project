// scripts/commitlint-formatter.cjs

const ALLOWED_TYPES = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
];

const ALLOWED_SCOPES = [
  // репо/инфраструктура
  'tooling',
  'repo',
  'config',
  'ci',

  // app-level
  'app',
  'router',

  // data/api
  'api',
  'query',
  'mocks',

  // FSD слои
  'shared',
  'ui',
  'entities',
  'features',
  'widgets',
  'pages',

  // документация
  'docs',
];

function ruMessage(err) {
  const name = err?.name ?? '';
  const msg = err?.message ?? '';

  if (name === 'type-empty') {
    return `Не указан тип коммита. Разрешены: ${ALLOWED_TYPES.join(', ')}`;
  }
  if (name === 'type-enum') {
    return `Неверный тип коммита. Разрешены: ${ALLOWED_TYPES.join(', ')}`;
  }
  if (name === 'subject-empty') {
    return 'Не указано краткое описание (subject) после двоеточия.';
  }
  if (name === 'scope-enum') {
    return `Неверный scope. Разрешены: ${ALLOWED_SCOPES.join(', ')}`;
  }
  if (name === 'scope-empty') {
    return 'Scope указан, но пустой. Либо убери скобки, либо заполни scope.';
  }
  if (name === 'scope-case') {
    return 'Неправильный формат scope. Используй kebab-case (например, "shared-ui").';
  }
  if (name === 'header-max-length') {
    return 'Слишком длинный заголовок коммита. Сделай короче.';
  }
  if (name === 'subject-case') {
    return 'Неправильный регистр в subject. Обычно пишут с маленькой буквы, без точки в конце.';
  }

  return msg || `Ошибка правила: ${name}`;
}

module.exports = function format(report = {}) {
  const results = Array.isArray(report.results) ? report.results : [];
  const hasProblems = results.some(
    (r) => (r.errors && r.errors.length) || (r.warnings && r.warnings.length),
  );
  if (!hasProblems) return '';

  let out = '';
  for (const r of results) {
    const input = r?.input ?? '';
    out += `⧗   Введено: ${input}\n`;

    const errors = Array.isArray(r.errors) ? r.errors : [];
    const warnings = Array.isArray(r.warnings) ? r.warnings : [];

    for (const e of errors) out += `✖   ${ruMessage(e)} [${e.name}]\n`;
    for (const w of warnings) out += `⚠   ${ruMessage(w)} [${w.name}]\n`;

    out += '\nКак правильно:\n';
    out += '  Формат: <тип>(<scope>)?: <краткое описание>\n';
    out += `  Типы: ${ALLOWED_TYPES.join(', ')}\n`;
    out += `  Scope (если указан): ${ALLOWED_SCOPES.join(', ')}\n`;
    out += '  Примеры:\n';
    out += '    chore(tooling): настроить husky и commitlint\n';
    out += '    feat(api): добавить http client\n';
    out += '    fix(query): исправить обработку 401\n';
    out += '    docs(repo): обновить README\n';
    out += '\n';
  }

  return out;
};
