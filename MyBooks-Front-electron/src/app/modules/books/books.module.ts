import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListBooksComponent} from './list-books/list-books.component';
import {BooksRoutingModule} from './books-routing.module';
import {BooksService} from './books.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {NewBooksComponent} from './new-books/new-books.component';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material/select';
import {GlobalService} from '../../shared/services/global.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ListBooksComponent, NewBooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BooksService,
    GlobalService
  ]
})
export class BooksModule {
}
