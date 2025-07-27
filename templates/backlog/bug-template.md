# Bug Report Template

## Bug Overview
**Bug ID**: [PROJ-####]  
**Title**: [Clear, descriptive title of the issue]  
**Priority**: [Critical/High/Medium/Low]  
**Severity**: [Blocker/Major/Minor/Trivial]  
**Status**: [New/In Progress/Testing/Resolved/Closed]  
**Reporter**: [Person who discovered the bug]  
**Assignee**: [Person responsible for fixing]  
**Date Reported**: [YYYY-MM-DD]  
**Environment**: [Production/Staging/Development]

---

## Bug Classification

### Bug Type
- [ ] **Functional** - Feature not working as expected
- [ ] **UI/UX** - Visual or user experience issue
- [ ] **Performance** - Slow response times or resource usage
- [ ] **Security** - Security vulnerability or concern
- [ ] **Data** - Data corruption, loss, or inconsistency
- [ ] **Integration** - Issues with external systems
- [ ] **Regression** - Previously working feature now broken

### Affected Components
- [ ] [Frontend/UI Component]
- [ ] [Backend Service/API]
- [ ] [Database]
- [ ] [Third-party Integration]
- [ ] [Mobile App]
- [ ] [Other: specify]

---

## Bug Description

### Summary
[Brief description of what the bug is and its impact]

### Expected Behavior
[Describe what should happen when the feature works correctly]

### Actual Behavior
[Describe what actually happens - the buggy behavior]

### Impact Assessment
- **User Impact**: [How does this affect end users?]
- **Business Impact**: [What's the business consequence?]
- **Workaround Available**: [Yes/No - describe if yes]

---

## Reproduction Steps

### Prerequisites
- [ ] [Required user account type/permissions]
- [ ] [Specific data setup needed]
- [ ] [Browser/device requirements]
- [ ] [Network conditions]

### Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]
4. [Continue as needed...]

### Expected Result at Each Step
1. [What should happen in step 1]
2. [What should happen in step 2]
3. [What should happen in step 3]

### Actual Result
[What actually happens when following the steps]

---

## Environment Information

### Browser/Application
- **Browser**: [Chrome/Firefox/Safari/Edge] Version [X.X.X]
- **Operating System**: [Windows/macOS/Linux] Version [X.X]
- **Device**: [Desktop/Mobile/Tablet] [Specific model if mobile]
- **Screen Resolution**: [1920x1080, etc.]

### Application Environment
- **Application Version**: [Version number or build]
- **Environment**: [Production/Staging/Development]
- **URL**: [Specific page/endpoint where bug occurs]
- **User Account**: [Type of account - don't include credentials]

### Network/Infrastructure
- **Network**: [WiFi/Cellular/Ethernet]
- **Location**: [Geographic location if relevant]
- **Load Conditions**: [High/Medium/Low traffic]

---

## Evidence & Attachments

### Screenshots
- [ ] [Attach screenshot showing the issue]
- [ ] [Attach screenshot showing expected behavior if available]
- [ ] [Attach screenshot of error messages]

### Logs & Error Messages
```
[Paste relevant error messages, stack traces, or log entries here]
```

### Videos/Screen Recordings
- [ ] [Link to video showing bug reproduction]
- [ ] [Screen recording of expected vs actual behavior]

### Additional Files
- [ ] [Network logs/HAR files]
- [ ] [Database query results]
- [ ] [Configuration files (sanitized)]

---

## Technical Investigation

### Root Cause Analysis
- **Suspected Cause**: [Initial hypothesis about what's causing the bug]
- **Code Areas Affected**: [Specific files, functions, or modules]
- **Related Changes**: [Recent deployments or code changes that might be related]

### Investigation Notes
- [Technical findings during investigation]
- [Database queries run to investigate]
- [Log analysis results]

### Debug Information
```
[Relevant debug output, variable values, etc.]
```

---

## Fix Information

### Proposed Solution
[Description of how the bug should be fixed]

### Alternative Solutions
1. [Alternative approach 1]
2. [Alternative approach 2]

### Implementation Notes
- **Complexity**: [Simple/Medium/Complex]
- **Risk Level**: [Low/Medium/High]
- **Testing Required**: [Unit/Integration/Manual/All]

---

## Testing & Verification

### Test Cases to Verify Fix
1. [Test case 1 - main scenario]
2. [Test case 2 - edge cases]
3. [Test case 3 - regression testing]

### Regression Testing Areas
- [ ] [Related functionality to test]
- [ ] [Integration points to verify]
- [ ] [Performance impact assessment]

### Acceptance Criteria for Fix
- [ ] [Original bug scenario no longer occurs]
- [ ] [No new bugs introduced]
- [ ] [Performance not degraded]
- [ ] [All related functionality still works]

---

## Related Information

### Related Issues
- **Duplicate Bugs**: [Links to similar bug reports]
- **Related Bugs**: [Links to related issues]
- **Blocked By**: [Issues that must be resolved first]
- **Blocks**: [Issues that depend on this fix]

### Documentation
- **User Stories**: [Related user stories affected]
- **Requirements**: [Links to requirements documentation]
- **Design Specs**: [Links to design specifications]

---

## Communication & Updates

### Stakeholder Notification
- [ ] **Product Owner** notified
- [ ] **Development Team** assigned
- [ ] **QA Team** informed
- [ ] **Customer Support** updated (if customer-facing)
- [ ] **End Users** notified (if critical)

### Status Updates
| Date | Author | Update |
|------|--------|--------|
| YYYY-MM-DD | [Name] | [Status change or important update] |

---

## Resolution

### Fix Summary
[Brief description of how the bug was resolved]

### Code Changes
- **Files Modified**: [List of files changed]
- **Commit Hash**: [Git commit reference]
- **Pull Request**: [Link to PR]

### Deployment Information
- **Deployed To**: [Environment]
- **Deployment Date**: [YYYY-MM-DD]
- **Version**: [Release version]

### Verification Results
- [ ] Fix verified in development
- [ ] Fix verified in staging
- [ ] Fix verified in production
- [ ] Regression testing completed
- [ ] Performance impact assessed

---

## Post-Resolution

### Lessons Learned
- [What can be learned from this bug?]
- [How can similar bugs be prevented?]
- [Process improvements needed?]

### Follow-up Actions
- [ ] [Additional monitoring needed]
- [ ] [Documentation updates required]
- [ ] [Process changes to implement]
- [ ] [Additional test cases to add]

---

*Template Version: 1.0 | Last Updated: [Date]*
