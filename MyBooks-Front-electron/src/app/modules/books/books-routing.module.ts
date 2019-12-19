import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListBooksComponent} from './list-books/list-books.component';
import {NewBooksComponent} from "./new-books/new-books.component";

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: ListBooksComponent},
  {path: 'new', component: NewBooksComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class BooksRoutingModule {
}
