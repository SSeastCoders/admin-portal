import {  Component, OnInit, ViewChild } from '@angular/core';
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
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;
  asc: boolean = false;
  sorter: string;
  pageEvent: PageEvent;

  displayedColumns : string[] = ['swipe','nickName','users','balance'];

  dataSource: MatTableDataSource<Credit>;

  constructor(private cardService: CardService) {   }

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
    this.getCards();
    this.dataSource = new MatTableDataSource(this.cards);
    this.dataSource.paginator = this.paginator;
  }

  getCards() {
    this.cardService.getCardsPage(this.pageNumber, this.pageSize, this.sorter, this.asc)
    .subscribe((data) => {
      console.log(data);
      this.cards = data.content;
      this.dataSource = new MatTableDataSource(this.cards);
      console.log(this.dataSource);
     this.pageNumber = data.pageable?.pageNumber;
     this.pageSize = data.pageable?.pageSize;
     this.totalElements = data?.totalElements;
    });
  }

  public getCardsPageEvent(event?:PageEvent){
    this.cardService.getCardsPage(event.pageIndex, event.pageSize, this.sorter, this.asc).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
      });
    return event;
  }

  setSort(sort: string) {
    console.log("clicked");
    if (this.asc && this.sorter === sort) {
      this.asc = false;
    } else {
      this.sorter = sort;
      this.asc = true;
    }
    this.getCards();
  }
}
