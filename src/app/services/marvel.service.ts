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

  getAllComics(): Observable<any>{
    return this.http.get(MARVEL_URL_API+"/public/comics?format=comic&formatType=comic&limit=21&noVariants=true&orderBy=title&ts=1&startYear="+setYear+"&apikey="+MARVEL_API_KEY+"&hash="+MARVEL_API_HASH);
    // return this.http.get("https://gateway.marvel.com/v1/public/comics?format=comic&formatType=comic&limit=21&noVariants=true&orderBy=title&ts=1&apikey=c553fb26181e641d05a1886a131bd7cc&hash=f48412d49c784075a4599040bf8ed908")
  }
}
