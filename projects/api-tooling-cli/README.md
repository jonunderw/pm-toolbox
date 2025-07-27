# apitool-cli

A comprehensive Node.js CLI tool for API credential management and OpenAPI specification tooling.

## 🚀 Features

### 🔐 Encrypted API Credential Manager
- **Secure Storage**: Credentials are encrypted using AES-256-CBC with machine-specific keys
- **Comprehensive Management**: Add, list, view, update, and delete API credentials
- **Rich Metadata**: Store API costs, renewal types, credential types, and descriptions
- **Export/Import**: Backup and restore credentials with optional key inclusion

### 📘 OpenAPI Parser & Tooling
- **Field Analysis**: Find required and optional fields across all endpoints
- **Tag-based Filtering**: Locate endpoints by OpenAPI tags
- **Specification Diff**: Compare two OpenAPI specs to identify changes
- **Mock Data Generation**: Create realistic mock data based on schemas
- **Documentation Generation**: Convert specs to readable Markdown
- **Mermaid Diagrams**: Generate flowcharts, sequence diagrams, and dependency graphs

## 🛠 Installation

```bash
cd /Users/junderwood/Workspaces/Repos/pm-toolbox/projects/api-tooling-cli
npm install
chmod +x bin/apitool.js

# Optional: Link for global usage
npm link
```

## 📋 Usage

### Credential Management

```bash
# Add a new API credential (interactive)
apitool creds add

# Add credential with flags
apitool creds add -n "GitHub" -k "ghp_xxxxxxxxxxxx" -t "bearer" -r "annual"

# List all credentials
apitool creds list

# List with detailed information
apitool creds list --verbose

# View specific credential
apitool creds view "GitHub"

# View with actual API key (use carefully!)
apitool creds view "GitHub" --show-key

# Update credential
apitool creds update "GitHub"

# Delete credential
apitool creds delete "GitHub"

# Delete without confirmation
apitool creds delete "GitHub" --force
```

### OpenAPI Tooling

```bash
# Find endpoints with required fields
apitool openapi required-fields --field userId --file ./openapi-samples/petstore.json

# Find endpoints with optional fields
apitool openapi optional-fields --field email --file ./openapi-samples/petstore.json

# Find endpoints by tag
apitool openapi by-tag --tag "pets" --file ./openapi-samples/petstore.json

# Compare two OpenAPI specifications
apitool openapi diff --file1 ./spec-v1.json --file2 ./spec-v2.json

# Generate mock data for an operation
apitool openapi mock --operationId getPets --file ./openapi-samples/petstore.json

# Generate multiple mock records
apitool openapi mock --operationId createUser --file ./spec.json --count 5

# Generate Mermaid flowchart diagram
apitool openapi mermaid --operationId getPets --file ./openapi-samples/petstore.json

# Generate sequence diagram
apitool openapi mermaid --operationId createPet --file ./spec.json --type sequence

# Generate Markdown documentation
apitool openapi markdown --file ./openapi-samples/petstore.json

# Generate detailed documentation with examples
apitool openapi markdown --file ./spec.json --template detailed --include-examples

# List all operations in a spec
apitool openapi list --file ./openapi-samples/petstore.json
```

## 📁 Project Structure

```
apitool-cli/
├── bin/
│   └── apitool.js              # CLI entry point with commander setup
├── commands/
│   ├── credentials.js          # Credential management commands
│   └── openapi.js              # OpenAPI tooling commands
├── lib/
│   ├── storage.js              # Secure credential storage with encryption
│   ├── openapiParser.js        # OpenAPI parsing and analysis
│   ├── mermaidGenerator.js     # Mermaid diagram generation
│   └── markdownGenerator.js    # Markdown documentation generation
├── utils/
│   └── encryption.js           # Encryption utilities and helpers
├── openapi-samples/
│   └── petstore.json           # Sample OpenAPI specification
├── package.json                # Project configuration and dependencies
└── README.md                   # This file
```

## 🔐 Security Features

### Credential Encryption
- **Machine-specific keys**: Encryption keys derived from hostname, username, and platform
- **AES-256-CBC encryption**: Industry-standard encryption algorithm
- **Secure file permissions**: Credential files protected with 600 permissions
- **Timing-safe comparisons**: Prevent timing attacks during authentication

### Data Protection
- **Masked display**: Sensitive data shown with masking by default
- **Secure deletion**: Proper cleanup of sensitive data in memory
- **HMAC signatures**: Data integrity verification
- **UUID generation**: Cryptographically secure identifiers

## 🎨 Output Formats

### Table Format (Default)
Clean, formatted tables for terminal viewing with color coding and proper alignment.

### JSON Format
Machine-readable JSON output for integration with other tools and scripts.

### Mermaid Diagrams
- **Flowcharts**: Visualize API operation flows and dependencies
- **Sequence Diagrams**: Show request/response interactions
- **Graph Diagrams**: Display API relationship networks

### Markdown Documentation
- **Default Template**: Clean, organized documentation
- **Detailed Template**: Comprehensive docs with data models
- **Compact Template**: Quick reference format

## 📊 OpenAPI Analysis Capabilities

### Field Analysis
- **Required Fields**: Find all endpoints requiring specific fields
- **Optional Fields**: Locate optional field usage across the API
- **Schema Traversal**: Deep inspection of nested object properties
- **Parameter Analysis**: Query, path, header, and body parameter detection

### Specification Comparison
- **Endpoint Diff**: Identify added, removed, and modified endpoints
- **Schema Changes**: Detect structural changes in data models
- **Breaking Changes**: Highlight potentially breaking API changes
- **Change Summaries**: Organized reports of specification differences

### Mock Data Generation
- **Schema-based**: Generate data matching OpenAPI schemas
- **Realistic Data**: Use Faker.js for believable mock values
- **Type Support**: Handle strings, numbers, booleans, arrays, and objects
- **Format Recognition**: Special handling for emails, UUIDs, dates, and URLs

## 🔧 Configuration

### Credential Storage
Credentials are stored in `~/.apitool/credentials.enc` with metadata in `~/.apitool/metadata.json`. The storage directory is created automatically with secure permissions.

### Supported Credential Types
- **API Key**: Simple API key authentication
- **Bearer Token**: JWT or other bearer token authentication  
- **Secret**: Shared secrets and private keys
- **Basic**: Username/password combinations

### Renewal Types
- **Monthly**: Recurring monthly billing
- **Annual**: Yearly renewal cycle
- **Lifetime**: One-time purchase
- **Unknown**: Unspecified renewal terms

## 🚦 Error Handling

The CLI provides comprehensive error handling with:
- **Detailed error messages**: Clear descriptions of what went wrong
- **Validation feedback**: Input validation with helpful suggestions
- **File access errors**: Graceful handling of missing or inaccessible files
- **Network timeouts**: Robust handling of external service calls
- **Graceful degradation**: Fallback behaviors when optional features fail

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check existing documentation and examples
- Review the OpenAPI samples for usage patterns

## 🗺 Roadmap

- [ ] Web UI for credential management
- [ ] Integration with popular API testing tools
- [ ] Postman collection generation
- [ ] API performance testing features
- [ ] Team credential sharing capabilities
- [ ] Cloud credential synchronization
- [ ] Advanced schema validation
- [ ] API versioning analysis tools
