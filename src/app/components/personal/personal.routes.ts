import { Routes } from '@angular/router';
import { EditarComponent } from "./editar/editar.component";


export const PERSONAL_ROUTES: Routes = [
          {path:'editar/:id', component: EditarComponent},
          { path:'**', pathMatch: 'full', redirectTo:'editar'}
     

    ]