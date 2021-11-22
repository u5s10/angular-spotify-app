import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { kMaxLength } from 'buffer';
import { forkJoin } from 'rxjs';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router, private spotifyService: SpotifyService) { }

  album!: Album;
  tracks!: Track[];

  ngOnInit(): void {
    const albumId = this.route.snapshot.paramMap.get('id');
    if (albumId) {
      let album = this.spotifyService.getAlbum(albumId);
      let tracks = this.spotifyService.getAlbumsTracks(albumId);
      forkJoin([album, tracks]).subscribe(results => {
        this.album = results[0];
        this.tracks = results[1];
      });
    }
  }

}
