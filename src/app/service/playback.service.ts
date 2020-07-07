import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Track } from 'src/app/interface/track';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private baseUrl = 'http://hcny.org/app/assets/audio';

  sound: Howl;

  isLoaded: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  loadTrack( track: Track ): void {
    this.isLoaded.next(false);
    this.sound = new Howl({
      src: [`${this.baseUrl}${track.uri}`],
      onload: () => {
        this.isLoaded.next(true);
        console.log("sound successfully loaded");
      },
      onloaderror: () => {
        this.isLoaded.next(false);
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



}
