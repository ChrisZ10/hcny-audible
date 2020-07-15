import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import { Track } from 'src/app/interface/track';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnChanges {

  @Input() currentTrack: Track;
  @Input() tracks: Track[];
  @Input() index: number;

  @Output() updateEvent = new EventEmitter<{track: Track, autoplay: boolean}>();
  
  isPlaying: boolean = false;
  isLoaded: boolean = false;

  constructor( public playbackService: PlaybackService, private cookieService: CookieService) {
    this.playbackService.isLoaded.subscribe( isLoaded => {
      this.isLoaded = isLoaded;
    });

    this.playbackService.message.subscribe(msg => {      
      switch (msg) {
        case "autoload next track":
          this.forward(true);
          break;
        default:
      }
    });

    this.playbackService.isPlaying.subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log("current index:" + this.index);
  }

  play(): void {
    this.playbackService.sound.play();
    this.isPlaying = true;
  }

  pause(): void {
    this.playbackService.sound.pause();
    this.isPlaying = false;
  }

  backward(): void {
    if (this.index > 0) {
      this.pause();

      this.index--;
      console.log("change index to:" + this.index);

      this.currentTrack = this.tracks[this.index];
      this.cookieService.set( 'track', this.currentTrack.slug );
      this.updateEvent.emit({track: this.currentTrack, autoplay: false});
    }
  }

  forward(autoPlay: boolean): void {
    if (this.index < this.tracks.length - 1) {
      if (!autoPlay) {
        this.pause();
      }
      this.index++;
      console.log("change index to:" + this.index);

      this.currentTrack = this.tracks[this.index];
      this.cookieService.set( 'track', this.currentTrack.slug );
      autoPlay?
      this.updateEvent.emit({track: this.currentTrack, autoplay: true}):
      this.updateEvent.emit({track: this.currentTrack, autoplay: false});
    }
  }

}
