import { Injectable } from '@angular/core';
import { Playlist } from '../interface/playlist';
import { Album } from '../interface/album';
import { Track } from '../interface/track';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AudibleService {

  private baseUrl = 'https://hcny-mobile-server.herokuapp.com';
  // private baseUrl = 'http://localhost:80';

  httpOptions = {
    observe: 'body' as const,
    responseType: 'json' as const,
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDY5NjUzODVmMWQxMjMwYzI2MzVhMCIsImlhdCI6MTU5MjMyMTIzOX0.1mdNlbNfTW2sYkzp5i2uXFPIqKW4AW4x7pXpyZimX0o'
    })
  };

  constructor( private http: HttpClient ) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>( `${this.baseUrl}/playlists`, this.httpOptions ).pipe(
      tap(ev => console.log( 'fetched playlists:' + ev )),
      catchError(this.handleError<Playlist[]>( 'getPlaylists', [] ))
    );
  }

  getAlbums( playlist_slug: string ): Observable<Album[]> {
    return this.http.get<Album[]>( 
      `${this.baseUrl}/albums`, 
      {...this.httpOptions, params: new HttpParams().set('playlist_slug', `${playlist_slug}`) }
    )
    .pipe(
      tap(ev => console.log( 'fetched albums:' + ev )),
      catchError(this.handleError<Album[]>( 'getAlbums', [] ))
    );
  }

  getTracks( album_slug: string ): Observable<Track[]> {
    return this.http.get<Track[]>( 
      `${this.baseUrl}/tracks`, 
      {...this.httpOptions, params: new HttpParams().set('album_slug', `${album_slug}`) }
    )
    .pipe(
      tap(ev => console.log( 'fetched tracks:' + ev )),
      catchError(this.handleError<Track[]>( 'getTracks', [] ))
    );
  }

  getTrack( slug: string ): Observable<Track> {
    return this.http.get<Track>( 
      `${this.baseUrl}/tracks`, 
      {...this.httpOptions, params: new HttpParams().set('slug', `${slug}`) }
    )
    .pipe(
      tap(ev => console.log( 'fetched single track:' + ev )),
      catchError(this.handleError<Track>( 'getTrack', {title: '', slug: '', uri: '', sound: null} ))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
