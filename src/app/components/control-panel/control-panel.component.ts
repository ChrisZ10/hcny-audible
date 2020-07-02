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

  constructor( 
    private playbackService: PlaybackService 
  ) {}

  ngOnInit(): void {}

  ngOnChanges( changes: SimpleChanges ): void {
    this.currentTrack = changes.currentTrack.currentValue;
    this.previousTrack = changes.currentTrack.previousValue;
    
    if (this.currentTrack.uri !== '') {
      this.playbackService.loadTrack(this.currentTrack);
    }
  }

}