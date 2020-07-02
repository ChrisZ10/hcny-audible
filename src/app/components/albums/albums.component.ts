import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interface/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  selectedAlbum: Album = {
    title: '尚未選擇',
    slug: ''
  };

  @Input() albums: Album;

  @Output() albumEvent = new EventEmitter<Album>();

  constructor() { }

  ngOnInit(): void {}

  onSelect(album: Album): void {
    this.selectedAlbum = album;
    this.albumEvent.emit(this.selectedAlbum);
  }

}
