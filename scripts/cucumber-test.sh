#!/usr/bin/env bash
# Runs the Cucumber/Gherkin conformance suite (specs/features) via cucumber-js and
# normalizes the results into tmp/result/cucumber-test.json (+ coverage-test.json when
# WITH_CODE_COVERAGE=true), keeping the native HTML report(s) under tmp/report/.
#
# Params (env vars, optional):
#   WITH_CODE_COVERAGE=true   also collect and report line coverage
set -euo pipefail

WITH_CODE_COVERAGE="${WITH_CODE_COVERAGE:-false}"

RESULT_DIR="tmp/result"
REPORT_DIR="tmp/report"

rm -rf "$REPORT_DIR/tests" "$REPORT_DIR/coverage"
mkdir -p "$RESULT_DIR" "$REPORT_DIR/tests"

CUCUMBER_JSON="$(mktemp)"
trap 'rm -f "$CUCUMBER_JSON"' EXIT

CUCUMBER_ARGS=(
  'specs/features/**/*.feature'
  --require-module ts-node/register
  --require 'test/steps/**/*.ts'
  --require 'test/support/**/*.ts'
  --format progress
  --format "html:$REPORT_DIR/tests/index.html"
  --format "json:$CUCUMBER_JSON"
)

if [ "$WITH_CODE_COVERAGE" = "true" ]; then
  npx c8 --reporter=html --reporter=json-summary --report-dir="$REPORT_DIR/coverage" -- \
    npx cucumber-js "${CUCUMBER_ARGS[@]}"
else
  npx cucumber-js "${CUCUMBER_ARGS[@]}"
fi

TOTAL=$(jq '[.[].elements[]] | length' "$CUCUMBER_JSON")
PASSED=$(jq '[.[].elements[] | select(all(.steps[]; .result.status == "passed"))] | length' "$CUCUMBER_JSON")
FAILED=$((TOTAL - PASSED))
printf '{"total":%s,"passed":%s,"failed":%s}' "$TOTAL" "$PASSED" "$FAILED" > "$RESULT_DIR/cucumber-test.json"

if [ "$WITH_CODE_COVERAGE" = "true" ]; then
  LINE_PCT=$(jq '.total.lines.pct' "$REPORT_DIR/coverage/coverage-summary.json")
  rm "$REPORT_DIR/coverage/coverage-summary.json"
  printf '{"linePct":%s}' "$LINE_PCT" > "$RESULT_DIR/coverage-test.json"
fi
