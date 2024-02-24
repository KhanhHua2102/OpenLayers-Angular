import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'landing-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styles: ``,
})
export class LandingComponent {}
