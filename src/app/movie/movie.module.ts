import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WashlistComponent } from "./washlist/washlist.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { SearchComponent } from "./search/search.component";
import { RouterModule } from "@angular/router";
import { MinimizeDescriptionPipe } from "./pipes/minimize-description.pipe";
import { FormsModule } from "@angular/forms";
import { InputComponent } from "./search/input/input.component";
import { SearchService } from "./services/search.service";
import { MinimizeTitlePipe } from "./pipes/minimize-title.pipe";
import { RecomnededComponent } from './recomneded/recomneded.component';

@NgModule({
  declarations: [
    WashlistComponent,
    MovieDetailsComponent,
    MovieListComponent,
    SearchComponent,
    MinimizeDescriptionPipe,
    InputComponent,
    MinimizeTitlePipe,
    RecomnededComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [SearchService],
})
export class MovieModule {}
