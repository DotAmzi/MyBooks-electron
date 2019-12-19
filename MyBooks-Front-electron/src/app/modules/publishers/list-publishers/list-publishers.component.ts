import {Component, OnInit} from '@angular/core';
import {Publishers} from '../../../shared/interfaces/publishers';
import {MatDialog} from '@angular/material/dialog';
import {GlobalService} from '../../../shared/services/global.service';
import {PublishersService} from '../publishers.service';
import {DialogModel} from '../../../shared/components/confirmation-modal/dialog-model';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-list-publishers',
  templateUrl: './list-publishers.component.html',
  styleUrls: ['./list-publishers.component.scss']
})
export class ListPublishersComponent implements OnInit {
  public publishers: Publishers[];

  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private publishService: PublishersService
  ) {
  }

  ngOnInit() {
    this.getPublishers();
  }

  getPublishers() {
    this.globalService.getPublishers()
      .subscribe((res: Publishers[]) => {
        this.publishers = res;
      });
  }

  removePublisher(id: number) {
    const message = 'Você realmente deseja remover esta editora?';

    const dialogData = new DialogModel('Atenção', message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.publishService.deletePublisher(id)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe((message: string) => {
            this.getPublishers();
          });
      }
    });
  }
}
