import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from "./components/personal/personal.component";
import { PERSONAL_ROUTES } from "./components/personal/personal.routes";

const routes: Routes = [
  { path: 'personal', component: PersonalComponent,
children:PERSONAL_ROUTES},
  { path:'**', pathMatch: 'full', redirectTo:'personal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
