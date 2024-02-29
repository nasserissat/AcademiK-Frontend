import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Course, Grade, GradeData, Student, Subject } from "src/Models/models";
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
              <input [(ngModel)]="search_text" type="text" class="input search w-full" placeholder="Buscar por nombre" >
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
            <button class="button primary w-1/2 mx-5" (click)="rateStudents()">
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
                  <td>{{grade.course.description}}</td>
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
          <div class="form-container col-span-3">
              <label class="label" for="course">Grado: </label>
              <select (change)="getStudentsByCourseId()" formControlName="course" class="input bg-tertiary/5 cursor-pointer" name="course" id="course">
                <option [value]="0" disabled selected>Seleccione un grado</option>
                <option [value]="course.id" *ngFor="let course of courses">{{course.description}}</option>
              </select>
              <span *ngIf="grade_form.get('course')?.hasError('required') && grade_form.get('course')?.touched" class="text-danger">El campo es requerido</span>

          </div>
          <div class="form-container col-span-3">
              <label class="label" for="subject">Materia: </label>
              <select formControlName="subject" class="input bg-tertiary/5 cursor-pointer" name="subject" id="subject">
                <option [value]="0" disabled selected>Seleccione una materia</option>
                <option [value]="i.id" *ngFor="let i of subjects">{{i.description}}</option>
              </select>
              <span *ngIf="grade_form.get('subject')?.hasError('required') && grade_form.get('subject')?.touched" class="text-danger">El campo es requerido</span>
          </div>
          <!-- modal table -->
        <table class="table col-span-6">
				<thead class="!shadow-none">
               <th>Foto</th>
               <th class="rounded-l-lg">Estudiante</th>
               <th>Calificación</th>
				</thead>
				<tbody>
               <tr *ngFor="let student of students; let i = index">
                  <td>
                  <div class="flex justify-center items-center space-x-4">
                     <img [src]="student.picture != '' ? getImageUrl(student.picture) : '../../assets/default-satudent-picture.png'" alt="student" class="h-14 w-14 rounded-full object-cover">
                  </div>     
               </td>
               <td><p>{{student.firstName + " " + student.lastName}}</p></td>
               <td>
               <input type="number" formControlName="score{{i}}" class="input text-[15px] bg-tertiary/5 w-16 text-center" >
               <div *ngIf="grade_form.get('score' + i)?.errors && (grade_form.get('score' + i)?.touched || grade_form.get('score' + i)?.dirty)">
                  <span *ngIf="grade_form.get('score' + i)?.hasError('required')" class="text-danger">El campo es requerido</span>
                  <span *ngIf="grade_form.get('score' + i)?.hasError('min')" class="text-danger">La calificación no puede ser menor que 0</span>
                  <span *ngIf="grade_form.get('score' + i)?.hasError('max')" class="text-danger">La calificación no puede ser mayor que 100</span>
               </div>
               </td>
               </tr>
               <tr *ngIf="(students | appFilter : search_text).length === 0" tabindex="-1" class="text-center">
              <td *ngIf="this.grade_form.get('course')?.value == ''" colspan="8" class="sub-title text-tertiary/40 py-4 2xl:py-6">
                 Seleccione un grado para ver los estudiantes
              </td>
            </tr>
				</tbody>
			</table>
          <div class="grid col-span-6 pb-3 mx-4">
            <div class="flex items-center justify-center">
              <button
              (click)="creating = false; this.grade_form.reset(); this.students = [] "
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
   grades: Grade[] = []
   students: Student[] = []
   students_grade: {id: number, score:number}[] = []
   search_text = '';
   filters: {
      CourseId?: number | null;
      GenderId?: number | null;
      Age?: number | null;
   } = {
      CourseId: 0,
      GenderId: 0,
      Age: 0,
   };
   constructor(private fb: FormBuilder, private data: DataService, private toastr: ToastrService){
      this.grade_form = this.fb.group({
         course: ['', Validators.required],
         subject: ['', Validators.required],
         students: this.fb.array([])
      });
   }
   getAllGrades(){
      return this.data.getAllGrades().subscribe((grades: Grade[]) =>{ 
         this.grades = grades
         console.log('listado de calificaciones: ', this.grades)
     }), (err: any) => console.log(err)
   }
   rateStudents(){
      this.creating = true 
      this.data.getAllStudents()
   }
   getStudentsByCourseId(){
      this.data.getAllStudents(this.filters).subscribe(
         (result) => {
            this.students = result
            this.students.forEach((_, index) => {
               this.grade_form.addControl('score' + index, new FormControl('', [
                  Validators.required,
                  Validators.min(0),
                  Validators.max(100)]));
            });
            console.log(result)
         },
         (error) => {
            console.log(error)
         }
      )
   }
   save(){
      let grade_data: GradeData = { 
         SubjectId: parseInt(this.grade_form.get('subject')?.value),
         CourseId: parseInt(this.grade_form.get('course')?.value),
         Students: this.students_grade = this.students.map((student, index) => {
            return {id: student.id, score: this.grade_form.get('score' + index)?.value}
         })
      };
      if(this.grade_form.valid){
         console.log('datos de las calificaciones: ', grade_data)
         alert('exito')
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
      this.toastr.error('Error: ', 'No se pudo registrar la calificación') 
  }
 
   editGrade(id: number){
     
   }
   getImageUrl = (filename: string): string => this.data.getImageUrl(filename);

      courses: Course[] = [
         {id: 1, description: 'Primero de secundaria'},
         {id: 2, description: 'Segundo de secundaria'}
      ]
      subjects: Subject[] = [
         {id: 1, description: 'Español'},
         {id: 2, description: 'Matematicas'},
         {id: 3, description: 'Naturales'},
         {id: 4, description: 'Sociales'},
      ]
  }