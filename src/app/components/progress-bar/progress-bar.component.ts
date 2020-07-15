import { Component, OnInit } from '@angular/core';
import { PlaybackService } from '../../service/playback.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  percent: string;

  constructor( public playbackService: PlaybackService ) {
    this.playbackService.percent.subscribe( percent => {
      this.percent = (percent * 100).toFixed(2) + "%";
    });
  }

  ngOnInit(): void {
    let self = this;
    
    $('.progress').on('click', function($event) {
      let left = $('.progress').position().left;
      let width = $('.progress').width();
      let percentage = ($event.pageX - left) / width * 100;

      self.percent = percentage.toFixed(2) + "%";
      self.playbackService.seekPosition(percentage);      
    });
  }

}
