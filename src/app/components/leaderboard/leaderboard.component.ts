import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MejaisService } from '../../service/mejais.service';
import { PageEvent } from '@angular/material/paginator';
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

    this.getLeaderboard();
    setInterval(() => {
      this.getLeaderboard();
      this.tableData = this.dataSource.slice(0, 5);
    }, 1000 * 60 * 5);

  }

  getLeaderboard() {
    this.mejaisService.getMejaisLeaderboard().subscribe(result => {
      this.dataSource = result;
      this.tableData = this.dataSource.slice(0, 5);
    });
  }
  searchPlayer(player: string) {
    this.mejaisService.setSearchPlayer(player);
    this.passPlayer.emit(null);
  }

  updateTable(event: PageEvent) {
    this.tableData = this.dataSource.slice(0 + (5 * event.pageIndex), 5 + (5 * (event.pageIndex)));
  }
}
