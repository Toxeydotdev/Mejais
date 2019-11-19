import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { decode, encode } from 'lor-deckcode';

import coreJson from '../../../assets/core/en_us/data/globals-en_us.json';
import globalsJson from '../../../assets/globals/en_us/data/set1-en_us.json';

import { MejaisService, Graves } from '../../service/mejais.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-win-streaks',
  templateUrl: './win-streaks.component.html',
  styleUrls: ['./win-streaks.component.css']
})
export class WinStreaksComponent implements OnInit {

  @Input() player: any;

  cardcode: string;
  imgID: string;
  // deck: any;
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
      }, 1000 * 5);
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
  }

}
