import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorsService} from './authors.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthorsService
  ]
})
export class AuthorsModule { }
