import { Pipe, PipeTransform } from '@angular/core';
import { UrgencyLevel } from '../types/civica-api.types';

/**
 * Pure pipe to check if an issue urgency is 'Urgent'.
 * Returns true for 'Urgent' level, false otherwise.
 * Cached by Angular - only recalculates when input changes.
 */
@Pipe({
  name: 'isUrgent',
  standalone: true,
  pure: true
})
export class IsUrgentPipe implements PipeTransform {
  transform(urgency: UrgencyLevel | null | undefined): boolean {
    return urgency === 'urgent';
  }
}
