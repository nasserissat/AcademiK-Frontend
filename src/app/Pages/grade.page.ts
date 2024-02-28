import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Course, Grade, GradeData, Subject } from "src/Models/models";
import { DataService } from "src/services/data.service";

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
            <button class="button primary w-1/2 mx-5" (click)="creating = true">
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
                  </td>
               </tr>
				</tbody>
			</table> 
      <div class="flex w-full bg-white justify-end py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    <!-- Add grade modal -->
    <modal-component *ngIf="creating">
      <div class="grid grid-cols-2 p-5 items-center justify-center">
        <h1 class="col-span-2 text-xl text-gray-500 font-medium py-5 uppercase text-center">Calificar estudiantes</h1>
       <form (ngSubmit)="save()" [formGroup]="grade_form" class="col-span-2 grid grid-cols-6" > 
          <div class="form-container col-span-2">
              <label class="label" for="date">Fecha: </label>
              <input formControlName="date" type="date" class="input bg-tertiary/5" name="date" id="date">
              <span *ngIf="grade_form.get('date')?.hasError('required') && grade_form.get('date')?.touched" class="text-danger">El campo es requerido</span>
          </div>
          <div class="form-container col-span-2">
              <label class="label" for="course">Grado: </label>
              <select formControlName="course" class="input bg-tertiary/5 cursor-pointer" name="course" id="course">
                <option [value]="0" disabled selected>Seleccione un grado</option>
                <option [value]="course.id" *ngFor="let course of courses">{{course.description}}</option>
              </select>
          </div>
          <div class="form-container col-span-2">
              <label class="label" for="subject">Materia: </label>
              <select formControlName="subject" class="input bg-tertiary/5 cursor-pointer" name="subject" id="subject">
                <option [value]="0" disabled selected>Seleccione una materia</option>
                <option [value]="i.id" *ngFor="let i of subjects">{{i.description}}</option>
              </select>
          </div>
          <!-- modal table -->
        <table class="table col-span-6">
				<thead class="!shadow-none">
               <th class="rounded-l-lg">Estudiantes</th>
               <th>Estado</th>
				</thead>
				<tbody>
               <tr *ngFor="let grade of grades | paginate: { itemsPerPage: 6, currentPage: p }">
                  <td>
                  <div class="flex justify-center items-center space-x-4">
                     <img [src]="grade.student.picture" alt="student" class="h-14 w-14 rounded-full object-cover">
                     <p>{{grade.student.name}}</p>
                  </div>     
               </td>
                  <input type="number" class="input text-[15px] bg-tertiary/5 w-16 text-center">
               </tr>
				</tbody>
			</table>
         <div class="grid col-span-6 bg-white justify-end py-4">
            <pagination-controls (pageChange)="p = $event"></pagination-controls>
         </div>
          <div class="grid col-span-6 pb-3 mx-4">
            <div class="flex items-center justify-center">
              <button
              (click)="creating = false; this.grade_form.reset();"
                class="button danger my-4 mr-2 mb-0"
              >            
                Cerrar
              </button>
              <button
                class="button success my-4 mr-2 mb-0"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </modal-component>
    `,
    styles: []
  })
  export class GradePage {
   p: number = 1;
   course_id: number = 0;
   subject_id: number = 0
   creating: boolean = true;
   editing: number | false = false
   grade_form: FormGroup
   constructor(private fb: FormBuilder, private data: DataService, private toastr: ToastrService){
      this.getAllGrades();
      this.grade_form = this.fb.group({
         score: [new Date().toISOString().substring(0, 10), Validators.required],
         course: [0, Validators.required],
         subject: [0, Validators.required],
       })
   }
   getAllGrades(){
      return this.data.getAllGrades().subscribe((grades: Grade[]) =>{ 
         this.grades = grades
         console.log('listado de calificaciones: ', this.grades)
     }), (err: any) => console.log(err)
   }
   save(){
      let grade_data: GradeData = { 
        Score: this.grade_form.get('score')?.value,
        StudentId: parseInt(this.grade_form.get('student')?.value),
        SubjectId: parseInt(this.grade_form.get('subject')?.value),
       };
      console.log('datos de la asistencia: ', grade_data)
      this.data.addGrade(grade_data).subscribe(
        (result) => {
          this.toastr.success('Calificación agregada exitosamente', 'Calificación registrada!')
          console.log(result)
          this.getAllGrades();
          this.grade_form.reset();
          this.creating = false
        },
        (error) => {
          this.toastr.error('Error: ' + error.error.error, 'No se pudo registrar la calificación')
          console.log(error)
          this.creating = true
        }
      );
  }
   editGrade(id: number){
     
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