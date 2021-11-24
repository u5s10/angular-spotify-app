import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Track } from '../models/track.model';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  private lastSearch: string = '';
  private readonly apiUrl = 'https://express-spotify-proxy.herokuapp.com'

  getLastSearch(): string {
    return this.lastSearch;
  }

  setLastSearch(query: string) {
    this.lastSearch = query;
  }

  getTracks(query: string): Observable<Track[]> {
    query = query.trim();

    const options = query ?
      { params: new HttpParams().set('q', query) } : {};
    return this.http.get<Track[]>(`${this.apiUrl}/tracks`, options);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${id}`);
  }

  getAlbumsTracks(id: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/albums/${id}/tracks`)
  }
}
