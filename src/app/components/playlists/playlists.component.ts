import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import { Playlist } from 'src/app/interface/playlist';
import { CookieService } from 'ngx-cookie-service';

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

  @Input() playlists: Playlist[];

  @Output() playlistEvent = new EventEmitter<Playlist>();

  constructor( 
    private playbackService: PlaybackService,
    private cookieService: CookieService 
  ) { }

  ngOnInit(): void {}

  onSelect(playlist: Playlist): void {
    if (this.selectedPlaylist !== playlist) {
      this.selectedPlaylist = playlist;
      this.cookieService.set( 'playlist', playlist.slug );

      this.playlistEvent.emit(this.selectedPlaylist);
      this.playbackService.pauseTrack();
    }
  }

}
