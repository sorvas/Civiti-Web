# Civica Documentation Structure

This folder contains all project documentation organized by category. **All documentation must be kept synchronized with code changes.**

## 📁 Folder Structure

### `/project` - Project Requirements & Standards
- **`Implementation.md`** - Mandatory implementation standards, NG-ZORRO usage, mock data patterns
  - Frontend-only rules
  - Component implementation guidelines
  - Mock service patterns

### `/design` - Design System & UX
- **`ux.md`** - User journey, flow specifications, interaction patterns
  - 5-step user flow
  - Component requirements
  - Success metrics
- **`Colour-Scheme.md`** - Official color palette, CSS variables, usage guidelines
  - Oxford Blue, Orange Web, Platinum, White
  - Accessibility considerations
- **`Typography-Guide.md`** - Fira Sans implementation, type scale, component typography
  - Font weights and sizes
  - Component-specific typography

### `/technical` - Technical Documentation
- **`GOOGLE_MAPS_SECURITY.md`** - Google Maps API security implementation
- **`README_GOOGLE_MAPS.md`** - Google Maps integration guide

### `/guides` - Development Guides
- **`Super_Claude_Docs.md`** - SuperClaude framework usage, commands, personas, MCP servers

## 📋 Documentation Maintenance Protocol

### When Adding New Documentation
1. Place in appropriate subfolder
2. Update this README with description
3. Update CLAUDE.md with new file reference
4. Commit with clear message: "docs: Add [topic] documentation"

### When Updating Documentation
1. Make changes in the appropriate file
2. Update any dependent documentation
3. Verify all cross-references are accurate
4. Commit with: "docs: Update [file] - [what changed]"

### Documentation Review Checklist
- [ ] All code examples are current
- [ ] File paths are accurate
- [ ] Cross-references work
- [ ] No conflicting information
- [ ] Examples use current project structure

## 🔗 Quick Links

**Start Here:**
1. Read `/project/Implementation.md` for development rules
2. Review `/design/ux.md` for user flow
3. Check `/design/Colour-Scheme.md` and `/design/Typography-Guide.md` for styling

**For Claude Agents:**
- CLAUDE.md (in project root) is the main entry point
- This folder provides detailed specifications
- Always verify against these docs before implementing

## 🚨 Important Notes

- **These docs are MANDATORY** - not suggestions
- **Frontend-only** - no backend implementation
- **NG-ZORRO components** - no custom UI components
- **Mock data only** - no real API calls
- **Keep synchronized** - update docs when code changes