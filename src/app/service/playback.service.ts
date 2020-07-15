import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Track } from 'src/app/interface/track';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private baseUrl = 'https://hcny.org/app/assets/audio';
  isLoaded: Subject<boolean> = new Subject<boolean>();
  isPlaying: Subject<boolean> = new Subject<boolean>();
  message: Subject<string> = new Subject<string>();
  stopUpdatePosition: boolean = false;
  sound: Howl = null;
  
  pos: Subject<string> = new Subject<string>();
  duration: Subject<string> = new Subject<string>();
  percent: Subject<number> = new Subject<number>();

  constructor( private cookieService: CookieService ) { }

  /**
   * Create a new Howl object or assign an existing one for the attribute "sound".
   * @param track: currently selected track. 
   * @param position: starting position.
   * @param autoPlay: an indicator indicating if autoplay is enabled.
   */
  loadTrack( track: Track, position: number, autoPlay: boolean ): void {
    let self = this;

    if (track.sound) {
      self.sound = track.sound;
    } else {
      self.isLoaded.next(false);

      track.sound = new Howl({
        src: [`${self.baseUrl}${track.uri}`],
        preload: true,
        html5: true,
        autoplay: autoPlay,
        onload: () => {
          self.isLoaded.next(true);
          autoPlay?self.isPlaying.next(true):self.isPlaying.next(false);
          
          self.duration.next(self.toString(track.sound.duration()));
          if (position) {
            self.pos.next(self.toString(track.sound.seek(position)));
            self.percent.next(track.sound.seek() / track.sound.duration());
          } else {
            self.pos.next("00:00:00");
            self.percent.next(0);
          }
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
      self.sound = track.sound;
    
    } // else block ends here

    console.log("track loaded:");
    console.log(self.sound);   
  }

  /**
   * The method is called within the method "requestAnimationFrame" to update the playback position
   */
  updatePosition(): void {    
    let self = this;

    let seek = Number(self.sound.seek());
    if (isNaN(seek)) {
      seek = self.sound._sounds[0]._seek;
    }
    self.pos.next(self.toString(seek));

    self.percent.next(self.sound.seek() / self.sound.duration());    
    this.cookieService.set('position', self.sound.seek());

    window.requestAnimationFrame(self.updatePosition.bind(self));  
  }

  /**
   * Seek a new position of the currently playing song
   * @param percent: the percentage of the currently playing song to be skipped. 
   */
  seekPosition(percent: number): void {
    let self = this;
    self.sound.seek(self.sound.duration() * percent / 100);
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
