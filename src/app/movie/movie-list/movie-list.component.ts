import { Component } from "@angular/core";
import { MovieInterface } from "../movie-interface";
import { MovieService } from "../services/movie.service";
import { SearchService } from "../services/search.service";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.css"],
})
export class MovieListComponent {
  trendingMovies: MovieInterface[] = [];
  posterPrefix: string = "https://image.tmdb.org/t/p/w500/";

  query: string = "";
  searchQuery: string = "";
  filterdMovie: MovieInterface[] = [];

  constructor(
    private _MovieService: MovieService,
    private _SearchService: SearchService
  ) {
    this._MovieService.getPopularMovies(1).subscribe((data) => {
      this.trendingMovies = data.results;
    });
  }

  searchMovies(query: string) {
    this._SearchService.getSearchedItems(query);
    this._SearchService.getMovies().subscribe((val) => {
      this.filterdMovie = val;
    });
    this.searchQuery = query;
  }
}
