const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { CredentialStorage } = require('../lib/storage');

const credentialsCommand = new Command('creds')
  .alias('credentials')
  .description('Manage API credentials securely');

const storage = new CredentialStorage();

// Add credential command
credentialsCommand
  .command('add')
  .description('Add a new API credential')
  .option('-n, --name <name>', 'API name')
  .option('-k, --key <key>', 'API key/credential')
  .option('-c, --cost <cost>', 'API cost')
  .option('-r, --renewal <type>', 'Renewal type (monthly, annual, lifetime)')
  .option('-t, --type <type>', 'Credential type (key, secret, bearer)')
  .action(async (options) => {
    try {
      let answers = {};
      
      // If options not provided via flags, prompt interactively
      if (!options.name || !options.key) {
        answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'API Name:',
            default: options.name,
            validate: (input) => input.trim() !== '' || 'API name is required'
          },
          {
            type: 'password',
            name: 'key',
            message: 'API Key/Credential:',
            default: options.key,
            validate: (input) => input.trim() !== '' || 'API credential is required'
          },
          {
            type: 'input',
            name: 'cost',
            message: 'API Cost (optional):',
            default: options.cost || ''
          },
          {
            type: 'list',
            name: 'renewal',
            message: 'Renewal Type:',
            choices: ['monthly', 'annual', 'lifetime', 'unknown'],
            default: options.renewal || 'unknown'
          },
          {
            type: 'list',
            name: 'type',
            message: 'Credential Type:',
            choices: ['key', 'secret', 'bearer', 'basic'],
            default: options.type || 'key'
          },
          {
            type: 'input',
            name: 'description',
            message: 'Description (optional):',
            default: ''
          },
          {
            type: 'input',
            name: 'baseUrl',
            message: 'Base URL (optional):',
            default: ''
          }
        ]);
      } else {
        answers = {
          name: options.name,
          key: options.key,
          cost: options.cost || '',
          renewal: options.renewal || 'unknown',
          type: options.type || 'key',
          description: '',
          baseUrl: ''
        };
      }

      const spinner = ora('Saving credential...').start();
      
      const credential = {
        name: answers.name,
        key: answers.key,
        cost: answers.cost,
        renewal: answers.renewal,
        type: answers.type,
        description: answers.description,
        baseUrl: answers.baseUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await storage.saveCredential(answers.name, credential);
      spinner.succeed(chalk.green(`✅ Credential '${answers.name}' saved successfully`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error saving credential: ${error.message}`));
      process.exit(1);
    }
  });

// List credentials command
credentialsCommand
  .command('list')
  .alias('ls')
  .description('List all stored credentials')
  .option('-v, --verbose', 'Show detailed information')
  .action(async (options) => {
    try {
      const spinner = ora('Loading credentials...').start();
      const credentials = await storage.listCredentials();
      spinner.stop();

      if (credentials.length === 0) {
        console.log(chalk.yellow('📭 No credentials found'));
        return;
      }

      console.log(chalk.blue.bold(`\n🔐 Stored Credentials (${credentials.length}):\n`));
      
      credentials.forEach((cred, index) => {
        console.log(chalk.cyan(`${index + 1}. ${cred.name}`));
        if (options.verbose) {
          console.log(chalk.gray(`   Type: ${cred.type}`));
          console.log(chalk.gray(`   Renewal: ${cred.renewal}`));
          if (cred.cost) console.log(chalk.gray(`   Cost: ${cred.cost}`));
          if (cred.baseUrl) console.log(chalk.gray(`   Base URL: ${cred.baseUrl}`));
          if (cred.description) console.log(chalk.gray(`   Description: ${cred.description}`));
          console.log(chalk.gray(`   Created: ${new Date(cred.createdAt).toLocaleDateString()}`));
        }
        console.log();
      });
    } catch (error) {
      console.error(chalk.red(`❌ Error listing credentials: ${error.message}`));
      process.exit(1);
    }
  });

// View specific credential command
credentialsCommand
  .command('view <name>')
  .description('View a specific credential')
  .option('-s, --show-key', 'Show the actual API key (use with caution)')
  .action(async (name, options) => {
    try {
      const spinner = ora(`Loading credential '${name}'...`).start();
      const credential = await storage.getCredential(name);
      spinner.stop();

      if (!credential) {
        console.log(chalk.yellow(`📭 Credential '${name}' not found`));
        return;
      }

      console.log(chalk.blue.bold(`\n🔐 Credential: ${credential.name}\n`));
      console.log(chalk.cyan(`Type: ${credential.type}`));
      console.log(chalk.cyan(`Renewal: ${credential.renewal}`));
      if (credential.cost) console.log(chalk.cyan(`Cost: ${credential.cost}`));
      if (credential.baseUrl) console.log(chalk.cyan(`Base URL: ${credential.baseUrl}`));
      if (credential.description) console.log(chalk.cyan(`Description: ${credential.description}`));
      console.log(chalk.cyan(`Created: ${new Date(credential.createdAt).toLocaleDateString()}`));
      console.log(chalk.cyan(`Updated: ${new Date(credential.updatedAt).toLocaleDateString()}`));
      
      if (options.showKey) {
        console.log(chalk.red.bold(`\n⚠️  API Key: ${credential.key}`));
        console.log(chalk.yellow('🚨 Key displayed - ensure your terminal is secure!'));
      } else {
        const maskedKey = credential.key.substring(0, 4) + '*'.repeat(Math.max(0, credential.key.length - 8)) + credential.key.substring(credential.key.length - 4);
        console.log(chalk.gray(`Key: ${maskedKey} (use --show-key to reveal)`));
      }
      
    } catch (error) {
      console.error(chalk.red(`❌ Error viewing credential: ${error.message}`));
      process.exit(1);
    }
  });

// Delete credential command
credentialsCommand
  .command('delete <name>')
  .alias('rm')
  .description('Remove a credential')
  .option('-f, --force', 'Skip confirmation prompt')
  .action(async (name, options) => {
    try {
      const credential = await storage.getCredential(name);
      
      if (!credential) {
        console.log(chalk.yellow(`📭 Credential '${name}' not found`));
        return;
      }

      if (!options.force) {
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to delete credential '${name}'?`,
            default: false
          }
        ]);

        if (!answers.confirm) {
          console.log(chalk.gray('Deletion cancelled'));
          return;
        }
      }

      const spinner = ora(`Deleting credential '${name}'...`).start();
      await storage.deleteCredential(name);
      spinner.succeed(chalk.green(`✅ Credential '${name}' deleted successfully`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error deleting credential: ${error.message}`));
      process.exit(1);
    }
  });

// Update credential command
credentialsCommand
  .command('update <name>')
  .description('Update an existing credential')
  .action(async (name) => {
    try {
      const existing = await storage.getCredential(name);
      
      if (!existing) {
        console.log(chalk.yellow(`📭 Credential '${name}' not found`));
        return;
      }

      console.log(chalk.blue(`Updating credential '${name}' (leave blank to keep current value):`));

      const answers = await inquirer.prompt([
        {
          type: 'password',
          name: 'key',
          message: 'API Key/Credential:',
          default: '',
        },
        {
          type: 'input',
          name: 'cost',
          message: 'API Cost:',
          default: existing.cost || ''
        },
        {
          type: 'list',
          name: 'renewal',
          message: 'Renewal Type:',
          choices: ['monthly', 'annual', 'lifetime', 'unknown'],
          default: existing.renewal || 'unknown'
        },
        {
          type: 'list',
          name: 'type',
          message: 'Credential Type:',
          choices: ['key', 'secret', 'bearer', 'basic'],
          default: existing.type || 'key'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description:',
          default: existing.description || ''
        },
        {
          type: 'input',
          name: 'baseUrl',
          message: 'Base URL:',
          default: existing.baseUrl || ''
        }
      ]);

      const spinner = ora('Updating credential...').start();
      
      const updatedCredential = {
        ...existing,
        key: answers.key || existing.key,
        cost: answers.cost,
        renewal: answers.renewal,
        type: answers.type,
        description: answers.description,
        baseUrl: answers.baseUrl,
        updatedAt: new Date().toISOString()
      };

      await storage.saveCredential(name, updatedCredential);
      spinner.succeed(chalk.green(`✅ Credential '${name}' updated successfully`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error updating credential: ${error.message}`));
      process.exit(1);
    }
  });

module.exports = { credentialsCommand };
