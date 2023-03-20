import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComparefilesComponent } from './comparefiles/comparefiles.component';

const routes: Routes = [
  { path: '', component: ComparefilesComponent },
  { path: 'comparefiles', component: ComparefilesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
