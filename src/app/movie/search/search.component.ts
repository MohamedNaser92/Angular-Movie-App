import { Component } from "@angular/core";
import { MovieInterface } from "../movie-interface";
import { SearchService } from "../services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  query: string = "";
  searcValue: string = "";
  filterdMovie: MovieInterface[] = [];
  posterPrefix: string = "https://image.tmdb.org/t/p/w500/";

  constructor(public _SearchService: SearchService) {}
  searchVal: string = "";
  ngOnInit() {
    this._SearchService.getMovies().subscribe((val) => {
      this.filterdMovie = val;
    });

    this.searcValue = this._SearchService.getSearchValue();
    console.log(this.searcValue);
  }

  searchMovies(query: string) {
    this._SearchService.getSearchedItems(query);
    this._SearchService.getMovies().subscribe((val) => {
      this.filterdMovie = val;
    });
  }
}
