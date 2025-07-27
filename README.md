# pm-toolkit
Source repo for various tools primarily for product managers.  

## 🚀 Available CLI Tools

### 🛣️ roadmap-lane (`/projects/product-roadmap-cli/`)
Transform product roadmaps into actionable cross-functional plans with swimlane visualizations
- Parse YAML/JSON roadmap files
- Generate table, ASCII, and Mermaid chart outputs
- Track dependencies between initiatives
- Export multiple visualization formats

### 🔧 apitool-cli (`/projects/api-tooling-cli/`)
Comprehensive API credential management and OpenAPI specification tooling
- Secure AES-256-CBC encrypted credential storage
- OpenAPI specification parsing and analysis
- Mock data generation with realistic fake data
- Mermaid diagram and Markdown documentation generation

### 🚀 deploymate-cli (`/projects/deploymate-cli/`)
**NEW!** Deployment management CLI for generating comprehensive deployment and test plans
- Interactive deployment plan creation with team coordination
- JIRA export parsing for automated test plan generation
- Multi-application deployment support with version tracking
- Comprehensive rollback procedures and communication plans

## Features (WIP)
- api-management tooling ✅ **COMPLETED** - See `apitool-cli` above
	CLI application for adding APIs & their basic integration information for research / exploratory use 
	GenAI and open api spec json to increase efficiencies in API design, development, testing, maintenance, and documentation
- change management tooling ✅ **COMPLETED** - See `deploymate-cli` above
	Tool for tracking changes in a Release, creating test plans with test cases and traceability matrix, and artifact organization
- GenAI tooling for deployment management ✅ **COMPLETED** - See `deploymate-cli` above
	Release notes and release test plan generation using JIRA item export. Test data generation for test cases
- Using AI to create wireframes and full stack user stories
- Using AI with pendo product analytics 
- Using AI for diagramming leveraging mermaid 
- Creating ai agents for complex data structures (context of UAD 3.6 or some other large complex data structure)
- Call Transcription (multiple) as input for capturing to do list, action items, etc.
- GraphDB Applications for visualizing competitive analysis
	- Use to visualize all diagrams
	- Write [GraphML](https://yworks.github.io/yfiles-jupyter-graphs/02_graph_widget/#notes) to define the graph structure I see [ChatGPT](https://chatgpt.com/share/67bd094e-6bd8-8009-9457-941dd4e60d11) 

---

## 📋 Templates

Comprehensive templates for product management, development, and operations workflows. All templates are located in the `/templates/` directory.

### Backlog Templates (`/templates/backlog/`)
- ✅ **User Story Template** - Structured format with acceptance criteria, DoD, and testing notes
- ✅ **Bug Report Template** - Detailed bug reporting with reproduction steps and resolution tracking  
- ✅ **Task Template** - Technical task documentation with clear deliverables and progress tracking
- ✅ **Epic & Feature Template** - High-level feature planning with business context and implementation phases

### Operations Templates (`/templates/operations/`)
- ✅ **Disaster Recovery Plan** - Complete DR procedures with team organization and recovery phases
- ✅ **Technology Responsibility Matrix (RACI)** - Comprehensive role and responsibility mapping
- ✅ **Escalation Policy Plan** - Incident management escalation with severity levels and communication
- ✅ **Cloud Blueprint Template** - Infrastructure architecture documentation and specifications

### Testing Templates (`/templates/testing/`)
- ✅ **Test Plan Template** - Comprehensive test planning with risk assessment, team organization, and success criteria

### Product Templates (`/templates/product/`)
- ✅ **User Journey Template** - Complete user experience mapping with touchpoints, pain points, and opportunities
- ✅ **Competitive Analysis Template** - In-depth competitor analysis with feature comparison matrices and strategic insights

### Using the Templates
Each template includes:
- **Clear structure** with predefined sections and guidance
- **Fill-in placeholders** `[like this]` for easy customization
- **Best practices** and examples embedded throughout  
- **Cross-references** to related templates for integrated workflows
- **Professional formatting** ready for stakeholder review

Simply copy any template, customize the placeholders for your specific use case, and adapt sections as needed for your organization.





