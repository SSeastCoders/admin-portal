import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[];
  public fakers = [
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
    { faker: 'faker17' },
  ];
  public pageSlice = this.fakers.slice(0, 10);

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  OnPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.fakers.length) {
      endIndex = this.fakers.length;
    }
    this.pageSlice = this.fakers.slice(startIndex, endIndex);
  }
}
