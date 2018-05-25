import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AppComponent } from './app.component';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationPipe } from './pipes/pagination.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ContactsTableComponent,
    PaginationComponent,
    PaginationPipe
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

