import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../models/track.model';
import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  private query: string = '';
  private offset: number = 0;
  private readonly apiUrl = 'https://express-spotify-proxy.herokuapp.com';
  private tracks: Track[] = []; 
  private tracks$ = new BehaviorSubject<Track[]>([]);

  getTracksStream(): Observable<Track[]>{
    return this.tracks$.asObservable();
  }

  getLastSearch(): string {
    return this.query;
  }

  setLastSearch(query: string) {
    this.query = query;
  }

  getTracks(search: string) {
    if(search === this.query)
      return;
    this.spinner.show();
    this.offset = 0;
    const options = search ?
      { params: new HttpParams().set('q', search).set('offset', this.offset) } : {};
    this.http.get<Track[]>(`${this.apiUrl}/tracks`, options)
      .subscribe(
        (tracks: Track[]) => {
          this.tracks = tracks;
          this.tracks$.next(this.tracks);
          this.spinner.hide();
        }
      )
  }

  loadMoreTracks(){
    this.spinner.show();
    this.offset += 20;
    const search = "more";
    const options = search ?
      { params: new HttpParams().set('q', search).set('offset', this.offset) } : {};
    this.http.get<Track[]>(`${this.apiUrl}/tracks`, options)
      .subscribe(
        (tracks: Track[]) => {
          this.tracks.push(...tracks);
          this.tracks$.next(this.tracks);
          this.spinner.hide();
        }
      )
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
