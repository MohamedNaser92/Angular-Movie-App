import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { SearchComponent } from './movie/search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { WashlistComponent } from './movie/washlist/washlist.component';

const routes: Routes = [
	{ path: '', component: MovieListComponent },
	{ path: 'watch-list', component: WashlistComponent},
	{ path: 'search', component: SearchComponent },
	{ path: 'movie-details/:id/:movieTitle', component: MovieDetailsComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
