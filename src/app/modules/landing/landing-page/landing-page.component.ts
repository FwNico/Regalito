import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {


  redirectMeli() {
    window.location.href = 'https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=1680797094583707&redirect_uri=https://localhost:4200/home';
  }
}
