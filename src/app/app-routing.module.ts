import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { SearchComponent } from './movie/search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
	{ path: '', component: MovieListComponent },
	{ path: 'search', component: SearchComponent },
	{ path: 'details/:id', component: MovieDetailsComponent },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
