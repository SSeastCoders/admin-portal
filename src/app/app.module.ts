import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user/user.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';

import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from './services/validation/phone-mask.directive';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { RegisterComponent } from './register/register.component';
import { AccountModule } from './account/account.module';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { AccountsComponent } from './accounts/accounts.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CardListComponent } from './components/card-list/card-list.component';
import { MaterialModule } from './services/material/material.module';
import { UserModule } from './user/user.module';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    FooterComponent,
    PhoneMaskDirective,
    AccountsComponent,
    CreateAccountComponent,
    RegisterComponent,
    CardListComponent,
    AppButtonComponent,
    TransactionTableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
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
    AppRoutingModule,
    MaterialModule,
    UserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    UserService,
    AuthService,
    StorageService,
    MaterialModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
