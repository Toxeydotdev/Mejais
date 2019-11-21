import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { decode, encode } from 'lor-deckcode';

import coreJson from '../../../assets/core/en_us/data/globals-en_us.json';
import globalsJson from '../../../assets/globals/en_us/data/set1-en_us.json';

import { MejaisService, Graves } from '../../service/mejais.service';
import { interval, Observable } from 'rxjs';
import mockJson from '../../../assets/ezrealdb.json';

@Component({
  selector: 'app-win-streaks',
  templateUrl: './win-streaks.component.html',
  styleUrls: ['./win-streaks.component.css']
})
export class WinStreaksComponent implements OnInit {

  @Input() player: any;

  cardcode: string;
  imgID: string;
  decks: any[] = [];
  decksAlt: any[] = [];

  deckCode: string = 'CEBAIAIFB4WDANQIAEAQGDAUDAQSIJZUAIAQCBIFAEAQCBAA';

  currentDeck: any;
  currentDeckCode: string;
  currentDeckStreak: number = 0;
  counter = 0;

  constructor(private mejaisService: MejaisService) { }

  ngOnInit() {
    if (!this.mejaisService.needMockData) {
      this.getClient();
      this.getEndResult();
      setInterval(() => {
        this.getEndResult();
        this.getClient();
      }, 1000 * 60 * 2);
    } else {
      this.currentDeckCode = this.deckCode;
      this.currentDeck = decode(this.currentDeckCode);
      this.currentDeckStreak = Math.floor(Math.random() * 10) + 10;
      this.getPlayer();
    }
  }

  getEndResult() {
    this.mejaisService.getClientResult().subscribe(result => {
      let graves: Graves = {
        PlayerName: this.mejaisService.currentPlayer,
        DeckCode: this.currentDeckCode,
        LastGameID: result.GameID,
        Feeder: !result.LocalPLayerWon
      };
      this.mejaisService.postMejais(graves).subscribe(resulttwo => {
      });

    });
  }
  getClient() {
    this.mejaisService.getClientDeck().subscribe(result => {
      if (this.currentDeck !== result.DeckCode) {
        this.currentDeckCode = result.DeckCode;
        this.currentDeck = decode(result.DeckCode);
        this.getPlayer();
      }
    });
  }
  getPlayer() {
    if (!this.mejaisService.needMockData) {
      this.mejaisService.getMejaisPlayer(this.player).subscribe(resulttwo => {
        resulttwo.forEach(returnDeck => {
          if (returnDeck.deckCode !== this.currentDeckCode) {
            if (!this.decks.map(c => c.actualCode).includes(returnDeck.deckCode)) {
              this.decksAlt.push({
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
        for (let i = 0; i < this.decksAlt.length; i++) {
          if (this.decks.length > 0 &&
            this.decksAlt[i].actualDeck === this.decks[i].actualDeck &&
            this.decksAlt[i].actualCode === this.decks[i].actualCode &&
            this.decksAlt[i].currentStreak === this.decks[i].currentStreak &&
            this.decksAlt[i].highestStreak === this.decks[i].highestStreak &&
            this.decksAlt[i].lastUpdateDate === this.decks[i].lastUpdate) {
            continue;
          } else {
            this.decks = this.decksAlt;
          }
        }
      });
    } else {
      this.decksAlt = mockJson.filter(c => c.PlayerName === 'Tox is RIPPIN').sort((a, b) => +b.CurrentWinStreak - +a.CurrentWinStreak);
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


