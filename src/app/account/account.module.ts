import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DeleteModalComponent } from './account-edit/delete-modal/delete-modal.component';


@NgModule({
  imports: [AccountRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AccountRoutingModule.components, DeleteModalComponent]
})
export class AccountModule { }
