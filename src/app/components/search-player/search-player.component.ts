import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MejaisService } from '../../service/mejais.service';
import { WinStreaksSearchComponent } from '../win-streaks/win-streaks-search/win-streaks-search.component';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit {

  searchedPlayer: string;
  winStreakSearch: WinStreaksSearchComponent;

  @Output() passPlayer = new EventEmitter();
  constructor(public mejaisService: MejaisService) { }

  ngOnInit() {
  }

  searchPlayer(player: string) {
    this.mejaisService.setSearchPlayer(player);
    this.passPlayer.emit(null);
  }
}
