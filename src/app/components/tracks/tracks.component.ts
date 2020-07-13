import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import { Track } from '../../interface/track';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  @Input() tracks: Track[];
  @Input() selectedTrack: Track;

  @Output() trackEvent = new EventEmitter<Track>();

  constructor( 
    private playbackService: PlaybackService,
    private cookieService: CookieService 
  ) { }

  ngOnInit(): void {}

  onSelect(track: Track): void {
    if (this.selectedTrack !== track) {
      this.selectedTrack = track;
      this.cookieService.set( 'track', track.slug );

      this.trackEvent.emit(this.selectedTrack);
      this.playbackService.pauseTrack();
    }
  }

}
