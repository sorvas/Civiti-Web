# Civica Implementation Guide

## 🚨 CRITICAL: Agent Implementation Rules

This guide establishes mandatory implementation standards for the Civica **FRONTEND APPLICATION**. The agent MUST constantly reference and adhere to ALL project documentation files during development.

### **⚠️ FRONTEND ONLY - NO BACKEND IMPLEMENTATION**
- This is strictly a frontend Angular application
- Backend API will be developed separately
- ALL data MUST use mock services until API is ready
- NO real API endpoints or database connections
- NO authentication implementation (mock only)

---

## 📋 Required Documentation References

### **ALWAYS CONSULT THESE FILES:**
1. **`ux.md`** - User journey and flow specifications
2. **`Colour-Scheme.md`** - Color palette and usage guidelines
3. **`Typography-Guide.md`** - Fira Sans implementation standards
4. **`Super_Claude_Docs.md`** - Development methodology and MCP usage

### **Implementation Priority Order:**
```yaml
1. Check UX.md → Understand user flow
2. Apply Colour-Scheme.md → Use correct colors
3. Follow Typography-Guide.md → Implement Fira Sans
4. Use NG-ZORRO components → Modern UI components
```

---

## 🛠️ NG-ZORRO (Ant Design) Component Usage

### **MANDATORY: Use NG-ZORRO Components**

The agent MUST use NG-ZORRO (ng-zorro-antd) for ALL UI components. This provides modern, enterprise-grade components with better form handling and flexibility.

### **Installation and Setup**

```bash
# Install NG-ZORRO
ng add ng-zorro-antd

# During installation, select:
# - Custom theme: Yes (we'll use Civica colors)
# - Set up icon assets: Yes
# - Set up custom theme file: Yes
# - Choose template: Blank (we'll customize)
```

### **Module Import Pattern**

```typescript
// Import only what you need (tree-shakeable)
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';
```

### **Component Mapping for Civica**

```yaml
Location Selection (Page 1):
  - Use: nz-select
  - Reference: ux.md → "Entry & Location Selection"
  - Colors: Oxford Blue labels, Orange focus states
  
Issues List (Page 2):
  - Use: nz-card (with nz-grid)
  - Reference: ux.md → "Issues Discovery"
  - Include: nz-tag for email counter
  - Typography: Follow Typography-Guide.md for card titles
  
Issue Detail (Page 3):
  - Use: nz-card with nz-collapse
  - Reference: ux.md → "Issue Detail View"
  - Gallery: nz-carousel or custom gallery
  - Map: Embed within nz-card
  
Email Modal:
  - Use: nz-modal
  - Reference: ux.md → "Email Template Modal"
  - Forms: nz-form with nz-input
  - Buttons: nz-button (type="primary" for Orange CTAs)
```

### **Component Customization Rules**

```scss
// ALWAYS apply Civica theming to NG-ZORRO components
@import 'ng-zorro-antd/ng-zorro-antd.less';

// Example: Customizing nz-card for issue cards
.issue-card {
  // Reference: Colour-Scheme.md
  background-color: var(--white);
  border: 1px solid var(--platinum);
  
  // Reference: Typography-Guide.md
  .ant-card-head-title {
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: var(--text-xl);
    color: var(--oxford-blue);
  }
  
  // Email counter styling
  .email-counter {
    .count {
      color: var(--orange-web);
      font-weight: 800;
      font-size: var(--text-2xl);
    }
  }
}
```

---

## 🎨 Theme Implementation

### **Civica NG-ZORRO Theme Configuration**

```less
// src/styles/civica-theme.less
// MUST reference Colour-Scheme.md for all color values

// NG-ZORRO theme variables
@primary-color: #FCA311; // Orange Web from Colour-Scheme.md
@info-color: #14213D; // Oxford Blue from Colour-Scheme.md
@success-color: #28A745;
@warning-color: #FCA311;
@error-color: #DC3545;
@font-family: "Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
@body-background: #E5E5E5; // Platinum from Colour-Scheme.md
@component-background: #FFFFFF; // White from Colour-Scheme.md
@heading-color: #14213D; // Oxford Blue
@text-color: #14213D; // Oxford Blue
@text-color-secondary: rgba(20, 33, 61, 0.8);
@border-color-base: #E5E5E5; // Platinum
@border-radius-base: 8px;

// Button specific
@btn-primary-bg: #FCA311; // Orange Web
@btn-primary-color: #FFFFFF;
@btn-default-bg: #FFFFFF;
@btn-default-color: #14213D;
@btn-default-border: #E5E5E5;

// Input specific
@input-border-color: #E5E5E5;
@input-hover-border-color: #14213D;
@input-focus-border-color: #FCA311;
@input-placeholder-color: rgba(20, 33, 61, 0.6);

// Card specific
@card-shadow: 0 2px 8px rgba(20, 33, 61, 0.1);
@card-hover-shadow: 0 8px 24px rgba(20, 33, 61, 0.1);

// Typography scale from Typography-Guide.md
@font-size-base: 16px;
@font-size-sm: 14px;
@font-size-lg: 18px;
@heading-1-size: 48px;
@heading-2-size: 36px;
@heading-3-size: 30px;
@heading-4-size: 24px;
@heading-5-size: 20px;
```

### **CSS Variables Integration**

```scss
// src/styles/ng-zorro-civica.scss
// Apply Civica CSS variables to NG-ZORRO

:root {
  // Override NG-ZORRO CSS variables
  --ant-primary-color: var(--orange-web);
  --ant-info-color: var(--oxford-blue);
  --ant-text-color: var(--oxford-blue);
  --ant-border-color: var(--platinum);
  --ant-component-background: var(--white);
}

// NG-ZORRO component overrides
.ant-btn-primary {
  background-color: var(--orange-web);
  border-color: var(--orange-web);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  
  &:hover, &:focus {
    background: var(--gradient-cta);
    border-color: var(--orange-web);
  }
}

.ant-card {
  box-shadow: 0 2px 8px rgba(20, 33, 61, 0.1);
  
  &:hover {
    box-shadow: 0 8px 24px rgba(20, 33, 61, 0.1);
  }
}

.ant-form-item-label > label {
  color: var(--oxford-blue);
  font-weight: 600;
}

.ant-input {
  font-family: var(--font-primary);
  color: var(--oxford-blue);
  
  &::placeholder {
    color: rgba(20, 33, 61, 0.6);
  }
}
```

---

## 🔤 Typography Implementation

### **MUST Follow Typography-Guide.md**

```scss
// src/styles/typography.scss
// Import Fira Sans as specified in Typography-Guide.md

@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;800&display=swap');

// Apply typography scale from Typography-Guide.md
:root {
  --font-primary: "Fira Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  // Size scale from Typography-Guide.md
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
}

// Apply to NG-ZORRO components
.ant-typography {
  font-family: var(--font-primary);
}

// Email counter specific styling (from Typography-Guide.md)
.email-counter-number {
  font-size: var(--text-5xl);
  font-weight: 800;
  color: var(--orange-web);
}
```

---

## 📱 User Journey Implementation

### **STRICT ADHERENCE to ux.md**

```typescript
// Route structure MUST match ux.md user journey
const routes: Routes = [
  {
    path: '',
    redirectTo: '/location',
    pathMatch: 'full'
  },
  {
    path: 'location',
    component: LocationSelectionComponent, // Page 1 from ux.md
    data: { animation: 'LocationPage' }
  },
  {
    path: 'issues',
    component: IssuesListComponent, // Page 2 from ux.md
    data: { animation: 'IssuesPage' }
  },
  {
    path: 'issue/:id',
    component: IssueDetailComponent, // Page 3 from ux.md
    data: { animation: 'DetailPage' }
  }
];
```

### **Component Implementation Checklist**

#### **LocationSelectionComponent**
- [ ] Use nz-select for dropdowns
- [ ] Pre-populate with hardcoded values (Bucharest, Sector 5)
- [ ] Apply Oxford Blue labels, Orange focus states
- [ ] Continue button uses nz-button type="primary" (Orange)

#### **IssuesListComponent**
- [ ] Use nz-card with nz-grid/nz-row/nz-col
- [ ] Show email counter with nz-tag (Orange color from Typography-Guide.md)
- [ ] Implement sort/filter as nz-select
- [ ] Hover effects from Colour-Scheme.md

#### **IssueDetailComponent**
- [ ] Gallery using nz-carousel or GLightbox integration
- [ ] Statistics bar with Orange email counter
- [ ] Authority buttons with Oxford Blue background
- [ ] Email modal using nz-modal

#### **EmailTemplateModal**
- [ ] Form fields using nz-form with nz-input
- [ ] Copy buttons with nz-icon
- [ ] Template formatting from ux.md
- [ ] Success notification using nz-message service

---

## 🚀 Development Workflow

### **EVERY Component Creation:**

1. **Check ux.md** for user flow requirements
2. **Use NG-ZORRO components** for consistent UI
3. **Apply colors** from Colour-Scheme.md
4. **Set typography** from Typography-Guide.md
5. **Test responsive** behavior (mobile-first)

### **NG-ZORRO Component Pattern:**

```typescript
// Example: Creating issue card component
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzGridModule } from 'ng-zorro-antd/grid';

// The agent MUST:
// 1. Use nz-card as base
// 2. Apply Civica theme colors
// 3. Implement email counter with nz-tag
// 4. Follow hover states from Colour-Scheme.md
```

---

## ⚠️ Common Implementation Mistakes to AVOID

### **DO NOT:**
- ❌ Create custom components when NG-ZORRO components exist
- ❌ Use default Ant Design colors (ALWAYS use Civica palette)
- ❌ Forget to apply Fira Sans typography
- ❌ Deviate from ux.md user journey flow
- ❌ Use pixel values instead of CSS variables
- ❌ Hardcode colors (use variables from Colour-Scheme.md)

### **ALWAYS:**
- ✅ Reference documentation files before implementing
- ✅ Use NG-ZORRO components for UI consistency
- ✅ Apply Civica theme to ALL components
- ✅ Test with Romanian text (diacritics)
- ✅ Ensure mobile responsiveness
- ✅ Follow email counter styling exactly

---

## 📊 Quality Checklist

Before ANY commit, verify:

- [ ] Colors match Colour-Scheme.md exactly
- [ ] Typography follows Typography-Guide.md
- [ ] User flow matches ux.md specifications
- [ ] All UI uses NG-ZORRO components
- [ ] Mobile view is optimized
- [ ] Email counter is prominently styled
- [ ] CTAs use Orange Web color
- [ ] Headers use Oxford Blue
- [ ] Mock data services are properly typed
- [ ] No real API calls exist

---

## 🔀 Mock Data Implementation

### **MANDATORY: All Data Must Be Mocked**

```typescript
// src/app/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Authority {
  id: string;
  name: string;
  email: string;
  type: 'primarie' | 'politie' | 'administratie' | 'other';
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  photos: string[];
  dateCreated: Date;
  status: 'open' | 'in-progress' | 'resolved';
  emailsSent: number;
  authorities: Authority[];
  currentSituation: string;
  desiredOutcome: string;
  communityImpact: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  
  // Mock issues for Sector 5
  private mockIssues: Issue[] = [
    {
      id: 'ISS-001',
      title: 'Trotuar deteriorat pe Strada Libertății',
      description: 'Trotuarul este grav deteriorat cu gropi mari care pun în pericol siguranța pietonilor.',
      location: {
        address: 'Strada Libertății nr. 45, Sector 5, București',
        lat: 44.4268,
        lng: 26.1025
      },
      photos: [
        '/assets/mock-images/issue-001-main.jpg',
        '/assets/mock-images/issue-001-detail1.jpg'
      ],
      dateCreated: new Date('2024-01-15'),
      status: 'open',
      emailsSent: 47,
      authorities: [
        {
          id: 'AUTH-001',
          name: 'Primăria Sector 5',
          email: 'contact@primarie5.ro',
          type: 'primarie'
        },
        {
          id: 'AUTH-002',
          name: 'Administrația Străzilor București',
          email: 'sesizari@asb.ro',
          type: 'administratie'
        }
      ],
      currentSituation: 'Trotuarul prezintă multiple gropi și fisuri care fac deplasarea periculoasă.',
      desiredOutcome: 'Refacerea completă a trotuarului pe o lungime de 100m.',
      communityImpact: 'Peste 500 de locuitori folosesc zilnic acest trotuar pentru acces la școală și magazine.'
    },
    {
      id: 'ISS-002',
      title: 'Lipsă iluminat public în Parcul Copiilor',
      description: 'Parcul nu are iluminat funcțional, creând probleme de siguranță după lăsarea serii.',
      location: {
        address: 'Parcul Copiilor, Strada Primăverii, Sector 5',
        lat: 44.4150,
        lng: 26.0800
      },
      photos: [
        '/assets/mock-images/issue-002-main.jpg'
      ],
      dateCreated: new Date('2024-01-20'),
      status: 'open',
      emailsSent: 128,
      authorities: [
        {
          id: 'AUTH-001',
          name: 'Primăria Sector 5',
          email: 'contact@primarie5.ro',
          type: 'primarie'
        },
        {
          id: 'AUTH-003',
          name: 'Luxten Lighting',
          email: 'sesizari@luxten.ro',
          type: 'other'
        }
      ],
      currentSituation: 'Toate lămpile din parc sunt nefuncționale de peste 3 luni.',
      desiredOutcome: 'Instalarea unui sistem modern de iluminat LED în tot parcul.',
      communityImpact: 'Parcul este folosit de peste 200 de familii, dar devine inutilizabil după ora 17:00 în sezonul rece.'
    }
  ];

  // Simulate API delay
  private simulateDelay(): Observable<any> {
    return of(null).pipe(delay(300 + Math.random() * 700));
  }

  getIssues(): Observable<Issue[]> {
    return of(this.mockIssues).pipe(delay(500));
  }

  getIssueById(id: string): Observable<Issue | undefined> {
    const issue = this.mockIssues.find(i => i.id === id);
    return of(issue).pipe(delay(300));
  }

  incrementEmailCount(issueId: string): Observable<boolean> {
    const issue = this.mockIssues.find(i => i.id === issueId);
    if (issue) {
      issue.emailsSent++;
      // In real app, this would call backend
      console.log(`[MOCK] Email count incremented for issue ${issueId}. New count: ${issue.emailsSent}`);
    }
    return of(!!issue).pipe(delay(200));
  }

  // Mock location data (hardcoded for MVP)
  getLocationData(): Observable<any> {
    return of({
      counties: [{ id: 'B', name: 'București' }],
      cities: [{ id: 'BUCURESTI', name: 'București' }],
      districts: [{ id: 'SECTOR5', name: 'Sector 5' }]
    }).pipe(delay(100));
  }
}
```

### **Mock Images Setup**

```typescript
// src/app/config/mock-assets.config.ts
export const MOCK_IMAGE_CONFIG = {
  // Placeholder images for issues
  placeholders: {
    issueThumbnail: '/assets/placeholders/issue-thumb.jpg',
    issueMain: '/assets/placeholders/issue-main.jpg',
    authorityLogo: '/assets/placeholders/authority-logo.png'
  },
  
  // Mock image service for development
  generateMockImage: (type: 'issue' | 'authority', id: string): string => {
    // In development, return placeholder
    // In production, will return real image URLs from API
    return `/assets/mock/${type}-${id}.jpg`;
  }
};
```

### **Email Service (Mock Implementation)**

```typescript
// src/app/services/email.service.ts
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  generateEmailContent(issue: Issue, authority: Authority, userData: any): EmailTemplate {
    // This generates the email template
    // In production, template might come from backend
    return {
      to: authority.email,
      subject: `[URGENT] Solicitare de intervenție - ${issue.title} - Sector 5, București`,
      body: this.createEmailBody(issue, authority, userData)
    };
  }
  
  private createEmailBody(issue: Issue, authority: Authority, userData: any): string {
    // Template generation logic
    // Matches format from ux.md
    return `Stimate reprezentant ${authority.name},

Vă scriu pentru a vă aduce la cunoștință o problemă care necesită intervenția dumneavoastră urgentă în comunitatea noastră.

Detalii problemă:
- Locație: ${issue.location.address}
- Problemă: ${issue.description}
- Impact: ${issue.communityImpact}
- Acțiune solicitată: ${issue.desiredOutcome}

Această problemă a fost raportată la data de ${issue.dateCreated.toLocaleDateString('ro-RO')} și a fost adusă deja la cunoștința dumneavoastră de ${issue.emailsSent} cetățeni îngrijorați.

[... rest of template ...]`;
  }
  
  // Mock tracking - in production would call API
  trackEmailSent(issueId: string, authorityId: string): Observable<boolean> {
    console.log(`[MOCK] Tracking email sent for issue ${issueId} to authority ${authorityId}`);
    return of(true).pipe(delay(200));
  }
}
```

### **Environment Configuration**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  // Make it clear this is frontend only
  apiUrl: 'MOCK_ONLY', // Will be replaced with real API URL
  useMockData: true,
  mockDataDelay: 500, // Simulate network delay
  
  // Feature flags for frontend
  features: {
    createIssue: false, // Disabled until backend ready
    userAccounts: false, // Disabled until backend ready
    realTimeUpdates: false, // Disabled until backend ready
    socialSharing: false // Disabled until backend ready
  }
};
```

### **HTTP Interceptor for Development**

```typescript
// src/app/interceptors/mock.interceptor.ts
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.useMockData) {
      console.warn(`[MOCK] Intercepted API call to: ${req.url}`);
      console.warn('[MOCK] Returning mock data instead of real API call');
      
      // Prevent any real HTTP calls in development
      throw new Error('Real API calls are disabled. Backend not implemented yet.');
    }
    
    return next.handle(req);
  }
}
```

---

## 🔧 Debug Helpers

```typescript
// Development environment checks
export const environment = {
  production: false,
  // Enable to verify documentation compliance
  checkDocumentation: true,
  // Log NG-ZORRO component usage
  logComponentUsage: true,
  // Validate color usage
  validateColors: true
};

// Helper service to validate implementation
@Injectable()
export class CivicaValidationService {
  validateColors(element: HTMLElement): boolean {
    // Check against Colour-Scheme.md values
    const computedStyle = window.getComputedStyle(element);
    const validColors = ['#14213D', '#FCA311', '#E5E5E5', '#FFFFFF', '#000000'];
    // Implementation validation logic
  }
  
  validateTypography(element: HTMLElement): boolean {
    // Check against Typography-Guide.md
    const fontFamily = window.getComputedStyle(element).fontFamily;
    return fontFamily.includes('Fira Sans');
  }
}
```

---

## 🎯 Final Implementation Notes

1. **This guide is MANDATORY** - No exceptions
2. **Documentation drives development** - Not the other way around
3. **NG-ZORRO components are PRIMARY** - Custom components are SECONDARY
4. **Theme consistency is CRITICAL** - Every pixel must match our design system
5. **User journey is SACRED** - Do not deviate from ux.md

The success of Civica depends on strict adherence to these implementation guidelines. Every component, every color, every font choice must align with our documentation.