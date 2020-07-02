import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Playlist } from 'src/app/interface/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  selectedPlaylist: Playlist = {
    title: '尚未選擇',
    slug: ''
  };

  @Input() playlists: Playlist;

  @Output() playlistEvent = new EventEmitter<Playlist>();

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {}

  onSelect(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
    this.playlistEvent.emit(this.selectedPlaylist);
  }

}
