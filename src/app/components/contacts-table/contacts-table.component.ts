import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, HostListener } from '@angular/core';
import { log } from 'util';
import { IContacts } from '../../interfaces/contacts';


@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css']
})

export class ContactsTableComponent implements OnInit {
  pageSize: Number = 10;
  targetBreakpoint: Number = 600;
  values = new Array();
  pagination: IContacts;
  itemsPerPage: number = 10;



  @Output() PageListener = new EventEmitter();

  constructor() {
    this.pagination = <IContacts>{
      Total: 1,
      CurrentPage: 1,
      Pages: 1,
      ItemsPerPage: this.itemsPerPage
    };


  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('helo re');
    this.filterTable();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (window.innerWidth < this.targetBreakpoint) {
      this.scrolleable();
    } else {
      this.getData();
    }
  }

  ngOnInit() {
    this.getData();
    this.filterTable();
  }


  onScroll() {
    console.log('scrolling.. ');

  }

  changePageEvent(event): void {
    this.pagination.CurrentPage = event.currentPage;
    this.pagination.Total = event.total;
    this.filterTable();
  }

  filterTable() {
    let returnable = [];
    this.pagination.contacts.forEach((element, i) => {
      if (i >= this.pagination.ItemsPerPage * (this.pagination.CurrentPage - 1)
        && i < this.pagination.ItemsPerPage * this.pagination.CurrentPage) {
        returnable.push(element);
      }
    });
    this.pagination.paginated = returnable;
    this.PageListener.emit(this.pagination);
  }

  scrolleable() {
    let returnable = [];
    this.pagination.contacts.forEach((element, i) => {
      if (i + 10 >= this.pagination.ItemsPerPage) {
        returnable.push(element);
      }
    });
    this.pagination.paginated = returnable;
    this.PageListener.emit(this.pagination);
  }

  public getData() {
    for (var i = 0; i < 100; i++) {
      const letter = String.fromCharCode(65 + i);
      const letter_ = String.fromCharCode(66 + i);
      const letter__ = String.fromCharCode(67 + i);

      this.values.push({
        name: 'Iv' + letter + 'n', sourname: 'Abn' + letter_ + letter + letter__, phone: '812328282'
      });
    }

    this.pagination = <IContacts>{
      Total: this.values.length,
      CurrentPage: this.pagination.CurrentPage < 1 ? 1 : this.pagination.Pages,
      Pages: Math.ceil(this.values.length / this.itemsPerPage),
      ItemsPerPage: this.itemsPerPage,
      contacts: this.values
    };

  }

}
