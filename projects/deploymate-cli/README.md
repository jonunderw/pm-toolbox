# DeployMate CLI

🚀 **DeployMate** is a command-line tool designed for deployment management, helping product managers and development teams generate comprehensive deployment plans and test plans from JIRA exports.

## Features

- 📋 **Interactive Deployment Plan Generation** - Create detailed deployment plans with team coordination, rollback procedures, and communication strategies
- 🧪 **JIRA-Based Test Plan Generation** - Transform JIRA export data into structured test plans with epic-based organization
- 📱 **Multi-Application Support** - Handle complex deployments involving multiple applications and versions
- 🔄 **Comprehensive Templates** - Include pre-deployment checklists, rollback procedures, and post-deployment validation
- 📊 **Epic-Based Organization** - Automatically group and organize issues by Epic for better test plan structure

## Installation

```bash
cd /pm-toolbox/projects/deploymate-cli
npm install
```

## Quick Start

### Generate a Deployment Plan

```bash
node bin/deploymate.js deployment-plan
# or use the alias
node bin/deploymate.js deploy
```

This command will interactively prompt you for:
- Deployment date
- Outage expectations and duration
- Applications and version information
- Deployment teams and resources
- External team contacts

### Generate a Test Plan from JIRA Export

```bash
node bin/deploymate.js test-plan --jira-export examples/jira-export-sample.csv
# or use the alias
node bin/deploymate.js test --jira-export examples/jira-export-sample.csv
```

## Commands

### `deployment-plan` (alias: `deploy`)

Generates a comprehensive deployment plan through interactive prompts.

**Options:**
- `-o, --output <file>` - Output file path (default: `./output/Deployment-Plan.md`)

**Features:**
- Interactive application and version collection
- Team resource selection
- External team coordination
- Outage planning and duration estimation
- Comprehensive checklists and procedures

### `test-plan` (alias: `test`)

Generates a detailed test plan from JIRA export CSV data.

**Options:**
- `-j, --jira-export <file>` - Path to JIRA export CSV file (required)
- `-o, --output <file>` - Output file path (default: `./output/Test-Plan.md`)

**Features:**
- Epic-based issue organization
- Automatic categorization (Stories, Tasks, Bugs)
- Completion status and assignee tracking
- Comprehensive test strategy and execution plan

## JIRA Export Format

The CLI expects JIRA CSV exports with the following columns (column names are flexible):

**Required Columns:**
- `Issue key` / `Key` / `Issue Key`
- `Summary`
- `Issue Type` / `Type`
- `Status`

**Optional Columns:**
- `Epic Name` / `Epic` / `Epic Link`
- `Resolved` / `Completed` / `Done Date`
- `Assignee` / `Resolved By` / `Reporter`
- `Components` / `Component/s`
- `Labels`
- `QA Owner` / `Tester`

## Output Examples

### Deployment Plan Features

- **Application Version Tracking** - Clear before/after version matrix
- **Team Coordination** - Resource allocation and contact information
- **Outage Management** - Planned downtime procedures and communication
- **Rollback Procedures** - Comprehensive fallback strategies
- **Communication Plan** - Stakeholder notification timeline
- **Pre/Post Deployment Checklists** - Detailed validation steps

### Test Plan Features

- **Epic Organization** - Issues grouped by Epic with story/task/bug categorization
- **Test Strategy** - Comprehensive testing approach (functional, integration, regression)
- **Phase-Based Execution** - Structured testing phases from smoke to sign-off
- **Bug Validation** - Specific test cases for resolved bugs
- **Risk Assessment** - High-risk area identification and mitigation
- **Team Coordination** - Contact information and responsibilities

## Project Structure

```
deploymate-cli/
├── bin/
│   └── deploymate.js           # CLI entry point
├── commands/
│   ├── deployment-plan.js      # Deployment plan command
│   └── test-plan.js            # Test plan command
├── lib/
│   ├── markdownBuilder.js      # Markdown generation logic
│   ├── jiraParser.js           # JIRA CSV parsing
│   └── fileUtils.js            # File system utilities
├── templates/
│   └── deployment-plan.hbs     # Handlebars template (optional)
├── examples/
│   └── jira-export-sample.csv  # Sample JIRA export
├── output/                     # Generated files directory
├── package.json
└── README.md
```

## Dependencies

- **commander** - CLI command framework
- **inquirer** - Interactive command line prompts
- **csv-parser** - CSV file parsing
- **chalk** - Terminal string styling
- **fs-extra** - Enhanced file system methods
- **dayjs** - Date manipulation and formatting
- **handlebars** - Template engine (optional)
- **ora** - Terminal spinners

## Usage Examples

### Interactive Deployment Plan

```bash
$ node bin/deploymate.js deployment-plan

🚀 Deployment Plan Generator

📅 Deployment Date (YYYY-MM-DD): 2025-08-15
⚠️  Is an outage expected? Yes
⏱️  Expected outage duration: 45 minutes
👥 Select deployment teams/resources: 
◉ Development Team
◉ Product Team
◯ QA Team
◉ DevOps Team
◯ Database Team

🤝 Will external teams be involved? Yes
👤 External team POC name: Jane Doe
📧 External team POC email: jane@external.com

📱 Applications & Versions
Add applications that will be deployed:

📱 Application name: Billing System
🔄 Current version: 1.0.3
🆕 New version: 1.1.0
📝 Brief description: Payment processing improvements
➕ Add another application? Yes

📱 Application name: Auth Service
🔄 Current version: 2.1.0
🆕 New version: 2.2.0
📝 Brief description: OAuth2 enhancements
➕ Add another application? No

✅ Deployment plan generated: ./output/Deployment-Plan.md

📋 Deployment Summary:
📅 Date: 2025-08-15
⚠️  Outage Expected: Yes
⏱️  Duration: 45 minutes
📱 Applications: 2
👥 Teams: 3
```

### JIRA-Based Test Plan

```bash
$ node bin/deploymate.js test-plan --jira-export examples/jira-export-sample.csv

🧪 Test Plan Generator

📂 Processing JIRA export: examples/jira-export-sample.csv
✅ Test plan generated: ./output/Test-Plan.md

📊 Test Plan Summary:
📋 Total Issues: 15
🏛️  Epics: 4
📖 Stories: 6
⚙️  Tasks: 4
🐛 Bugs: 5

🏛️  Epic Breakdown:
  • User Management System (4 issues)
  • Payment Integration (4 issues)
  • Performance Improvements (3 issues)
  • Developer Experience (3 issues)
  • No Epic (1 issue)
```

## Future Enhancements

- 🔗 **JIRA API Integration** - Direct integration with JIRA for real-time issue fetching
- 🏷️ **GitHub/GitLab Releases** - Automatic release tagging and version management
- 💬 **Slack Integration** - Post deployment and test plans to Slack channels
- 📝 **Confluence Export** - Direct publishing to Confluence pages
- 📊 **Analytics Dashboard** - Deployment success metrics and trends
- 🔄 **Template Customization** - User-defined templates for different deployment types

## Contributing

This tool is part of the PM Toolbox suite. Contributions and feedback are welcome to improve deployment management workflows.

## License

MIT License - Part of the PM Toolbox project.
