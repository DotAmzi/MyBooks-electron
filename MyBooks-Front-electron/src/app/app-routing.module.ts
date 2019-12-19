import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule)},
  {path: 'authors', loadChildren: () => import('./modules/authors/authors.module').then(m => m.AuthorsModule)},
  {
    path: 'publishers',
    loadChildren: () => import('./modules/publishers/publishers.module').then(m => m.PublishersModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
