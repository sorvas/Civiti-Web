import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface SeoConfig {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  robots?: string;
}

const DEFAULTS = {
  title: 'Civiti — Participare Civică',
  description: 'Civiti — Platformă de participare civică din România. Raportează probleme locale și presează autoritățile prin campanii coordonate email.',
  ogImage: '/images/logo/civiti-og-image.png',
  ogType: 'website',
} as const;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly document = inject(DOCUMENT);

  updateMetaTags(config: SeoConfig): void {
    const title = config.title
      ? `${config.title} | Civiti`
      : DEFAULTS.title;
    const description = config.description || DEFAULTS.description;
    const ogImage = config.ogImage || DEFAULTS.ogImage;
    const ogType = config.ogType || DEFAULTS.ogType;

    this.titleService.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    if (config.ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: config.ogUrl });
    }

    if (config.robots) {
      this.meta.updateTag({ name: 'robots', content: config.robots });
    }

    this.updateCanonicalUrl(config.ogUrl);
  }

  resetToDefaults(): void {
    this.titleService.setTitle(DEFAULTS.title);
    this.meta.updateTag({ name: 'description', content: DEFAULTS.description });
    this.meta.updateTag({ property: 'og:title', content: DEFAULTS.title });
    this.meta.updateTag({ property: 'og:description', content: DEFAULTS.description });
    this.meta.updateTag({ property: 'og:image', content: DEFAULTS.ogImage });
    this.meta.updateTag({ property: 'og:type', content: DEFAULTS.ogType });
    this.meta.updateTag({ name: 'twitter:title', content: DEFAULTS.title });
    this.meta.updateTag({ name: 'twitter:description', content: DEFAULTS.description });
    this.meta.updateTag({ name: 'twitter:image', content: DEFAULTS.ogImage });
    this.removeCanonicalUrl();
  }

  private updateCanonicalUrl(url?: string): void {
    this.removeCanonicalUrl();
    if (url) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }

  private removeCanonicalUrl(): void {
    const existing = this.document.querySelector('link[rel="canonical"]');
    if (existing) {
      existing.remove();
    }
  }
}
