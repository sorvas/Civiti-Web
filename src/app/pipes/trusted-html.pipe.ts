import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Bypasses Angular's HTML sanitization for trusted, build-time-generated content.
 * Only use for HTML produced by the build-guides.js script — never for user input.
 */
@Pipe({ name: 'trustedHtml', standalone: true })
export class TrustedHtmlPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
