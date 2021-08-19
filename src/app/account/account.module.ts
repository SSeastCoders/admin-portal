import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';


@NgModule({
  imports: [AccountRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountRoutingModule.components]
})
export class AccountModule { }
