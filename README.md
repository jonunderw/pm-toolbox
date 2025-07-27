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

## Templates 

### Backlog Templates
- User Story Template
- Bug Template
- Task Template
- Epic & Feature Template


### Operation Templates
- Disaster Recovery Plan
- Incident Management - Technology Responsiblity Matrix
- Incident Management - Escalation Policy Plan
- Cloud Blueprint Templates
- Capacity Planning Template

### Testing Templates
- Test Plan
- Test Case
- Traceability Matrix



### Product Templates
- UCD Practices Templates
    - Stakeholder Mapping
    - Opportunity Mapping
    - Problem Statements
    - Risk & Mitigation Mapping
    - User Feedback Session Script
    - User Feedback Session Synthesis
    - Inception 
    - Outcome Oriented Roadmap
    - Affinity Mapping 
    - Effort Value Matrix (Prioritization) (IDEATE)
    - Crazy 8s - (IDEATE)
    - User Journey
- Gap Analysis Template
- Competitive Analysis Template
- Product Reporting Template (CSV)
- User Feedback Collection & Synthesis Templates





