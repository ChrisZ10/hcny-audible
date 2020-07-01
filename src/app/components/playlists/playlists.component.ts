import { Component, OnInit } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { Playlist } from 'src/app/interface/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  playlists: Playlist[];

  constructor( private audibleService: AudibleService ) { }

  ngOnInit(): void {
    this.playlists = this.audibleService.getPlaylists();
  }

}
