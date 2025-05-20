import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { BagComponent } from './bag/bag.component';
import { DiscSearchComponent } from './disc-search/disc-search.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'bag', component: BagComponent },
  { path: '**', redirectTo: '' },
  // { path: 'search', component: DiscSearchComponent },
];
