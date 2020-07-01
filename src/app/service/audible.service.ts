import { Injectable } from '@angular/core';
import { Playlist } from '../interface/playlist';

@Injectable({
  providedIn: 'root'
})
export class AudibleService {

  constructor() { }

  getPlaylists(): Playlist[] {
    return [
      {title: '天路歷程', slug: 'pilgrims'},
      {title: '聖經', slug: 'bible'}
    ];
  }
}
