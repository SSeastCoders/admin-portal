import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from './services/validation/phone-mask.directive';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';
import { RegisterComponent } from './register/register.component';
import { AccountModule } from './account/account.module';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { AccountsComponent } from './accounts/accounts.component';
import { MaterialModule } from './services/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    PhoneMaskDirective,
    AppButtonComponent,
    AccountsComponent,
    CreateAccountComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NoopAnimationsModule,
    CommonModule,
    AccountModule,
    MaterialModule
  ],
  providers: [
    UserService,
    AuthService,
    StorageService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
