import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatMenuModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatStepperModule,
  MatAutocompleteModule, MatIconModule, MatTableModule, MatListModule, MatExpansionModule,
  MatGridListModule, MatDialogModule, MatSelectModule
} from '@angular/material';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AddFoodDialogComponent } from './food/add-food-dialog/add-food-dialog.component';
import { MacrosTableComponent } from './dashboard/diary/macros-table/macros-table.component';
import { DiaryService } from './dashboard/diary/diary.service';
import { FoodService } from './food/food.service';
import { SearchService } from './dashboard/search/search.service';
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
import { FoodComponent } from './food/food.component';

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
    FoodComponent,
    MacrosTableComponent,
    AddFoodDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
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
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    MatGridListModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    RegisterService,
    LoginService,
    ProfileService,
    AddGoalService,
    SearchService,
    FoodService,
    DiaryService,
    AuthGuard,
    LoggedOutGuard,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true }
  ],
  entryComponents: [
    AddFoodDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
