import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../models/artist.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private spotifyService: SpotifyService) { }

  artist!: Artist;

  ngOnInit(): void {
    const artistId = this.route.snapshot.paramMap.get('id');
    if (artistId !== null) {
      this.spotifyService.getArtist(artistId)
        .subscribe(
          (artist) => {
            this.artist = artist;
          }
        )
    }
  }

}
