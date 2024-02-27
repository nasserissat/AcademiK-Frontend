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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/Components/modal.component';
import { DataService } from 'src/services/data.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    ModalComponent,
    StudentsPage,
    GradePage,
    AttendancePage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
