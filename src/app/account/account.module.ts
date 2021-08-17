import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountComponent, AccountRoutingModule.components
  ],
  imports: [
    CommonModule, AccountRoutingModule
  ]
})
export class AccountModule { }
