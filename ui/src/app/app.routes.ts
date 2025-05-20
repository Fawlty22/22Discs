import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollectionComponent } from './collection/collection.component';
import { BagComponent } from './bag/bag.component';
import { DiscSearchComponent } from './disc-search/disc-search.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
  // { path: 'search', component: DiscSearchComponent },
];
