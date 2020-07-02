import { Component, OnInit, Input } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Track } from 'src/app/interface/track';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  @Input() track: Track;

  constructor( private audibleService: AudibleService ) {}

  ngOnInit(): void {}

}
