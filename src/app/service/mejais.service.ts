import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MejaisService {

  apiurl = environment.apiurl;
  clienturl = environment.clienturl;

  currentPlayer = '';
  currentSearchPlayer = '';

  needMockData: boolean = false;
  constructor(private httpClient: HttpClient) { }


  private static validateData(res: any) {
    if (res.status && (res.status < 200 || res.status >= 300)) {
      throw new Error('Bad response status: ' + res.status);
    }

    return res;
  }

  private static handleError(error: any) {
    const errMsg = error.message || 'Server error';
    return throwError(errMsg);
  }

  setMockData() {
    this.needMockData = true;
  }
  setPlayer(player: string) {
    this.currentPlayer = player;
  }

  setSearchPlayer(player: string) {
    this.currentSearchPlayer = player;
  }

  getMejais() {
    return this.httpClient.get(this.apiurl + 'values')
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  getMejaisLeaderboard() {
    return this.httpClient.get<any>(this.apiurl + 'values/leaderboard')
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  getMejaisPlayer(player: string) {
    return this.httpClient.get<any>(this.apiurl + 'values/' + player)
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  postMejais(postdata: Graves) {
    return this.httpClient.post<any>(this.apiurl + 'values', postdata)
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  getClientPosition() {
    return this.httpClient.get<any>(this.clienturl + 'positional-rectangles')
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  getClientDeck() {
    return this.httpClient.get<any>(this.clienturl + 'static-decklist')
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }

  getClientResult() {
    return this.httpClient.get<any>(this.clienturl + 'game-result')
      .pipe(
        map(MejaisService.validateData),
        catchError(MejaisService.handleError)
      );
  }
}

export interface Graves {
  PlayerName: string;
  DeckCode: string;
  LastGameID: number;
  Feeder: boolean;
}
