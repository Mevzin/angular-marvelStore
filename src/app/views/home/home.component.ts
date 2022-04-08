import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { MARVEL_API_KEY } from 'src/environments/environment.prod';

export interface ResultsComics {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  images: [
    {
      path: string;
      extension: string;
    }
  ];
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allComics: ResultsComics[];

  constructor(private marvelApi: MarvelService) {
    this.allComics = [];
  }

  ngOnInit(): void {
    this.getAllComicsList();
  }

  async getAllComicsList() {
    this.marvelApi.getAllComics()
    .subscribe((post) => {
      console.log(post.data.results);
      this.allComics = post.data.results;
    });
  }

  checked() {
    console.log("checked");
  }
}
