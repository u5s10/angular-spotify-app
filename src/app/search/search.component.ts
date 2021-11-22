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

  constructor(private spotifyService: SpotifyService) { }

  tracks: Track[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.searchQuery = this.spotifyService.getLastSearch();
    if(this.searchQuery !== '')
      this.searchFor(this.searchQuery); 
  }

  searchFor(query: string) {
    this.spotifyService.setLastSearch(query);
    this.spotifyService.getTracks(query).subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
      }
    );
  }
}
