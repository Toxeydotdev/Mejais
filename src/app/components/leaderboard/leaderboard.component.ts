import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MejaisService } from '../../service/mejais.service';
import { PageEvent } from '@angular/material/paginator';
import mockJson from '../../../assets/ezrealdb.json';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  displayedColumns: string[] = ['playerName', 'deckCode', 'highestWinStreak', 'profile'];
  dataSource: any;

  tableData: any;

  @Output() passPlayer = new EventEmitter();
  constructor(private mejaisService: MejaisService) { }

  ngOnInit() {

    setTimeout(() => {
      if (!this.mejaisService.needMockData) {
        this.getLeaderboard();
        setInterval(() => {
          this.getLeaderboard();
          this.tableData = this.dataSource.slice(0, 5);
        }, 1000 * 60 * 5);
      } else {
        this.getLeaderboard();
      }
    }, 1000 * 2);
  }

  getLeaderboard() {
    if (!this.mejaisService.needMockData) {
      this.mejaisService.getMejaisLeaderboard().subscribe(result => {
        this.dataSource = result;
        this.tableData = this.dataSource.slice(0, 5);
      });
    } else {
      this.dataSource = [];
      mockJson.sort((a, b) => +b.HighestWinStreak - +a.HighestWinStreak).forEach(data => {
        this.dataSource.push({
          playerName: data.PlayerName,
          deckCode: data.DeckCode,
          highestWinStreak: data.HighestWinStreak,
        });
      });
      this.tableData = this.dataSource.slice(0, 5);
    }

  }
  searchPlayer(player: string) {
    this.mejaisService.setSearchPlayer(player);
    this.passPlayer.emit(null);
  }

  updateTable(event: PageEvent) {
    this.tableData = this.dataSource.slice(0 + (5 * event.pageIndex), 5 + (5 * (event.pageIndex)));
  }
}
