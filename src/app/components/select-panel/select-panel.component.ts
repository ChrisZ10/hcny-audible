import { Component, OnInit } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { CookieService } from 'ngx-cookie-service';
import { Playlist } from '../../interface/playlist';
import { Album } from '../../interface/album';
import { Track } from '../../interface/track';

@Component({
  selector: 'app-select-panel',
  templateUrl: './select-panel.component.html',
  styleUrls: ['./select-panel.component.scss']
})
export class SelectPanelComponent implements OnInit {

  playlists: Playlist[] = [];
  
  albums: Album[] = [];
  selectedAlbum: Album = {
    title: '尚未選擇',
    slug: ''
  };
  
  tracks: Track[] = [];
  selectedTrack: Track = {
    title: '尚未選擇',
    slug: '',
    uri: ''
  };

  track: Track = {
    title: '尚未加載',
    slug: '',
    uri: ''
  };
  isSelected: boolean = false;

  constructor( 
    private audibleService: AudibleService,
    private cookieService: CookieService 
  ) { }

  ngOnInit(): void {
    this.audibleService.getPlaylists().subscribe( playlists => this.playlists = playlists );

    if (this.cookieService.check('playlist')) {
      console.log(this.cookieService.get('playlist'));
    }
    if (this.cookieService.check('album')) {
      console.log(this.cookieService.get('album'));
    }
    if (this.cookieService.check('track')) {
      console.log(this.cookieService.get('track'));
    }
    if (this.cookieService.check('position')) {
      console.log(this.cookieService.get('position'));
    }
    
  }

  receivePlaylist($event): void {
    this.audibleService.getAlbums($event.slug).subscribe( albums => {
      this.albums = albums;
      this.selectedAlbum = {
        title: '尚未選擇',
        slug: ''
      };
      
      this.tracks = [];
      this.selectedTrack = {
        title: '尚未選擇',
        slug: '',
        uri: ''
      };

      this.track = {
        title: '尚未加載',
        slug: '',
        uri: ''
      };
      this.isSelected = false;
    });
  }

  receiveAlbum($event): void {
    this.audibleService.getTracks($event.slug).subscribe( tracks => {
      this.tracks = tracks;
      this.selectedTrack = {
        title: '尚未選擇',
        slug: '',
        uri: ''
      };

      this.track = {
        title: '尚未加載',
        slug: '',
        uri: ''
      };
      this.isSelected = false;
    });
  }

  receiveTrack($event): void {
    this.audibleService.getTrack($event.slug).subscribe( track => {
      this.track = track;
      this.isSelected = true; 
    });
  }

  receiveUpdateTrack($event): void {
    this.audibleService.getTrack($event.slug).subscribe( track => {
      this.selectedTrack = track;
    });
  }

}
