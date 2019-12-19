import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewPublisherComponent} from './new-publishers/new-publisher.component';
import {ListPublishersComponent} from './list-publishers/list-publishers.component';

const routes: Routes = [
  {path: '', redirectTo: 'list'},
  {path: 'list', component: ListPublishersComponent},
  {path: 'new', component: NewPublisherComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PublishersRoutingModule {
}
