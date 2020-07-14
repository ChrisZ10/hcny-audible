import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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

  @Output() updateEvent = new EventEmitter<Track>();
  
  isPlaying: boolean = false;

  constructor( 
    public playbackService: PlaybackService,
    private cookieService: CookieService 
  ) {}

  ngOnInit(): void {
    console.log(this.index);
    
    this.playbackService.message.subscribe(msg => {
      if (msg === "load next track") {
        this.forward();
      } else if (msg === "change icon") {
        this.isPlaying = true;
      }
    });
  }

  ngOnChanges( changes: SimpleChanges ): void {
    this.currentTrack = changes.currentTrack.currentValue;
    
    if (this.currentTrack.uri !== '') {
      this.playbackService.loadTrack(this.currentTrack, 0, false);
      this.isPlaying = false;
    }
  }

  play(): void {
    this.playbackService.playTrack();
    this.isPlaying = true;
  }

  pause(): void {
    this.playbackService.pauseTrack();
    this.isPlaying = false;
  }

  backward(): void {
    if (this.index > 0) {
      this.playbackService.pauseTrack();
      this.index--;
      this.currentTrack = this.tracks[this.index];
      if (this.currentTrack.uri !== '') {
        this.playbackService.loadTrack(this.currentTrack, 0, true);
        this.updateEvent.emit(this.currentTrack);
        this.isPlaying = true;
      }
    }
  }

  forward(): void {
    if (this.index < this.tracks.length - 1) {
      this.playbackService.pauseTrack();
      this.index++;
      this.currentTrack = this.tracks[this.index];
      if (this.currentTrack.uri !== '') {
        this.playbackService.loadTrack(this.currentTrack, 0, true);
        this.updateEvent.emit(this.currentTrack);
        this.isPlaying = true;
      }
    }
  }

  receivePos($event): void {
    this.playbackService.seekPosition($event);
  }

}
