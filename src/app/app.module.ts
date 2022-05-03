import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './components/mapa/mapa.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'ranking', component: RankingComponent},
  {path: 'mapa', component: MapaComponent},
  {path: 'usuarios', component: UsuariosComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    FilterPipe,
    MapaComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyh-MCZk-az-hZlybnOyzkMvZigycO898'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
