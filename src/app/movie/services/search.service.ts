import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MovieService } from "./movie.service";
import { MovieInterface } from "../movie-interface";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private _MovieService: MovieService) {}

  movies = new BehaviorSubject<MovieInterface[]>([]);

  getSearchedItems(query: string) {
    this._MovieService.searchMovies(query).subscribe((res) => {
      this.movies.next(res.results);
    });
  }

  getMovies() {
    return this.movies.asObservable();
  }

  // to keep value in input after routing
  searchValue: string = "";
  setSearchValue(value: string) {
    this.searchValue = value;
  }
  getSearchValue(): string {
    return this.searchValue;
  }
}
