class SwimlaneModel {
  constructor() {
    this.swimlanes = [];
    this.teams = [];
    this.dependencies = [];
    this.metadata = {};
  }
  
  addSwimlane(milestone, outcomes = []) {
    const swimlane = {
      milestone,
      outcomes: outcomes.map(outcome => ({
        name: outcome.name,
        teams: outcome.teams || [],
        epics: (outcome.epics || []).map(epic => ({
          name: epic.name,
          team: epic.team,
          features: epic.features || []
        }))
      }))
    };
    
    this.swimlanes.push(swimlane);
    this.updateTeams();
    return this;
  }
  
  updateTeams() {
    const teamSet = new Set();
    
    this.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.teams.forEach(team => teamSet.add(team));
        outcome.epics.forEach(epic => {
          if (epic.team) teamSet.add(epic.team);
        });
      });
    });
    
    this.teams = Array.from(teamSet).sort();
  }
  
  addDependency(from, to, type = 'depends_on') {
    this.dependencies.push({ from, to, type });
    return this;
  }
  
  getSwimlaneByMilestone(milestoneName) {
    return this.swimlanes.find(s => s.milestone === milestoneName);
  }
  
  getEpicsByTeam(teamName) {
    const epics = [];
    
    this.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.epics.forEach(epic => {
          if (epic.team === teamName) {
            epics.push({
              ...epic,
              milestone: swimlane.milestone,
              outcome: outcome.name
            });
          }
        });
      });
    });
    
    return epics;
  }
  
  getFeaturesByTeam(teamName) {
    const features = [];
    
    this.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.epics.forEach(epic => {
          if (epic.team === teamName) {
            epic.features.forEach(feature => {
              const featureName = typeof feature === 'string' ? feature : feature.name;
              features.push({
                name: featureName,
                epic: epic.name,
                milestone: swimlane.milestone,
                outcome: outcome.name,
                team: teamName
              });
            });
          }
        });
      });
    });
    
    return features;
  }
  
  getCriticalPath() {
    // Simple critical path calculation based on dependencies
    const nodes = new Map();
    const edges = [];
    
    // Build node map
    this.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.epics.forEach(epic => {
          nodes.set(epic.name, {
            name: epic.name,
            milestone: swimlane.milestone,
            outcome: outcome.name,
            team: epic.team
          });
          
          epic.features.forEach(feature => {
            const featureName = typeof feature === 'string' ? feature : feature.name;
            nodes.set(featureName, {
              name: featureName,
              epic: epic.name,
              milestone: swimlane.milestone,
              outcome: outcome.name,
              team: epic.team
            });
          });
        });
      });
    });
    
    // Build edges from dependencies
    this.dependencies.forEach(dep => {
      if (nodes.has(dep.from) && nodes.has(dep.to)) {
        edges.push({ from: dep.from, to: dep.to });
      }
    });
    
    // Find nodes with no incoming edges (starting points)
    const incomingCount = new Map();
    nodes.forEach((_, name) => incomingCount.set(name, 0));
    edges.forEach(edge => {
      incomingCount.set(edge.to, (incomingCount.get(edge.to) || 0) + 1);
    });
    
    const startNodes = Array.from(incomingCount.entries())
      .filter(([_, count]) => count === 0)
      .map(([name, _]) => name);
    
    return {
      startNodes,
      totalNodes: nodes.size,
      totalDependencies: edges.length,
      longestPath: this.findLongestPath(nodes, edges, startNodes)
    };
  }
  
  findLongestPath(nodes, edges, startNodes) {
    // Simplified longest path calculation
    const visited = new Set();
    let longestPath = [];
    
    const dfs = (node, currentPath) => {
      if (visited.has(node)) return currentPath;
      
      visited.add(node);
      const nextNodes = edges.filter(e => e.from === node).map(e => e.to);
      
      if (nextNodes.length === 0) {
        if (currentPath.length > longestPath.length) {
          longestPath = [...currentPath];
        }
        return currentPath;
      }
      
      nextNodes.forEach(nextNode => {
        dfs(nextNode, [...currentPath, nextNode]);
      });
      
      visited.delete(node);
      return currentPath;
    };
    
    startNodes.forEach(startNode => {
      dfs(startNode, [startNode]);
    });
    
    return longestPath;
  }
  
  getTeamWorkload() {
    const workload = {};
    
    this.teams.forEach(team => {
      workload[team] = {
        epics: this.getEpicsByTeam(team).length,
        features: this.getFeaturesByTeam(team).length,
        milestones: new Set()
      };
    });
    
    this.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.epics.forEach(epic => {
          if (epic.team && workload[epic.team]) {
            workload[epic.team].milestones.add(swimlane.milestone);
          }
        });
      });
    });
    
    // Convert Sets to counts
    Object.keys(workload).forEach(team => {
      workload[team].milestonesCount = workload[team].milestones.size;
      workload[team].milestones = Array.from(workload[team].milestones);
    });
    
    return workload;
  }
  
  validate() {
    const errors = [];
    
    if (!Array.isArray(this.swimlanes)) {
      errors.push('Swimlanes must be an array');
    }
    
    this.swimlanes.forEach((swimlane, index) => {
      if (!swimlane.milestone) {
        errors.push(`Swimlane at index ${index} must have a milestone`);
      }
      
      if (!Array.isArray(swimlane.outcomes)) {
        errors.push(`Swimlane "${swimlane.milestone}" must have outcomes array`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  toJSON() {
    return {
      swimlanes: this.swimlanes,
      teams: this.teams,
      dependencies: this.dependencies,
      metadata: this.metadata
    };
  }
  
  static fromRoadmap(roadmap) {
    const swimlaneModel = new SwimlaneModel();
    
    roadmap.milestones?.forEach(milestone => {
      swimlaneModel.addSwimlane(milestone.name, milestone.outcomes || []);
    });
    
    roadmap.dependencies?.forEach(dep => {
      swimlaneModel.addDependency(dep.from, dep.to, dep.type);
    });
    
    swimlaneModel.metadata = roadmap.metadata || {};
    
    return swimlaneModel;
  }
}

module.exports = SwimlaneModel;
