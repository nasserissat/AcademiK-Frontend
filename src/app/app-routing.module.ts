import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Pages/students.page';
import { ContainerComponent } from 'src/Components/container.component';

const routes: Routes = [
  {path: '', component: ContainerComponent, children: [
    {path: 'students', component: StudentsComponent},
    {path: '', redirectTo: '/students', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
