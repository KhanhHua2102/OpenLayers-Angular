import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from 'src/app/components/map/map.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'page1',
  standalone: true,
  imports: [MatCardModule, MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './page1.component.html',
  styles: ``,
})
export class Page1Component {}
