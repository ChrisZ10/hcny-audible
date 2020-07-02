import { Component, OnInit } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Playlist } from '../../interface/playlist';
import { Album } from '../../interface/album';
import { Track } from '../../interface/track';

@Component({
  selector: 'app-select-panel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss']
})
export class SelectPanelComponent implements OnInit {

  playlists: Playlist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  track: Track = {
    title: '尚未加載',
    slug: '',
    uri: ''
  };

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {
    this.audibleService.getPlaylists().subscribe( playlists => this.playlists = playlists );
  }

  receivePlaylist($event): void {
    this.audibleService.getAlbums($event.slug).subscribe( albums => this.albums = albums );
  }

  receiveAlbum($event): void {
    this.audibleService.getTracks($event.slug).subscribe( tracks => this.tracks = tracks );
  }

  receiveTrack($event): void {
    this.audibleService.getTrack($event.slug).subscribe( track => this.track = track );
  }

}
