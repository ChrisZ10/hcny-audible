import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Output() posEvent = new EventEmitter<number>();

  constructor( 
    public playbackService: PlaybackService 
  ) {}

  ngOnInit(): void {}

  onChange($event): void {
    this.posEvent.emit($event.target.value);
    this.playbackService.stopUpdatePosition = false;
    this.playbackService.playTrack();
  }

  onInput(): void {
    this.playbackService.stopUpdatePosition = true;
    this.playbackService.pauseTrack();
  }

}
