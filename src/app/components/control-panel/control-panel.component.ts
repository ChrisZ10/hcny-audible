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
  @Input() tracks: Track[];
  
  isPlaying: boolean = false;

  index: number = 0;

  constructor( 
    public playbackService: PlaybackService 
  ) {}

  ngOnInit(): void {}

  ngOnChanges( changes: SimpleChanges ): void {
    this.currentTrack = changes.currentTrack.currentValue;
    this.index = this.tracks.findIndex(track => track.slug === this.currentTrack.slug);
    
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

  backward(): void {
    if (this.index > 0) {
      this.index--;
    }
  }

  forward(): void {
    if (this.index < this.tracks.length - 1) {
      this.index++;
    }
  }

}
