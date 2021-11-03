import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css'],
})
export class TransactionTableComponent implements OnInit {
  transactions!: Transaction[];
  dataSource: MatTableDataSource<Transaction>;
  searchForm!: FormGroup;
  displayedColumns: string[] = [
    'date',
    'description',
    'amount',
    'type',
    'succeeded',
  ];
  totalElements!: number;
  // asc: boolean = false;
  pageEvent: PageEvent;
  totalAccounts!: number;
  pageSize: number = 5;
  pageNumber: number = 0;
  accountId: number;
  currentDate: Date = new Date();
  // sorter: string;
  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  private paginator: MatPaginator;
  // private sort: MatSort;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined && this.dataSource) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.accountId = id;
        this.buildForm();
        this.transactionService
          .getTransactionsByAccount(
            this.accountId,
            this.pageNumber,
            this.pageSize
          )
          .subscribe((data) => {
            this.transactions = data.content;
            this.dataSource = new MatTableDataSource(this.transactions);
            this.totalElements = data.totalElements;
          });
      }
    });
  }

  public getTransactionPageEvent(event?: PageEvent) {
    this.retrieveTransactions(event?.pageIndex, event?.pageSize);
    return event;
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      search: ['', []],
      fromAmount: ['', []],
      toAmount: ['', []],
      fromDate: ['', []],
      toDate: ['', []],
    });
  }
  submit() {
    if (this.searchForm.valid) {
      this.retrieveTransactions(0, 5)
    }
  }

  /**
   * Retrieves transactions from filters and page number
   * @param pageIndex the current page displayed for table
   * @param pageSize the number of elements to show on table
   */
  private retrieveTransactions(pageIndex: number, pageSize: number) {
    this.transactionService
      .getTransactionsByAccount(
        this.accountId,
        pageIndex,
        pageSize,
        this.searchForm.get('search').value,
        this.searchForm.get('fromAmount').value,
        this.searchForm.get('toAmount').value,
        this.searchForm.get('fromDate').value,
        this.searchForm.get('toDate').value
      )
      .subscribe((data) => {
        this.dataSource = data.content as any;
        this.pageNumber = pageIndex;
        this.pageSize = pageSize;
        this.totalElements = data.totalElements;
      });
  }

  reset() {
    this.pageNumber = 0;
    this.pageSize = 5;
    this.searchForm.reset();
    this.transactionService
      .getTransactionsByAccount(this.accountId, this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.transactions = data.content;
        this.dataSource = new MatTableDataSource(this.transactions);
        this.totalElements = data.totalElements;
      });
  }

  // setSort(sort: string) {
  //   console.log('clicked');
  //   if (this.asc && this.sorter === sort) {
  //     this.asc = false;
  //   } else {
  //     this.sorter = sort;
  //     this.asc = true;
  //   }
  //   this.getAccounts();
  // }
}
