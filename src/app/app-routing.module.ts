import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProduitComponent} from './produit/produit.component';
import {PanierComponent} from './panier/panier.component';
import {PlaylistComponent} from './playlist/playlist.component';


const routes: Routes = [
  { path: 'panier',  component: PanierComponent},
  { path: 'playlist',  component: PlaylistComponent},
  { path: 'produit',  component: ProduitComponent},
  { path: '',  component: ProduitComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
