import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Map2Component } from '../../components/map2/map2.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'page2',
  standalone: true,
  imports: [MatCardModule, Map2Component, HeaderComponent, FooterComponent],
  templateUrl: './page2.component.html',
  styles: ``,
})
export class Page2Component {}
