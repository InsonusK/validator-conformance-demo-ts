# @insonusk/validator-conformance-demo-ts

[![PR master](https://github.com/InsonusK/validator-conformance-demo-ts/actions/workflows/pr_master.yml/badge.svg)](https://github.com/InsonusK/validator-conformance-demo-ts/actions/workflows/pr_master.yml)
[![Tests](https://img.shields.io/endpoint?url=https://insonusk.github.io/validator-conformance-demo-ts/tests-badge.json)](https://insonusk.github.io/validator-conformance-demo-ts/tests/)
[![Coverage](https://img.shields.io/endpoint?url=https://insonusk.github.io/validator-conformance-demo-ts/coverage-badge.json)](https://insonusk.github.io/validator-conformance-demo-ts/coverage/)
[![Mutation score](https://img.shields.io/endpoint?url=https://insonusk.github.io/validator-conformance-demo-ts/mutation-badge.json)](https://insonusk.github.io/validator-conformance-demo-ts/mutation/reports/mutation-report.html)

Demo TypeScript-библиотека валидаторов, соответствие которой проверяется
кросс-платформенными Cucumber-тестами из подмодуля [`specs/`](specs)
(репозиторий [validator-conformance-spec](https://github.com/InsonusK/validator-conformance-spec)).

Полные отчёты (пересобираются при каждом push в `master`):
**[тесты](https://insonusk.github.io/validator-conformance-demo-ts/tests/)** ·
**[покрытие](https://insonusk.github.io/validator-conformance-demo-ts/coverage/)** ·
**[mutation testing](https://insonusk.github.io/validator-conformance-demo-ts/mutation/reports/mutation-report.html)**

## Валидаторы

- `validateEmail(email)` — [specs/features/email-validator.feature](specs/features/email-validator.feature)
- `validateDateRange(dateFrom, dateTo)` — [specs/features/date-range-validator.feature](specs/features/date-range-validator.feature)
- `validateAmount(accountId, amount, context)` — [specs/features/amount-validator.feature](specs/features/amount-validator.feature)
- `validateIdArray(ids, context)` — [specs/features/id-array-validator.feature](specs/features/id-array-validator.feature)

Все функции возвращают `{ valid: boolean; errors: string[] }`.

## Разработка

```bash
make submodules   # инициализировать specs, если ещё не подтянут
make install      # npm install
make test         # прогнать Cucumber-тесты из specs/features
make build        # собрать dist/ через tsc
```

## Публикация в GitHub Packages

Пакет настроен на публикацию в GitHub Packages (`publishConfig.registry` в
`package.json`, scope `@insonusk`). Публикация происходит автоматически в
workflow [`.github/workflows/publish.yml`](.github/workflows/publish.yml) при
создании GitHub Release, либо вручную:

```bash
npm login --registry=https://npm.pkg.github.com
make publish
```
