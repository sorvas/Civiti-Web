import { Injectable } from '@angular/core';
import { googleMapsConfig } from '../../environments/google-maps-config';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsConfigService {
  // Store the API key as a const (based on Stack Overflow solution)
  private readonly apiKey: string = googleMapsConfig.apiKey;

  getApiKey(): string {
    return this.apiKey;
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (typeof google !== 'undefined' && google.maps) {
        resolve();
        return;
      }

      if (!this.apiKey || this.apiKey === 'YOUR_DEVELOPMENT_API_KEY') {
        // Try meta tag as fallback
        const metaTag = document.querySelector('meta[name="google-maps-api-key"]');
        const metaApiKey = metaTag?.getAttribute('content') || '';
        
        if (!metaApiKey || metaApiKey === 'YOUR_DEVELOPMENT_API_KEY') {
          reject(new Error('Google Maps API key not configured'));
          return;
        }
        
        // Use meta tag value
        this.loadScript(metaApiKey, resolve, reject);
      } else {
        // Use config value
        this.loadScript(this.apiKey, resolve, reject);
      }
    });
  }

  private loadScript(apiKey: string, resolve: () => void, reject: (error: Error) => void): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding&loading=async`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps script loaded successfully');
      resolve();
    };
    
    script.onerror = () => reject(new Error('Failed to load Google Maps'));

    document.head.appendChild(script);
  }
}