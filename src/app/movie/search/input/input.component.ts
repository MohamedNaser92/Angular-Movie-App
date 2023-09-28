import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent {
  query: string = "";
  @Input() searchValue!: string;
  @Output() searchMovie = new EventEmitter<string>();
  constructor(public _SearchService: SearchService) {}

  searchData(query: string) {
    this.searchMovie.emit(query);
  }

  onSearchInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this._SearchService.setSearchValue(value);
  }
}
