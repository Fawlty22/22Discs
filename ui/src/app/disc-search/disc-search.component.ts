import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DiscService } from '../shared/services/disc.service';
import { take } from 'rxjs';
import { DiscSearchResult } from '../shared/interfaces/disc-search-result.interface';
import { Disc } from '../shared/interfaces/disc.interface';
import { MaterialModule } from '../shared/modules/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disc-search',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './disc-search.component.html',
  styleUrl: './disc-search.component.css',
})
export class DiscSearchComponent {
  discName: string = '';
  searched: boolean = false;
  results: DiscSearchResult[] = [];
  collection: Disc[] = [];
  constructor(
    private discService: DiscService,
    private snackbar: MatSnackBar
  ) {}
  // public dialogRef: MatDialogRef<DiscSearchComponent>

  // close() {
  //   this.dialogRef.close();
  // }

  searchForDisc() {
    if (!this.discName) return;
    this.discService
      .getDiscByName(this.discName)
      .pipe(take(1))
      .subscribe((responseDiscs: DiscSearchResult[]) => {
        this.results = responseDiscs;
        this.searched = true;
        this.results = responseDiscs;
      });
  }

  addDiscToCollection(discData: DiscSearchResult) {
    const newDisc = this.discService.translateToDisc(discData);
    this.discService
      .addDiscToCollection(newDisc)
      .pipe(take(1))
      .subscribe((response: Disc) => {
        this.collection.push(response);
        this.snackbar.open('Disc added to collection!', 'Close', {
          duration: 3000, // 3 seconds
          verticalPosition: 'bottom', // or 'top'
          horizontalPosition: 'center', // or 'start' | 'end' | 'left' | 'right'
        });
      });
  }
}
