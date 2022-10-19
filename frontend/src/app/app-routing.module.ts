import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinentComponent } from './continent/continent.component';


const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "continents"},
  {path: "continents", component: ContinentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
