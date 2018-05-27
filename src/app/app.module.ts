import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';
import { ProfileService } from './profile/profile.service';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    RegisterService,
    LoginService,
    ProfileService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
