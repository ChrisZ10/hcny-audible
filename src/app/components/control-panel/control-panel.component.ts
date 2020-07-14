import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import { Track } from 'src/app/interface/track';

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

  constructor( 
    public playbackService: PlaybackService
  ) {}

  ngOnInit(): void {
    this.playbackService.message.subscribe(msg => {      
      if (msg === "autoload next track") {
        this.autoforward();
      } else if (msg === "keep playing") {
        this.isPlaying = true;
      }
    });
  }

  ngOnChanges(): void {
    console.log("current index:" + this.index);
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
      this.pause();

      this.index--;
      console.log("change index to:" + this.index);

      this.currentTrack = this.tracks[this.index];
      
      if (this.currentTrack.uri !== '') {
        this.updateEvent.emit({track: this.currentTrack, autoplay: false});
      }
    }
  }

  forward(): void {
    if (this.index < this.tracks.length - 1) {
      this.pause();
      
      this.index++;
      console.log("change index to:" + this.index);

      this.currentTrack = this.tracks[this.index];
      
      if (this.currentTrack.uri !== '') {
        this.updateEvent.emit({track: this.currentTrack, autoplay: false});
      }
    }
  }

  autoforward(): void {
    if (this.index < this.tracks.length - 1) {      
      this.index++;
      console.log("change index to:" + this.index);

      this.currentTrack = this.tracks[this.index];
      
      if (this.currentTrack.uri !== '') {
        this.updateEvent.emit({track: this.currentTrack, autoplay: true});
      }
    }
  }

}
