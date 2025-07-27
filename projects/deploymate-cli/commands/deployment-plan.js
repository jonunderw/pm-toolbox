const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const { buildDeploymentPlan } = require('../lib/markdownBuilder');
const { ensureOutputDir, writeFile } = require('../lib/fileUtils');
const dayjs = require('dayjs');

async function deploymentPlanCommand(options) {
  console.log(chalk.blue('\n🚀 Deployment Plan Generator\n'));

  try {
    // Collect deployment information through interactive prompts
    const deploymentInfo = await collectDeploymentInfo();

    // Generate markdown content
    const spinner = ora('Generating deployment plan...').start();
    const markdownContent = buildDeploymentPlan(deploymentInfo);
    
    // Ensure output directory exists
    await ensureOutputDir(path.dirname(options.output));
    
    // Write the file
    await writeFile(options.output, markdownContent);
    
    spinner.succeed(chalk.green(`✅ Deployment plan generated: ${options.output}`));
    
    // Show summary
    console.log(chalk.cyan('\n📋 Deployment Summary:'));
    console.log(`📅 Date: ${deploymentInfo.deploymentDate}`);
    console.log(`⚠️  Outage Expected: ${deploymentInfo.outageExpected ? 'Yes' : 'No'}`);
    if (deploymentInfo.outageExpected) {
      console.log(`⏱️  Duration: ${deploymentInfo.outageDuration}`);
    }
    console.log(`📱 Applications: ${deploymentInfo.applications.length}`);
    console.log(`👥 Teams: ${deploymentInfo.deploymentResources.length}`);
    
  } catch (error) {
    console.error(chalk.red(`❌ Error generating deployment plan: ${error.message}`));
    process.exit(1);
  }
}

async function collectDeploymentInfo() {
  const questions = [
    {
      type: 'input',
      name: 'deploymentDate',
      message: '📅 Deployment Date (YYYY-MM-DD):',
      default: dayjs().add(1, 'week').format('YYYY-MM-DD'),
      validate: (input) => {
        const date = dayjs(input);
        return date.isValid() ? true : 'Please enter a valid date in YYYY-MM-DD format';
      }
    },
    {
      type: 'confirm',
      name: 'outageExpected',
      message: '⚠️  Is an outage expected?',
      default: false
    },
    {
      type: 'input',
      name: 'outageDuration',
      message: '⏱️  Expected outage duration:',
      when: (answers) => answers.outageExpected,
      default: '30 minutes'
    },
    {
      type: 'checkbox',
      name: 'deploymentResources',
      message: '👥 Select deployment teams/resources:',
      choices: [
        'Development Team',
        'Product Team',
        'QA Team',
        'DevOps Team',
        'Database Team',
        'Networking Team',
        'Security Team',
        'Support Team'
      ],
      validate: (input) => input.length > 0 ? true : 'Please select at least one team'
    },
    {
      type: 'confirm',
      name: 'hasExternalTeam',
      message: '🤝 Will external teams be involved?',
      default: false
    },
    {
      type: 'input',
      name: 'externalTeamPOC',
      message: '👤 External team POC name:',
      when: (answers) => answers.hasExternalTeam
    },
    {
      type: 'input',
      name: 'externalTeamEmail',
      message: '📧 External team POC email:',
      when: (answers) => answers.hasExternalTeam,
      validate: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input) ? true : 'Please enter a valid email address';
      }
    }
  ];

  const answers = await inquirer.prompt(questions);

  // Collect applications and versions
  const applications = await collectApplications();

  return {
    ...answers,
    applications
  };
}

async function collectApplications() {
  const applications = [];
  let addMore = true;

  console.log(chalk.yellow('\n📱 Applications & Versions'));
  console.log(chalk.gray('Add applications that will be deployed:\n'));

  while (addMore) {
    const appQuestions = [
      {
        type: 'input',
        name: 'name',
        message: '📱 Application name:',
        validate: (input) => input.trim() ? true : 'Application name is required'
      },
      {
        type: 'input',
        name: 'currentVersion',
        message: '🔄 Current version:',
        validate: (input) => input.trim() ? true : 'Current version is required'
      },
      {
        type: 'input',
        name: 'newVersion',
        message: '🆕 New version:',
        validate: (input) => input.trim() ? true : 'New version is required'
      },
      {
        type: 'input',
        name: 'description',
        message: '📝 Brief description (optional):',
        default: ''
      }
    ];

    const app = await inquirer.prompt(appQuestions);
    applications.push(app);

    const { continueAdding } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'continueAdding',
        message: '➕ Add another application?',
        default: false
      }
    ]);

    addMore = continueAdding;
  }

  return applications;
}

module.exports = deploymentPlanCommand;
