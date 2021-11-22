import { Component, Input, OnInit } from '@angular/core';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  constructor() { }

  @Input() track!: Track;

  ngOnInit(): void {
  }

}
