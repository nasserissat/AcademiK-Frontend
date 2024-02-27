import { Component } from "@angular/core";
import { Course, Grade, Subject } from "src/Models/models";

@Component({
    selector: 'grades-page.ts',
    template: `
       <div class="flex items-center justify-between">
        <h1 class="title text-primary">Calificaciones</h1>
          <div class="flex items-center flex-1 space-x-5 justify-end mt-3">
            <!-- search-bar -->
            <div class="flex items-center relative w-full ml-9">
              <i class="fa-solid fa-magnifying-glass search-icon pl-2 absolute left-0"></i>
              <input type="text" class="input search w-full" placeholder="Buscar por nombre" >
            </div>
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
               <i class="fa-solid fa-star"></i>
               Calificar
            </button>
          </div>
      </div>
      <!-- table -->
        <table class="table">
				<thead>
               <th class="rounded-l-lg">Estudiante</th>
               <th>Curso</th>
               <th>Materia</th>
               <th>Calificación</th>
               <th>Literal</th>
               <th class="rounded-r-lg">Acciones</th>
				</thead>
				<tbody>
               <tr *ngFor="let grade of grades | paginate: { itemsPerPage: 6, currentPage: p }">
                  <td>
                  <div class="flex justify-center items-center space-x-4">
                     <img [src]="grade.student.picture" alt="student" class="h-14 w-14 rounded-full object-cover">
                     <p>{{grade.student.name}}</p>
                  </div>     
               </td>
                  <td>{{grade.student.course.description}}</td>
                  <td>{{grade.subject.description}}</td>
                  <td>{{grade.score}}</td>
                  <td class="flex justify-center" > 
                     <div  [ngClass]="{'grade-A': grade.letterGrade === 'A', 'grade-B': grade.letterGrade === 'B', 'grade-C': grade.letterGrade === 'C', 'grade-F': grade.letterGrade === 'F'}">
                        <p>{{grade.letterGrade}}</p>                        
                     </div>
                  </td>
                  <td class="actions space-x-4 text-xl">
                     <i class="fa-solid fa-pen-to-square edit" (click)="editGrade(grade.id)"></i>
                     <i class="fa-solid fa-trash-can delete" (click)="deleteGrade(grade.id)"></i>
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
  export class GradePage {
   p: number = 1;
   course_id: number = 0;
   subject_id: number = 0
   constructor(){

   }
   editGrade(id: number){
     
   }
   deleteGrade(id: number){
     
   }
   grades: Grade[] = [
      {
         id: 1,
         student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez', course: {id: 1, description: 'Primero de secundaria'}},
         subject: {id: 1, description: 'Español'},
         score: 90,
         letterGrade: 'A'
       },
      {
         id: 1,
         student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez', course: {id: 1, description: 'Primero de secundaria'}},
         subject: {id: 1, description: 'Español'},
          score: 83,
         letterGrade: 'B'
      },
      {
         id: 1,
         student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez', course: {id: 1, description: 'Primero de secundaria'}},
         subject: {id: 1, description: 'Español'},
          score: 40,
         letterGrade: 'F'
      },
      {
         id: 1,
         student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez', course: {id: 1, description: 'Primero de secundaria'}},
         subject: {id: 1, description: 'Español'},
          score: 78,
         letterGrade: 'C'
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