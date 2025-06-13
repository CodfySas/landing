import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsPageComponent } from './components/terms-page/terms.component';
import { LandingComponent } from './components/landing/landing.component';

const routes = [
  { path: '', component: LandingComponent },
  { path: 'terminos', component: TermsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
