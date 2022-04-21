import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';



var setOffset = 0;

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

    window.addEventListener('scroll', () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;

      if(clientHeight + scrollTop >= scrollHeight) {
        // show the loading animation
        this.loadMoreComics();
      }
    });
  }

  async getAllComicsList() {
    this.marvelApi.getAllComics(setOffset)
    .subscribe((post) => {
      this.allComics = post.data.results;
    });
  }

  checked() {
    console.log("checked");
  }

  loadMoreComics(){
    setOffset += 21;
    this.marvelApi
      .getAllComics(setOffset)
      .subscribe((post) => {
        this.allComics = this.allComics.concat(post.data.results);
      });
  }

}

