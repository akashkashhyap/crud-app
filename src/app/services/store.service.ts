import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public searchKey: string;

  public eIndex: number;

  public available: number;

  constructor() {
    this.searchKey = '';

    this.eIndex = 0;
  }
}
