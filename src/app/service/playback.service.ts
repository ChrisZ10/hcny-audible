import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Track } from 'src/app/interface/track';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private baseUrl = 'https://hcny.org/app/assets/audio';

  sound: Howl;

  isLoaded: Subject<boolean> = new Subject<boolean>();

  stopUpdatePosition: boolean = false;
  
  pos: Subject<string> = new Subject<string>();
  duration: Subject<string> = new Subject<string>();
  percent: Subject<number> = new Subject<number>();

  message: Subject<string> = new Subject<string>();

  constructor( private cookieService: CookieService ) { }

  loadTrack( track: Track, position: Number, autoPlay: Boolean ): void {
    
    Howler.unload();
    Howler.html5PoolSize = 100;

    let self = this;

    self.isLoaded.next(false);

    self.sound = new Howl({
      src: [`${self.baseUrl}${track.uri}`],
      preload: true,
      html5: true,
      autoplay: autoPlay? true : false,
      onload: () => {
        
        self.isLoaded.next(true);        
        
        self.duration.next(self.toString(self.sound.duration()));
        
        if (position) {
          
          self.pos.next(this.toString(self.sound.seek(position)));
          self.percent.next(self.sound.seek() / self.sound.duration());
        
        } else {
          self.pos.next("00:00:00");
        }

        window.requestAnimationFrame(self.updatePosition.bind(self));

        console.log("sound successfully loaded");

      },
      onloaderror: () => {
        self.isLoaded.next(false);
      },
      onplay: () => {
        window.requestAnimationFrame(self.updatePosition.bind(self));
      },
      onend: () => {
        self.message.next("load next track");
      }
    });

    console.log("track loaded:");
    console.log(this.sound);
    
  }

  playTrack(): void {
    
    if (this.sound) {
      this.sound.play();
    }

  }

  pauseTrack(): void {
    
    if (this.sound) {
      this.sound.pause();
    }

  }

  updatePosition(): void {
    
    let self = this;
    
    self.pos.next(self.toString(self.sound.seek()));
    self.percent.next(self.sound.seek() / self.sound.duration());
    
    this.cookieService.set( 'position', self.sound.seek() );
    
    if (self.sound.playing()) {
      window.requestAnimationFrame( self.updatePosition.bind(self) );
    }

  }

  seekPosition(percent: number): void {
    
    this.sound.seek(this.sound.duration() * percent / 100);
    
    this.pos.next(this.toString(this.sound.seek()));
    this.percent.next(this.sound.seek() / this.sound.duration());

  }

  private toString(seconds: number): string {
    
    const dateObj = new Date( seconds * 1000 );
    
    const hr = Number.isNaN(dateObj.getUTCHours())? 0 : dateObj.getUTCHours();
    const min = Number.isNaN(dateObj.getUTCMinutes())? 0 : dateObj.getUTCMinutes();
    const sec = Number.isNaN(dateObj.getSeconds())? 0 : dateObj.getSeconds();

    const timeString = hr.toString().padStart( 2, '0' ) + ':' + 
                       min.toString().padStart(2, '0') + ':' + 
                       sec.toString().padStart(2, '0');

    return timeString;
  
  }

}
