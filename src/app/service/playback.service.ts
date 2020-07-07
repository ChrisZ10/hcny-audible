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
  percent: Subject<number> = new Subject<number>();

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
      },
      onplay: () => {
        this.updatePosition();
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
    setInterval(() => {
      // console.log(this.sound.seek() + ":" + this.sound.duration());
      this.percent.next(this.sound.seek() / this.sound.duration());
    }, 1000);
  }

}
