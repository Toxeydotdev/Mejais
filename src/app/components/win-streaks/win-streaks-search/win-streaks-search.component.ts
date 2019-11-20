import { Component, OnInit, Input } from '@angular/core';
import { MejaisService } from '../../../service/mejais.service';
import { decode, encode } from 'lor-deckcode';
import mockJson from '../../../../assets/ezrealdb.json';
@Component({
  selector: 'app-win-streaks-search',
  templateUrl: './win-streaks-search.component.html',
  styleUrls: ['../win-streaks.component.css']
})
export class WinStreaksSearchComponent implements OnInit {

  @Input() player: any;
  decks: any[] = [];
  decksAlt: any[] = [];
  currentDeck: any;
  currentDeckCode: string;
  currentDeckStreak: number = 0;

  constructor(private mejaisService: MejaisService) { }

  ngOnInit() {
    this.setPlayer(this.player);
  }


  setPlayer(playerName: string) {
    this.player = playerName;
    this.getPlayer();
  }

  getPlayer() {
    if (!this.mejaisService.needMockData) {
      this.mejaisService.getMejaisPlayer(this.player).subscribe(resulttwo => {
        this.decks = [];
        resulttwo.forEach(returnDeck => {
          if (returnDeck.deckCode !== this.currentDeckCode) {
            if (!this.decks.map(c => c.actualCode).includes(returnDeck.deckCode)) {
              this.decks.push({
                actualDeck: decode(returnDeck.deckCode),
                actualCode: returnDeck.deckCode,
                currentStreak: returnDeck.currentWinStreak,
                highestStreak: returnDeck.highestWinStreak,
                lastUpdateDate: returnDeck.lastUpdateDate
              });
            }
          } else {
            this.currentDeckStreak = returnDeck.currentWinStreak;
          }
        }, error => {
          this.decks = [];
        });
      });
    } else {
      this.decksAlt = mockJson.filter(c => c.PlayerName === this.mejaisService.currentSearchPlayer)
        .sort((a, b) => +b.CurrentWinStreak - +a.CurrentWinStreak);
      this.decksAlt.forEach(returnDeck => {
        this.decks.push({
          actualDeck: decode(returnDeck.DeckCode),
          actualCode: returnDeck.DeckCode,
          currentStreak: returnDeck.CurrentWinStreak,
          highestStreak: returnDeck.HighestWinStreak,
          lastUpdateDate: returnDeck.LastUpdateDate
        });
      });
    }
  }


}


