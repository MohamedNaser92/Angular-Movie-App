import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieService } from "../services/movie.service";
import { MovieInterface } from "../movie-interface";
import { WatchlistService } from "../services/watchlist.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _MovieService: MovieService,
    private watchlist: WatchlistService,
    private Title: Title
  ) {}
  movieId: any;
  movieTitle: any;
  movieDetails?: MovieInterface;
  posterPrefix: string = "https://image.tmdb.org/t/p/w500/";
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params) => {
      this.movieId = params["id"];
      // To get details if clicked show more button
      this.getDetail();
      window.scrollTo(0, 0);
    });

    this.Title.setTitle("Movie Details");

    this.getDetail();

    this.watchlist.getWatchlistMovies().subscribe((data) => {});
  }

  getDetail() {
    this._MovieService.getMovieDetails(this.movieId).subscribe({
      next: (response) => (this.movieDetails = response),
    });
  }

  // To Add or Remove Movie From Watchlist
  toggleWatchlist(movieId: number) {
    this.watchlist.addToWatchlist(movieId).subscribe(() => {});
  }
  // To check is the Movie in watchlist
  isExistInWatchlist(movieId: number): boolean {
    return this.watchlist.isExistInWatchlist(movieId);
  }
}
