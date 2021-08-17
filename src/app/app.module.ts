import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PhoneMaskDirective } from './services/validation/phone-mask.directive';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { CreateAccountComponent } from './account/create-account/create-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    PhoneMaskDirective,
    AppButtonComponent,
    CreateAccountComponent,
    RegisterComponent,
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
    StorageService,
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
