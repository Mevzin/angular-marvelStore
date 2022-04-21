import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MARVEL_API_HASH, MARVEL_API_KEY, MARVEL_URL_API } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResultsComics } from '../views/home/home.component';

const setYear = 2018;

@Injectable({
  providedIn: 'root'
})

export class MarvelService {


  constructor(private http: HttpClient) { }

  getAllComics(offset: number): Observable<any>{
    return this.http.get(MARVEL_URL_API+"/comics?format=comic&formatType=comic&limit=21&offset="+offset+"&noVariants=true&orderBy=title&ts=1&startYear="+setYear+"&apikey="+MARVEL_API_KEY+"&hash="+MARVEL_API_HASH);
  };

  getComicsByTitle(title: string): Promise<any>{
    return this.http.get(MARVEL_URL_API+"/comics?format=comic&formatType=comic&limit=21&noVariants=true&orderBy=title&titleStartsWith="+title+"&ts=1&startYear="+setYear+"&apikey="+MARVEL_API_KEY+"&hash="+MARVEL_API_HASH).toPromise();
  };

  getCharacter(character: string): Promise<any>{
    return this.http.get(MARVEL_URL_API+"/characters?name="+character+"&ts=1&apikey="+MARVEL_API_KEY+"&hash="+MARVEL_API_HASH).toPromise();
  };

  getAllCharacters(){
    return this.http.get(MARVEL_API_HASH+"/characters?apikey="+MARVEL_API_KEY+"&hash="+MARVEL_API_HASH);
  }
}
