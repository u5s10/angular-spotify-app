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
  load: boolean = false;

  ngOnInit(): void {
    this.searchQuery = this.spotifyService.getLastSearch();
    if(this.searchQuery)
      this.load = true;
  }

  searchFor(query: string) {
    this.spotifyService.getTracks(query);
    this.spotifyService.setLastSearch(query);
    this.load = true;
  }

  loadMore(){
    this.spotifyService.loadMoreTracks();
  }
}
