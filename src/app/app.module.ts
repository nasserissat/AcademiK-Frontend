import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from 'src/Components/container.component';
import { StudentsPage } from './Pages/students.page';
import { GradePage } from './Pages/grade.page';
import { AttendancePage } from './Pages/attendance.page';
import { SettingsPage } from './Pages/settings.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    StudentsPage,
    GradePage,
    AttendancePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
