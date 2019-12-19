import {Component, OnInit} from '@angular/core';
import {Author} from '../../../shared/interfaces/author';
import {Publishers} from '../../../shared/interfaces/publishers';
import {GlobalService} from '../../../shared/services/global.service';
import {Books} from '../books.model';
import {BooksService} from "../books.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.scss']
})
export class NewBooksComponent implements OnInit {

  public authors: Author[];
  public publishers: Publishers[];
  public booksForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private booksService: BooksService
  ) {
  }

  ngOnInit() {
    this.globalService.getAuthors()
      .subscribe((authors: Author[]) => {
        this.authors = authors;
      });

    this.globalService.getPublishers()
      .subscribe((publishers: Publishers[]) => {
        this.publishers = publishers;
      });

    this.booksForm = this.formBuilder.group({
      name: ['', Validators.required],
      ISBN: ['', Validators.required],
      description: [''],
      author_id: ['', Validators.required],
      publishing_company_id: ['', Validators.required]
    });

  }

  saveBook() {
    this.booksService.saveBook(this.booksForm.value)
      .subscribe(res => {
        console.log(res);
      });
  }

}
