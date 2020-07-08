import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Track } from 'src/app/interface/track';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private baseUrl = 'http://hcny.org/app/assets/audio';

  sound: Howl;

  isLoaded: Subject<boolean> = new Subject<boolean>();

  stopUpdatePosition: boolean = false;
  
  pos: Subject<string> = new Subject<string>();
  duration: Subject<string> = new Subject<string>();
  percent: Subject<number> = new Subject<number>();

  message: Subject<string> = new Subject<string>();

  constructor() { }

  loadTrack( track: Track ): void {
    this.isLoaded.next(false);

    this.sound = new Howl({
      src: [`${this.baseUrl}${track.uri}`],
      preload: true,
      html5: true,
      autoplay: true,
      onload: () => {
        this.isLoaded.next(true);        
        this.duration.next(this.toString(this.sound.duration()));
        this.pos.next("00:00:00");
        console.log("sound successfully loaded");
      },
      onloaderror: () => {
        this.isLoaded.next(false);
      },
      onplay: () => {
        this.updatePosition();
      },
      onend: () => {
        this.message.next("load next track");
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
      console.log("sound paused");
    }
  }

  updatePosition(): void {
    setInterval(() => {
      if (!this.stopUpdatePosition) {
        this.pos.next(this.toString(this.sound.seek()));
        this.percent.next(this.sound.seek() / this.sound.duration());
      }
    }, 1000);
  }

  seekPosition(percent: number): void {
    this.sound.seek(this.sound.duration() * percent / 100);
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
