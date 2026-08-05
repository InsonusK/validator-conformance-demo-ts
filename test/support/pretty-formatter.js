'use strict';

const { Formatter } = require('@cucumber/cucumber');
const { PrettyPrinter } = require('@cucumber/pretty-formatter');

/**
 * Logs every feature, scenario and Given/When/Then/And step as it runs,
 * using @cucumber/cucumber's own Gherkin-style pretty printer, followed by a summary.
 */
class PrettyFormatter extends Formatter {
  constructor(options) {
    super(options);
    this.printer = new PrettyPrinter({ stream: options.stream, options: { summarise: true } });
    options.eventBroadcaster.on('envelope', (envelope) => this.printer.update(envelope));
  }
}

module.exports = PrettyFormatter;
