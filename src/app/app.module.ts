import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './common/topbar/topbar.component';
import { CounselorComponent } from './dashboard/counselor/counselor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirectorComponent } from './dashboard/director/director.component';
import { ListComponent } from './dashboard/counselor/list/list.component';
import { FormComponent } from './dashboard/counselor/form/form.component';
import { AccountsComponent } from './dashboard/counselor/accounts/accounts.component';
import { UserComponent } from './dashboard/counselor/list/user/user.component';
import { DetailsComponent } from './dashboard/director/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    CounselorComponent,
    DashboardComponent,
    DirectorComponent,
    ListComponent,
    FormComponent,
    AccountsComponent,
    UserComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
