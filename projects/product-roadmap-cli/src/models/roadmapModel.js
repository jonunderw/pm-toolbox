class RoadmapModel {
  constructor(data = {}) {
    this.milestones = data.milestones || [];
    this.dependencies = data.dependencies || [];
    this.metadata = data.metadata || {};
  }
  
  static createFromJSON(json) {
    return new RoadmapModel(JSON.parse(json));
  }
  
  static createFromYAML(yaml) {
    const yamlParser = require('js-yaml');
    return new RoadmapModel(yamlParser.load(yaml));
  }
  
  addMilestone(milestone) {
    this.milestones.push(new Milestone(milestone));
    return this;
  }
  
  addDependency(from, to, type = 'depends_on') {
    this.dependencies.push({ from, to, type });
    return this;
  }
  
  getMilestone(name) {
    return this.milestones.find(m => m.name === name);
  }
  
  getAllTeams() {
    const teams = new Set();
    this.milestones.forEach(milestone => {
      milestone.outcomes.forEach(outcome => {
        outcome.teams?.forEach(team => teams.add(team));
        outcome.epics?.forEach(epic => {
          if (epic.team) teams.add(epic.team);
        });
      });
    });
    return Array.from(teams).sort();
  }
  
  validate() {
    const errors = [];
    
    if (!Array.isArray(this.milestones)) {
      errors.push('Milestones must be an array');
    }
    
    this.milestones.forEach((milestone, index) => {
      if (!milestone.name) {
        errors.push(`Milestone at index ${index} must have a name`);
      }
      
      if (milestone.outcomes) {
        milestone.outcomes.forEach((outcome, outcomeIndex) => {
          if (!outcome.name) {
            errors.push(`Outcome at milestone "${milestone.name}", index ${outcomeIndex} must have a name`);
          }
        });
      }
    });
    
    if (this.dependencies) {
      this.dependencies.forEach((dep, index) => {
        if (!dep.from || !dep.to) {
          errors.push(`Dependency at index ${index} must have both 'from' and 'to' properties`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  toJSON() {
    return {
      milestones: this.milestones,
      dependencies: this.dependencies,
      metadata: this.metadata
    };
  }
}

class Milestone {
  constructor(data = {}) {
    this.name = data.name;
    this.description = data.description;
    this.outcomes = (data.outcomes || []).map(o => new Outcome(o));
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.status = data.status || 'planned';
  }
  
  addOutcome(outcome) {
    this.outcomes.push(new Outcome(outcome));
    return this;
  }
  
  getOutcome(name) {
    return this.outcomes.find(o => o.name === name);
  }
}

class Outcome {
  constructor(data = {}) {
    this.name = data.name;
    this.description = data.description;
    this.teams = data.teams || [];
    this.epics = (data.epics || []).map(e => new Epic(e));
    this.priority = data.priority || 'medium';
    this.status = data.status || 'planned';
  }
  
  addEpic(epic) {
    this.epics.push(new Epic(epic));
    return this;
  }
  
  getEpic(name) {
    return this.epics.find(e => e.name === name);
  }
}

class Epic {
  constructor(data = {}) {
    this.name = data.name;
    this.description = data.description;
    this.team = data.team;
    this.features = (data.features || []).map(f => new Feature(f));
    this.storyPoints = data.storyPoints;
    this.priority = data.priority || 'medium';
    this.status = data.status || 'planned';
  }
  
  addFeature(feature) {
    this.features.push(new Feature(feature));
    return this;
  }
  
  getFeature(name) {
    return this.features.find(f => f.name === name);
  }
  
  getTotalStoryPoints() {
    return this.features.reduce((total, feature) => {
      return total + (feature.storyPoints || 0);
    }, this.storyPoints || 0);
  }
}

class Feature {
  constructor(data = {}) {
    if (typeof data === 'string') {
      this.name = data;
    } else {
      this.name = data.name;
      this.description = data.description;
      this.storyPoints = data.storyPoints;
      this.priority = data.priority || 'medium';
      this.status = data.status || 'planned';
      this.assignee = data.assignee;
    }
  }
}

module.exports = {
  RoadmapModel,
  Milestone,
  Outcome,
  Epic,
  Feature
};
