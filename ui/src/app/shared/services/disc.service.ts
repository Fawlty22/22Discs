import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, take, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Disc } from '../interfaces/disc.interface';
import { DiscSearchResult } from '../interfaces/disc-search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class DiscService {
  private readonly baseUrl = `${environment.url}/disc`;

  // 🔔 Writable signal
  private readonly _collection = signal<Disc[]>([]);

  // ✅ Public readonly computed accessor
  readonly collection = computed(() => this._collection());

  constructor(private readonly http: HttpClient) {
    console.log('[DiscService] Initialized');
  }

  /** Replace entire collection */
  setCollection(userId: number): void {
    this.http
      .get<Disc[]>(`${this.baseUrl}/collection/${userId}`)
      .pipe(
        take(1),
        catchError((error) => {
          console.error('[setCollection] Failed:', error);
          return throwError(() => error);
        }),
        tap((discs) => {
          console.log('[setCollection] Fetched:', discs);
          this._collection.set(discs);
        })
      )
      .subscribe();
  }

  /** Add a disc and update signal */
  addDiscToCollection(newDisc: Partial<Disc>): Observable<Disc> {
    console.log(
      '[addDiscToCollection] Current collection before add:',
      this._collection()
    );

    return this.http.post<Disc>(this.baseUrl, newDisc).pipe(
      catchError((error) => {
        console.error('[addDiscToCollection] Failed:', error);
        return throwError(() => error);
      }),
      tap((savedDisc) => {
        const updated = [...this._collection(), savedDisc];
        console.log('[addDiscToCollection] Updated collection:', updated);
        this._collection.set(updated);
      })
    );
  }

  /** Update existing disc */
  updateDisc(disc: Disc): Observable<Disc> {
    return this.http.put<Disc>(`${this.baseUrl}/${disc.id}`, disc).pipe(
      catchError((error) => {
        console.error('[updateDisc] Failed:', error);
        return throwError(() => error);
      }),
      tap((updatedDisc) => {
        const updatedCollection = this._collection().map((d) =>
          d.id === updatedDisc.id ? updatedDisc : d
        );
        this._collection.set(updatedCollection);
      })
    );
  }

  /** Delete a disc and update the collection */
  deleteDisc(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('[deleteDisc] Failed:', error);
        return throwError(() => error);
      }),
      tap((result: any) => {
        if (result?.affected) {
          this._collection.update((prev) =>
            prev.filter((disc) => disc.id !== id)
          );
        } else {
          throw new Error('[deleteDisc] No records affected');
        }
      })
    );
  }

  /** Fetch disc details */
  getDiscById(id: number): Observable<Disc> {
    return this.http.get<Disc>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('[getDiscById] Failed:', error);
        return throwError(() => error);
      })
    );
  }

  getDiscByName(name: string): Observable<DiscSearchResult[]> {
    return this.http
      .get<DiscSearchResult[]>(`${this.baseUrl}/search?name=${name}`)
      .pipe(
        catchError((error) => {
          console.error('[getDiscByName] Failed:', error);
          return throwError(() => error);
        })
      );
  }

  getCollection(userId: number): Observable<Disc[]> {
    return this.http.get<Disc[]>(`${this.baseUrl}/collection/${userId}`).pipe(
      catchError((error) => {
        console.error('[getCollection] Failed:', error);
        return throwError(() => error);
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
