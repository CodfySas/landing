import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeroNComponent } from './heron.component';
import { FeaturesComponent } from './festures.component';
import { BenefitsComponent } from './benefits.components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nota-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroNComponent, 
    FeaturesComponent,
    BenefitsComponent,
  ],
  template: `
    <div class="app">
      <main>
        <app-heron></app-heron>
        <app-features></app-features>
        <app-benefits></app-benefits>
      </main>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
    }

    /* Smooth scrolling para los enlaces de navegación */
    html {
      scroll-behavior: smooth;
    }

    /* Ajuste para el header fijo */
    section[id] {
      scroll-margin-top: 80px;
    }
  `]
})
export class NotaMaestro {}