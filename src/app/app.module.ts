import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
//import { UserService } from './services/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './observables/user-list/user-list.component';
import { UserFormComponent } from './observables/user-list/user-form/user-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { TokenService } from './services/auth/token.service';
import { AuthService } from './services/auth/auth.service';
import { JwtTokenInterceptor } from './services/interceptor/jwt.token.interceptor';
import { HeaderComponent } from './layout/header/header.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './create-user/validators/phone-mask.directive';
import { AppButtonComponent } from './layout/app-button/app-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChangeDetectorRef } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UserFormComponent,
    HeaderComponent,
    CreateUserComponent,
    PhoneMaskDirective,
    AppButtonComponent,
    //UsersComponent
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
  ],
  providers: [
    UserService,
    TokenService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
