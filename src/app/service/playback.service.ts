import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Track } from 'src/app/interface/track';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {

  private baseUrl = 'http://hcny.org/app/assets/audio';

  sound: Howl;

  constructor() { }

  loadTrack( track: Track ): void {
    this.sound = new Howl({
      src: [`${this.baseUrl}${track.uri}`],
      onload: () => {
        console.log("sound successfully loaded");
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
