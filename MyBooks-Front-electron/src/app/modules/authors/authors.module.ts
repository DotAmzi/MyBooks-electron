import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorsService} from './authors.service';
import { NewAuthorsComponent } from './new-authors/new-authors.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthorsRoutingModule} from './authors-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FlexModule} from '@angular/flex-layout';
import { ListAuthorsComponent } from './list-authors/list-authors.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {GlobalService} from '../../shared/services/global.service';



@NgModule({
  declarations: [NewAuthorsComponent, ListAuthorsComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FlexModule,
    MatExpansionModule
  ],
  providers: [
    AuthorsService,
    GlobalService
  ]
})
export class AuthorsModule { }
