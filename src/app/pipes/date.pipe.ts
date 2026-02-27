import { Pipe, PipeTransform } from '@angular/core';

// These pipes use new Date() internally, making them technically impure.
// Kept pure intentionally: inputs are immutable timestamps, values are
// correct at render time, and pure: false would run on every change
// detection cycle — negating the performance benefit over method calls.

@Pipe({
  name: 'daysSince',
  standalone: true
})
export class DaysSincePipe implements PipeTransform {
  transform(date: string | Date | null | undefined): number {
    if (!date) return 0;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: string | null | undefined): string {
    if (!date) return '';
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Acum câteva minute';
    if (diffInHours < 24) return `Acum ${diffInHours}h`;
    const days = Math.floor(diffInHours / 24);
    if (days === 1) return 'Ieri';
    if (days < 7) return `Acum ${days} zile`;
    return new Date(date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
  }
}

@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
  transform(dateStr: string | null | undefined): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Chiar acum';
    if (diffMinutes < 60) return `Acum ${diffMinutes} min`;
    if (diffHours < 24) return `Acum ${diffHours}h`;
    if (diffDays < 7) return `Acum ${diffDays} zile`;

    return date.toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
