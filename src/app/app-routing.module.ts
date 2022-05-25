import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'details/:id', component: DetailsPageComponent},
  { path: '**', component: NotfoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
