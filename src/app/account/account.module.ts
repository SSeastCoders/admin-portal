import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './account-edit/delete-modal/delete-modal.component';
import { EditModalComponent } from './account-edit/edit-modal/edit-modal.component';
import { UserSearchModalComponent } from './user-search-modal/user-search-modal.component';
import { MaterialModule } from '../services/material/material.module';

@NgModule({
  imports: [
    AccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    AccountRoutingModule.components,
    DeleteModalComponent,
    EditModalComponent,
    UserSearchModalComponent,
  ],
})
export class AccountModule {}
