import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interface/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  
  @Input() albums: Album[];
  @Input() selectedAlbum: Album;

  @Output() albumEvent = new EventEmitter<Album>();

  constructor() { }

  ngOnInit(): void {}

  onSelect(album: Album): void {
    if (this.selectedAlbum !== album) {
      this.selectedAlbum = album;
      this.albumEvent.emit(this.selectedAlbum);
    }
  }

}
