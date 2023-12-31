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
import { UserComponent } from './dashboard/counselor/list/user/user.component';
import { DetailsComponent } from './dashboard/director/details/details.component';
import { AccountsComponent } from './dashboard/counselor/form/accounts/accounts.component';
import { CommonModule } from '@angular/common';
import { TransferComponent } from './dashboard/counselor/form/transfer/transfer.component';
import { DateTimeDisplayComponent } from './common/datetimedisplay/datetimedisplay.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    DashboardComponent,
    DirectorComponent,
    CounselorComponent,
    ListComponent,
    UserComponent,
    FormComponent,
    DetailsComponent,
    AccountsComponent,
    TransferComponent,
    DateTimeDisplayComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
