# CLAUDE.md - Civica Project Intelligence

This file provides essential context for Claude agents working on the Civica project. It references and coordinates all project documentation to ensure consistent, high-quality development.

## 🎯 Project Overview

**Civica** is a civic engagement platform for Romanian citizens to collectively pressure local authorities through coordinated email campaigns. This is a **FRONTEND-ONLY** Angular application using NgRx for state management and NG-ZORRO (Ant Design) for UI components.

### New Features (December 2024)
- **User Registration System** with Google OAuth and email/password options
- **Issue Creation Workflow** where registered users can report civic issues
- **AI-Enhanced Descriptions** (mocked) for issue text generation
- **Gamification System** with points, badges, and achievements
- **Admin Approval Interface** for issue moderation

## 📁 Critical Documentation Structure

**ALWAYS consult these files in order:**

1. **`docs/project/Implementation.md`** - Mandatory implementation standards and rules
2. **`docs/design/ux.md`** - User journey specifications and flow requirements  
3. **`docs/design/Colour-Scheme.md`** - Color palette with CSS/SCSS variables
4. **`docs/design/Typography-Guide.md`** - Fira Sans implementation standards
5. **`docs/guides/Super_Claude_Docs.md`** - SuperClaude framework usage guide

**Additional Technical Docs:**
- **`docs/technical/GOOGLE_MAPS_SECURITY.md`** - Maps API security
- **`docs/technical/README_GOOGLE_MAPS.md`** - Maps integration guide
- **`docs/README.md`** - Documentation structure overview

**New Feature Documentation:**
- **`docs/design/user-registration-ux-research.md`** - UX research for user system
- **`docs/design/user-registration-ui-design.md`** - UI specifications for new features
- **`docs/IMPLEMENTATION-UPDATE.md`** - Implementation details for December 2024 update

### Documentation Update Protocol

When making significant changes:
1. Update relevant documentation IMMEDIATELY
2. Keep all docs synchronized with code changes
3. Use Task tool to track documentation updates
4. Validate documentation accuracy before committing

## 🚦 Development Workflow with Agents

### Primary Agents for Civica Development

```yaml
frontend-developer:
  Purpose: "Build UI components with NG-ZORRO"
  Use for: Component implementation, responsive design, Angular patterns
  
ui-designer:
  Purpose: "Design system consistency and visual polish"
  Use for: Component styling, theme application, visual hierarchy
  
ux-researcher:
  Purpose: "Validate implementations against ux.md"
  Use for: User flow validation, usability testing, UX compliance
  
backend-architect:
  Purpose: "Design mock services and data models"
  Use for: Service architecture, TypeScript interfaces, state design
  
test-writer-fixer:
  Purpose: "Comprehensive test coverage"
  Use for: Unit tests, integration tests, E2E tests
  
rapid-prototyper:
  Purpose: "Quick MVP features and experiments"
  Use for: New feature scaffolding, proof of concepts
  
brand-guardian:
  Purpose: "Ensure Civica brand consistency"
  Use for: Color compliance, typography standards, visual identity
```

### Supporting Agents

```yaml
mobile-app-builder:
  Use for: Mobile-specific optimizations, touch interactions
  
performance-benchmarker:
  Use for: Load time optimization, bundle size reduction
  
workflow-optimizer:
  Use for: Improving development processes, CI/CD setup
  
visual-storyteller:
  Use for: Creating compelling issue narratives, UI copy
  
whimsy-injector:
  Use for: Adding delightful micro-interactions, polish
```

### Example Multi-Agent Workflows

#### New Feature Implementation
```bash
# Complex feature requiring multiple agents
"Implement issue detail page with gallery and email modal:
- Use ui-designer agent to create visual designs
- Use frontend-developer agent to implement components
- Use ux-researcher agent to validate against ux.md
- Use test-writer-fixer agent for test coverage
- Use brand-guardian agent to ensure color/typography compliance
Run these in parallel where possible"
```

#### UI Polish Pass
```bash
# Improving existing UI
"Polish the issues list page:
- Use visual-storyteller agent to improve issue card narratives
- Use whimsy-injector agent to add hover effects and transitions
- Use performance-benchmarker agent to ensure smooth animations
- Use mobile-app-builder agent to optimize touch targets"
```

## 🎨 Design System Enforcement

### Color Usage (from Colour-Scheme.md)
```scss
// MANDATORY color variables
--oxford-blue: #14213D;  // Headers, navigation, trust
--orange-web: #FCA311;   // CTAs, urgency, email counters
--platinum: #E5E5E5;     // Backgrounds, borders
--white: #FFFFFF;        // Cards, surfaces
```

### Typography (from Typography-Guide.md)
```scss
// MANDATORY font implementation
--font-primary: "Fira Sans", sans-serif;
// Weights: 400 (body), 500 (nav), 600 (headers), 700 (h1), 800 (counters)
```

### Component Library
**MUST use NG-ZORRO components** - No custom components unless absolutely necessary:
- `nz-select` for dropdowns
- `nz-card` for issue cards
- `nz-modal` for email templates
- `nz-button` for all buttons
- `nz-form` for all forms

## 🏗️ Project Architecture

### Current Structure
```
src/app/
├── components/        # UI components (NG-ZORRO based)
│   ├── auth/         # Registration, login components
│   ├── user/         # User dashboard with gamification
│   ├── issue-creation/ # Multi-step issue creation wizard
│   ├── admin/        # Admin approval interface
│   └── ...existing components
├── services/         # Mock data services ONLY
│   ├── mock-auth.service.ts    # JWT authentication (mock)
│   ├── mock-user.service.ts    # User profile & gamification
│   ├── mock-issue-creation.service.ts # Issue creation with AI
│   ├── mock-admin.service.ts   # Admin workflows
│   └── ...existing services
├── store/           # NgRx state management
│   ├── auth/        # Authentication state
│   ├── user/        # User profile & gamification state
│   ├── issues/      # Enhanced issue state
│   ├── location/    # Location state
│   └── ui/          # UI state
└── config/          # Mock configuration
```

### State Management
- **NgRx** for all state management
- **Effects** for side effects and async operations
- **Selectors** for computed state
- **Actions** follow pattern: `[Source] Event`

## ⚠️ Critical Rules

### FRONTEND ONLY
- ❌ NO backend implementation
- ❌ NO real API calls
- ❌ NO authentication (mock only - JWT simulation in localStorage)
- ❌ NO database connections
- ✅ ALL data from mock services
- ✅ Hardcoded location data (Bucharest, Sector 5)
- ✅ Mock AI text generation for issue descriptions
- ✅ LocalStorage for data persistence in development

### Implementation Standards
1. **Read documentation BEFORE coding**
2. **Use NG-ZORRO components exclusively**
3. **Apply Civica theme to ALL components**
4. **Follow ux.md user journey exactly**
5. **Test with Romanian text (diacritics)**

## 🔧 Agent-Specific Instructions

### For frontend-developer Agent
- Focus on NG-ZORRO component implementation
- Apply Civica theme from Colour-Scheme.md
- Implement Fira Sans from Typography-Guide.md
- Create responsive, mobile-first designs
- Follow Angular best practices and conventions

### For ui-designer Agent
- Design components that align with Civica brand
- Create consistent hover states and interactions
- Ensure visual hierarchy supports user goals
- Design for both desktop and mobile viewports

### For backend-architect Agent
- Design mock services with proper TypeScript interfaces
- Simulate realistic API delays (300-700ms)
- Structure data models for future backend integration
- NO real API implementations

### For test-writer-fixer Agent
- Test NG-ZORRO component integration
- Validate color and typography application
- Test mock service functionality
- Ensure Romanian diacritics display correctly
- Write E2E tests for complete user journeys

### For ux-researcher Agent
- Validate all implementations against ux.md
- Ensure user journey flows correctly
- Check mobile responsiveness
- Verify email counter prominence
- Test 3-minute goal for email sending

### For brand-guardian Agent
- Enforce color palette from Colour-Scheme.md
- Validate typography from Typography-Guide.md
- Ensure consistent visual language
- Check logo and brand asset usage

### For rapid-prototyper Agent
- Quickly scaffold new features
- Create proof of concepts for user testing
- Build MVPs following documentation
- Focus on core functionality first

## 📋 Common Tasks & Solutions

### Creating a New Component
```typescript
// ALWAYS:
1. Check ux.md for requirements
2. Import NG-ZORRO modules
3. Apply Civica theme classes
4. Use mock data service
5. Add proper TypeScript types
```

### Styling Components
```scss
// ALWAYS use CSS variables
.component {
  color: var(--oxford-blue);
  background: var(--white);
  
  .cta-button {
    background: var(--orange-web);
    font-weight: 600;
    text-transform: uppercase;
  }
}
```

### Mock Data Pattern
```typescript
// All services MUST follow this pattern
getIssues(): Observable<Issue[]> {
  return of(this.mockIssues).pipe(
    delay(500), // Simulate network delay
    tap(() => console.log('[MOCK] Issues fetched'))
  );
}
```

## 🚀 Quick Command Reference

```bash
# Analyze codebase with documentation
/analyze @docs/project/Implementation.md @docs/design/ux.md --comprehensive --c7

# Build new features with appropriate agent
"Use frontend-developer agent to implement issue cards with NG-ZORRO"

# UI design tasks
"Use ui-designer agent to create consistent hover states for all interactive elements"

# Test implementation
"Use test-writer-fixer agent to add E2E tests for email sending flow"

# Brand compliance check
"Use brand-guardian agent to audit color and typography usage"

# Performance optimization
"Use performance-benchmarker agent to optimize initial load time"
```

### New Feature Routes
- `/auth/register` - Registration gateway
- `/auth/login` - Login page
- `/dashboard` - User dashboard (protected)
- `/create-issue` - Issue creation wizard (protected)
- `/admin/approval` - Admin interface

### Test Credentials
- Email: `test@civica.ro`
- Password: `password123`

### Mock Service Patterns
All new mock services follow the same pattern with:
- 300-700ms simulated delays
- LocalStorage for persistence
- Console logging with `[MOCK]` prefix
- Realistic data structures matching planned backend

## 📊 Success Metrics

Before marking ANY task complete, verify:
- [ ] Colors match Colour-Scheme.md exactly
- [ ] Typography follows Typography-Guide.md
- [ ] User flow matches ux.md specifications
- [ ] All UI uses NG-ZORRO components
- [ ] Mobile view is optimized
- [ ] Email counter is prominently styled (large, orange)
- [ ] Mock data services are properly typed
- [ ] No real API calls exist
- [ ] 3-minute email sending goal is achievable
- [ ] Romanian diacritics display correctly
- [ ] Documentation is updated if needed

## 🎯 User Journey Implementation Checklist

### Original Flows (Anonymous Users)

1. **Entry & Location Selection**
   - [ ] Pre-selected Bucharest, Sector 5
   - [ ] Clean, simple interface
   - [ ] Clear Continue button

2. **Issues Discovery**
   - [ ] Issue cards with photos
   - [ ] Email counter prominent
   - [ ] Sort/filter functionality
   - [ ] Hover effects on cards

3. **Issue Detail View**
   - [ ] Photo gallery (main + thumbnails)
   - [ ] Interactive map
   - [ ] Full description sections
   - [ ] Statistics bar with email count
   - [ ] Authority buttons

4. **Email Generation**
   - [ ] Modal with user input fields
   - [ ] Pre-filled email template
   - [ ] Copy buttons for each section
   - [ ] Clear instructions

5. **Post-Email Actions**
   - [ ] Success feedback
   - [ ] Email counter updates
   - [ ] Option to contact another authority

### New Flows (Registered Users)

6. **User Registration**
   - [ ] Google OAuth integration (mocked)
   - [ ] Email/password registration form
   - [ ] Progressive profiling
   - [ ] Welcome flow with gamification intro

7. **User Dashboard**
   - [ ] Gamification stats (points, level, badges)
   - [ ] Recent activity
   - [ ] Quick actions for issue creation
   - [ ] Achievement progress

8. **Issue Creation (4-step wizard)**
   - [ ] Issue type selection with icons
   - [ ] Photo upload with AI guidance
   - [ ] AI-enhanced description generation
   - [ ] Location confirmation and review

9. **Admin Approval**
   - [ ] Pending issues queue
   - [ ] Detailed review interface
   - [ ] Approve/reject/request changes flow
   - [ ] Template responses

## 🔄 Continuous Improvement

This CLAUDE.md file should be updated whenever:
- New patterns or conventions are established
- Documentation structure changes
- New agent workflows are discovered
- Common issues or solutions are identified

**Remember**: This file is the single source of truth for all Claude agents working on Civica. Keep it accurate and up-to-date!