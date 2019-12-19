import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewAuthorsComponent} from './new-authors/new-authors.component';
import {ListAuthorsComponent} from './list-authors/list-authors.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: ListAuthorsComponent},
  {path: 'new', component: NewAuthorsComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AuthorsRoutingModule {
}
