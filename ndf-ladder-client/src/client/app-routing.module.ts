import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceComponent } from './component/workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
