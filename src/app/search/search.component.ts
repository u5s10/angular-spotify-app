import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) {
    this.tracks$ = this.spotifyService.getTracksStream();
   }

  tracks$!: Observable<Track[]>;
  searchQuery: string = '';

  ngOnInit(): void {
    this.searchQuery = this.spotifyService.getLastSearch();
  }

  searchFor(query: string) {
    this.spotifyService.getTracks(query);
    this.spotifyService.setLastSearch(query);
  }

  loadMore(){
    this.spotifyService.loadMoreTracks();
  }
}
