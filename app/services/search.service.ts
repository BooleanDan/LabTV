import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchValueSource = new BehaviorSubject<string>('');
  currentSearchValue = this.searchValueSource.asObservable();

  constructor() { }

  changeSearchValue(searchValue: any) {
    this.searchValueSource.next(searchValue);
  }
}
