#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const boxen = require('boxen');
const { credentialsCommand } = require('../commands/credentials');
const { openapiCommand } = require('../commands/openapi');

const program = new Command();

// Display welcome banner
function showBanner() {
  const banner = boxen(
    chalk.bold.blue('🔧 APITool CLI') + '\n' +
    chalk.gray('Comprehensive API tooling & credential management'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'blue'
    }
  );
  console.log(banner);
}

program
  .name('apitool')
  .description('A comprehensive CLI tool for API credential management and OpenAPI tooling')
  .version('1.0.0')
  .option('-v, --verbose', 'Enable verbose output')
  .hook('preAction', (thisCommand) => {
    if (!process.argv.slice(2).length) {
      showBanner();
    }
  });

// Add credential management commands
program.addCommand(credentialsCommand);

// Add OpenAPI tooling commands
program.addCommand(openapiCommand);

// Global error handler
program.exitOverride();

try {
  program.parse();
} catch (err) {
  if (err.code === 'commander.helpDisplayed') {
    process.exit(0);
  } else if (err.code === 'commander.unknownCommand') {
    console.error(chalk.red('❌ Unknown command. Use --help to see available commands.'));
    process.exit(1);
  } else {
    console.error(chalk.red(`❌ Error: ${err.message}`));
    process.exit(1);
  }
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.help();
}
