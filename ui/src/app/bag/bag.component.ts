import { Component, computed, input, Input } from '@angular/core';
import { MaterialModule } from '../shared/modules/material.module';
import { DiscService } from '../shared/services/disc.service';
import { Disc } from '../shared/interfaces/disc.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-bag',
  imports: [MaterialModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent {
  collection = input<Disc[]>([]);
  bag = computed(() => this.collection().filter((each) => each.inBag));
  constructor(private discService: DiscService) {}

  addDiscToCollection(disc: Disc) {
    disc.inBag = false;
    const newDisc = this.discService.updateDisc(disc).pipe(take(1)).subscribe();
  }
}
