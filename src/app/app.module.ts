import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatMenuModule, MatCheckboxModule, MatSliderModule, MatDividerModule, MatStepperModule,
  MatIconModule, MatTableModule, MatExpansionModule, MatDialogModule, MatSelectModule,
  MatChipsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatSnackBarModule
} from '@angular/material';

import { NgxSpinnerModule } from 'ngx-spinner';

import { RetryErrorsInterceptor } from './interceptors/retry-errors.interceptor';
import { CalculatorService } from './calculator/calculator.service';
import { CalculatorComponent } from './calculator/calculator.component';
import { SearchService } from './search/search.service';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TimePickerComponent } from './shared/time-picker/time-picker.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { MacrosTableComponent } from './home/diary/macros-table/macros-table.component';
import { AddGoalService } from './add-goal/add-goal.service';
import { DiaryService } from './home/diary/diary.service';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { DiaryComponent } from './home/diary/diary.component';
import { AddFoodDialogComponent } from './food/add-food-dialog/add-food-dialog.component';
import { FoodService } from './food/food.service';
import { RoutingModule } from './routing.module';
import { ProfileService } from './profile/profile.service';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { FoodComponent } from './food/food.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScrollToDirective } from './shared/scroll-to.directive';
import { HandleErrorsInterceptor } from './interceptors/handle-errors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    CalculatorComponent,
    AddGoalComponent,
    DiaryComponent,
    SearchComponent,
    FoodComponent,
    MacrosTableComponent,
    AddFoodDialogComponent,
    CalendarComponent,
    TimePickerComponent,
    SearchResultsComponent,
    ScrollToDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
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
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSnackBarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    RegisterService,
    LoginService,
    ProfileService,
    AddGoalService,
    SearchService,
    FoodService,
    DiaryService,
    CalculatorService,
    AuthGuard,
    LoggedOutGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryErrorsInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  entryComponents: [
    AddFoodDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
