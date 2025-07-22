#!/bin/bash

ROOT_DIR="pm-toolbox"

echo "Creating $ROOT_DIR directory structure..."

# Base folders
mkdir -p $ROOT_DIR/{scripts,.github/workflows,shared/{utils,prompts,samples},docs}

# Project domains
mkdir -p $ROOT_DIR/projects/{
  deployment-tooling,       # Release notes/test plans/test data from JIRA
  wireframe-tooling,      # AI-based wireframes & full-stack user stories
  product-analytics,           # AI with product analytics
  diagram-tooling,            # Mermaid + AI  
  openapi-tooling,         # OpenAPI JSON + GenAI for API dev lifecycle
  slackbot-km-tooling,       # SlackBot Interface with Knowledge Management 
  transcription-to-actions
  graphdb-tooling,         # Competitive analysis with GraphDB
}

# Docs and workflows
touch $ROOT_DIR/README.md
touch $ROOT_DIR/scripts/setup.sh
touch $ROOT_DIR/.github/workflows/ci.yml
touch $ROOT_DIR/docs/{CONTRIBUTING.md,project-setup.md}

# Deployment GenAI Tooling
mkdir -p $ROOT_DIR/projects/deployment-tooling/{src,data}
touch $ROOT_DIR/projects/deployment-tooling/{README.md,jira_export_sample.json}

# Wireframe/User Story Generator
mkdir -p $ROOT_DIR/projects/wireframe-tooling/{src,examples}
touch $ROOT_DIR/projects/wireframe-tooling/{README.md,prompt-guide.md}

# Pendo Analytics + AI
mkdir -p $ROOT_DIR/projects/product-analytics/src
touch $ROOT_DIR/projects/product-analytics/{README.md,pendo_sample_data.json}

# AI Diagramming with Mermaid
mkdir -p $ROOT_DIR/projects/diagram-tooling/diagrams
touch $ROOT_DIR/projects/diagram-tooling/{README.md,sample.mmd}

# OpenAPI + GenAI Tooling
mkdir -p $ROOT_DIR/projects/openapi-tooling/{specs,scripts}
touch $ROOT_DIR/projects/openapi-tooling/{README.md,example_openapi.json}

# SlackBot Interface with Knowledge Management Source
mkdir -p $ROOT_DIR/projects/slackbot-km-tooling/{src,examples}
touch $ROOT_DIR/projects/slackbot-km-tooling/{README.md,prompt-guide.md}

# Transcription to Actions
mkdir -p $ROOT_DIR/projects/transcription-to-actions/{samples,processors}
touch $ROOT_DIR/projects/transcription-to-actions/{README.md,example_transcript.txt}

# GraphDB Visualizer
mkdir -p $ROOT_DIR/projects/graphdb-tooling/{graphml,queries}
touch $ROOT_DIR/projects/graphdb-tooling/{README.md,competitive_landscape.graphml}

echo "✅ Project structure for $ROOT_DIR created successfully!"
