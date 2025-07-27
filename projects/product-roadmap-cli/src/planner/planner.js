const logger = require('../utils/logger');

class Planner {
  createSwimlanes(roadmap) {
    const swimlanes = [];
    const teams = new Set();
    
    roadmap.milestones.forEach(milestone => {
      const milestoneData = {
        milestone: milestone.name,
        outcomes: []
      };
      
      if (milestone.outcomes) {
        milestone.outcomes.forEach(outcome => {
          const outcomeData = {
            name: outcome.name,
            teams: outcome.teams || [],
            epics: []
          };
          
          // Track teams
          outcome.teams?.forEach(team => teams.add(team));
          
          if (outcome.epics) {
            outcome.epics.forEach(epic => {
              const epicData = {
                name: epic.name,
                team: epic.team,
                features: epic.features || []
              };
              
              if (epic.team) teams.add(epic.team);
              outcomeData.epics.push(epicData);
            });
          }
          
          milestoneData.outcomes.push(outcomeData);
        });
      }
      
      swimlanes.push(milestoneData);
    });
    
    return {
      swimlanes,
      teams: Array.from(teams).sort(),
      dependencies: roadmap.dependencies || []
    };
  }
  
  filterByMilestone(roadmap, milestoneName) {
    if (!milestoneName) {
      return roadmap;
    }
    
    const filtered = {
      ...roadmap,
      milestones: roadmap.milestones.filter(m => 
        m.name.toLowerCase().includes(milestoneName.toLowerCase())
      )
    };
    
    return filtered;
  }
  
  buildDependencyTree(roadmap) {
    const dependencies = roadmap.dependencies || [];
    const tree = {
      nodes: [],
      edges: []
    };
    
    // Collect all features/epics as nodes
    const nodeMap = new Map();
    
    roadmap.milestones.forEach(milestone => {
      milestone.outcomes?.forEach(outcome => {
        outcome.epics?.forEach(epic => {
          nodeMap.set(epic.name, {
            id: epic.name,
            type: 'epic',
            team: epic.team,
            milestone: milestone.name,
            outcome: outcome.name
          });
          
          epic.features?.forEach(feature => {
            const featureName = typeof feature === 'string' ? feature : feature.name;
            nodeMap.set(featureName, {
              id: featureName,
              type: 'feature',
              epic: epic.name,
              team: epic.team,
              milestone: milestone.name,
              outcome: outcome.name
            });
          });
        });
      });
    });
    
    tree.nodes = Array.from(nodeMap.values());
    
    // Build edges from dependencies
    dependencies.forEach(dep => {
      if (nodeMap.has(dep.from) && nodeMap.has(dep.to)) {
        tree.edges.push({
          from: dep.from,
          to: dep.to,
          type: dep.type || 'depends_on'
        });
      }
    });
    
    return tree;
  }
  
  prepareExport(roadmap, format = 'json') {
    const swimlaneData = this.createSwimlanes(roadmap);
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        totalMilestones: swimlaneData.swimlanes.length,
        totalTeams: swimlaneData.teams.length,
        totalDependencies: swimlaneData.dependencies.length
      },
      ...swimlaneData
    };
    
    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    } else if (format === 'csv') {
      return this.convertToCSV(exportData);
    }
    
    throw new Error(`Unsupported export format: ${format}`);
  }
  
  convertToCSV(data) {
    const rows = [];
    rows.push(['Milestone', 'Outcome', 'Epic', 'Feature', 'Team', 'Type']);
    
    data.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        outcome.epics.forEach(epic => {
          if (epic.features.length === 0) {
            rows.push([
              swimlane.milestone,
              outcome.name,
              epic.name,
              '',
              epic.team || '',
              'epic'
            ]);
          } else {
            epic.features.forEach(feature => {
              const featureName = typeof feature === 'string' ? feature : feature.name;
              rows.push([
                swimlane.milestone,
                outcome.name,
                epic.name,
                featureName,
                epic.team || '',
                'feature'
              ]);
            });
          }
        });
      });
    });
    
    return rows.map(row => 
      row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');
  }
  
  analyzeTeamWorkload(roadmap) {
    const workload = {};
    
    roadmap.milestones.forEach(milestone => {
      milestone.outcomes?.forEach(outcome => {
        outcome.epics?.forEach(epic => {
          const team = epic.team;
          if (team) {
            if (!workload[team]) {
              workload[team] = {
                epics: 0,
                features: 0,
                milestones: new Set()
              };
            }
            workload[team].epics++;
            workload[team].features += epic.features?.length || 0;
            workload[team].milestones.add(milestone.name);
          }
        });
      });
    });
    
    // Convert Sets to arrays for JSON serialization
    Object.keys(workload).forEach(team => {
      workload[team].milestones = Array.from(workload[team].milestones);
      workload[team].milestonesCount = workload[team].milestones.length;
    });
    
    return workload;
  }
}

module.exports = Planner;
