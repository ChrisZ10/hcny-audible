import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Track } from '../../interface/track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  selectedTrack: Track = {
    title: '尚未選擇',
    slug: '',
    uri: ''
  };

  @Input() tracks: Track[];

  @Output() trackEvent = new EventEmitter<Track>();

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {}

  onSelect(track: Track): void {
    this.selectedTrack = track;
    this.trackEvent.emit(this.selectedTrack);
  }

}
