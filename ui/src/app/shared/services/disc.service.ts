import { Injectable, signal } from '@angular/core';
import { Disc } from '../interfaces/disc.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiscService {
  baseUrl: string = `${environment.url}/discs`;
  collection$ = signal<Disc[]>([]);
  constructor() {}
}
