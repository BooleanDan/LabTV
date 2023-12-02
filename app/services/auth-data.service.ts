import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {


  /* private data: any[] = [];

  setData(data: any[]): void {
    this.data = data;
  }

  getData(): any[] {
    return this.data;
  } */


  private dataSubject = new BehaviorSubject<any[]>([]);
  data$ = this.dataSubject.asObservable();

  setData(data: any[]): void {
    this.dataSubject.next(data);
  }


}
