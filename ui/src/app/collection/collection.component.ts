import { Component } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { DiscService } from '../shared/services/disc.service';
import { MatDialog } from '@angular/material/dialog';
import { DiscSearchComponent } from '../disc-search/disc-search.component';
import { Disc } from '../shared/interfaces/disc.interface';
import { take } from 'rxjs';
import { BagComponent } from '../bag/bag.component';

@Component({
  selector: 'app-collection',
  imports: [MaterialModule, BagComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.css',
})
export class CollectionComponent {
  collection;

  constructor(private discService: DiscService, private dialog: MatDialog) {
    this.collection = this.discService.collection;
  }

  ngOnInit(): void {
    this.discService.setCollection(1);
  }

  openDiscSearchModal() {
    const dialogRef = this.dialog.open(DiscSearchComponent);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {});
  }

  addDiscToBag(disc: Disc): void {
    const updatedDisc = { ...disc, inBag: true };
    const newDisc = this.discService
      .updateDisc(updatedDisc)
      .pipe(take(1))
      .subscribe();
  }

  deleteDisc(discId: number) {
    this.discService.deleteDisc(discId).pipe(take(1)).subscribe();
  }
}
