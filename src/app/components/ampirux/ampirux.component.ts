import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeroAComponent } from './hero.component';
import { FeaturesAComponent } from './features.component';
import { CtaComponent } from './cta.component';
import { ResponsiveShowcaseComponent } from './responsive.component';
import { DashboardShowcaseComponent } from './dashboard.component';

@Component({
  selector: 'app-ampirux-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroAComponent, 
    FeaturesAComponent,
    CtaComponent,
    ResponsiveShowcaseComponent,
    DashboardShowcaseComponent
  ],
  template: `
    <div class="app">
      <app-heroa></app-heroa>
      <app-featuresa></app-featuresa>
      <app-dashboard-showcase></app-dashboard-showcase>
      <app-responsive-showcase></app-responsive-showcase>
      <app-cta></app-cta>
    </div>
  `,
})
export class Ampirux {}