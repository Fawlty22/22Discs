import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { BagComponent } from './bag/bag.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'bag', component: BagComponent },
  //   { path: 'search', component:SearchComponent },
];
