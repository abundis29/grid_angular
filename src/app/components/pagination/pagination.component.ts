import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { IContacts } from '../../interfaces/contacts';
import { ContactsTableComponent } from '../contacts-table/contacts-table.component';
import { log } from 'util';


export interface IPaginationItems {
  Index: number;
  PageLabel: string;
  Active: boolean;
  Disable: boolean;
  AriaLabel: string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  pageSize: Number = 10;
  targetBreakpoint: Number = 600;
  values = new Array();

  @Input() pagination: IContacts;
  @Output() pageChanged = new EventEmitter();

  public items: IPaginationItems[];

  constructor(private gc: ContactsTableComponent) { }

  ngOnInit() {
    this.loadPagination();
    this.gc.PageListener.subscribe(event => {
      this.pagination.CurrentPage = event.CurrentPage;
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      if (changes[propName].isFirstChange()) {
        const to = JSON.stringify(changes[propName].currentValue);
        // log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        this.loadPagination();
      }

    }
  }

  loadPagination() {
    if (this.pagination.CurrentPage >= this.pagination.Pages) {
      return;
    }


    this.items = [
      {
        Index: -1,
        PageLabel: '|«',
        Active: false,
        Disable: this.pagination.CurrentPage <= 5 ? true : false,
        AriaLabel: 'First'
      } as IPaginationItems
    ];


    this.items.push(
      {
        Index: -2,
        PageLabel: '«',
        Active: false,
        Disable: this.pagination.CurrentPage == 1 ? true : false,
        AriaLabel: 'Previous'
      } as IPaginationItems
    );



    let modulus: number = this.pagination.CurrentPage;
    let integer: number = Math.floor(this.pagination.CurrentPage / this.pagination.ItemsPerPage);

    if (modulus === 0 && integer > 0) {
      integer--;
    }

    if (modulus > (this.pagination.ItemsPerPage / 2) || modulus == 0) {
      for (let i = integer * 10 + 5; i < (integer * 10) + 10; i++) {
        if (i >= this.pagination.Pages) {
          return;
        }

        this.items.push(
          {
            Index: i - 1,
            PageLabel: String(i + 1),
            Active: i === this.pagination.CurrentPage ? true : false,
            Disable: false,
            AriaLabel: ''
          } as IPaginationItems
        );
      }
    } else if (modulus <= 5) {
      for (let i = integer * this.pagination.ItemsPerPage; i < (integer * this.pagination.ItemsPerPage)
      + (this.pagination.ItemsPerPage / 2); i++) {
        if (i >= this.pagination.Pages) {
          return;
        }
        this.items.push(
          {
            Index: i,
            PageLabel: String(i + 1),
            Active: i + 1 == this.pagination.CurrentPage ? true : false,
            Disable: false,
            AriaLabel: ''
          } as IPaginationItems
        );
      }
    }

    this.items.push(
      {
        Index: -3,
        PageLabel: '»',
        Active: false,
        Disable: this.pagination.CurrentPage == this.pagination.Pages ? true : false,
        AriaLabel: 'Next'
      } as IPaginationItems
    );

    this.items.push(
      {
        Index: -4,
        PageLabel: '»|',
        Active: false,
        Disable: this.pagination.CurrentPage > this.pagination.Pages - 5 ? true : false,
        AriaLabel: 'Last'
      } as IPaginationItems
    );

  }
  changePage(event) {
    console.log(event);
    console.log(this.pagination);
    try {
      switch (event) {
        case -1:
          if (this.pagination.CurrentPage <= 5) {
            return;
          }

          this.pagination.CurrentPage = 1;

          break;

        case -2:
        // reetur
          if (this.pagination.CurrentPage == 1) {
            return;
          }

          this.pagination.CurrentPage -= 1;
          break;

        case -3:
        // next
          if (this.pagination.CurrentPage == this.pagination.Pages) {
            return;
          }
          this.pagination.CurrentPage += 1;
          break;


        case -4:
          if (this.pagination.CurrentPage > this.pagination.Pages - 1) {
            return;
          }

          this.pagination.CurrentPage = this.pagination.Pages - 1;
          break;


        default:
          if (this.pagination.CurrentPage === event + 1) {
            return;
          }
          this.pagination.CurrentPage = event + 1;
          break;
      }

      this.pageChanged.emit({
        currentPage: this.pagination.CurrentPage,
        total: this.pagination.Total
      });

    } catch (error) {
      console.log('================⚠️ ERROR===================');
      console.log(error);
      console.log('================⚠️ ERROR===================');
    }
    this.loadPagination();
  }


}
