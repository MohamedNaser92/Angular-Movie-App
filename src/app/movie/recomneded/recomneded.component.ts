import { Component } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { ActivatedRoute, Router, Route } from "@angular/router";
import { MovieInterface } from "../movie-interface";

@Component({
  selector: "app-recomneded",
  templateUrl: "./recomneded.component.html",
  styleUrls: ["./recomneded.component.css"],
})
export class RecomnededComponent {
  movieRecommended: any;
  recommendedMovies: any;
  movieId?: any;
  posterPrefix: string = "https://image.tmdb.org/t/p/w500/";
  constructor(
    private _MovieService: MovieService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.movieId = params.get("id");
      //to get reccomendation for new movie clicked in recommended component
      this.getRecommended();
    });

    this.getRecommended();
  }

  // get reccomendation movies
  getRecommended() {
    this._MovieService
      .getRecommendedMovies(this.movieId)
      .subscribe((response) => {
        (this.movieRecommended = response),
          (this.recommendedMovies = this.movieRecommended.results.slice(0, 4));
      });
  }
}
