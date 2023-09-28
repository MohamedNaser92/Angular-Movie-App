import { Component } from "@angular/core";
import { MovieInterface } from "../movie-interface";
import { WatchlistService } from "../services/watchlist.service";

@Component({
  selector: "app-washlist",
  templateUrl: "./washlist.component.html",
  styleUrls: ["./washlist.component.css"],
})
export class WashlistComponent {
  watchlistMovies: MovieInterface[] = [];
  posterPrefix: string = "https://image.tmdb.org/t/p/w500/";
  constructor(private watchlist: WatchlistService) {}
  ngOnInit() {
    this.getAllMoviesInWatchlist();
  }

  toggleWatchlist(movieId: number) {
    this.watchlist.removeFromWatchlist(movieId).subscribe(() => {
      this.watchlistMovies = this.watchlistMovies.filter(
        (movie) => movie.id !== movieId
      );
    });
  }
  getAllMoviesInWatchlist() {
    this.watchlist.getWatchlistMovies().subscribe((data) => {
      this.watchlistMovies = data.results;
      console.log("all movie in watch list", this.watchlistMovies);
    });
  }
}
