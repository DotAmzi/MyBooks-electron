import {Component, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {Book} from '../../../shared/interfaces/book';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import {DialogModel} from '../../../shared/components/confirmation-modal/dialog-model';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit {
  public books: Book[];

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks()
      .subscribe((res: Book[]) => {
        this.books = res;
      });
  }

  removeBook(id: number): void {
    const message = 'Você realmente deseja remover este livro?';

    const dialogData = new DialogModel('Atenção', message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.booksService.deleteBooks(id)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe((message: string) => {
            this.getBooks();
          });
      }
    });
  }

}
