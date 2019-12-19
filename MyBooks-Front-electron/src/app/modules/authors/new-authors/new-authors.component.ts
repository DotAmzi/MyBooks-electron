import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorsService} from '../authors.service';

@Component({
  selector: 'app-new-authors',
  templateUrl: './new-authors.component.html',
  styleUrls: ['./new-authors.component.scss']
})
export class NewAuthorsComponent implements OnInit {

  public authorsForm: FormGroup;

  constructor(
    private authorsService: AuthorsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.authorsForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  saveAuthor() {
    this.authorsService.saveAuthor(this.authorsForm.value)
      .subscribe(res => {
        console.log(res);
      });
  }

}
