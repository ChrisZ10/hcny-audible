import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SelectPanelComponent } from './components/select-panel/select-panel.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { TracksComponent } from './components/tracks/tracks.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    SelectPanelComponent,
    AlbumsComponent,
    TracksComponent,
    ControlPanelComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
