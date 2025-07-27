const { table } = require('table');
const fs = require('fs').promises;
const chalk = require('chalk');

class ChartBuilder {
  generate(swimlaneData, viewType = 'table') {
    switch (viewType.toLowerCase()) {
      case 'table':
        return this.generateTable(swimlaneData);
      case 'mermaid':
        return this.generateMermaid(swimlaneData);
      case 'ascii':
        return this.generateASCII(swimlaneData);
      default:
        throw new Error(`Unsupported view type: ${viewType}`);
    }
  }
  
  generateTable(swimlaneData) {
    const headers = ['Milestone', 'Outcome', 'Epic', 'Features', 'Team(s)'];
    const rows = [headers];
    
    swimlaneData.swimlanes.forEach(swimlane => {
      swimlane.outcomes.forEach(outcome => {
        if (outcome.epics.length === 0) {
          rows.push([
            swimlane.milestone,
            outcome.name,
            '-',
            '-',
            outcome.teams.join(', ')
          ]);
        } else {
          outcome.epics.forEach(epic => {
            const features = epic.features.map(f => 
              typeof f === 'string' ? f : f.name
            ).join('\n');
            
            rows.push([
              swimlane.milestone,
              outcome.name,
              epic.name,
              features || '-',
              epic.team || outcome.teams.join(', ')
            ]);
          });
        }
      });
    });
    
    const config = {
      header: {
        alignment: 'center',
        content: chalk.bold('Product Roadmap Swimlanes')
      },
      columns: {
        0: { width: 15 },
        1: { width: 20 },
        2: { width: 20 },
        3: { width: 25 },
        4: { width: 15 }
      }
    };
    
    return table(rows, config);
  }
  
  generateMermaid(swimlaneData) {
    let mermaid = 'graph TD\n';
    const nodeMap = new Map();
    let nodeCounter = 1;
    
    // Helper to get or create node ID
    const getNodeId = (name) => {
      if (!nodeMap.has(name)) {
        nodeMap.set(name, `N${nodeCounter++}`);
      }
      return nodeMap.get(name);
    };
    
    // Build the graph
    swimlaneData.swimlanes.forEach(swimlane => {
      const milestoneId = getNodeId(swimlane.milestone);
      mermaid += `    ${milestoneId}[${swimlane.milestone}]\n`;
      
      swimlane.outcomes.forEach(outcome => {
        const outcomeId = getNodeId(outcome.name);
        mermaid += `    ${outcomeId}[${outcome.name}]\n`;
        mermaid += `    ${milestoneId} --> ${outcomeId}\n`;
        
        outcome.epics.forEach(epic => {
          const epicId = getNodeId(epic.name);
          mermaid += `    ${epicId}[${epic.name}]\n`;
          mermaid += `    ${outcomeId} --> ${epicId}\n`;
          
          epic.features.forEach(feature => {
            const featureName = typeof feature === 'string' ? feature : feature.name;
            const featureId = getNodeId(featureName);
            mermaid += `    ${featureId}[${featureName}]\n`;
            mermaid += `    ${epicId} --> ${featureId}\n`;
          });
        });
      });
    });
    
    // Add dependencies if they exist
    if (swimlaneData.dependencies && swimlaneData.dependencies.length > 0) {
      mermaid += '\n    %% Dependencies\n';
      swimlaneData.dependencies.forEach(dep => {
        const fromId = getNodeId(dep.from);
        const toId = getNodeId(dep.to);
        mermaid += `    ${fromId} -.-> ${toId}\n`;
      });
    }
    
    // Add team styling
    if (swimlaneData.teams.length > 0) {
      mermaid += '\n    %% Team styling\n';
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
      
      swimlaneData.teams.forEach((team, index) => {
        const color = colors[index % colors.length];
        mermaid += `    classDef ${team.replace(/\s+/g, '')} fill:${color}\n`;
      });
    }
    
    return mermaid;
  }
  
  generateASCII(swimlaneData) {
    let ascii = '┌─ Product Roadmap Swimlanes ─┐\n';
    
    swimlaneData.swimlanes.forEach(swimlane => {
      ascii += `\n├─ 📍 ${swimlane.milestone}\n`;
      
      swimlane.outcomes.forEach(outcome => {
        ascii += `│  ├─ 🎯 ${outcome.name}\n`;
        if (outcome.teams.length > 0) {
          ascii += `│  │   Teams: ${outcome.teams.join(', ')}\n`;
        }
        
        outcome.epics.forEach((epic, epicIndex) => {
          const isLastEpic = epicIndex === outcome.epics.length - 1;
          const epicPrefix = isLastEpic ? '└─' : '├─';
          ascii += `│  │  ${epicPrefix} 📚 ${epic.name}`;
          if (epic.team) {
            ascii += ` (${epic.team})`;
          }
          ascii += '\n';
          
          epic.features.forEach((feature, featureIndex) => {
            const featureName = typeof feature === 'string' ? feature : feature.name;
            const isLastFeature = featureIndex === epic.features.length - 1;
            const featurePrefix = isLastFeature ? '└─' : '├─';
            const connector = isLastEpic ? '   ' : '│  ';
            ascii += `│  │  ${connector}  ${featurePrefix} ⚡ ${featureName}\n`;
          });
        });
      });
    });
    
    ascii += '└─────────────────────────────┘\n';
    
    // Add dependencies if they exist
    if (swimlaneData.dependencies && swimlaneData.dependencies.length > 0) {
      ascii += '\n🔗 Dependencies:\n';
      swimlaneData.dependencies.forEach(dep => {
        ascii += `   ${dep.from} → ${dep.to}\n`;
      });
    }
    
    return ascii;
  }
  
  generateDependencyChart(dependencyTree) {
    if (dependencyTree.edges.length === 0) {
      return 'No dependencies found in the roadmap.';
    }
    
    let mermaid = 'graph LR\n';
    
    // Add nodes with styling based on type
    dependencyTree.nodes.forEach(node => {
      const shape = node.type === 'epic' ? '[]' : '()';
      const left = shape[0];
      const right = shape[1];
      mermaid += `    ${this.sanitizeId(node.id)}${left}"${node.id}"${right}\n`;
    });
    
    // Add edges
    dependencyTree.edges.forEach(edge => {
      const fromId = this.sanitizeId(edge.from);
      const toId = this.sanitizeId(edge.to);
      mermaid += `    ${fromId} --> ${toId}\n`;
    });
    
    // Add styling
    mermaid += '\n    classDef epic fill:#e1f5fe\n';
    mermaid += '    classDef feature fill:#f3e5f5\n';
    
    return mermaid;
  }
  
  sanitizeId(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '_');
  }
  
  async saveToFile(content, filePath) {
    try {
      await fs.writeFile(filePath, content, 'utf8');
    } catch (error) {
      throw new Error(`Failed to save file: ${error.message}`);
    }
  }
  
  generateTeamWorkloadChart(workloadData) {
    const headers = ['Team', 'Epics', 'Features', 'Milestones', 'Avg Features/Epic'];
    const rows = [headers];
    
    Object.entries(workloadData).forEach(([team, data]) => {
      const avgFeaturesPerEpic = data.epics > 0 ? (data.features / data.epics).toFixed(1) : '0';
      rows.push([
        team,
        data.epics.toString(),
        data.features.toString(),
        data.milestonesCount.toString(),
        avgFeaturesPerEpic
      ]);
    });
    
    return table(rows, {
      header: {
        alignment: 'center',
        content: chalk.bold('Team Workload Analysis')
      }
    });
  }
}

module.exports = ChartBuilder;
