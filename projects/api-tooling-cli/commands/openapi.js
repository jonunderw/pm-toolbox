const { Command } = require('commander');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs-extra');
const path = require('path');
const { OpenAPIParser } = require('../lib/openapiParser');
const { MermaidGenerator } = require('../lib/mermaidGenerator');
const { MarkdownGenerator } = require('../lib/markdownGenerator');

const openapiCommand = new Command('openapi')
  .alias('api')
  .description('OpenAPI specification tooling');

// Required fields command
openapiCommand
  .command('required-fields')
  .description('Find endpoints where a specific field is required')
  .requiredOption('-f, --field <field>', 'Field name to search for')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-o, --output <format>', 'Output format (json, table)', 'table')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      spinner.text = `Searching for required field '${options.field}'...`;
      
      const results = await parser.findRequiredFields(spec, options.field);
      spinner.stop();

      if (results.length === 0) {
        console.log(chalk.yellow(`🔍 No endpoints found with required field '${options.field}'`));
        return;
      }

      console.log(chalk.blue.bold(`\n🔍 Endpoints with required field '${options.field}' (${results.length}):\n`));
      
      if (options.output === 'json') {
        console.log(JSON.stringify(results, null, 2));
      } else {
        results.forEach((result, index) => {
          console.log(chalk.cyan(`${index + 1}. ${result.method.toUpperCase()} ${result.path}`));
          console.log(chalk.gray(`   Operation: ${result.operationId || 'N/A'}`));
          console.log(chalk.gray(`   Location: ${result.location}`));
          console.log(chalk.gray(`   Schema: ${result.schemaPath}`));
          console.log();
        });
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Optional fields command
openapiCommand
  .command('optional-fields')
  .description('Find endpoints where a field is present but not required')
  .requiredOption('-f, --field <field>', 'Field name to search for')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-o, --output <format>', 'Output format (json, table)', 'table')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      spinner.text = `Searching for optional field '${options.field}'...`;
      
      const results = await parser.findOptionalFields(spec, options.field);
      spinner.stop();

      if (results.length === 0) {
        console.log(chalk.yellow(`🔍 No endpoints found with optional field '${options.field}'`));
        return;
      }

      console.log(chalk.blue.bold(`\n🔍 Endpoints with optional field '${options.field}' (${results.length}):\n`));
      
      if (options.output === 'json') {
        console.log(JSON.stringify(results, null, 2));
      } else {
        results.forEach((result, index) => {
          console.log(chalk.cyan(`${index + 1}. ${result.method.toUpperCase()} ${result.path}`));
          console.log(chalk.gray(`   Operation: ${result.operationId || 'N/A'}`));
          console.log(chalk.gray(`   Location: ${result.location}`));
          console.log(chalk.gray(`   Schema: ${result.schemaPath}`));
          console.log();
        });
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// By tag command
openapiCommand
  .command('by-tag')
  .description('Find endpoints associated with a specific tag')
  .requiredOption('-t, --tag <tag>', 'Tag name to search for')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-o, --output <format>', 'Output format (json, table)', 'table')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      spinner.text = `Searching for tag '${options.tag}'...`;
      
      const results = await parser.findByTag(spec, options.tag);
      spinner.stop();

      if (results.length === 0) {
        console.log(chalk.yellow(`📛 No endpoints found with tag '${options.tag}'`));
        return;
      }

      console.log(chalk.blue.bold(`\n📛 Endpoints with tag '${options.tag}' (${results.length}):\n`));
      
      if (options.output === 'json') {
        console.log(JSON.stringify(results, null, 2));
      } else {
        results.forEach((result, index) => {
          console.log(chalk.cyan(`${index + 1}. ${result.method.toUpperCase()} ${result.path}`));
          console.log(chalk.gray(`   Operation: ${result.operationId || 'N/A'}`));
          console.log(chalk.gray(`   Summary: ${result.summary || 'N/A'}`));
          console.log(chalk.gray(`   Tags: ${result.tags.join(', ')}`));
          console.log();
        });
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Diff command
openapiCommand
  .command('diff')
  .description('Compare endpoints between two OpenAPI specifications')
  .requiredOption('--file1 <file>', 'Path to first OpenAPI specification file')
  .requiredOption('--file2 <file>', 'Path to second OpenAPI specification file')
  .option('-o, --output <format>', 'Output format (json, table)', 'table')
  .option('--save <file>', 'Save diff results to file')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specifications...').start();
      const parser = new OpenAPIParser();
      
      spinner.text = 'Parsing first specification...';
      const spec1 = await parser.parseFile(options.file1);
      
      spinner.text = 'Parsing second specification...';
      const spec2 = await parser.parseFile(options.file2);
      
      spinner.text = 'Comparing specifications...';
      const diff = await parser.diffSpecs(spec1, spec2);
      spinner.stop();

      console.log(chalk.blue.bold('\n🔁 OpenAPI Specification Diff:\n'));
      
      if (options.output === 'json') {
        const output = JSON.stringify(diff, null, 2);
        console.log(output);
        
        if (options.save) {
          await fs.writeFile(options.save, output);
          console.log(chalk.green(`\n💾 Diff saved to ${options.save}`));
        }
      } else {
        // Added endpoints
        if (diff.added.length > 0) {
          console.log(chalk.green.bold(`➕ Added Endpoints (${diff.added.length}):`));
          diff.added.forEach((endpoint, index) => {
            console.log(chalk.green(`  ${index + 1}. ${endpoint.method.toUpperCase()} ${endpoint.path}`));
          });
          console.log();
        }

        // Removed endpoints
        if (diff.removed.length > 0) {
          console.log(chalk.red.bold(`➖ Removed Endpoints (${diff.removed.length}):`));
          diff.removed.forEach((endpoint, index) => {
            console.log(chalk.red(`  ${index + 1}. ${endpoint.method.toUpperCase()} ${endpoint.path}`));
          });
          console.log();
        }

        // Modified endpoints
        if (diff.modified.length > 0) {
          console.log(chalk.yellow.bold(`🔄 Modified Endpoints (${diff.modified.length}):`));
          diff.modified.forEach((endpoint, index) => {
            console.log(chalk.yellow(`  ${index + 1}. ${endpoint.method.toUpperCase()} ${endpoint.path}`));
            console.log(chalk.gray(`     Changes: ${endpoint.changes.join(', ')}`));
          });
          console.log();
        }

        if (diff.added.length === 0 && diff.removed.length === 0 && diff.modified.length === 0) {
          console.log(chalk.green('✅ No differences found between specifications'));
        }
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Mock command
openapiCommand
  .command('mock')
  .description('Generate mock data for an endpoint by operationId')
  .requiredOption('-i, --operationId <id>', 'Operation ID to generate mock data for')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-c, --count <number>', 'Number of mock records to generate', '1')
  .option('-o, --output <format>', 'Output format (json, yaml)', 'json')
  .option('--save <file>', 'Save mock data to file')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      
      spinner.text = `Generating mock data for operation '${options.operationId}'...`;
      const mockData = await parser.generateMockData(spec, options.operationId, parseInt(options.count));
      spinner.stop();

      if (!mockData) {
        console.log(chalk.yellow(`🧪 Operation '${options.operationId}' not found`));
        return;
      }

      console.log(chalk.blue.bold(`\n🧪 Mock data for operation '${options.operationId}':\n`));
      
      let output;
      if (options.output === 'yaml') {
        const yaml = require('yaml');
        output = yaml.stringify(mockData);
      } else {
        output = JSON.stringify(mockData, null, 2);
      }
      
      console.log(output);
      
      if (options.save) {
        await fs.writeFile(options.save, output);
        console.log(chalk.green(`\n💾 Mock data saved to ${options.save}`));
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Mermaid command
openapiCommand
  .command('mermaid')
  .description('Generate Mermaid diagrams for API dependencies')
  .requiredOption('-i, --operationId <id>', 'Operation ID to start dependency discovery')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-d, --depth <number>', 'Depth of dependency discovery', '2')
  .option('-t, --type <type>', 'Diagram type (flowchart, sequence, graph)', 'flowchart')
  .option('--save <file>', 'Save diagram to file')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      
      spinner.text = `Generating Mermaid diagram for operation '${options.operationId}'...`;
      const generator = new MermaidGenerator();
      const diagram = await generator.generateDiagram(
        spec, 
        options.operationId, 
        {
          depth: parseInt(options.depth),
          type: options.type
        }
      );
      spinner.stop();

      if (!diagram) {
        console.log(chalk.yellow(`🕸 Operation '${options.operationId}' not found`));
        return;
      }

      console.log(chalk.blue.bold(`\n🕸 Mermaid diagram for operation '${options.operationId}':\n`));
      console.log(diagram);
      
      if (options.save) {
        await fs.writeFile(options.save, diagram);
        console.log(chalk.green(`\n💾 Diagram saved to ${options.save}`));
      }
    } catch (error) {      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Markdown command
openapiCommand
  .command('markdown')
  .description('Generate readable Markdown documentation from OpenAPI spec')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-o, --output <file>', 'Output markdown file', 'api-docs.md')
  .option('-t, --template <template>', 'Documentation template (default, detailed, compact)', 'default')
  .option('--include-examples', 'Include request/response examples')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      
      spinner.text = 'Generating Markdown documentation...';
      const generator = new MarkdownGenerator();
      const markdown = await generator.generateDocumentation(spec, {
        template: options.template,
        includeExamples: options.includeExamples
      });
      spinner.stop();

      console.log(chalk.blue.bold('\n📄 Generated Markdown documentation:\n'));
      
      // Show preview of first few lines
      const lines = markdown.split('\n');
      const preview = lines.slice(0, 20).join('\n');
      console.log(preview);
      
      if (lines.length > 20) {
        console.log(chalk.gray(`\n... and ${lines.length - 20} more lines`));
      }
      
      await fs.writeFile(options.output, markdown);
      console.log(chalk.green(`\n💾 Full documentation saved to ${options.output}`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// List operations command
openapiCommand
  .command('list')
  .description('List all operations in the OpenAPI specification')
  .requiredOption('--file <file>', 'Path to OpenAPI specification file')
  .option('-f, --format <format>', 'Output format (table, json)', 'table')
  .action(async (options) => {
    try {
      const spinner = ora('Parsing OpenAPI specification...').start();
      const parser = new OpenAPIParser();
      const spec = await parser.parseFile(options.file);
      
      const operations = await parser.listOperations(spec);
      spinner.stop();

      console.log(chalk.blue.bold(`\n📋 API Operations (${operations.length}):\n`));
      
      if (options.format === 'json') {
        console.log(JSON.stringify(operations, null, 2));
      } else {
        operations.forEach((op, index) => {
          console.log(chalk.cyan(`${index + 1}. ${op.method.toUpperCase()} ${op.path}`));
          console.log(chalk.gray(`   Operation ID: ${op.operationId || 'N/A'}`));
          console.log(chalk.gray(`   Summary: ${op.summary || 'N/A'}`));
          if (op.tags && op.tags.length > 0) {
            console.log(chalk.gray(`   Tags: ${op.tags.join(', ')}`));
          }
          console.log();
        });
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

module.exports = { openapiCommand };
