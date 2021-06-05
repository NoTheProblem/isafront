import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MapService {
  private path: string;

  constructor(private httpClient: HttpClient
  ) {
  }

  public getCordinates(addres: string): Observable<JSON> {
    this.path = 'https://geocode-maps.yandex.ru/1.x/?apikey=3c15c704-3d48-482f-8f18-5aacd24c1975&geocode=' +
       addres +
      '&format=json';;
    return this.httpClient.get<JSON>(this.path);
  }

}

