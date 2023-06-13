import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CounselorComponent } from './dashboard/counselor/counselor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirectorComponent } from './dashboard/director/director.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [ 

      {
        path: 'counselor',
        component: CounselorComponent,
      },
      {
        path: 'director',
        component: DirectorComponent
      }
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
