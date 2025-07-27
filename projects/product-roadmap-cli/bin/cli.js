#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const RoadmapParser = require('../src/parser/roadmapParser');
const Planner = require('../src/planner/planner');
const ChartBuilder = require('../src/visualizer/chartBuilder');
const logger = require('../src/utils/logger');

const program = new Command();

program
  .name('roadmap-lane')
  .description('Transform product roadmaps into cross-functional action plans')
  .version('1.0.0');

program
  .command('plan')
  .description('Generate swimlane chart from roadmap file')
  .argument('<file>', 'Path to roadmap YAML/JSON file')
  .option('-v, --view <type>', 'Output view type (table, mermaid, svg)', 'table')
  .option('-o, --output <file>', 'Output file path')
  .action(async (file, options) => {
    try {
      logger.info(`Processing roadmap file: ${file}`);
      
      const parser = new RoadmapParser();
      const roadmap = await parser.parse(file);
      
      const planner = new Planner();
      const swimlaneData = planner.createSwimlanes(roadmap);
      
      const chartBuilder = new ChartBuilder();
      const output = chartBuilder.generate(swimlaneData, options.view);
      
      if (options.output) {
        await chartBuilder.saveToFile(output, options.output);
        logger.success(`Chart saved to: ${options.output}`);
      } else {
        console.log(output);
      }
    } catch (error) {
      logger.error(`Error processing roadmap: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List milestones and their contents')
  .argument('[file]', 'Path to roadmap file')
  .option('-m, --milestone <name>', 'Filter by milestone name')
  .action(async (file, options) => {
    try {
      const parser = new RoadmapParser();
      const roadmap = await parser.parse(file || './data/example-roadmap.yaml');
      
      const planner = new Planner();
      const filtered = planner.filterByMilestone(roadmap, options.milestone);
      
      console.log(JSON.stringify(filtered, null, 2));
    } catch (error) {
      logger.error(`Error listing roadmap: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('deps')
  .description('Show dependency tree')
  .argument('[file]', 'Path to roadmap file')
  .action(async (file) => {
    try {
      const parser = new RoadmapParser();
      const roadmap = await parser.parse(file || './data/example-roadmap.yaml');
      
      const planner = new Planner();
      const dependencyTree = planner.buildDependencyTree(roadmap);
      
      const chartBuilder = new ChartBuilder();
      const output = chartBuilder.generateDependencyChart(dependencyTree);
      
      console.log(output);
    } catch (error) {
      logger.error(`Error building dependency tree: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('export')
  .description('Export roadmap data for external use')
  .argument('[file]', 'Path to roadmap file')
  .option('-f, --format <type>', 'Export format (json, csv)', 'json')
  .option('-o, --output <file>', 'Output file path')
  .action(async (file, options) => {
    try {
      const parser = new RoadmapParser();
      const roadmap = await parser.parse(file || './data/example-roadmap.yaml');
      
      const planner = new Planner();
      const exportData = planner.prepareExport(roadmap, options.format);
      
      if (options.output) {
        const fs = require('fs').promises;
        await fs.writeFile(options.output, exportData);
        logger.success(`Data exported to: ${options.output}`);
      } else {
        console.log(exportData);
      }
    } catch (error) {
      logger.error(`Error exporting data: ${error.message}`);
      process.exit(1);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  logger.error('Invalid command. See --help for available commands.');
  process.exit(1);
});

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse();
