import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublishersService} from './publishers.service';
import { NewPublisherComponent } from './new-publishers/new-publisher.component';
import {PublishersRoutingModule} from './publishers-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ListPublishersComponent } from './list-publishers/list-publishers.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {GlobalService} from '../../shared/services/global.service';



@NgModule({
  declarations: [NewPublisherComponent, ListPublishersComponent],
  imports: [
    CommonModule,
    PublishersRoutingModule,
    HttpClientModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: [
    PublishersService,
    GlobalService
  ]
})
export class PublishersModule { }
