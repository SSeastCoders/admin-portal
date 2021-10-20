import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css'],
})
export class TransactionTableComponent implements OnInit {
  transactions!: Transaction[];
  dataSource: MatTableDataSource<Transaction>;
  displayedColumns: string[] = ['date', 'description', 'amount', 'type', 'succeeded'];
  totalElements!: number;
  // asc: boolean = false;
  pageEvent: PageEvent;
  totalAccounts!: number;
  pageSize: number = 5;
  pageNumber: number = 0;
  accountId: number;
  // sorter: string;
  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
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
         this.transactionService.getTransactionsByAccount(this.accountId, this.pageNumber, this.pageSize).subscribe(
           (data) => {
             console.log(data);
             this.transactions = data.content;
             this.dataSource = new MatTableDataSource(this.transactions);
             this.totalElements = data.totalElements;
           }
         );
       }
     });
  }

  public getTransactionPageEvent(event?: PageEvent) {
    this.transactionService
      .getTransactionsByAccount(
        this.accountId,
        event?.pageIndex,
        event?.pageSize
      )
      .subscribe((data) => {
        console.log(data);
        this.dataSource = data.content as any;
        this.pageNumber = event.pageIndex;
        this.pageSize = event.pageSize;
        this.totalElements = data.totalElements;
      });
    return event;
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
