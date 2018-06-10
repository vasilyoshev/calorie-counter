import { AddFoodService } from './dashboard/add-food/add-food.service';
import { SearchService } from './dashboard/search/search.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule,
  MatInputModule, MatMenuModule, MatCheckboxModule, MatSliderModule,
  MatDividerModule, MatStepperModule, MatAutocompleteModule, MatIconModule, MatTableModule
} from '@angular/material';
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
import { LoggedOutGuard } from './guards/logged-out.guard';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AlertComponent } from './shared/alert/alert.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { AddGoalService } from './dashboard/add-goal/add-goal.service';
import { AddGoalComponent } from './dashboard/add-goal/add-goal.component';
import { DiaryComponent } from './dashboard/diary/diary.component';
import { SearchComponent } from './dashboard/search/search.component';
import { AddFoodComponent } from './dashboard/add-food/add-food.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AlertComponent,
    CalculatorComponent,
    DiaryComponent,
    AddGoalComponent,
    SearchComponent,
    AddFoodComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDividerModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [
    RegisterService,
    LoginService,
    ProfileService,
    AddGoalService,
    SearchService,
    AddFoodService,
    AuthGuard,
    LoggedOutGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
