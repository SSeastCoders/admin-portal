import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [UserRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [UserRoutingModule.components],
})
export class UserModule {}
