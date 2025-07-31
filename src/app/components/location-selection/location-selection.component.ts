import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as LocationActions from '../../store/location/location.actions';
import { MockDataService } from '../../services/mock-data.service';
import { SanitizationService } from '../../services/sanitization.service';

interface LocationData {
  counties: { id: string; name: string }[];
  cities: { id: string; name: string }[];
  districts: { id: string; name: string }[];
}

@Component({
  selector: 'app-location-selection',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzSelectModule,
    NzFormModule,
    NzCardModule,
    NzIconModule,
    NzInputModule,
    NzAlertModule,
    NzGridModule,
    NzTypographyModule,
  ],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4">
      <nz-card class="w-full max-w-md mx-auto">
        <div class="text-center mb-6">
          <h1 nz-typography class="text-2xl font-bold mb-2 text-oxford-blue">
            Civica - Participare Civică
          </h1>
          <p nz-typography nzType="secondary" class="text-oxford-blue opacity-75">
            Selectează-ți locația pentru a vedea problemele din comunitate
          </p>
        </div>

        <form nz-form [formGroup]="locationForm" (ngSubmit)="onContinue()" nzLayout="vertical">
          <!-- County Selection -->
          <nz-form-item>
            <nz-form-label nzRequired>Județ</nz-form-label>
            <nz-form-control>
              <nz-select formControlName="county" nzPlaceHolder="Selectează județul" nzShowSearch>
                <nz-option nzValue="B" nzLabel="București"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <!-- City Selection -->
          <nz-form-item>
            <nz-form-label nzRequired>Oraș</nz-form-label>
            <nz-form-control>
              <nz-select formControlName="city" nzPlaceHolder="Selectează orașul" nzShowSearch>
                <nz-option nzValue="BUCURESTI" nzLabel="București"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <!-- District Selection -->
          <nz-form-item>
            <nz-form-label nzRequired>Cartier/Sector</nz-form-label>
            <nz-form-control>
              <nz-select formControlName="district" nzPlaceHolder="Selectează sectorul" nzShowSearch>
                <nz-option nzValue="SECTOR5" nzLabel="Sector 5"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <!-- Info Box -->
          <nz-alert
            nzType="info"
            nzMessage="Pentru MVP"
            nzDescription="Momentan aplicația funcționează doar pentru București, Sectorul 5."
            nzShowIcon
            class="mb-6"
          ></nz-alert>

          <!-- Continue Button -->
          <nz-form-item>
            <button 
              nz-button 
              nzType="primary" 
              nzBlock
              nzSize="large"
              type="submit"
              [nzLoading]="isLoading"
            >
              <i nz-icon nzType="arrow-right" nzTheme="outline" class="mr-2"></i>
              {{ isLoading ? 'Se încarcă...' : 'Continuă la Probleme' }}
            </button>
          </nz-form-item>
        </form>

        <!-- Footer -->
        <div class="text-center mt-6 pt-4 border-t border-platinum">
          <p class="text-xs text-oxford-blue opacity-50">
            Platforma Civica - Împreună pentru comunitate
          </p>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    nz-card {
      box-shadow: 0 8px 24px rgba(20, 33, 61, 0.1);
      border: 1px solid var(--platinum);
    }

    .text-orange-web {
      color: var(--orange-web);
    }

    .text-oxford-blue {
      color: var(--oxford-blue);
    }

    .text-primary {
      color: var(--oxford-blue);
    }

    .bg-background {
      background-color: var(--color-background);
    }

    .border-platinum {
      border-color: var(--platinum);
    }

    button[nz-button] {
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.025em;
    }

    nz-form-item {
      margin-bottom: 16px;
    }

    nz-form-item:last-child {
      margin-bottom: 0;
    }
  `]
})
export class LocationSelectionComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _store = inject(Store<AppState>);
  private _mockDataService = inject(MockDataService);
  private _sanitizer = inject(SanitizationService);

  locationData: LocationData | null = null;
  isLoading = false;

  locationForm = this._fb.group({
    county: [{ value: 'B', disabled: true }, Validators.required],
    city: [{ value: 'BUCURESTI', disabled: true }, Validators.required],
    district: [{ value: 'SECTOR5', disabled: true }, Validators.required] // Only Sector 5 for MVP
  });

  ngOnInit(): void {
    this.loadLocationData();
  }

  private loadLocationData(): void {
    this.isLoading = true;
    this._mockDataService.getLocationData().subscribe({
      next: (data) => {
        this.locationData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading location data:', error);
        this.isLoading = false;
      }
    });
  }

  onContinue(): void {
    // For MVP, all fields are pre-filled and disabled, so we don't need to validate
    // Use getRawValue() to include disabled form controls
    const rawData = this.locationForm.getRawValue();

    // Sanitize values before storing
    const selectedLocation = {
      county: this._sanitizer.sanitizeUrlParam(rawData.county || ''),
      city: this._sanitizer.sanitizeUrlParam(rawData.city || ''),
      district: this._sanitizer.sanitizeUrlParam(rawData.district || '')
    };

    console.log('Location data:', selectedLocation); // Debug log

    // Dispatch action to store location in state (effects will handle storage)
    this._store.dispatch(LocationActions.setLocation(selectedLocation));

    // Navigate to issues list
    this._router.navigate(['/issues']);
  }
} 