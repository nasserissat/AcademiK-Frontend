import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Attendance, Course, Subject } from "src/Models/models";
@Component({
    selector: 'attendance-page.ts',
    template: `
       <div class="flex items-center justify-between">
        <h1 class="title text-primary">Asistencia</h1>
          <div class="flex items-center flex-1 space-x-5 justify-end mt-3">
            <!-- search-bar -->
            <div class="flex items-center relative w-full ml-9">
              <i class="fa-solid fa-magnifying-glass search-icon pl-2 absolute left-0"></i>
              <input type="text" class="input search w-full" placeholder="Buscar por nombre" >
            </div>
            <!-- filter by date -->
            <input type="date" class="input">
            <!-- filter by course -->
            <select [(ngModel)]="course_id" class="input">
               <option [value]="0" disabled>Filtrar por curso</option>
               <option *ngFor="let item of courses" [value]="item.id">{{item.description}}</option>
            </select>
             <!-- filter by subject -->
             <select [(ngModel)]="subject_id" class="input">
            <option [value]="0" disabled>Filtrar por materia</option>
               <option *ngFor="let item of subjects" [value]="item.id">{{item.description}}</option>
            </select>
            <!-- add student button -->
            <button class="button primary w-1/2 mx-5">
               <i class="fa-solid fa-list-check"></i>
               Pasar asistencia
            </button>
          </div>
      </div>
      <!-- table -->
        <table class="table">
				<thead>
               <th class="rounded-l-lg">Estudiante</th>
               <th>Curso</th>
               <th>Materia</th>
               <th>Fecha</th>
               <th>Hora</th>
               <th>Asistió</th>
               <th class="rounded-r-lg">Acciones</th>
				</thead>
				<tbody>
               <tr *ngFor="let attendance of attendances | paginate: { itemsPerPage: 6, currentPage: p }">
                  <td>
                  <div class="flex justify-center items-center space-x-4">
                     <img [src]="attendance.student.picture" alt="student" class="h-14 w-14 rounded-full object-cover">
                     <p>{{attendance.student.name}}</p>
                  </div>     
               </td>
                  <td>{{attendance.course.description}}</td>
                  <td>{{attendance.subject.description}}</td>
                  <td>{{attendance.date | date}}</td>
                  <td>{{attendance.date | date:"HH:MM:SS"}}</td>
                  <td>{{attendance.attended}}</td>
                  <td class="actions space-x-4 text-xl">
                     <i class="fa-solid fa-pen-to-square edit" (click)="editAttendance(attendance.id)"></i>
                     <i class="fa-solid fa-trash-can delete" (click)="deleteAttendance(attendance.id)"></i>
                  </td>
               </tr>
				</tbody>
			</table> 
      <div class="flex w-full bg-white justify-end py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    `,
    styles: []
  })
  export class AttendancePage {
   p: number = 1;
   course_id: number = 0;
   subject_id: number = 0
   constructor(){

   }
   editAttendance(id: number){
     
   }
   deleteAttendance(id: number){
     
   }
   attendances: Attendance[] = [
   {
      id: 1,
      date: new Date(),
      attended: true,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
      course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      attended: true,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
       course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      attended: true,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
       course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      attended: true,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
       course: {id: 1, description: 'Primero de secundaria'}
   },
]
   courses: Course[] = [
      {id: 1, description: 'Primero de secundaria'},
   ]
   subjects: Subject[] = [
      {id: 1, description: 'Español'},
      {id: 2, description: 'Matematicas'},
      {id: 3, description: 'Naturales'},
      {id: 4, description: 'Sociales'},
   ]
  }