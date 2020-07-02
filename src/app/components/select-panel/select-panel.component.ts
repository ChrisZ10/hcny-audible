import { Component, OnInit } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Playlist } from '../../interface/playlist';
import { Album } from '../../interface/album';

@Component({
  selector: 'app-select-panel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss']
})
export class SelectPanelComponent implements OnInit {

  playlists: Playlist[] = [];
  albums: Album[] = [];

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {
    this.audibleService.getPlaylists().subscribe( playlists => this.playlists = playlists );
  }

  receivePlaylist($event): void {
    this.audibleService.getAlbums($event.slug).subscribe( albums => this.albums = albums );
  }

  receiveAlbum($event): void {
    console.log($event);
  }

}
