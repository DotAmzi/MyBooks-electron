import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {GlobalService} from '../../../shared/services/global.service';
import {Author} from '../../../shared/interfaces/author';
import {DialogModel} from '../../../shared/components/confirmation-modal/dialog-model';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import {AuthorsService} from '../authors.service';

@Component({
  selector: 'app-list-authors',
  templateUrl: './list-authors.component.html',
  styleUrls: ['./list-authors.component.scss']
})
export class ListAuthorsComponent implements OnInit {
  public authors: Author[];

  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private authorService: AuthorsService
  ) {
  }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this.globalService.getAuthors()
      .subscribe((res: Author[]) => {
        this.authors = res;
      });
  }

  removeAuthor(id: any) {
    const message = 'Você realmente deseja remover este autor?';

    const dialogData = new DialogModel('Atenção', message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.authorService.deleteAuthor(id)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe((message: string) => {
            this.getAuthors();
          });
      }
    });
  }

}
