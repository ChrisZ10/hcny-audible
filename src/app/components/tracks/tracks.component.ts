import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Track } from '../../interface/track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  @Input() tracks: Track[];
  @Input() selectedTrack: Track;

  @Output() trackEvent = new EventEmitter<Track>();

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {}

  onSelect(track: Track): void {
    if (this.selectedTrack !== track) {
      this.selectedTrack = track;
      this.trackEvent.emit(this.selectedTrack);
    }
  }

}
