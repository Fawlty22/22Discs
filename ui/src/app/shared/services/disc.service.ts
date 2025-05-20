import { computed, Injectable, signal } from '@angular/core';
import { Disc } from '../interfaces/disc.interface';
import { environment } from '../../../environments/environment';
import { DiscSearchResult } from '../interfaces/disc-search-result.interface';
import { catchError, Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DiscService {
  baseUrl: string = `${environment.url}/disc`;
  collection$ = signal<Disc[]>([]);
  collection = computed(this.collection$);

  constructor(private http: HttpClient) {}
  addDiscToCollection(newDisc: Partial<Disc>): Observable<Disc> {
    return this.http.post<Disc>(this.baseUrl, newDisc).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      }),
      tap((newDisc: Disc) => {
        this.collection$.update((collection) => [...collection, newDisc]);
      })
    );
  }

  getDiscByName(discName: string): Observable<DiscSearchResult[]> {
    return this.http
      .get<DiscSearchResult[]>(`${this.baseUrl}/search?name=${discName}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          throw error;
        })
      );
  }

  getDiscById(id: number): Observable<Disc> {
    return this.http.get<Disc>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  getCollection(userId: number): Observable<Disc[]> {
    return this.http.get<Disc[]>(`${this.baseUrl}/collection/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

  setCollection(userId: number): void {
    this.http
      .get<Disc[]>(`${this.baseUrl}/collection/${userId}`)
      .pipe(take(1))
      .subscribe((res: Disc[]) => {
        this.collection$.set(res);
      });
  }

  updateDisc(disc: Disc): Observable<Disc> {
    return this.http.put<Disc>(`${this.baseUrl}/${disc.id}`, disc).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      }),
      tap((updatedDisc: Disc) => {
        let index = this.collection().findIndex(
          (disc) => disc.id === updatedDisc.id
        );
        if (index !== -1) {
          const collection = this.collection();
          collection[index] = { ...collection[index], ...updatedDisc };
          this.collection;
        } else {
          this.collection$.update((value) => [...value, updatedDisc]);
        }
      })
    );
  }

  deleteDisc(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      }),
      tap((result: any) => {
        console.log(result);
        if (result.affected) {
          let index = this.collection().findIndex((disc) => disc.id === id);
          this.collection().splice(index, 1);
        } else {
          throw new Error('Something went wrong');
        }
      })
    );
  }

  translateToDisc(discSearchResult: DiscSearchResult): Partial<Disc> {
    return {
      userId: 1,
      name: discSearchResult.name,
      brand: discSearchResult.brand,
      inBag: false,
      category: discSearchResult.category,
      speed: discSearchResult.speed,
      glide: discSearchResult.glide,
      turn: discSearchResult.turn,
      fade: discSearchResult.fade,
      flightpath: discSearchResult.pic,
    };
  }
}
