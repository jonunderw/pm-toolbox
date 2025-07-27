# roadmap-lane CLI

A Node.js CLI tool for transforming high-level product roadmaps into cross-functional action plans with swimlane visualization.

## 🚀 Quick Start

### Installation

```bash
cd pm-toolbox/projects/product-roadmap-cli
npm install
npm link  # Optional: for global usage
```

### Basic Usage

```bash
# Generate a swimlane chart from example roadmap
node bin/cli.js plan ./data/example-roadmap.yaml

# Generate mermaid diagram
node bin/cli.js plan ./data/example-roadmap.yaml --view=mermaid

# Show dependency tree
node bin/cli.js deps ./data/example-roadmap.yaml

# List milestones
node bin/cli.js list ./data/example-roadmap.yaml

# Export to JSON
node bin/cli.js export ./data/example-roadmap.yaml --format=json
```

## 📋 Commands

### `plan <file> [options]`
Generate swimlane chart from roadmap file.

**Options:**
- `-v, --view <type>` - Output view type: `table` (default), `mermaid`, `ascii`
- `-o, --output <file>` - Save output to file

**Examples:**
```bash
roadmap-lane plan roadmap.yaml --view=table
roadmap-lane plan roadmap.yaml --view=mermaid -o diagram.mmd
```

### `list [file] [options]`
List milestones and their contents.

**Options:**
- `-m, --milestone <name>` - Filter by milestone name

**Examples:**
```bash
roadmap-lane list
roadmap-lane list --milestone="Q1 2025"
```

### `deps [file]`
Show dependency tree as a mermaid diagram.

**Examples:**
```bash
roadmap-lane deps roadmap.yaml
```

### `export [file] [options]`
Export roadmap data for external use.

**Options:**
- `-f, --format <type>` - Export format: `json` (default), `csv`
- `-o, --output <file>` - Save to file

**Examples:**
```bash
roadmap-lane export --format=json
roadmap-lane export --format=csv -o roadmap.csv
```

## 📁 Input Format

The CLI accepts YAML or JSON files with the following structure:

```yaml
milestones:
  - name: "Milestone Name"
    description: "Optional description"
    outcomes:
      - name: "Outcome Name"
        description: "Optional description"
        teams: ["Team1", "Team2"]
        priority: "high"  # high, medium, low
        epics:
          - name: "Epic Name"
            description: "Optional description"
            team: "Team1"
            storyPoints: 21
            features:
              - name: "Feature Name"
                storyPoints: 8
              - "Simple Feature Name"  # String shorthand

dependencies:
  - from: "Feature A"
    to: "Feature B"
    type: "blocks"  # blocks, enables, prerequisite

metadata:
  version: "1.0"
  lastUpdated: "2025-01-15"
  owner: "Product Team"
```

## 🎯 Output Formats

### Table View (Default)
Clean tabular representation showing the hierarchy of milestones, outcomes, epics, and features.

### Mermaid Diagram
Generates Mermaid syntax for creating flowcharts that can be rendered in documentation tools, GitHub, or Mermaid Live Editor.

### ASCII Art
Terminal-friendly visual representation with Unicode characters.

## 🔗 Dependencies

The tool supports dependency mapping between features and epics:

- **blocks**: Feature A must complete before Feature B can start
- **enables**: Feature A enables functionality in Feature B
- **prerequisite**: Feature A is required for Feature B

Dependencies are visualized in the dependency tree view and can be included in Mermaid diagrams.

## 🛠 Project Structure

```
roadmap-lane/
├── bin/
│   └── cli.js              # CLI entry point
├── src/
│   ├── parser/
│   │   └── roadmapParser.js    # YAML/JSON parsing
│   ├── planner/
│   │   └── planner.js          # Core planning logic
│   ├── visualizer/
│   │   └── chartBuilder.js     # Chart generation
│   ├── models/
│   │   ├── roadmapModel.js     # Roadmap data model
│   │   └── swimlaneModel.js    # Swimlane data structure
│   └── utils/
│       └── logger.js           # Logging utilities
├── data/
│   └── example-roadmap.yaml    # Sample roadmap
└── docs/
    └── usage.md               # Detailed usage guide
```

## 🎨 Team Visualization

The tool automatically identifies teams from the roadmap and can generate team-specific views:

- **Team workload analysis**: Shows distribution of epics and features across teams
- **Cross-team dependencies**: Highlights dependencies between different teams
- **Milestone participation**: Shows which teams are involved in each milestone

## 🔮 Future Enhancements

- Web UI with interactive visualizations
- Slack integration for progress updates
- Gantt chart timeline view
- AI-assisted roadmap validation
- Resource capacity planning
- Integration with project management tools

## 📖 Examples

See the `data/example-roadmap.yaml` file for a comprehensive example showing:
- Multi-milestone roadmap
- Cross-functional team assignments
- Feature dependencies
- Story point estimation
- Priority levels

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
