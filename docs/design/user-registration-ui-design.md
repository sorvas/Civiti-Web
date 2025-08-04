# User Registration & Issue Creation - UI Design Specifications

## Executive Summary

This document provides detailed UI design specifications for Civica's user registration and issue creation system, implementing the research findings from `user-registration-ux-research.md` with NG-ZORRO components and Civica's established color scheme. The design prioritizes mobile-first responsive design, accessibility compliance (WCAG AA), and rapid civic engagement.

**Design Principles:**
- **Simplicity First**: Minimize cognitive load with clear visual hierarchy
- **Mobile-First**: 65% of users on mobile devices
- **Accessibility Built-in**: WCAG 2.1 AA compliance from start
- **Civic Trust**: Visual design builds confidence in government platform
- **Engagement-Driven**: Gamification elements encourage continued participation

---

## 1. Design System Foundation

### 1.1 Color Palette (From theme.less)

**Primary Colors:**
- **Oxford Blue (#14213D)**: Headers, text, information states
- **Orange Web (#FCA311)**: Primary actions, CTAs, focus states
- **Platinum (#E5E5E5)**: Backgrounds, borders, neutral states
- **White (#FFFFFF)**: Content backgrounds, card surfaces

**Semantic Colors:**
- **Success**: #28A745 (completed actions, positive feedback)
- **Warning**: #FCA311 (attention needed, orange web)
- **Error**: #DC3545 (failures, validation errors)
- **Info**: #14213D (informational content, oxford blue)

**Usage Guidelines:**
- Oxford Blue: Primary text, headers, navigation, trust signals
- Orange Web: CTAs, active states, gamification elements, progress
- Platinum: Subtle borders, background sections, disabled states
- White: Card backgrounds, form fields, clean surfaces

### 1.2 Typography Scale (Fira Sans)

**Desktop Scale:**
- **Display**: 48px/52px - Hero headlines, major page titles
- **H1**: 36px/40px - Page section headers
- **H2**: 30px/36px - Card titles, subsection headers
- **H3**: 24px/32px - Component headers
- **H4**: 20px/28px - Form section labels
- **H5**: 18px/26px - Emphasis text
- **Body**: 16px/24px - Default text content
- **Small**: 14px/20px - Secondary information
- **Tiny**: 12px/16px - Captions, metadata

**Mobile Scale (Responsive):**
- **Display**: 36px/44px (25% reduction)
- **H1**: 30px/36px
- **H2**: 24px/32px
- **H3**: 20px/28px
- **H4**: 18px/26px
- **H5**: 16px/24px
- **Body**: 16px/24px (maintains readability)
- **Small**: 14px/20px
- **Tiny**: 12px/16px

### 1.3 Spacing System (8px Grid)

**Base Units:**
- **xs**: 4px - Tight internal spacing
- **sm**: 8px - Default small spacing
- **md**: 16px - Standard component spacing
- **lg**: 24px - Section spacing
- **xl**: 32px - Large layout spacing
- **xxl**: 48px - Major section breaks

**Component Spacing:**
- Form fields: 16px bottom margin
- Card padding: 24px
- Button padding: 8px 16px (small), 12px 24px (default)
- Modal padding: 32px
- Page margins: 16px mobile, 24px tablet, 32px desktop

### 1.4 Component Specifications

**Border Radius:**
- **Small**: 4px - Tags, badges, small buttons
- **Default**: 8px - Cards, buttons, form fields
- **Large**: 16px - Modals, major containers

**Shadows:**
- **Card**: 0 2px 8px rgba(20, 33, 61, 0.1)
- **Card Hover**: 0 8px 24px rgba(20, 33, 61, 0.15)
- **Modal**: 0 16px 48px rgba(20, 33, 61, 0.2)
- **Focus**: 0 0 0 2px rgba(252, 163, 17, 0.3)

---

## 2. Registration Flow UI Design

### 2.1 Landing/Registration Gateway

**Component Mapping:**
```html
<nz-card [nzBordered]="false" class="registration-gateway">
  <div class="text-center p-8">
    <!-- Logo -->
    <img src="assets/civica-logo.svg" alt="Civica" class="mx-auto mb-6 h-12">
    
    <!-- Headline -->
    <h1 nz-typography class="text-3xl font-bold text-oxford-blue mb-4">
      Join Your Community
    </h1>
    
    <!-- Value Proposition -->
    <p nz-typography class="text-lg text-oxford-blue-80 mb-8">
      Report issues, track progress, make impact
    </p>
    
    <!-- Primary CTA -->
    <button nz-button nzType="primary" nzSize="large" nzBlock class="mb-4">
      <i nz-icon nzType="google" nzTheme="outline"></i>
      Continue with Google
    </button>
    
    <!-- Secondary Option -->
    <button nz-button nzType="default" nzSize="large" nzBlock class="mb-6">
      <i nz-icon nzType="mail" nzTheme="outline"></i>
      Email & Password
    </button>
    
    <!-- Trust Signals -->
    <nz-space nzDirection="vertical" nzSize="small" class="trust-signals">
      <div nz-space nzSize="small">
        <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success"></i>
        <span class="text-sm text-oxford-blue-60">No spam, ever</span>
      </div>
      <div nz-space nzSize="small">
        <i nz-icon nzType="safety-certificate" nzTheme="fill" class="text-success"></i>
        <span class="text-sm text-oxford-blue-60">Data stays in Romania</span>
      </div>
      <div nz-space nzSize="small">
        <i nz-icon nzType="user" nzTheme="fill" class="text-success"></i>
        <span class="text-sm text-oxford-blue-60">Full control over your information</span>
      </div>
    </nz-space>
    
    <!-- Sign in Link -->
    <div class="mt-8 pt-6 border-t border-platinum">
      <a nz-button nzType="link" class="text-oxford-blue">
        Already have account? Sign in
      </a>
    </div>
  </div>
</nz-card>
```

**Visual Design Specifications:**
- **Layout**: Single centered card, max-width 400px
- **Background**: Platinum gradient (#E5E5E5 to #F0F0F0)
- **Card**: White background, 8px border radius, subtle shadow
- **Logo**: SVG format, 48px height, Civica brand colors
- **Buttons**: Full width, 48px height, Orange Web primary
- **Trust Signals**: Green checkmarks, small text, subtle styling
- **Responsive**: Stack elements vertically on mobile

**Interaction States:**
- **Google Button Hover**: Slightly darker Orange Web (#E39310)  
- **Google Button Active**: Scale 0.98, deeper shadow
- **Email Button Hover**: Light Oxford Blue border (#14213D)
- **Focus States**: Orange Web outline (2px, 0.3 opacity)

### 2.2 Email Registration Form

**Component Mapping:**
```html
<nz-card [nzBordered]="false" class="registration-form">
  <div class="p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <button nz-button nzType="link" nzSize="small" class="absolute left-4 top-4">
        <i nz-icon nzType="arrow-left" nzTheme="outline"></i>
        Back
      </button>
      
      <h2 nz-typography class="text-2xl font-semibold text-oxford-blue">
        Create Account
      </h2>
      <p nz-typography class="text-oxford-blue-60 mt-2">
        Join [1,250] citizens improving Sector 5
      </p>
    </div>
    
    <!-- Registration Form -->
    <form nz-form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <nz-form-item>
        <nz-form-label nzRequired>Full Name</nz-form-label>
        <nz-form-control nzErrorTip="Please enter your full name">
          <input nz-input formControlName="fullName" placeholder="Enter your full name" />
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label nzRequired>Email Address</nz-form-label>
        <nz-form-control nzErrorTip="Please enter a valid email">
          <input nz-input type="email" formControlName="email" placeholder="your@email.com" />
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label nzRequired>Password</nz-form-label>
        <nz-form-control nzErrorTip="Password must be at least 8 characters">
          <input nz-input type="password" formControlName="password" placeholder="Minimum 8 characters" />
        </nz-form-control>
      </nz-form-item>
      
      <!-- Location Section -->
      <nz-divider nzText="Location" nzOrientation="left"></nz-divider>
      
      <nz-form-item>
        <nz-form-label nzRequired>Location</nz-form-label>
        <nz-form-control>
          <nz-select nzPlaceHolder="Select your sector" formControlName="location">
            <nz-option nzValue="sector1" nzLabel="Sector 1, București"></nz-option>
            <nz-option nzValue="sector2" nzLabel="Sector 2, București"></nz-option>
            <nz-option nzValue="sector3" nzLabel="Sector 3, București"></nz-option>
            <nz-option nzValue="sector4" nzLabel="Sector 4, București"></nz-option>
            <nz-option nzValue="sector5" nzLabel="Sector 5, București"></nz-option>
            <nz-option nzValue="sector6" nzLabel="Sector 6, București"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Privacy Acknowledgment -->
      <nz-form-item>
        <nz-form-control>
          <label nz-checkbox formControlName="agreeTerms">
            I agree to the <a href="/privacy" target="_blank">Privacy Policy</a> and 
            <a href="/terms" target="_blank">Terms of Service</a>
          </label>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Submit Button -->
      <nz-form-item>
        <button nz-button nzType="primary" nzSize="large" nzBlock [nzLoading]="isSubmitting">
          Create Account
        </button>
      </nz-form-item>
    </form>
  </div>
</nz-card>
```

**Visual Design Specifications:**
- **Layout**: Single form card, max-width 500px
- **Form Fields**: 16px spacing between items
- **Labels**: Oxford Blue, 14px, medium weight
- **Inputs**: 44px height, 8px border radius, Platinum border
- **Focus States**: Orange Web border, subtle glow
- **Error States**: Red border, error message below field
- **Divider**: Light gray, labeled for section separation

### 2.3 OAuth Profile Setup

**Component Mapping:**
```html
<nz-card [nzBordered]="false" class="profile-setup">
  <div class="p-6">
    <!-- Welcome Header -->
    <div class="text-center mb-8">
      <nz-avatar nzSize="large" [nzSrc]="user.photoURL" class="mb-4"></nz-avatar>
      <h2 nz-typography class="text-2xl font-semibold text-oxford-blue">
        Welcome, {{user.displayName}}!
      </h2>
      <p nz-typography class="text-oxford-blue-60">
        Help us personalize your experience
      </p>
    </div>
    
    <!-- Quick Setup Form -->
    <form nz-form [formGroup]="profileForm">
      <!-- Location Confirmation -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="environment" nzTheme="outline" class="mr-2"></i>
          Confirm Location
        </nz-form-label>
        <nz-form-control>
          <nz-select nzPlaceHolder="Auto-detected: Sector 5, București" 
                     formControlName="location" class="location-select">
            <nz-option nzValue="sector5" nzLabel="Sector 5, București">
              <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success mr-2"></i>
              Sector 5, București
            </nz-option>
            <!-- Other sectors... -->
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Residence Type -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="home" nzTheme="outline" class="mr-2"></i>
          Residence Type <span class="text-gray-400">(Optional)</span>
        </nz-form-label>
        <nz-form-control>
          <nz-radio-group formControlName="residenceType" class="residence-options">
            <label nz-radio nzValue="apartment">
              <i nz-icon nzType="apartment" nzTheme="outline"></i>
              Apartment
            </label>
            <label nz-radio nzValue="house">
              <i nz-icon nzType="home" nzTheme="outline"></i>
              House
            </label>
            <label nz-radio nzValue="business">
              <i nz-icon nzType="bank" nzTheme="outline"></i>
              Business
            </label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Communication Preferences -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="mail" nzTheme="outline" class="mr-2"></i>
          Communication Preferences
        </nz-form-label>
        <nz-form-control>
          <div nz-space nzDirection="vertical" nzSize="small">
            <label nz-checkbox formControlName="issueUpdates" [nzChecked]="true">
              Issue updates
            </label>
            <label nz-checkbox formControlName="communityNews" [nzChecked]="true">
              Community news
            </label>
            <label nz-checkbox formControlName="monthlyDigest">
              Monthly digest
            </label>
            <label nz-checkbox formControlName="achievements">
              Achievement notifications
            </label>
          </div>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Action Buttons -->
      <nz-form-item class="mt-8">
        <nz-space nzSize="middle" class="w-full">
          <button nz-button nzType="primary" nzSize="large" class="flex-1">
            Complete Setup
          </button>
          <button nz-button nzType="default" nzSize="large" class="flex-1">
            Do this later
          </button>
        </nz-space>
      </nz-form-item>
    </form>
  </div>
</nz-card>
```

**Visual Design Specifications:**
- **Avatar**: 64px diameter, rounded, user's Google photo
- **Form Sections**: Clear visual grouping with icons
- **Radio Options**: Horizontal layout with icons
- **Checkboxes**: Vertical stack, Orange Web accent
- **Split Buttons**: Equal width, primary/secondary styling
- **Optional Labels**: Gray text, clear distinction

### 2.4 Welcome & First Issue Prompt

**Component Mapping:**
```html
<nz-card [nzBordered]="false" class="welcome-card">
  <div class="text-center p-8">
    <!-- Celebration Header -->
    <div class="mb-6">
      <i nz-icon nzType="check-circle" nzTheme="fill" 
         class="text-success text-6xl mb-4"></i>
      <h1 nz-typography class="text-3xl font-bold text-oxford-blue mb-2">
        Welcome to Civica!
      </h1>
    </div>
    
    <!-- Community Stats -->
    <div class="community-stats mb-8 p-4 bg-platinum rounded-lg">
      <p nz-typography class="text-lg text-oxford-blue">
        You're now part of <strong class="text-orange-web">1,250</strong> citizens improving
        <strong>Sector 5</strong>!
      </p>
    </div>
    
    <!-- Call to Action -->
    <div class="mb-8">
      <h3 nz-typography class="text-xl font-semibold text-oxford-blue mb-6">
        Ready to make your first impact?
      </h3>
      
      <nz-space nzDirection="vertical" nzSize="middle" class="w-full">
        <button nz-button nzType="primary" nzSize="large" nzBlock class="cta-primary">
          <i nz-icon nzType="picture" nzTheme="outline" class="mr-2"></i>
          Report an Issue
        </button>
        <button nz-button nzType="default" nzSize="large" nzBlock>
          <i nz-icon nzType="global" nzTheme="outline" class="mr-2"></i>
          Explore Issues First
        </button>
      </nz-space>
    </div>
    
    <!-- Gamification Teaser -->
    <nz-alert nzType="info" nzShowIcon class="gamification-teaser">
      <div nz-space nzSize="small">
        <i nz-icon nzType="star" nzTheme="fill" class="text-orange-web"></i>
        <span><strong>Tip:</strong> Your first issue earns the "Civic Starter" badge!</span>
      </div>
    </nz-alert>
  </div>
</nz-card>
```

**Visual Design Specifications:**
- **Success Icon**: Large (96px), success green, centered
- **Community Stats**: Light background box, highlighted numbers
- **CTA Buttons**: Full width, clear icon/text pairing
- **Gamification Alert**: Info style, star icon, engaging copy
- **Layout**: Center-aligned, generous spacing
- **Mobile**: Stack all elements vertically, maintain spacing

---

## 3. Issue Creation Flow UI Design

### 3.1 Issue Type Selection

**Component Mapping:**
```html
<nz-page-header class="issue-creation-header" [nzGhost]="false">
  <nz-page-header-title>What type of issue are you reporting?</nz-page-header-title>
  <nz-page-header-extra>
    <button nz-button nzType="link" (click)="goBack()">
      <i nz-icon nzType="arrow-left" nzTheme="outline"></i>
      Back
    </button>
  </nz-page-header-extra>
</nz-page-header>

<div class="issue-categories p-6">
  <nz-space nzDirection="vertical" nzSize="middle" class="w-full">
    <!-- Infrastructure Category -->
    <nz-card nzHoverable class="category-card" (click)="selectCategory('infrastructure')">
      <div nz-space nzSize="middle" class="w-full items-center">
        <div class="category-icon">
          <i nz-icon nzType="apartment" nzTheme="outline" class="text-4xl text-orange-web"></i>
        </div>
        <div class="category-content flex-1">
          <h3 nz-typography class="text-xl font-semibold text-oxford-blue mb-1">
            Infrastructure
          </h3>
          <p nz-typography class="text-oxford-blue-60 text-sm">
            Roads, sidewalks, utilities
          </p>
        </div>
        <i nz-icon nzType="arrow-right" nzTheme="outline" class="text-oxford-blue-40"></i>
      </div>
    </nz-card>
    
    <!-- Environment Category -->
    <nz-card nzHoverable class="category-card" (click)="selectCategory('environment')">
      <div nz-space nzSize="middle" class="w-full items-center">
        <div class="category-icon">
          <i nz-icon nzType="global" nzTheme="outline" class="text-4xl text-orange-web"></i>
        </div>
        <div class="category-content flex-1">
          <h3 nz-typography class="text-xl font-semibold text-oxford-blue mb-1">
            Environment
          </h3>
          <p nz-typography class="text-oxford-blue-60 text-sm">
            Parks, pollution, cleanliness
          </p>
        </div>
        <i nz-icon nzType="arrow-right" nzTheme="outline" class="text-oxford-blue-40"></i>
      </div>
    </nz-card>
    
    <!-- Transportation Category -->
    <nz-card nzHoverable class="category-card" (click)="selectCategory('transportation')">
      <div nz-space nzSize="middle" class="w-full items-center">
        <div class="category-icon">
          <i nz-icon nzType="car" nzTheme="outline" class="text-4xl text-orange-web"></i>
        </div>
        <div class="category-content flex-1">
          <h3 nz-typography class="text-xl font-semibold text-oxford-blue mb-1">
            Transportation
          </h3>
          <p nz-typography class="text-oxford-blue-60 text-sm">
            Traffic, parking, public transport
          </p>
        </div>
        <i nz-icon nzType="arrow-right" nzTheme="outline" class="text-oxford-blue-40"></i>
      </div>
    </nz-card>
    
    <!-- Additional categories... -->
  </nz-space>
  
  <!-- Location Section -->
  <nz-divider nzText="Location" nzOrientation="left" class="mt-8"></nz-divider>
  
  <nz-card class="location-card">
    <div nz-space nzSize="middle" class="w-full items-center">
      <i nz-icon nzType="environment" nzTheme="fill" class="text-2xl text-success"></i>
      <div class="flex-1">
        <p nz-typography class="text-oxford-blue font-medium">
          Current Location
        </p>
        <p nz-typography class="text-oxford-blue-60 text-sm">
          {{currentAddress}}
        </p>
      </div>
      <button nz-button nzType="link" class="text-orange-web">
        <i nz-icon nzType="edit" nzTheme="outline"></i>
        Change
      </button>
    </div>
  </nz-card>
</div>
```

**Visual Design Specifications:**
- **Category Cards**: Full width, hover shadow, clear tap targets
- **Icons**: 48px size, Orange Web color, category-specific
- **Typography**: Clear hierarchy, readable descriptions
- **Location Card**: Distinct styling, current location emphasis
- **Interaction**: Hover states, clear selection feedback
- **Mobile**: Stack cards vertically, 44px minimum touch target

### 3.2 Photo Capture & Documentation

**Component Mapping:**
```html
<nz-page-header class="photo-capture-header" [nzGhost]="false">
  <nz-page-header-title>Document the Issue</nz-page-header-title>
  <nz-page-header-extra>
    <button nz-button nzType="link" (click)="goBack()">
      <i nz-icon nzType="arrow-left" nzTheme="outline"></i>
      Back
    </button>
  </nz-page-header-extra>
</nz-page-header>

<div class="photo-capture-container p-6">
  <!-- Camera Interface -->
  <nz-card class="camera-card mb-6">
    <div class="camera-interface">
      <!-- Camera Viewfinder -->
      <div class="camera-viewfinder relative">
        <video #videoElement class="w-full h-64 object-cover rounded-lg bg-gray-100"></video>
        
        <!-- Camera Guidelines Overlay -->
        <div class="camera-guidelines absolute inset-0 pointer-events-none">
          <div class="guideline-grid w-full h-full border-2 border-orange-web-30 rounded-lg">
            <!-- Grid lines for photo composition -->
          </div>
        </div>
        
        <!-- Capture Button -->
        <div class="camera-controls absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button nz-button nzType="primary" nzShape="circle" nzSize="large" 
                  class="capture-button" (click)="capturePhoto()">
            <i nz-icon nzType="camera" nzTheme="outline" class="text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  </nz-card>
  
  <!-- Photo Tips -->
  <nz-alert nzType="info" nzShowIcon class="mb-6 photo-tips">
    <div>
      <h4 class="font-semibold mb-2">Tips for better photos:</h4>
      <ul class="text-sm space-y-1">
        <li>• Get close to show details</li>
        <li>• Include surrounding context</li>
        <li>• Multiple angles help</li>
      </ul>
    </div>
  </nz-alert>
  
  <!-- Captured Photos Gallery -->
  <div class="captured-photos mb-6" *ngIf="capturedPhotos.length > 0">
    <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-4">
      Captured Photos: {{capturedPhotos.length}}/5
    </h3>
    
    <nz-space nzSize="middle" nzWrap>
      <div *ngFor="let photo of capturedPhotos; let i = index" class="photo-thumbnail">
        <div class="relative">
          <img [src]="photo.url" [alt]="'Photo ' + (i + 1)" 
               class="w-20 h-20 object-cover rounded-lg border-2 border-platinum">
          <button nz-button nzType="primary" nzSize="small" nzShape="circle"
                  class="absolute -top-2 -right-2 bg-error border-error"
                  (click)="removePhoto(i)">
            <i nz-icon nzType="close" nzTheme="outline" class="text-white text-xs"></i>
          </button>
        </div>
      </div>
    </nz-space>
    
    <!-- Photo Actions -->
    <nz-space nzSize="middle" class="mt-4">
      <button nz-button nzType="default" (click)="retakePhotos()">
        <i nz-icon nzType="reload" nzTheme="outline"></i>
        Retake
      </button>
      <button nz-button nzType="default" (click)="addMorePhotos()" 
              [disabled]="capturedPhotos.length >= 5">
        <i nz-icon nzType="plus" nzTheme="outline"></i>
        Add More
      </button>
    </nz-space>
  </div>
  
  <!-- Quick Description -->
  <nz-card class="description-card">
    <nz-form-item>
      <nz-form-label class="font-semibold">Quick Description</nz-form-label>
      <nz-form-control>
        <textarea nz-input 
                  placeholder="Describe what you see in 1-2 sentences"
                  [nzAutosize]="{ minRows: 3, maxRows: 5 }"
                  [(ngModel)]="quickDescription">
        </textarea>
        <div class="ai-suggestion mt-2" *ngIf="aiSuggestion">
          <nz-tag nzColor="orange" class="cursor-pointer" (click)="useAISuggestion()">
            <i nz-icon nzType="robot" nzTheme="outline"></i>
            AI Suggestion: {{aiSuggestion}}
          </nz-tag>
        </div>
      </nz-form-control>
    </nz-form-item>
  </nz-card>
  
  <!-- Continue Button -->
  <div class="action-buttons mt-8">
    <button nz-button nzType="primary" nzSize="large" nzBlock 
            [disabled]="capturedPhotos.length === 0"
            (click)="continueToDetails()">
      Continue to Details
      <i nz-icon nzType="arrow-right" nzTheme="outline"></i>
    </button>
  </div>
</div>
```

**Visual Design Specifications:**
- **Camera Interface**: Full width, 16:9 aspect ratio, rounded corners
- **Capture Button**: Large circular button, Orange Web, centered
- **Photo Thumbnails**: 80px square, rounded, remove button overlay
- **Guidelines**: Subtle orange grid overlay for composition
- **AI Suggestions**: Orange tags, clickable, robot icon
- **Progress**: Clear photo count, disabled states when limit reached

### 3.3 AI-Enhanced Description

**Component Mapping:**
```html
<nz-page-header class="ai-description-header" [nzGhost]="false">
  <nz-page-header-title>
    <i nz-icon nzType="robot" nzTheme="outline" class="mr-2 text-orange-web"></i>
    AI Generated Report
  </nz-page-header-title>
  <nz-page-header-extra>
    <button nz-button nzType="link" (click)="goBack()">
      <i nz-icon nzType="arrow-left" nzTheme="outline"></i>
      Back
    </button>
  </nz-page-header-extra>
</nz-page-header>

<div class="ai-description-container p-6">
  <!-- AI Analysis Status -->
  <nz-spin [nzSpinning]="isAnalyzing" nzTip="AI is analyzing your photos...">
    <div *ngIf="!isAnalyzing">
      
      <!-- Generated Description -->
      <nz-card class="generated-description mb-6">
        <div class="mb-4">
          <nz-tag nzColor="blue" class="mb-2">
            <i nz-icon nzType="eye" nzTheme="outline"></i>
            AI Analysis
          </nz-tag>
          <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-4">
            Issue Description
          </h3>
        </div>
        
        <div class="ai-generated-text bg-gray-50 p-4 rounded-lg mb-4">
          <p nz-typography class="text-oxford-blue leading-relaxed">
            {{aiGeneratedDescription}}
          </p>
        </div>
        
        <!-- Confidence Indicator -->
        <div class="confidence-indicator mb-4">
          <div nz-space nzSize="small" class="items-center">
            <span class="text-sm text-oxford-blue-60">AI Confidence:</span>
            <nz-progress [nzPercent]="aiConfidence" 
                         nzSize="small" 
                         [nzStrokeColor]="getConfidenceColor()"
                         class="flex-1 max-w-32"></nz-progress>
            <span class="text-sm font-medium">{{aiConfidence}}%</span>
          </div>
        </div>
      </nz-card>
      
      <!-- Proposed Solution -->
      <nz-card class="proposed-solution mb-6">
        <div class="mb-4">
          <nz-tag nzColor="green" class="mb-2">
            <i nz-icon nzType="bulb" nzTheme="outline"></i>
            Proposed Solution
          </nz-tag>
        </div>
        
        <div class="solution-text bg-green-50 p-4 rounded-lg">
          <p nz-typography class="text-oxford-blue leading-relaxed">
            {{proposedSolution}}
          </p>
        </div>
      </nz-card>
      
      <!-- Action Buttons -->
      <nz-space nzDirection="vertical" nzSize="middle" class="w-full">
        <button nz-button nzType="primary" nzSize="large" nzBlock (click)="approveGeneration()">
          <i nz-icon nzType="check" nzTheme="outline"></i>
          Looks Good
        </button>
        
        <nz-space nzSize="middle" class="w-full">
          <button nz-button nzType="default" class="flex-1" (click)="editDescription()">
            <i nz-icon nzType="edit" nzTheme="outline"></i>
            Edit Description
          </button>
          <button nz-button nzType="default" class="flex-1" (click)="regenerateAI()">
            <i nz-icon nzType="reload" nzTheme="outline"></i>
            Regenerate
          </button>
        </nz-space>
        
        <button nz-button nzType="link" nzBlock (click)="writeOwn()">
          <i nz-icon nzType="edit" nzTheme="outline"></i>
          Write My Own
        </button>
      </nz-space>
      
    </div>
  </nz-spin>
</div>

<!-- Edit Modal -->
<nz-modal [(nzVisible)]="isEditModalVisible" 
          nzTitle="Edit Description"
          [nzWidth]="600"
          (nzOnCancel)="cancelEdit()"
          (nzOnOk)="saveEdits()">
  <div *nzModalContent>
    <nz-form-item>
      <nz-form-label>Issue Description</nz-form-label>
      <nz-form-control>
        <textarea nz-input 
                  [(ngModel)]="editedDescription"
                  [nzAutosize]="{ minRows: 4, maxRows: 8 }"
                  placeholder="Describe the issue in detail...">
        </textarea>
      </nz-form-control>
    </nz-form-item>
    
    <nz-form-item>
      <nz-form-label>Proposed Solution</nz-form-label>
      <nz-form-control>
        <textarea nz-input 
                  [(ngModel)]="editedSolution"
                  [nzAutosize]="{ minRows: 3, maxRows: 6 }"
                  placeholder="Suggest how this could be resolved...">
        </textarea>
      </nz-form-control>
    </nz-form-item>
  </div>
</nz-modal>
```

**Visual Design Specifications:**
- **AI Header**: Robot icon, Orange Web accent, clear AI branding
- **Loading State**: Centered spinner with descriptive text
- **Generated Content**: Light gray background, clear typography
- **Confidence Bar**: Color-coded (red <60%, yellow 60-80%, green >80%)
- **Solution Card**: Light green background, distinct from description
- **Action Buttons**: Clear hierarchy, primary approval prominent
- **Edit Modal**: Full-width modal, textarea fields, standard buttons

### 3.4 Location & Final Details

**Component Mapping:**
```html
<nz-page-header class="location-details-header" [nzGhost]="false">
  <nz-page-header-title>Confirm Location & Details</nz-page-header-title>
  <nz-page-header-extra>
    <button nz-button nzType="link" (click)="goBack()">
      <i nz-icon nzType="arrow-left" nzTheme="outline"></i>
      Back
    </button>
  </nz-page-header-extra>
</nz-page-header>

<div class="location-details-container p-6">
  <!-- Location Confirmation -->
  <nz-card class="location-card mb-6">
    <div class="mb-4">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-2">
        <i nz-icon nzType="environment" nzTheme="fill" class="text-orange-web mr-2"></i>
        Confirm Location
      </h3>
    </div>
    
    <!-- Map Container -->
    <div class="map-container mb-4">
      <google-map height="200" 
                  width="100%"
                  [center]="mapCenter"
                  [zoom]="16"
                  class="rounded-lg overflow-hidden">
        <map-marker [position]="markerPosition" 
                    [options]="markerOptions">
        </map-marker>
      </google-map>
    </div>
    
    <!-- Address Display -->
    <div class="address-display mb-4 p-3 bg-gray-50 rounded-lg">
      <div nz-space nzDirection="vertical" nzSize="small" class="w-full">
        <div class="font-semibold text-oxford-blue">{{detectedAddress.street}}</div>
        <div class="text-oxford-blue-60 text-sm">{{detectedAddress.district}}, {{detectedAddress.city}}</div>
      </div>
    </div>
    
    <!-- Location Actions -->
    <nz-space nzSize="middle">
      <button nz-button nzType="default" (click)="adjustLocation()">
        <i nz-icon nzType="drag" nzTheme="outline"></i>
        Move Pin
      </button>
      <button nz-button nzType="primary" [disabled]="!locationConfirmed">
        <i nz-icon nzType="check" nzTheme="outline"></i>
        Correct
      </button>
    </nz-space>
  </nz-card>
  
  <!-- Additional Details -->
  <nz-card class="additional-details">
    <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-4">
      Additional Details <span class="text-sm font-normal text-oxford-blue-60">(Optional)</span>
    </h3>
    
    <nz-space nzDirection="vertical" nzSize="large" class="w-full">
      <!-- When -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="clock-circle" nzTheme="outline" class="mr-2"></i>
          When did this occur?
        </nz-form-label>
        <nz-form-control>
          <nz-radio-group [(ngModel)]="occurredWhen">
            <label nz-radio nzValue="now">Now</label>
            <label nz-radio nzValue="today">Earlier today</label>
            <label nz-radio nzValue="other">Other</label>
          </nz-radio-group>
          <nz-date-picker *ngIf="occurredWhen === 'other'" 
                          class="mt-2 w-full"
                          [(ngModel)]="specificDate">
          </nz-date-picker>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Impact Scope -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="team" nzTheme="outline" class="mr-2"></i>
          Who does this affect?
        </nz-form-label>
        <nz-form-control>
          <nz-select nzPlaceHolder="Select impact scope" [(ngModel)]="impactScope">
            <nz-option nzValue="individual" nzLabel="Just me"></nz-option>
            <nz-option nzValue="building" nzLabel="My building"></nz-option>
            <nz-option nzValue="block" nzLabel="My block"></nz-option>
            <nz-option nzValue="neighborhood" nzLabel="Neighborhood"></nz-option>
            <nz-option nzValue="sector" nzLabel="Entire sector"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Urgency Level -->
      <nz-form-item>
        <nz-form-label>
          <i nz-icon nzType="warning" nzTheme="outline" class="mr-2"></i>
          Urgency Level
        </nz-form-label>
        <nz-form-control>
          <nz-radio-group [(ngModel)]="urgencyLevel" class="urgency-options">
            <label nz-radio nzValue="low" class="urgency-low">
              <nz-tag nzColor="default">Low</nz-tag>
              <span class="ml-2 text-sm">Can wait weeks</span>
            </label>
            <label nz-radio nzValue="medium" class="urgency-medium">
              <nz-tag nzColor="orange">Medium</nz-tag>
              <span class="ml-2 text-sm">Should be fixed soon</span>
            </label>
            <label nz-radio nzValue="high" class="urgency-high">
              <nz-tag nzColor="red">High</nz-tag>
              <span class="ml-2 text-sm">Needs immediate attention</span>
            </label>
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
    </nz-space>
  </nz-card>
  
  <!-- Submit Button -->
  <div class="submit-section mt-8">
    <button nz-button nzType="primary" nzSize="large" nzBlock 
            [nzLoading]="isSubmitting"
            (click)="submitIssue()">
      <i nz-icon nzType="send" nzTheme="outline"></i>
      Submit Issue
    </button>
  </div>
</div>
```

**Visual Design Specifications:**
- **Map Integration**: Google Maps, 200px height, rounded corners
- **Address Display**: Gray background, clear hierarchy
- **Pin Interaction**: Draggable pin, visual feedback
- **Form Sections**: Clear grouping, optional labels
- **Urgency Tags**: Color-coded (gray, orange, red)
- **Submit Button**: Full width, loading state, prominent

### 3.5 Submission Confirmation & Gamification

**Component Mapping:**
```html
<div class="submission-success-container p-6">
  <!-- Success Header -->
  <div class="text-center mb-8">
    <div class="success-animation mb-6">
      <i nz-icon nzType="check-circle" nzTheme="fill" 
         class="text-success text-8xl animate-bounce"></i>
    </div>
    
    <h1 nz-typography class="text-3xl font-bold text-oxford-blue mb-4">
      Issue Submitted Successfully!
    </h1>
    
    <p nz-typography class="text-lg text-oxford-blue-60">
      Your report is being reviewed by local authorities.
    </p>
  </div>
  
  <!-- Achievement Unlock -->
  <nz-card class="achievement-card mb-6" [nzBodyStyle]="{'background': 'linear-gradient(135deg, #FCA311 0%, #FFB84D 100%)', 'color': 'white'}">
    <div class="text-center">
      <div class="mb-4">
        <i nz-icon nzType="trophy" nzTheme="fill" class="text-5xl text-white"></i>
      </div>
      
      <h2 nz-typography class="text-2xl font-bold text-white mb-2">
        Achievement Unlocked!
      </h2>
      
      <nz-badge [nzCount]="0" nzShowZero="false" class="achievement-badge mb-3">
        <div class="badge-container bg-white bg-opacity-20 p-3 rounded-lg">
          <div class="font-bold text-lg">Civic Starter Badge</div>
          <div class="text-sm opacity-90">First issue reported</div>
        </div>
      </nz-badge>
      
      <div class="points-earned">
        <span class="text-2xl font-bold">+50</span>
        <span class="text-lg ml-2">Community Points</span>
      </div>
    </div>
  </nz-card>
  
  <!-- User Impact Stats -->
  <nz-card class="impact-stats mb-6">
    <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-4">
      <i nz-icon nzType="bar-chart" nzTheme="outline" class="text-orange-web mr-2"></i>
      Your Impact
    </h3>
    
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="8">
        <nz-statistic nzTitle="Issues Reported" 
                      [nzValue]="1" 
                      [nzValueStyle]="{'color': '#14213D'}">
        </nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="8">
        <nz-statistic nzTitle="Community Rank" 
                      nzValue="#847" 
                      nzSuffix="of 1,250"
                      [nzValueStyle]="{'color': '#14213D'}">
        </nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="8">
        <nz-statistic nzTitle="Points Earned" 
                      [nzValue]="50"
                      [nzValueStyle]="{'color': '#FCA311'}">
        </nz-statistic>
      </nz-col>
    </nz-row>
  </nz-card>
  
  <!-- What's Next -->
  <nz-card class="whats-next mb-6">
    <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-4">
      What's Next:
    </h3>
    
    <nz-space nzDirection="vertical" nzSize="middle" class="w-full">
      <div nz-space nzSize="middle" class="items-center">
        <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success"></i>
        <span>You'll get updates as this progresses</span>
      </div>
      <div nz-space nzSize="middle" class="items-center">
        <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success"></i>
        <span>Others can now support your issue</span>
      </div>
      <div nz-space nzSize="middle" class="items-center">
        <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success"></i>
        <span>Authorities have 5 business days to respond</span>
      </div>
    </nz-space>
  </nz-card>
  
  <!-- Action Buttons -->
  <nz-space nzDirection="vertical" nzSize="middle" class="w-full">
    <button nz-button nzType="primary" nzSize="large" nzBlock (click)="shareAchievement()">
      <i nz-icon nzType="share-alt" nzTheme="outline"></i>
      Share Achievement
    </button>
    
    <nz-space nzSize="middle" class="w-full">
      <button nz-button nzType="default" class="flex-1" (click)="reportAnother()">
        <i nz-icon nzType="plus" nzTheme="outline"></i>
        Report Another Issue
      </button>
      <button nz-button nzType="default" class="flex-1" (click)="viewMyIssues()">
        <i nz-icon nzType="eye" nzTheme="outline"></i>
        View My Issues
      </button>
    </nz-space>
  </nz-space>
</div>
```

**Visual Design Specifications:**
- **Success Animation**: Large checkmark with bounce animation
- **Achievement Card**: Gradient background (Orange Web), prominent trophy
- **Badge Design**: Semi-transparent overlay, clear text hierarchy
- **Statistics**: Ant Design statistic components, color-coded values
- **Progress Steps**: Green checkmarks, clear expectations
- **Action Buttons**: Primary share, secondary explore options

---

## 4. User Dashboard & Gamification UI

### 4.1 Main Dashboard

**Component Mapping:**
```html
<nz-layout class="user-dashboard">
  <!-- Header -->
  <nz-header class="dashboard-header">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="user-greeting">
          <h1 nz-typography class="text-2xl font-semibold text-white mb-0">
            👋 Hello, {{user.displayName}}!
          </h1>
        </div>
        
        <div class="user-avatar">
          <nz-dropdown nzPlacement="bottomRight">
            <nz-avatar nzSize="large" [nzSrc]="user.photoURL" nz-dropdown class="cursor-pointer"></nz-avatar>
            <ul nz-menu nzSelectable="false">
              <li nz-menu-item>
                <i nz-icon nzType="user" nzTheme="outline"></i>
                Profile Settings
              </li>
              <li nz-menu-item>
                <i nz-icon nzType="logout" nzTheme="outline"></i>
                Sign Out
              </li>
            </ul>
          </nz-dropdown>
        </div>
      </div>
    </div>
  </nz-header>
  
  <!-- Content -->
  <nz-content class="dashboard-content p-6">
    <!-- Civic Impact Section -->
    <nz-card class="civic-impact-card mb-6" [nzBodyStyle]="{'padding': '32px'}">
      <div class="text-center mb-6">
        <h2 nz-typography class="text-2xl font-semibold text-oxford-blue mb-2">
          <i nz-icon nzType="trophy" nzTheme="outline" class="text-orange-web mr-2"></i>
          Your Civic Impact
        </h2>
      </div>
      
      <!-- Level Progress -->
      <div class="level-progress mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-oxford-blue font-medium">Level 3 Contributor</span>
          <span class="text-oxford-blue-60 text-sm">1,250 / 2,000 points</span>
        </div>
        <nz-progress [nzPercent]="62.5" 
                     nzStrokeColor="#FCA311" 
                     nzTrailColor="#E5E5E5"
                     [nzShowInfo]="false">
        </nz-progress>
        <div class="text-center mt-2">
          <span class="text-oxford-blue-60 text-sm">750 points to Level 4</span>
        </div>
      </div>
      
      <!-- Quick Stats Grid -->
      <nz-row [nzGutter]="[16, 16]">
        <nz-col [nzXs]="12" [nzSm]="6">
          <div class="stat-card text-center p-4 bg-orange-50 rounded-lg">
            <div class="text-2xl font-bold text-orange-web mb-1">4</div>
            <div class="text-sm text-oxford-blue-60">Issues Reported</div>
          </div>
        </nz-col>
        <nz-col [nzXs]="12" [nzSm]="6">
          <div class="stat-card text-center p-4 bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-success mb-1">2</div>
            <div class="text-sm text-oxford-blue-60">Resolved</div>
          </div>
        </nz-col>
        <nz-col [nzXs]="12" [nzSm]="6">
          <div class="stat-card text-center p-4 bg-blue-50 rounded-lg">
            <div class="text-2xl font-bold text-info mb-1">2</div>
            <div class="text-sm text-oxford-blue-60">In Progress</div>
          </div>
        </nz-col>
        <nz-col [nzXs]="12" [nzSm]="6">
          <div class="stat-card text-center p-4 bg-purple-50 rounded-lg">
            <div class="text-2xl font-bold text-purple-500 mb-1">23</div>
            <div class="text-sm text-oxford-blue-60">Community Votes</div>
          </div>
        </nz-col>
      </nz-row>
    </nz-card>
    
    <!-- Recent Activity -->
    <nz-card class="recent-activity mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-0">
          <i nz-icon nzType="clock-circle" nzTheme="outline" class="text-orange-web mr-2"></i>
          Recent Activity
        </h3>
        <button nz-button nzType="link" class="text-orange-web">
          View All
          <i nz-icon nzType="arrow-right" nzTheme="outline"></i>
        </button>
      </div>
      
      <nz-timeline>
        <nz-timeline-item nzColor="blue">
          <div class="activity-item">
            <div class="activity-content">
              <div class="font-medium text-oxford-blue">Your pothole report got 5 new supporters</div>
              <div class="text-sm text-oxford-blue-60 mt-1">2 hours ago • Strada Mărgeanului</div>
            </div>
            <nz-badge [nzCount]="5" nzSize="small" class="ml-2"></nz-badge>
          </div>
        </nz-timeline-item>
        
        <nz-timeline-item nzColor="green">
          <div class="activity-item">
            <div class="activity-content">
              <div class="font-medium text-oxford-blue">Broken streetlight marked "In Progress"</div>
              <div class="text-sm text-oxford-blue-60 mt-1">1 day ago • Bulevardul Timișoara</div>
            </div>
            <i nz-icon nzType="check-circle" nzTheme="fill" class="text-success ml-2"></i>
          </div>
        </nz-timeline-item>
        
        <nz-timeline-item nzColor="orange">
          <div class="activity-item">
            <div class="activity-content">
              <div class="font-medium text-oxford-blue">New comment on park cleanup issue</div>
              <div class="text-sm text-oxford-blue-60 mt-1">3 days ago • Parcul Drumul Taberei</div>
            </div>
            <i nz-icon nzType="message" nzTheme="outline" class="text-orange-web ml-2"></i>
          </div>
        </nz-timeline-item>
      </nz-timeline>
    </nz-card>
    
    <!-- Action Cards -->
    <nz-row [nzGutter]="[16, 16]">
      <nz-col [nzXs]="24" [nzSm]="12">
        <nz-card nzHoverable class="action-card report-issue" (click)="reportNewIssue()">
          <div class="text-center p-4">
            <div class="action-icon mb-3">
              <i nz-icon nzType="plus-circle" nzTheme="fill" class="text-5xl text-orange-web"></i>
            </div>
            <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-2">
              Report New Issue
            </h3>
            <p nz-typography class="text-oxford-blue-60">
              Document and submit a new civic issue
            </p>
          </div>
        </nz-card>
      </nz-col>
      
      <nz-col [nzXs]="24" [nzSm]="12">
        <nz-card nzHoverable class="action-card browse-issues" (click)="browseIssues()">
          <div class="text-center p-4">
            <div class="action-icon mb-3">
              <i nz-icon nzType="global" nzTheme="outline" class="text-5xl text-oxford-blue"></i>
            </div>
            <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-2">
              Browse Issues
            </h3>
            <p nz-typography class="text-oxford-blue-60">
              Explore and support community issues
            </p>
          </div>
        </nz-card>
      </nz-col>
    </nz-row>
  </nz-content>
</nz-layout>
```

**Visual Design Specifications:**
- **Header**: Oxford Blue background, white text, avatar dropdown
- **Level Progress**: Orange Web progress bar, clear point breakdown
- **Stat Cards**: Color-coded backgrounds, prominent numbers
- **Timeline**: Standard Ant Design timeline with custom icons
- **Action Cards**: Hover effects, clear CTAs, large touch targets
- **Responsive**: Grid system adapts from 4 columns to 2 to 1

### 4.2 Achievements & Badges

**Component Mapping:**
```html
<nz-card class="achievements-panel">
  <div class="achievements-header mb-6">
    <div class="flex items-center justify-between">
      <h2 nz-typography class="text-2xl font-semibold text-oxford-blue mb-0">
        <i nz-icon nzType="trophy" nzTheme="fill" class="text-orange-web mr-2"></i>
        Achievements & Badges
      </h2>
      <nz-tag nzColor="orange">{{earnedBadges}}/{{totalBadges}} Earned</nz-tag>
    </div>
    <p nz-typography class="text-oxford-blue-60 mt-2">
      Unlock badges by contributing to your community
    </p>
  </div>

  <!-- Badge Categories -->
  <nz-tabs nzType="card">
    <!-- Starter Badges -->
    <nz-tab-pane nzTitle="Starter" [nzActive]="true">
      <nz-row [nzGutter]="[16, 16]">
        <nz-col [nzXs]="12" [nzSm]="8" [nzMd]="6" *ngFor="let badge of starterBadges">
          <nz-card nzHoverable class="badge-card" 
                   [ngClass]="{'earned': badge.earned, 'locked': !badge.earned}">
            <div class="text-center p-4">
              <!-- Badge Icon -->
              <div class="badge-icon mb-3" [ngClass]="{'grayscale': !badge.earned}">
                <i [nz-icon]="badge.icon" nzTheme="fill" 
                   class="text-4xl" 
                   [ngClass]="badge.earned ? 'text-orange-web' : 'text-gray-400'"></i>
              </div>
              
              <!-- Badge Info -->
              <div class="badge-info">
                <h4 nz-typography class="font-semibold text-oxford-blue mb-1">
                  {{badge.name}}
                </h4>
                <p nz-typography class="text-sm text-oxford-blue-60 mb-3">
                  {{badge.description}}
                </p>
                
                <!-- Progress or Status -->
                <div *ngIf="badge.earned" class="earned-status">
                  <nz-tag nzColor="success" nzSize="small">
                    <i nz-icon nzType="check" nzTheme="outline"></i>
                    Earned
                  </nz-tag>
                  <div class="text-xs text-oxford-blue-60 mt-1">
                    {{badge.earnedDate | date:'MMM d, y'}}
                  </div>
                </div>
                
                <div *ngIf="!badge.earned && badge.progress" class="progress-status">
                  <nz-progress [nzPercent]="badge.progress" 
                               nzSize="small" 
                               nzStrokeColor="#FCA311">
                  </nz-progress>
                  <div class="text-xs text-oxford-blue-60 mt-1">
                    {{badge.progressText}}
                  </div>
                </div>
                
                <div *ngIf="!badge.earned && !badge.progress" class="locked-status">
                  <nz-tag nzColor="default" nzSize="small">
                    <i nz-icon nzType="lock" nzTheme="outline"></i>
                    Locked
                  </nz-tag>
                </div>
              </div>
            </div>
          </nz-card>
        </nz-col>
      </nz-row>
    </nz-tab-pane>
    
    <!-- Progress Badges -->
    <nz-tab-pane nzTitle="Progress">
      <!-- Similar structure for progress badges -->
    </nz-tab-pane>
    
    <!-- Achievement Badges -->
    <nz-tab-pane nzTitle="Achievements">
      <!-- Similar structure for achievement badges -->
    </nz-tab-pane>
  </nz-tabs>
</nz-card>
```

**Badge Visual Specifications:**
- **Earned Badges**: Full color, prominent display
- **Progress Badges**: Progress bar, percentage complete
- **Locked Badges**: Grayscale icon, locked status
- **Card Hover**: Subtle shadow increase, Orange Web accent
- **Icons**: Font Awesome or Ant Design icons, 48px size
- **Categories**: Clear tab separation, easy navigation

---

## 5. Admin Approval Interface UI

### 5.1 Admin Dashboard

**Component Mapping:**
```html
<nz-layout class="admin-dashboard">
  <!-- Header -->
  <nz-header class="admin-header">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <div class="admin-branding">
          <h1 nz-typography class="text-xl font-semibold text-white mb-0">
            Civica Admin Panel
          </h1>
        </div>
        
        <div class="admin-stats">
          <nz-space nzSize="large">
            <nz-statistic nzTitle="Pending Review" 
                          [nzValue]="pendingCount"
                          [nzValueStyle]="{'color': 'white', 'fontSize': '20px'}"
                          [nzTitleStyle]="{'color': 'rgba(255,255,255,0.8)', 'fontSize': '12px'}">
            </nz-statistic>
            <nz-statistic nzTitle="Approved Today" 
                          [nzValue]="approvedToday"
                          [nzValueStyle]="{'color': 'white', 'fontSize': '20px'}"
                          [nzTitleStyle]="{'color': 'rgba(255,255,255,0.8)', 'fontSize': '12px'}">
            </nz-statistic>
          </nz-space>
        </div>
      </div>
    </div>
  </nz-header>
  
  <!-- Content -->
  <nz-content class="admin-content p-6">
    <!-- Quick Actions -->
    <nz-card class="quick-actions mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 nz-typography class="text-lg font-semibold text-oxford-blue mb-0">
          Review Queue
        </h2>
        
        <nz-space nzSize="middle">
          <nz-select nzPlaceHolder="Filter by category" style="width: 150px;">
            <nz-option nzValue="all" nzLabel="All Categories"></nz-option>
            <nz-option nzValue="infrastructure" nzLabel="Infrastructure"></nz-option>
            <nz-option nzValue="environment" nzLabel="Environment"></nz-option>
            <nz-option nzValue="transportation" nzLabel="Transportation"></nz-option>
          </nz-select>
          
          <nz-select nzPlaceHolder="Sort by" style="width: 120px;">
            <nz-option nzValue="newest" nzLabel="Newest First"></nz-option>
            <nz-option nzValue="urgent" nzLabel="Most Urgent"></nz-option>
            <nz-option nzValue="supported" nzLabel="Most Supported"></nz-option>
          </nz-select>
        </nz-space>
      </div>
      
      <!-- Pending Issues List -->
      <div class="pending-issues">
        <div *ngFor="let issue of pendingIssues" class="issue-preview mb-4">
          <nz-card nzHoverable (click)="reviewIssue(issue.id)">
            <div class="issue-preview-content">
              <nz-row [nzGutter]="16" class="items-center">
                <!-- Issue Photo -->
                <nz-col [nzSpan]="4">
                  <div class="issue-photo">
                    <img [src]="issue.photos[0]?.url" 
                         [alt]="issue.title"
                         class="w-full h-16 object-cover rounded-lg">
                  </div>
                </nz-col>
                
                <!-- Issue Details -->
                <nz-col [nzSpan]="14">
                  <div class="issue-details">
                    <div class="flex items-center mb-2">
                      <h3 nz-typography class="font-semibold text-oxford-blue mb-0 mr-2">
                        {{issue.title}}
                      </h3>
                      <nz-tag [nzColor]="getUrgencyColor(issue.urgency)" nzSize="small">
                        {{issue.urgency | titlecase}}
                      </nz-tag>
                    </div>
                    
                    <p nz-typography class="text-oxford-blue-60 text-sm mb-2 line-clamp-2">
                      {{issue.description}}
                    </p>
                    
                    <div class="issue-meta">
                      <nz-space nzSize="middle" class="text-xs text-oxford-blue-60">
                        <span>
                          <i nz-icon nzType="user" nzTheme="outline"></i>
                          {{issue.userName}}
                        </span>
                        <span>
                          <i nz-icon nzType="environment" nzTheme="outline"></i>
                          {{issue.address}}
                        </span>
                        <span>
                          <i nz-icon nzType="clock-circle" nzTheme="outline"></i>
                          {{issue.submittedAt | date:'MMM d, HH:mm'}}
                        </span>
                      </nz-space>
                    </div>
                  </div>
                </nz-col>
                
                <!-- Community Support -->
                <nz-col [nzSpan]="3">
                  <div class="community-support text-center">
                    <div class="support-count">
                      <div class="text-lg font-bold text-oxford-blue">{{issue.supportCount}}</div>
                      <div class="text-xs text-oxford-blue-60">supporters</div>
                    </div>
                  </div>
                </nz-col>
                
                <!-- Actions -->
                <nz-col [nzSpan]="3">
                  <div class="issue-actions text-right">
                    <nz-space nzDirection="vertical" nzSize="small">
                      <button nz-button nzType="primary" nzSize="small" (click)="quickApprove(issue.id, $event)">
                        <i nz-icon nzType="check" nzTheme="outline"></i>
                        Approve
                      </button>
                      <button nz-button nzType="default" nzSize="small" (click)="reviewIssue(issue.id, $event)">
                        <i nz-icon nzType="eye" nzTheme="outline"></i>
                        Review
                      </button>
                    </nz-space>
                  </div>
                </nz-col>
              </nz-row>
            </div>
          </nz-card>
        </div>
      </div>
    </nz-card>
  </nz-content>
</nz-layout>
```

### 5.2 Issue Review Modal

**Component Mapping:**
```html
<nz-modal [(nzVisible)]="isReviewModalVisible"
          nzTitle="Review Issue"
          [nzWidth]="800"
          [nzFooter]="reviewModalFooter"
          (nzOnCancel)="closeReviewModal()">
  
  <div *nzModalContent class="issue-review-content">
    <!-- Issue Header -->
    <div class="issue-header mb-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h2 nz-typography class="text-xl font-semibold text-oxford-blue mb-2">
            {{selectedIssue.title}}
          </h2>
          <div class="issue-meta">
            <nz-space nzSize="middle" class="text-sm text-oxford-blue-60">
              <span>
                <i nz-icon nzType="user" nzTheme="outline"></i>
                {{selectedIssue.userName}} ({{selectedIssue.userStats}} issues reported)
              </span>
              <span>
                <i nz-icon nzType="clock-circle" nzTheme="outline"></i>
                {{selectedIssue.submittedAt | date:'full'}}
              </span>
            </nz-space>
          </div>
        </div>
        
        <div class="issue-tags">
          <nz-space nzSize="small">
            <nz-tag nzColor="blue">{{selectedIssue.category}}</nz-tag>
            <nz-tag [nzColor]="getUrgencyColor(selectedIssue.urgency)">
              {{selectedIssue.urgency | titlecase}}
            </nz-tag>
          </nz-space>
        </div>
      </div>
    </div>
    
    <!-- Photo Gallery -->
    <div class="photo-gallery mb-6">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-3">
        Photos ({{selectedIssue.photos.length}})
      </h3>
      
      <nz-space nzSize="middle" nzWrap>
        <div *ngFor="let photo of selectedIssue.photos; let i = index" 
             class="photo-item cursor-pointer"
             (click)="openPhotoViewer(i)">
          <img [src]="photo.thumbnailUrl || photo.url" 
               [alt]="'Photo ' + (i + 1)"
               class="w-24 h-24 object-cover rounded-lg border-2 border-platinum hover:border-orange-web transition-colors">
          
          <!-- Quality Indicator -->
          <div class="quality-indicator mt-1 text-center">
            <nz-tag [nzColor]="getQualityColor(photo.quality)" nzSize="small">
              {{photo.quality | titlecase}}
            </nz-tag>
          </div>
        </div>
      </nz-space>
    </div>
    
    <!-- Issue Description -->
    <div class="issue-description mb-6">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-3">
        Description
      </h3>
      
      <div class="description-content p-4 bg-gray-50 rounded-lg">
        <p nz-typography class="text-oxford-blue leading-relaxed mb-4">
          {{selectedIssue.description}}
        </p>
        
        <!-- AI Generated Indicator -->
        <div *ngIf="selectedIssue.aiGenerated" class="ai-indicator">
          <nz-tag nzColor="blue" nzSize="small">
            <i nz-icon nzType="robot" nzTheme="outline"></i>
            AI Enhanced ({{selectedIssue.aiConfidence}}% confidence)
          </nz-tag>
        </div>
      </div>
      
      <!-- Proposed Solution -->
      <div *ngIf="selectedIssue.proposedSolution" class="proposed-solution mt-4">
        <h4 nz-typography class="font-semibold text-oxford-blue mb-2">
          Proposed Solution:
        </h4>
        <div class="solution-content p-3 bg-green-50 rounded-lg">
          <p nz-typography class="text-oxford-blue">
            {{selectedIssue.proposedSolution}}
          </p>
        </div>
      </div>
    </div>
    
    <!-- Location Details -->
    <div class="location-details mb-6">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-3">
        Location
      </h3>
      
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="12">
          <div class="address-info p-4 bg-gray-50 rounded-lg">
            <div class="font-medium text-oxford-blue mb-2">
              {{selectedIssue.address}}
            </div>
            <div class="text-sm text-oxford-blue-60">
              {{selectedIssue.district}}, {{selectedIssue.city}}
            </div>
            <div class="text-xs text-oxford-blue-60 mt-2">
              Accuracy: {{selectedIssue.locationAccuracy}}m
            </div>
          </div>
        </nz-col>
        
        <nz-col [nzSpan]="12">
          <div class="map-preview h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <i nz-icon nzType="environment" nzTheme="outline" class="text-2xl text-oxford-blue-40"></i>
            <span class="ml-2 text-oxford-blue-60">Map Preview</span>
          </div>
        </nz-col>
      </nz-row>
    </div>
    
    <!-- Community Support -->
    <div class="community-support mb-6">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-3">
        Community Support
      </h3>
      
      <nz-row [nzGutter]="16">
        <nz-col [nzSpan]="8">
          <nz-statistic nzTitle="Supporters" 
                        [nzValue]="selectedIssue.supportCount"
                        [nzValueStyle]="{'color': '#14213D'}">
          </nz-statistic>
        </nz-col>
        <nz-col [nzSpan]="8">
          <nz-statistic nzTitle="Comments" 
                        [nzValue]="selectedIssue.commentCount"
                        [nzValueStyle]="{'color': '#14213D'}">
          </nz-statistic>
        </nz-col>
        <nz-col [nzSpan]="8">
          <nz-statistic nzTitle="Views" 
                        [nzValue]="selectedIssue.viewCount"
                        [nzValueStyle]="{'color': '#14213D'}">
          </nz-statistic>
        </nz-col>
      </nz-row>
    </div>
    
    <!-- Admin Decision -->
    <div class="admin-decision">
      <h3 nz-typography class="text-lg font-semibold text-oxford-blue mb-3">
        Admin Decision
      </h3>
      
      <nz-radio-group [(ngModel)]="adminDecision" class="decision-options mb-4">
        <div nz-space nzDirection="vertical" nzSize="middle">
          <label nz-radio nzValue="approve" class="approval-option">
            <div class="decision-content">
              <div class="font-medium text-success">Approve Issue</div>
              <div class="text-sm text-oxford-blue-60">Forward to relevant authorities</div>
            </div>
          </label>
          
          <label nz-radio nzValue="request_changes" class="changes-option">
            <div class="decision-content">
              <div class="font-medium text-warning">Request Changes</div>
              <div class="text-sm text-oxford-blue-60">Ask user to provide more information</div>
            </div>
          </label>
          
          <label nz-radio nzValue="reject" class="rejection-option">
            <div class="decision-content">
              <div class="font-medium text-error">Reject Issue</div>
              <div class="text-sm text-oxford-blue-60">Issue doesn't meet quality standards</div>
            </div>
          </label>
        </div>
      </nz-radio-group>
      
      <!-- Feedback Text -->
      <nz-form-item>
        <nz-form-label>
          {{getFeedbackLabel()}}
        </nz-form-label>
        <nz-form-control>
          <textarea nz-input 
                    [(ngModel)]="adminFeedback"
                    [placeholder]="getFeedbackPlaceholder()"
                    [nzAutosize]="{ minRows: 3, maxRows: 6 }">
          </textarea>
        </nz-form-control>
      </nz-form-item>
      
      <!-- Quick Response Templates -->
      <div class="quick-responses mt-3">
        <nz-space nzSize="small" nzWrap>
          <nz-tag *ngFor="let template of getResponseTemplates()" 
                  class="cursor-pointer hover:bg-orange-50"
                  (click)="applyTemplate(template)">
            {{template.label}}
          </nz-tag>
        </nz-space>
      </div>
    </div>
  </div>
  
  <!-- Modal Footer Template -->
  <ng-template #reviewModalFooter>
    <nz-space nzSize="middle">
      <button nz-button nzType="default" (click)="closeReviewModal()">
        Cancel
      </button>
      <button nz-button nzType="primary" 
              [nzLoading]="isSubmittingDecision"
              [disabled]="!adminDecision"
              (click)="submitDecision()">
        {{getSubmitButtonText()}}
      </button>
    </nz-space>
  </ng-template>
</nz-modal>
```

**Visual Design Specifications:**
- **Modal Size**: 800px width, responsive height
- **Photo Gallery**: Thumbnail grid, hover effects, quality indicators
- **Decision Options**: Radio buttons with descriptions, color-coded
- **Templates**: Clickable tags for common responses
- **Statistics**: Community engagement metrics
- **Quality Indicators**: Color-coded photo quality assessment

---

## 6. Success/Error States & Feedback

### 6.1 Form Validation States

**Component Specifications:**
```html
<!-- Success State -->
<nz-form-item>
  <nz-form-control nzHasFeedback nzValidateStatus="success">
    <input nz-input placeholder="Email address" />
    <i nz-icon nzType="check-circle" nz-form-control-feedback></i>
  </nz-form-control>
</nz-form-item>

<!-- Error State -->
<nz-form-item>
  <nz-form-control nzHasFeedback nzValidateStatus="error" nzErrorTip="Please enter a valid email">
    <input nz-input placeholder="Email address" />
    <i nz-icon nzType="close-circle" nz-form-control-feedback></i>
  </nz-form-control>
</nz-form-item>

<!-- Warning State -->
<nz-form-item>
  <nz-form-control nzHasFeedback nzValidateStatus="warning" nzErrorTip="This email is already registered">
    <input nz-input placeholder="Email address" />
    <i nz-icon nzType="exclamation-circle" nz-form-control-feedback></i>
  </nz-form-control>
</nz-form-item>

<!-- Loading State -->
<nz-form-item>
  <nz-form-control nzHasFeedback nzValidateStatus="validating">
    <input nz-input placeholder="Email address" />
    <i nz-icon nzType="loading" nz-form-control-feedback></i>
  </nz-form-control>
</nz-form-item>
```

### 6.2 Upload States

**Component Specifications:**
```html
<!-- Photo Upload Success -->
<nz-upload-list>
  <div class="upload-item success">
    <div class="upload-thumbnail">
      <img src="photo-thumb.jpg" alt="Uploaded photo">
    </div>
    <div class="upload-info">
      <div class="upload-name">pothole-photo.jpg</div>
      <div class="upload-status text-success">
        <i nz-icon nzType="check-circle" nzTheme="fill"></i>
        Upload complete
      </div>
    </div>
    <div class="upload-actions">
      <button nz-button nzType="link" nzSize="small">
        <i nz-icon nzType="delete" nzTheme="outline"></i>
      </button>
    </div>
  </div>
</nz-upload-list>

<!-- Photo Upload Error -->
<nz-upload-list>
  <div class="upload-item error">
    <div class="upload-thumbnail error-thumb">
      <i nz-icon nzType="file-image" nzTheme="outline" class="text-2xl text-error"></i>
    </div>
    <div class="upload-info">
      <div class="upload-name">large-photo.jpg</div>
      <div class="upload-status text-error">
        <i nz-icon nzType="close-circle" nzTheme="fill"></i>
        File too large (max 5MB)
      </div>
    </div>
    <div class="upload-actions">
      <button nz-button nzType="link" nzSize="small" class="text-orange-web">
        <i nz-icon nzType="reload" nzTheme="outline"></i>
        Retry
      </button>
    </div>
  </div>
</nz-upload-list>
```

### 6.3 System Messages

**Component Specifications:**
```html
<!-- Success Notification -->
<nz-message nzType="success" nzContent="Issue submitted successfully!"></nz-message>

<!-- Error Notification -->
<nz-message nzType="error" nzContent="Failed to submit issue. Please try again."></nz-message>

<!-- Warning Notification -->
<nz-message nzType="warning" nzContent="Photo quality is low. Consider retaking."></nz-message>

<!-- Info Notification -->
<nz-message nzType="info" nzContent="AI is analyzing your photos..."></nz-message>

<!-- Loading Notification -->
<nz-message nzType="loading" nzContent="Uploading photos..." nzDuration="0"></nz-message>
```

---

## 7. Responsive Design Specifications

### 7.1 Breakpoint System

**Breakpoints (Tailwind + NG-ZORRO):**
- **xs**: 0-575px (Mobile portrait)
- **sm**: 576-767px (Mobile landscape)
- **md**: 768-991px (Tablet portrait)
- **lg**: 992-1199px (Tablet landscape)
- **xl**: 1200-1599px (Desktop)
- **xxl**: 1600px+ (Large desktop)

### 7.2 Component Responsive Behavior

**Registration Forms:**
- **Mobile**: Single column, full-width inputs, stack all elements
- **Tablet**: Single column, centered with max-width 500px
- **Desktop**: Centered card, max-width 400px

**Issue Creation:**
- **Mobile**: Stack photo gallery, full-width camera interface
- **Tablet**: 2-column photo thumbnails, larger camera view
- **Desktop**: 3-column thumbnails, side-by-side layout options

**Dashboard:**
- **Mobile**: Single column stats, stacked action cards
- **Tablet**: 2x2 stats grid, 2-column action cards
- **Desktop**: 4-column stats, horizontal action cards

**Admin Interface:**
- **Mobile**: Stack all issue preview elements vertically
- **Tablet**: Maintain row layout, adjust column widths
- **Desktop**: Full table layout with all columns visible

### 7.3 Touch Target Specifications

**Minimum Touch Targets:**
- **Buttons**: 44px minimum height/width
- **Form inputs**: 44px height
- **Card tap areas**: Full card surface
- **Photo thumbnails**: 80px minimum with 8px padding
- **Navigation items**: 48px height

---

## 8. Accessibility Specifications

### 8.1 WCAG 2.1 AA Compliance

**Color Contrast:**
- **Normal text**: 4.5:1 ratio minimum
- **Large text**: 3:1 ratio minimum
- **UI components**: 3:1 ratio minimum

**Color Usage:**
- **Oxford Blue on White**: 8.2:1 (excellent)
- **Orange Web on White**: 2.9:1 (needs dark text overlay)
- **White on Oxford Blue**: 8.2:1 (excellent)
- **White on Orange Web**: 2.9:1 (acceptable for large text)

**Keyboard Navigation:**
- **Tab order**: Logical flow through all interactive elements
- **Focus indicators**: 2px Orange Web outline with 0.3 opacity
- **Skip links**: "Skip to main content" for screen readers
- **Escape key**: Close modals and overlays

**Screen Reader Support:**
- **Form labels**: All inputs have associated labels
- **Alt text**: Descriptive text for all images
- **ARIA labels**: Proper labeling for complex UI components
- **Status announcements**: Success/error states announced

### 8.2 Accessibility Features

**Visual Accessibility:**
- **High contrast mode**: Support for system preferences
- **Font size scaling**: Responsive to browser font size settings
- **Focus management**: Clear focus indicators, logical tab order
- **Error identification**: Clear error states with descriptions

**Motor Accessibility:**
- **Large touch targets**: 44px minimum for mobile interactions
- **Drag alternatives**: Alternative methods for all drag operations
- **Timeout extensions**: Generous timeouts with extension options
- **Click alternatives**: Keyboard equivalents for all mouse actions

**Cognitive Accessibility:**
- **Clear language**: Simple, direct language throughout
- **Consistent navigation**: Predictable UI patterns
- **Progress indicators**: Clear feedback on multi-step processes
- **Error prevention**: Validation and confirmation for destructive actions

---

## 9. Animation & Micro-interactions

### 9.1 Animation Specifications

**Transition Durations:**
- **Fast**: 150ms - Hover states, button presses
- **Normal**: 300ms - Modal open, card expand, form validation
- **Slow**: 500ms - Page transitions, loading states

**Easing Functions:**
- **ease-out**: Default for entrances and reveals
- **ease-in**: Exits and hiding elements
- **ease-in-out**: State changes and transforms

### 9.2 Micro-interaction Details

**Button Interactions:**
```css
.nz-btn-primary {
  transition: all 0.15s ease-out;
}

.nz-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(252, 163, 17, 0.3);
}

.nz-btn-primary:active {
  transform: translateY(0);
}
```

**Card Hover Effects:**
```css
.nz-card {
  transition: box-shadow 0.3s ease-out;
}

.nz-card:hover {
  box-shadow: 0 8px 24px rgba(20, 33, 61, 0.15);
}
```

**Form Focus States:**
```css
.nz-input:focus {
  border-color: #FCA311;
  box-shadow: 0 0 0 2px rgba(252, 163, 17, 0.2);
  transition: all 0.3s ease-out;
}
```

**Loading Animations:**
- **Skeleton screens**: For content loading
- **Spinner**: For action processing
- **Progress bars**: For file uploads
- **Pulse effects**: For awaiting states

---

## 10. Implementation Guidelines

### 10.1 NG-ZORRO Component Usage

**Required Modules:**
```typescript
// Core modules for all UI components
NzButtonModule,
NzCardModule,
NzFormModule,
NzInputModule,
NzSelectModule,
NzModalModule,
NzTagModule,
NzGridModule,
NzIconModule,
NzToolTipModule,
NzTabsModule,
NzSpaceModule,
NzTypographyModule,
NzLayoutModule,
NzProgressModule,
NzStatisticModule,
NzTimelineModule,
NzUploadModule,
NzMessageModule,
NzNotificationModule,
NzBadgeModule,
NzAvatarModule,
NzDropDownModule,
NzMenuModule,
NzDividerModule,
NzRadioModule,
NzCheckboxModule,
NzDatePickerModule,
NzSpinModule,
NzAlertModule,
NzResultModule
```

### 10.2 CSS Custom Properties

**Theme Variables:**
```css
:root {
  --civica-oxford-blue: #14213D;
  --civica-orange-web: #FCA311;
  --civica-platinum: #E5E5E5;
  --civica-white: #FFFFFF;
  
  --civica-success: #28A745;
  --civica-warning: #FCA311;
  --civica-error: #DC3545;
  --civica-info: #14213D;
  
  --civica-text: #14213D;
  --civica-text-secondary: rgba(20, 33, 61, 0.8);
  --civica-text-disabled: rgba(20, 33, 61, 0.4);
  
  --civica-border: #E5E5E5;
  --civica-border-radius: 8px;
  --civica-shadow: 0 2px 8px rgba(20, 33, 61, 0.1);
}
```

### 10.3 Utility Classes

**Custom Tailwind Extensions:**
```css
.text-oxford-blue { color: #14213D; }
.text-oxford-blue-80 { color: rgba(20, 33, 61, 0.8); }
.text-oxford-blue-60 { color: rgba(20, 33, 61, 0.6); }
.text-oxford-blue-40 { color: rgba(20, 33, 61, 0.4); }

.text-orange-web { color: #FCA311; }
.bg-orange-web { background-color: #FCA311; }
.border-orange-web { border-color: #FCA311; }

.bg-platinum { background-color: #E5E5E5; }
.border-platinum { border-color: #E5E5E5; }

.civica-card-shadow { box-shadow: 0 2px 8px rgba(20, 33, 61, 0.1); }
.civica-card-hover-shadow { box-shadow: 0 8px 24px rgba(20, 33, 61, 0.15); }
```

---

## 11. Quality Assurance Checklist

### 11.1 UI Component Checklist

**Forms:**
- [ ] All inputs have proper labels
- [ ] Validation states are clearly indicated
- [ ] Error messages are specific and helpful
- [ ] Success states provide clear feedback
- [ ] Required fields are visually marked
- [ ] Form submission includes loading states

**Navigation:**
- [ ] Clear visual hierarchy
- [ ] Consistent navigation patterns
- [ ] Breadcrumb trails where appropriate
- [ ] Back button functionality
- [ ] Current page/section indication

**Interactive Elements:**
- [ ] Hover states for all clickable elements
- [ ] Disabled states are visually distinct
- [ ] Loading states for async operations
- [ ] Focus states meet accessibility requirements
- [ ] Touch targets meet minimum size requirements

### 11.2 Cross-Platform Testing

**Browser Support:**
- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

**Device Testing:**
- [ ] iPhone (portrait/landscape)
- [ ] Android phone (portrait/landscape)
- [ ] iPad (portrait/landscape)
- [ ] Android tablet (portrait/landscape)
- [ ] Desktop (1920x1080, 1366x768)

**Performance Criteria:**
- [ ] Initial load under 3 seconds
- [ ] Interactive within 5 seconds
- [ ] Smooth 60fps animations
- [ ] Photo upload under 10 seconds
- [ ] Form submission under 2 seconds

---

## 12. Handoff Assets

### 12.1 Design Tokens Export

**Color Tokens:**
```json
{
  "colors": {
    "primary": "#FCA311",
    "secondary": "#14213D",
    "neutral": "#E5E5E5",
    "surface": "#FFFFFF",
    "success": "#28A745",
    "warning": "#FCA311",
    "error": "#DC3545",
    "info": "#14213D"
  }
}
```

**Typography Tokens:**
```json
{
  "typography": {
    "fontFamily": "Fira Sans",
    "display": "48px/52px",
    "h1": "36px/40px",
    "h2": "30px/36px",
    "h3": "24px/32px",
    "h4": "20px/28px",
    "body": "16px/24px",
    "small": "14px/20px",
    "tiny": "12px/16px"
  }
}
```

**Spacing Tokens:**
```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "xxl": "48px"
  }
}
```

### 12.2 Component Library

**Button Variants:**
- Primary (Orange Web background, white text)
- Secondary (White background, Oxford Blue text, Oxford Blue border)
- Link (No background, Orange Web text)
- Icon buttons (Circular, various sizes)

**Card Variants:**
- Basic card (white background, subtle shadow)
- Hoverable card (shadow increase on hover)
- Highlighted card (Orange Web accent)
- Stats card (colored backgrounds for metrics)

**Form Components:**
- Text inputs (with all validation states)
- Select dropdowns (with search functionality)
- Radio groups (with descriptions)
- Checkboxes (with labels)
- File upload (with progress indicators)

---

## Conclusion

This comprehensive UI design specification provides a complete foundation for implementing Civica's user registration and issue creation system. The design prioritizes:

1. **User-Centered Experience**: Every interaction optimized for civic engagement
2. **Technical Excellence**: Full NG-ZORRO integration with proven patterns
3. **Accessibility First**: WCAG 2.1 AA compliance built into every component
4. **Mobile Performance**: Responsive design optimized for 65% mobile usage
5. **Civic Trust**: Visual design builds confidence in government platform

The modular component approach ensures consistency across the platform while allowing for future expansion and customization. All components are designed with the existing Civica color scheme and typography, creating a cohesive brand experience that encourages civic participation.

**Next Steps:**
1. Development team review and technical validation
2. Accessibility audit with screen reader testing
3. Performance testing on target devices
4. User testing with representative citizen personas
5. Iterative refinement based on feedback

This design specification serves as the definitive guide for implementing a world-class civic engagement platform that empowers citizens to improve their communities through technology.