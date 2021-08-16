import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ViewAccountComponent } from './account/view-account/view-account.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { RegisterComponent } from './register/register.component';
import { PhoneMaskDirective } from './services/validation/phone-mask.directive';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    PhoneMaskDirective,
    AppButtonComponent,
    ViewAccountComponent,
    CreateAccountComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NoopAnimationsModule,
    CommonModule
  ],
  providers: [
    UserService,
    TokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
