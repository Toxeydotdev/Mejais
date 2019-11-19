import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material.module';
import { WinStreaksComponent } from './components/win-streaks/win-streaks.component';
import { MejaisService } from './service/mejais.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SearchPlayerComponent } from './components/search-player/search-player.component';
import { WinStreaksSearchComponent } from './components/win-streaks/win-streaks-search/win-streaks-search.component';
@NgModule({
  declarations: [
    AppComponent,
    WinStreaksComponent,
    LeaderboardComponent,
    SearchPlayerComponent,
    WinStreaksSearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule

  ],
  providers: [MejaisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
