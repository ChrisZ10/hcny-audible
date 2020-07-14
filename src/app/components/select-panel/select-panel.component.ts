import { Component, OnInit } from '@angular/core';
import { AudibleService } from '../../service/audible.service';
import { CookieService } from 'ngx-cookie-service';
import { PlaybackService } from 'src/app/service/playback.service';

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
  selectedPlaylist: Playlist = {
    title: '尚未選擇',
    slug: ''
  };
  
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
  index: number = 0;
  isSelected: boolean = false;

  constructor( 
    private audibleService: AudibleService,
    private cookieService: CookieService,
    private playbackService: PlaybackService 
  ) { }

  ngOnInit(): void {
    this.audibleService.getPlaylists().subscribe( playlists => {      
      this.playlists = playlists;

      if (this.cookieService.check('playlist')) {        
        this.selectedPlaylist = this.playlists.find( playlist => 
          playlist.slug === this.cookieService.get('playlist') 
        );
      
        if (this.cookieService.check('album')) {
          this.audibleService.getAlbums(this.selectedPlaylist.slug).subscribe( albums => {            
            this.albums = albums;
            
            this.selectedAlbum = this.albums.find( album => 
              album.slug === this.cookieService.get('album') 
            );

            if (this.cookieService.check('track')) {
              this.audibleService.getTracks(this.selectedAlbum.slug).subscribe ( tracks => {                
                this.tracks = tracks;
                
                this.tracks.find(( track, index ) => {
                  if (track.slug === this.cookieService.get('track')) {
                    this.selectedTrack = track;
                    this.index = index;
                  }
                });
                this.isSelected = true;

                this.playbackService.loadTrack(
                  this.selectedTrack, 
                  parseFloat(this.cookieService.get('position')),
                  false  
                );
              }); // tracks subscribe method ends here
            }            
          }); // albums subscribe method ends here
        }      
      }             
    }); // playlists subscribe method ends here    
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
      this.isSelected = false;
    });
  }

  receiveTrack($event): void {
    this.audibleService.getTrack($event.slug).subscribe( track => {
      this.selectedTrack = track;
      this.isSelected = true;
      
      this.index = this.tracks.findIndex( track => track.slug === this.selectedTrack.slug );

      this.playbackService.loadTrack(this.selectedTrack, 0, false);
    });
  }

  receiveUpdateTrack($event): void {
    this.audibleService.getTrack($event.track.slug).subscribe( track => {      
      this.selectedTrack = track;
      this.isSelected = true;
      
      this.index = this.tracks.findIndex( track => track.slug === this.selectedTrack.slug );

      if ($event.autoplay) {
        this.playbackService.loadTrack(this.selectedTrack, 0, true);
      } else {
        this.playbackService.loadTrack(this.selectedTrack, 0, false);
      }
      
    });
  }

}
