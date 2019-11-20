import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { decode, encode } from 'lor-deckcode';
import { MejaisService } from './service/mejais.service';
import { WinStreaksSearchComponent } from './components/win-streaks/win-streaks-search/win-streaks-search.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(public mejaisService: MejaisService) { }
  @Input() searchPlayer: EventEmitter<any> = new EventEmitter();
  validClient: boolean = false;
  client: string;
  title = 'Mejai\'s Win-Streak';
  foundError: boolean = false;

  playerData: any;

  @ViewChild(WinStreaksSearchComponent, { static: false }) winStreakSearch: WinStreaksSearchComponent;

  ngAfterViewInit() {
    this.getClient();
    setInterval(() => {
      this.getClient();
    }, 1000 * 60 * 2);
  }

  submitSearch() {
    if (this.winStreakSearch) {
      this.winStreakSearch.setPlayer(this.mejaisService.currentSearchPlayer);
    }
  }

  getClient() {
    this.mejaisService.getClientPosition().subscribe(result => {
      if (result.PlayerName != null) {
        this.validClient = true;
        this.playerData = result.PlayerName;
        this.mejaisService.setPlayer(this.playerData);
      } else {
        this.setMockTrue();
      }
    }, error => {
      this.setMockTrue();
    });
  }

  setMockTrue() {
    this.mejaisService.setMockTrue();
    this.playerData = 'Tox is RIPPIN';
    this.mejaisService.setPlayer(this.playerData);
    this.validClient = true;
  }

}
