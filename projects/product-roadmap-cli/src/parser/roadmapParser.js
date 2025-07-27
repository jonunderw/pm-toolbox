const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const logger = require('../utils/logger');

class RoadmapParser {
  async parse(filePath) {
    try {
      const absolutePath = path.resolve(filePath);
      const fileContent = await fs.readFile(absolutePath, 'utf8');
      const extension = path.extname(filePath).toLowerCase();
      
      let data;
      if (extension === '.yaml' || extension === '.yml') {
        data = yaml.load(fileContent);
      } else if (extension === '.json') {
        data = JSON.parse(fileContent);
      } else {
        throw new Error(`Unsupported file format: ${extension}. Use .yaml, .yml, or .json`);
      }
      
      this.validateRoadmapStructure(data);
      return data;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`);
      }
      throw error;
    }
  }
  
  validateRoadmapStructure(data) {
    if (!data.milestones || !Array.isArray(data.milestones)) {
      throw new Error('Roadmap must contain a "milestones" array');
    }
    
    data.milestones.forEach((milestone, index) => {
      if (!milestone.name) {
        throw new Error(`Milestone at index ${index} must have a "name" property`);
      }
      
      if (milestone.outcomes && Array.isArray(milestone.outcomes)) {
        milestone.outcomes.forEach((outcome, outcomeIndex) => {
          if (!outcome.name) {
            throw new Error(`Outcome at milestone ${milestone.name}, index ${outcomeIndex} must have a "name" property`);
          }
        });
      }
    });
    
    logger.info('Roadmap structure validation passed');
  }
  
  async parseFromString(content, format = 'yaml') {
    try {
      let data;
      if (format === 'yaml' || format === 'yml') {
        data = yaml.load(content);
      } else if (format === 'json') {
        data = JSON.parse(content);
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }
      
      this.validateRoadmapStructure(data);
      return data;
    } catch (error) {
      throw new Error(`Error parsing ${format}: ${error.message}`);
    }
  }
}

module.exports = RoadmapParser;
