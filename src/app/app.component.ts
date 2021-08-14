import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string;

  constructor() {
    this.title = 'admin-portal';
  }

  ngOnInit() {
    localStorage.clear();
  }
}
