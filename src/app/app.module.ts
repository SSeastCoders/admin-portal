// app/app.module.ts
import { NgModule } from  '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from  './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from  '@angular/material/toolbar';
 
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule
 
  ],
  declarations: [
    AppModule,
    // ...
  ]
})

export  class  AppModule { }