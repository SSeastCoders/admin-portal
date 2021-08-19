import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from './services/validation/phone-mask.directive';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth/auth.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { StorageService } from './services/storage/storage.service';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountModule } from './account/account.module';


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
    AccountsComponent,
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
    CommonModule,
    AccountModule
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
