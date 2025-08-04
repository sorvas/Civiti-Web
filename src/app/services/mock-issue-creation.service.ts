import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface IssueCreationData {
  id?: string;
  title: string;
  description: string;
  category: IssueCategory;
  photos: PhotoData[];
  location: LocationData;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'in_progress' | 'resolved' | 'rejected';
  aiGeneratedText?: {
    description: string;
    proposedSolution: string;
    confidence: number;
  };
  additionalDetails?: {
    whenOccurred: string;
    affectedPeople: number;
    previousReports: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IssueCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface PhotoData {
  id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  quality: 'low' | 'medium' | 'high';
  timestamp: Date;
  metadata?: {
    size: number;
    dimensions: { width: number; height: number };
    format: string;
  };
}

export interface LocationData {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  accuracy: number;
  neighborhood?: string;
  landmark?: string;
}

export interface AIAnalysisResult {
  description: string;
  proposedSolution: string;
  confidence: number;
  suggestedCategory?: string;
  extractedDetails: {
    urgency?: 'low' | 'medium' | 'high' | 'urgent';
    affectedArea?: string;
    estimatedCost?: string;
    timeToResolve?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MockIssueCreationService {
  private readonly STORAGE_KEY = 'civica_draft_issues';
  
  private issueCategories: IssueCategory[] = [
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      description: 'Roads, sidewalks, utilities',
      icon: '🚧',
      examples: ['Potholes', 'Broken sidewalks', 'Street lighting', 'Water pipes']
    },
    {
      id: 'environment',
      name: 'Environment',
      description: 'Parks, pollution, cleanliness',
      icon: '🌳',
      examples: ['Illegal dumping', 'Park maintenance', 'Air quality', 'Noise pollution']
    },
    {
      id: 'transportation',
      name: 'Transportation',
      description: 'Traffic, parking, public transport',
      icon: '🚦',
      examples: ['Traffic signals', 'Parking issues', 'Bus stops', 'Bike lanes']
    },
    {
      id: 'public-services',
      name: 'Public Services',
      description: 'Government buildings, services',
      icon: '🏢',
      examples: ['Office hours', 'Service quality', 'Accessibility', 'Staff issues']
    },
    {
      id: 'safety',
      name: 'Safety & Security',
      description: 'Crime, emergency services, safety hazards',
      icon: '🛡️',
      examples: ['Poor lighting', 'Dangerous areas', 'Emergency response', 'Vandalism']
    },
    {
      id: 'other',
      name: 'Other',
      description: 'Other community issues',
      icon: '📝',
      examples: ['Community events', 'Suggestions', 'General concerns']
    }
  ];

  private aiDescriptionTemplates = [
    'There is a {severity} {issue_type} on {location} that {impact}. The {problem_details} appears to be {size_description} and {condition_description}, with {safety_concern} that could {consequence}.',
    'A {problem_type} has been identified at {location}, affecting {affected_area}. The issue shows {visible_signs} and {urgency_indicator}. This {problem_category} requires {recommended_action}.',
    'The {infrastructure_element} at {location} presents {issue_description}. {current_state} and {impact_description}. {safety_assessment} and {community_impact}.'
  ];

  private aiSolutionTemplates = [
    '{authority_type} should {primary_action} to {desired_outcome}. This would involve {implementation_steps} and {expected_timeline}.',
    'Recommended solution involves {solution_approach} by {responsible_party}. The work should include {specific_actions} to ensure {quality_outcome}.',
    'To resolve this issue, {action_required} with {resource_needs}. This should {prevent_recurrence} and {improve_situation}.'
  ];

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({}));
    }
  }

  getIssueCategories(): Observable<IssueCategory[]> {
    console.log('[MOCK ISSUE] Loading issue categories...');
    
    return of(this.issueCategories).pipe(
      delay(200)
    );
  }

  createDraftIssue(userId: string): Observable<IssueCreationData> {
    console.log('[MOCK ISSUE] Creating draft issue for user:', userId);
    
    return of(null).pipe(
      delay(300),
      map(() => {
        const draftIssue: IssueCreationData = {
          id: this.generateIssueId(),
          title: '',
          description: '',
          category: this.issueCategories[0], // Default to first category
          photos: [],
          location: {
            address: '',
            coordinates: { lat: 0, lng: 0 },
            accuracy: 0
          },
          urgency: 'medium',
          status: 'draft',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId
        };

        this.saveDraftIssue(draftIssue);
        return draftIssue;
      })
    );
  }

  updateDraftIssue(issueId: string, updates: Partial<IssueCreationData>): Observable<IssueCreationData> {
    console.log('[MOCK ISSUE] Updating draft issue:', issueId, updates);
    
    return of(null).pipe(
      delay(200),
      map(() => {
        const drafts = this.getDraftIssues();
        const draft = drafts[issueId];
        
        if (!draft) {
          throw new Error('Draft issue not found');
        }

        const updatedDraft = {
          ...draft,
          ...updates,
          updatedAt: new Date()
        };

        drafts[issueId] = updatedDraft;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
        
        return updatedDraft;
      })
    );
  }

  getDraftIssue(issueId: string): Observable<IssueCreationData | null> {
    console.log('[MOCK ISSUE] Loading draft issue:', issueId);
    
    return of(null).pipe(
      delay(200),
      map(() => {
        const drafts = this.getDraftIssues();
        return drafts[issueId] || null;
      })
    );
  }

  uploadPhoto(issueId: string, file: File): Observable<PhotoData> {
    console.log('[MOCK ISSUE] Uploading photo for issue:', issueId, file.name);
    
    return of(null).pipe(
      delay(1500), // Simulate upload time
      map(() => {
        const photoData: PhotoData = {
          id: this.generatePhotoId(),
          url: URL.createObjectURL(file), // Create blob URL for preview
          thumbnail: URL.createObjectURL(file), // In real app, would be smaller
          quality: this.analyzePhotoQuality(file),
          timestamp: new Date(),
          metadata: {
            size: file.size,
            dimensions: { width: 800, height: 600 }, // Mock dimensions
            format: file.type
          }
        };

        // Update draft with new photo
        const drafts = this.getDraftIssues();
        if (drafts[issueId]) {
          drafts[issueId].photos.push(photoData);
          drafts[issueId].updatedAt = new Date();
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
        }

        return photoData;
      })
    );
  }

  removePhoto(issueId: string, photoId: string): Observable<boolean> {
    console.log('[MOCK ISSUE] Removing photo:', photoId, 'from issue:', issueId);
    
    return of(null).pipe(
      delay(200),
      map(() => {
        const drafts = this.getDraftIssues();
        if (drafts[issueId]) {
          drafts[issueId].photos = drafts[issueId].photos.filter(photo => photo.id !== photoId);
          drafts[issueId].updatedAt = new Date();
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
          return true;
        }
        return false;
      })
    );
  }

  generateAIDescription(photos: PhotoData[], briefDescription: string, category: IssueCategory): Observable<AIAnalysisResult> {
    console.log('[MOCK ISSUE] Generating AI description from photos and brief:', briefDescription);
    
    return of(null).pipe(
      delay(2000), // Simulate AI processing time
      map(() => {
        const analysisResult: AIAnalysisResult = {
          description: this.generateMockDescription(category, briefDescription),
          proposedSolution: this.generateMockSolution(category),
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          suggestedCategory: category.id,
          extractedDetails: {
            urgency: this.determineUrgency(briefDescription),
            affectedArea: this.extractAffectedArea(briefDescription),
            estimatedCost: this.estimateCost(category),
            timeToResolve: this.estimateTimeToResolve(category)
          }
        };

        console.log('[MOCK ISSUE] AI analysis complete:', analysisResult);
        return analysisResult;
      })
    );
  }

  submitIssue(issue: IssueCreationData): Observable<{ issueId: string; submissionConfirmed: boolean }> {
    console.log('[MOCK ISSUE] Submitting issue:', issue);
    
    return of(null).pipe(
      delay(1000),
      map(() => {
        // Validate required fields
        if (!issue.title || !issue.description || issue.photos.length === 0) {
          throw new Error('Please fill in all required fields and add at least one photo');
        }

        // Move from draft to submitted
        const finalIssue = {
          ...issue,
          status: 'submitted' as const,
          updatedAt: new Date()
        };

        // In real app, would send to backend
        // For now, store in submitted issues
        this.storeSubmittedIssue(finalIssue);
        
        // Remove from drafts
        this.removeDraftIssue(issue.id!);

        console.log('[MOCK ISSUE] Issue submitted successfully:', finalIssue.id);
        
        return {
          issueId: finalIssue.id!,
          submissionConfirmed: true
        };
      })
    );
  }

  // Mock location detection
  detectCurrentLocation(): Observable<LocationData> {
    console.log('[MOCK ISSUE] Detecting current location...');
    
    return of(null).pipe(
      delay(1500),
      map(() => {
        // Mock location in Sector 5, București
        const mockLocation: LocationData = {
          address: 'Strada Libertății nr. 45, Sector 5, București',
          coordinates: {
            lat: 44.4268 + (Math.random() - 0.5) * 0.01,
            lng: 26.1025 + (Math.random() - 0.5) * 0.01
          },
          accuracy: Math.random() * 20 + 5, // 5-25m accuracy
          neighborhood: 'Rahova',
          landmark: 'Near Metro Station Eroilor'
        };

        return mockLocation;
      })
    );
  }

  // Private helper methods
  private generateIssueId(): string {
    return 'issue-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  }

  private generatePhotoId(): string {
    return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
  }

  private analyzePhotoQuality(file: File): 'low' | 'medium' | 'high' {
    // Mock quality analysis based on file size
    if (file.size > 2000000) return 'high'; // > 2MB
    if (file.size > 500000) return 'medium'; // > 500KB
    return 'low';
  }

  private generateMockDescription(category: IssueCategory, briefDescription: string): string {
    const template = this.aiDescriptionTemplates[Math.floor(Math.random() * this.aiDescriptionTemplates.length)];
    
    const replacements: { [key: string]: string } = {
      '{severity}': ['minor', 'moderate', 'significant', 'serious'][Math.floor(Math.random() * 4)],
      '{issue_type}': category.examples[0] || 'issue',
      '{location}': 'Strada Libertății',
      '{impact}': 'affects daily community life',
      '{problem_details}': briefDescription || 'the reported problem',
      '{size_description}': ['small', 'medium-sized', 'large', 'extensive'][Math.floor(Math.random() * 4)],
      '{condition_description}': ['deteriorated', 'damaged', 'broken', 'worn'][Math.floor(Math.random() * 4)],
      '{safety_concern}': 'creating safety concerns',
      '{consequence}': 'lead to accidents or further damage'
    };

    let description = template;
    Object.keys(replacements).forEach(key => {
      description = description.replace(new RegExp(key, 'g'), replacements[key]);
    });

    return description;
  }

  private generateMockSolution(category: IssueCategory): string {
    const template = this.aiSolutionTemplates[Math.floor(Math.random() * this.aiSolutionTemplates.length)];
    
    const replacements: { [key: string]: string } = {
      '{authority_type}': 'The local municipal authority',
      '{primary_action}': 'undertake immediate repair work',
      '{desired_outcome}': 'restore safe passage for residents',
      '{implementation_steps}': 'assessment, material procurement, and professional repair',
      '{expected_timeline}': 'completion within 2-3 weeks',
      '{solution_approach}': 'coordinated municipal intervention',
      '{responsible_party}': 'the infrastructure maintenance team',
      '{specific_actions}': 'proper materials and professional workmanship',
      '{quality_outcome}': 'long-lasting resolution'
    };

    let solution = template;
    Object.keys(replacements).forEach(key => {
      solution = solution.replace(new RegExp(key, 'g'), replacements[key]);
    });

    return solution;
  }

  private determineUrgency(description: string): 'low' | 'medium' | 'high' | 'urgent' {
    const urgentKeywords = ['dangerous', 'hazard', 'urgent', 'emergency', 'safety'];
    const highKeywords = ['broken', 'damaged', 'blocked', 'leak'];
    const mediumKeywords = ['worn', 'needs', 'should'];
    
    const lowerDesc = description.toLowerCase();
    
    if (urgentKeywords.some(keyword => lowerDesc.includes(keyword))) return 'urgent';
    if (highKeywords.some(keyword => lowerDesc.includes(keyword))) return 'high';
    if (mediumKeywords.some(keyword => lowerDesc.includes(keyword))) return 'medium';
    
    return 'low';
  }

  private extractAffectedArea(description: string): string {
    const areas = ['pedestrian walkway', 'vehicle access', 'entire block', 'local community'];
    return areas[Math.floor(Math.random() * areas.length)];
  }

  private estimateCost(category: IssueCategory): string {
    const costs: { [key: string]: string } = {
      'infrastructure': '5,000 - 15,000 RON',
      'environment': '2,000 - 8,000 RON',
      'transportation': '3,000 - 12,000 RON',
      'public-services': '1,000 - 5,000 RON',
      'safety': '2,500 - 10,000 RON',
      'other': '1,000 - 3,000 RON'
    };
    
    return costs[category.id] || '2,000 - 5,000 RON';
  }

  private estimateTimeToResolve(category: IssueCategory): string {
    const times: { [key: string]: string } = {
      'infrastructure': '2-4 weeks',
      'environment': '1-3 weeks',
      'transportation': '1-2 weeks',
      'public-services': '3-7 days',
      'safety': '1-2 weeks',
      'other': '1-4 weeks'
    };
    
    return times[category.id] || '1-3 weeks';
  }

  private getDraftIssues(): { [id: string]: IssueCreationData } {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  }

  private saveDraftIssue(issue: IssueCreationData): void {
    const drafts = this.getDraftIssues();
    drafts[issue.id!] = issue;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
  }

  private removeDraftIssue(issueId: string): void {
    const drafts = this.getDraftIssues();
    delete drafts[issueId];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drafts));
  }

  private storeSubmittedIssue(issue: IssueCreationData): void {
    const submitted = JSON.parse(localStorage.getItem('civica_submitted_issues') || '{}');
    submitted[issue.id!] = issue;
    localStorage.setItem('civica_submitted_issues', JSON.stringify(submitted));
  }
}