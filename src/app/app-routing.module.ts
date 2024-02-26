import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsPage } from './Pages/students.page';
import { ContainerComponent } from 'src/Components/container.component';
import { AttendancePage } from './Pages/attendance.page';
import { GradePage } from './Pages/grade.page';
import { SettingsPage } from './Pages/settings.page';

const routes: Routes = [
  {path: '', component: ContainerComponent, children: [
    {path: 'students', component: StudentsPage},
    {path: 'grades', component: GradePage},
    {path: 'attendances', component: AttendancePage},
    {path: 'settings', component: SettingsPage},
    {path: '', redirectTo: '/students', pathMatch: 'full'},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
