import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDE_ARTICLES } from '../../../generated/guide-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly guideArticles = GUIDE_ARTICLES.slice(0, 2);
  readonly currentYear = new Date().getFullYear();
}
