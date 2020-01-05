import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from '../models/List';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<List[]> {

    const URI = `${this.serverApi}/bucketlist/`;
    return this.http.get(URI).pipe(
      map(res => <List[]>res.lists)
    );
  }

  public deleteList(listId: string) {
    const URI = `${this.serverApi}/bucketlist/${listId}`;
    const headers = new HttpHeaders ;
    headers.append('Content-Type', 'application/json');
    return this.http.delete(URI, { headers }).pipe(
      map(res => res)
    );
  }

  public addList(list: List) {
    const URI = `${this.serverApi}/bucketlist/`;
    const headers = new HttpHeaders;
    const body = JSON.stringify({ title: list.title, description: list.description, category: list.category });
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, list, { headers: headers }).pipe(
      map(res => res)
    );
  }
}
