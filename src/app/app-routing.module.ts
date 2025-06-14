import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsPageComponent } from './components/terms-page/terms.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotaMaestro } from './components/notamaestro/notamaestro.component';
import { Ampirux } from './components/ampirux/ampirux.component';

const routes = [
  { path: '', component: LandingComponent },
  { path: 'terminos', component: TermsPageComponent },
  { path: 'notamaestro', component: NotaMaestro },
  { path: 'ampirux', component: Ampirux },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
