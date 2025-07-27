#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const deploymentPlanCommand = require('../commands/deployment-plan');
const testPlanCommand = require('../commands/test-plan');

const program = new Command();

program
  .name('deploymate')
  .description('CLI tool for generating deployment plans and test plans from JIRA exports')
  .version('1.0.0');

// ASCII Art Banner
console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║             🚀 DeployMate             ║
║        Deployment Management CLI      ║
╚═══════════════════════════════════════╝
`));

// Register commands
program
  .command('deployment-plan')
  .alias('deploy')
  .description('Generate a deployment plan interactively')
  .option('-o, --output <file>', 'Output file path', './output/Deployment-Plan.md')
  .action(deploymentPlanCommand);

program
  .command('test-plan')
  .alias('test')
  .description('Generate a test plan from JIRA export CSV')
  .requiredOption('-j, --jira-export <file>', 'Path to JIRA export CSV file')
  .option('-o, --output <file>', 'Output file path', './output/Test-Plan.md')
  .action(testPlanCommand);

// Error handling
program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.log('See --help for a list of available commands.');
  process.exit(1);
});

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
