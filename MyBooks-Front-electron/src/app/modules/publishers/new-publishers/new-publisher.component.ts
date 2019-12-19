import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PublishersService} from '../publishers.service';

@Component({
  selector: 'app-new-publisher',
  templateUrl: './new-publisher.component.html',
  styleUrls: ['./new-publisher.component.scss']
})
export class NewPublisherComponent implements OnInit {

  public publishersForm: FormGroup;

  constructor(
    private publishersService: PublishersService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.publishersForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  savePublisher() {
    this.publishersService.savePublisher(this.publishersForm.value)
      .subscribe(res => {
        console.log(res);
      });
  }
}
