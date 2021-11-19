import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Credit } from 'src/app/models/credit';
import { CardService } from 'src/app/services/card/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit {
  cards!: Credit[];
  pageSize: number = 5;
  pageNumber: number = 0;
  searchForm!: FormGroup;
  totalElements!: number;
  asc: boolean = false;
  sorter: string;
  pageEvent: PageEvent;
  currentDate: Date = new Date();

  displayedColumns: string[] = ['swipe', 'nickName', 'users', 'balance'];

  dataSource: MatTableDataSource<Credit>;

  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder
  ) {}

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (mp !== undefined && this.dataSource) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    }
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    if (ms !== undefined && this.dataSource) {
      this.sort = ms;
      this.setDataSourceAttributes();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.buildForm();
    this.cardService
      .getCardsByPage(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.cards = data.content;
        this.dataSource = new MatTableDataSource(this.cards);
        this.totalElements = data.totalElements;
      });
  }

  setSort(sort: string) {
    console.log('clicked');
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.getCards(this.pageNumber, this.pageSize, this.sorter, this.asc);
  }

  public getCardsPageEvent(event?: PageEvent) {
    this.getCards(event?.pageIndex, event?.pageSize, this.sorter, this.asc);
    return event;
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      nickname: ['', []],
      fromAmount: ['', []],
      toAmount: ['', []],
      fromDate: ['', []],
      toDate: ['', []],
      status: [null, []],
    });
  }

  submit() {
    if (this.searchForm.valid) {
      this.getCards(0, 5, this.sorter, this.asc);
    }
  }

  /**
   * Retrieves accounts from filters and page number
   * @param pageIndex the current page displayed for table
   * @param pageSize the number of elements to show on table
   */
  private getCards(
    pageIndex: number,
    pageSize: number,
    sorter?: string,
    asc?: boolean
  ) {
    this.cardService
      .getCardsByPage(
        pageIndex,
        pageSize,
        this.searchForm.get('nickname').value,
        this.searchForm.get('fromAmount').value,
        this.searchForm.get('toAmount').value,
        this.searchForm.get('fromDate').value,
        this.searchForm.get('toDate').value,
        this.searchForm.get('status').value,
        sorter,
        asc
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
    this.cardService
      .getCardsByPage(this.pageNumber, this.pageSize)
      .subscribe((data) => {
        this.cards = data.content;
        this.dataSource = new MatTableDataSource(this.cards);
        this.totalElements = data.totalElements;
      });
  }

  // ngOnInit(): void {
  //   this.getCards();
  //   this.dataSource = new MatTableDataSource(this.cards);
  //   this.dataSource.paginator = this.paginator;
  // }

  // getCards() {
  //   this.cardService.getCardsPage(this.pageNumber, this.pageSize, this.sorter, this.asc)
  //   .subscribe((data) => {
  //     console.log(data);
  //     this.cards = data.content;
  //     this.dataSource = new MatTableDataSource(this.cards);
  //     console.log(this.dataSource);
  //     //this.paginator.pageIndex = data.pageable?.pageNumber;
  //    // this.paginator.pageSize = data.pageable?.pageSize;
  //    // this.paginator.length = data?.totalElements;
  //    this.pageNumber = data.pageable?.pageNumber;
  //    this.pageSize = data.pageable?.pageSize;
  //    this.totalElements = data?.totalElements;
  //   });
  // }

  // public getCardsPageEvent(event?:PageEvent){
  //   this.cardService.getCardsPage(event.pageIndex, event.pageSize, this.sorter, this.asc).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.dataSource = data.content;
  //       this.pageNumber = data.pageable.pageNumber;
  //       this.pageSize = data.size;
  //       this.totalElements = data.totalElements;
  //     });
  //   return event;
  // }

  // setSort(sort: string) {
  //   console.log("clicked");
  //   if (this.asc && this.sorter === sort) {
  //     this.asc = false;
  //   } else {
  //     this.sorter = sort;
  //     this.asc = true;
  //   }
  //   this.getCards();
  // }
}
