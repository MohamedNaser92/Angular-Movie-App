import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WashlistComponent } from './washlist/washlist.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		WashlistComponent,
		MovieDetailsComponent,
		MovieListComponent,
		SearchComponent,
	],
	imports: [CommonModule, RouterModule],
})
export class MovieModule {}
