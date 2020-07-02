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
      src: [`${this.baseUrl}${track.uri}`]
    });

    console.log(this.sound);

    this.sound.play();
  }

}
