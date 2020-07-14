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

  loadTrack( track: Track, position: number, autoPlay: boolean ): void {
    
    Howler.unload();

    let self = this;
    self.isLoaded.next(false);

    self.sound = new Howl({
      src: [`${self.baseUrl}${track.uri}`],
      preload: true,
      html5: true,
      autoplay: autoPlay,
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
        self.message.next("autoload next track");
      },
      onseek: () => {
        window.requestAnimationFrame(self.updatePosition.bind(self));
      }
    });

    console.log("track loaded:");
    console.log(this.sound);
    
  }

  playTrack(): void {
    let self = this;
    
    if (self.sound) {
      window.requestAnimationFrame(self.updatePosition.bind(self));
      self.sound.play();
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
    
    this.cookieService.set('position', self.sound.seek());

    window.requestAnimationFrame(self.updatePosition.bind(self));  
  }

  seekPosition(percent: number): void {
    let self = this;
    
    self.sound.seek(self.sound.duration() * percent / 100);
    
    self.pos.next(self.toString(self.sound.seek()));
    self.percent.next(self.sound.seek() / self.sound.duration());

    this.cookieService.set('position', self.sound.seek());

    window.requestAnimationFrame(self.updatePosition.bind(self));

    self.message.next("keep playing");
    self.playTrack();
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
