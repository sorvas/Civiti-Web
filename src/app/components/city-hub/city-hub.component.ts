import { Component } from '@angular/core';
import { IssuesListComponent } from '../issues-list/issues-list.component';

@Component({
  selector: 'app-city-hub',
  standalone: true,
  imports: [IssuesListComponent],
  templateUrl: './city-hub.component.html',
  styleUrl: './city-hub.component.scss',
})
export class CityHubComponent {}
