import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import { Track } from 'src/app/interface/track';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit, OnChanges {

  @Input() currentTrack: Track;

  previousTrack: Track = this.currentTrack;
  
  isPlaying: boolean = false;
  isLoaded: boolean = false;

  constructor( private playbackService: PlaybackService ) {
    this.playbackService.isLoaded.subscribe({ 
      next(val) { 
        this.isLoaded = val;
        console.log("sound successfully loaded"); 
      },
      error(err) { this.isLoaded = err }
    });
  }

  ngOnInit(): void {}

  ngOnChanges( changes: SimpleChanges ): void {
    this.currentTrack = changes.currentTrack.currentValue;
    this.previousTrack = changes.currentTrack.previousValue;
    this.isLoaded = false;
    
    if (this.currentTrack.uri !== '') {
      this.playbackService.loadTrack(this.currentTrack);
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



}
