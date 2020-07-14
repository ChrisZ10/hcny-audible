import { Component, OnInit } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  constructor( 
    public playbackService: PlaybackService 
  ) {}

  ngOnInit(): void {}

  onChange($event): void {
    this.playbackService.seekPosition($event.target.value);
  }

  onInput(): void {
    this.playbackService.pauseTrack();
  }

}
