import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Attendance, AttendanceData, Course, Item, Subject } from "src/Models/models";
import { DataService } from "src/services/data.service";
@Component({
    selector: 'attendance-page.ts',
    template: `
       <div class="flex items-center justify-between">
        <h1 class="title text-primary">Asistencia</h1>
          <div class="flex items-center flex-1 space-x-5 justify-end mt-3">
            <!-- search-bar -->
            <div class="flex items-center relative w-full ml-9">
              <i class="fa-solid fa-magnifying-glass search-icon pl-2 absolute left-0"></i>
              <input type="text" [(ngModel)]="search_text" class="input search w-full" placeholder="Buscar por nombre, apellido ..." >
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
            <button class="button primary w-1/2 mx-5" (click)="creating = true">
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
               <th>Estado</th>
               <th class="rounded-r-lg">Acciones</th>
				</thead>
				<tbody>
               <tr *ngFor="let attendance of attendances | appFilter: search_text : ['firstName', 'lastName'] | paginate: { itemsPerPage: 6, currentPage: p }">
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
                  <td class="flex justify-center" > 
                     <div  [ngClass]="{'grade-A': attendance.status === 1, 'grade-F': attendance.status  === 2, 'grade-C': attendance.status  === 3}">
                        <p>{{attendance.status === 1 ? 'Presente' : attendance.status === 2 ?  'Ausente' : 'Excusa'}}</p>                        
                     </div>
                  </td>
                  <td class="actions space-x-4 text-xl">
                     <i class="fa-solid fa-pen-to-square edit" (click)="editAttendance(attendance.id)"></i>
                  </td>
               </tr>
               <tr *ngIf="(attendances | appFilter: search_text : ['firstName', 'lastName']).length === 0" tabindex="-1" class="text-center">
                  <td colspan="8" class="sub-title text-tertiary/40 py-4 2xl:py-6">
                     No se encontró ningún registro
                  </td>
               </tr>
               
				</tbody>
			</table> 
      <div class="flex w-full bg-white justify-end py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
            <!-- Add attendance modal -->
            <modal-component *ngIf="creating || editing">
      <div class="grid grid-cols-2 p-5 items-center justify-center">
        <h1 class="col-span-2 text-xl text-gray-500 font-medium py-5 uppercase text-center">{{creating ? 'Pasar asistencia' : 'Editar asistencia'}}</h1>
       <form (ngSubmit)="save()" [formGroup]="attendance_form" class="col-span-2 grid grid-cols-6" > 
          <div class="form-container col-span-2">
              <label class="label" for="date">Fecha: </label>
              <input formControlName="date" type="date" class="input bg-tertiary/5" name="date" id="date">
              <span *ngIf="attendance_form.get('date')?.hasError('required') && attendance_form.get('date')?.touched" class="text-danger">El campo es requerido</span>
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
               <tr *ngFor="let attendance of attendances | paginate: { itemsPerPage: 6, currentPage: p }">
                  <td>
                  <div class="flex justify-center items-center space-x-4">
                     <img [src]="attendance.student.picture" alt="student" class="h-14 w-14 rounded-full object-cover">
                     <p>{{attendance.student.name}}</p>
                  </div>     
                  </td>
                     <td class="input space-x-4 text-xl">
                     <select formControlName="status" class="input text-[15px] bg-tertiary/5 cursor-pointer" name="status" id="status">
                        <option [value]="0" disabled selected>Seleccione un estado</option>
                        <option [value]="i.id" *ngFor="let i of status">{{i.description}}</option>
                     </select>
                  </td>
               </tr>
				</tbody>
			</table>
         <div class="grid col-span-6 bg-white justify-end py-4">
            <pagination-controls (pageChange)="p = $event"></pagination-controls>
         </div>

          <div class="grid col-span-6 pb-3 mx-4">
            <div class="flex items-center justify-center">
              <button
              (click)="closeModal()"
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
  export class AttendancePage {
   p: number = 1;
   course_id: number = 0;
   subject_id: number = 0
   creating: boolean = false;
   editing: number | false = false
   attendance_form: FormGroup
   search_text = '';

   constructor(private fb: FormBuilder, private data: DataService, private toastr: ToastrService){
      this.getAllAttendances();
      this.attendance_form = this.fb.group({
         date: [new Date().toISOString().substring(0, 10), Validators.required],
         course: [0, Validators.required],
         subject: [0, Validators.required],
         status: [0, Validators.required],
       })
   }
   getAllAttendances(){
      return this.data.getAllAttendances().subscribe((attendances: Attendance[]) =>{ 
         this.attendances = attendances
         console.log('listado de asistencias: ', this.attendances)
     }), (err: any) => console.log(err)
   }
   save(){
      let attendance_data: AttendanceData = { 
        Date: this.attendance_form.get('date')?.value,
        StatusId: this.attendance_form.get('status')?.value,
        StudentId: parseInt(this.attendance_form.get('student')?.value),
        SubjectId: parseInt(this.attendance_form.get('subject')?.value),
        CourseId: parseInt(this.attendance_form.get('course')?.value)
       };
      console.log('datos de la asistencia: ', attendance_data)
      this.data.addAttendance(attendance_data).subscribe(
        (result) => {
          this.toastr.success('Asistencia registrada exitosamente', 'Asistencia registrada!')
          console.log(result)
          this.getAllAttendances();
          this.attendance_form.reset();
          this.creating = false
        },
        (error) => {
          this.toastr.error('Error: ' + error.error.error, 'No se pudo registrar la asistencia')
          console.log(error)
          this.creating = true
        }
      );
  }
  closeModal(){
    this.creating = this.editing = false;
     this.attendance_form.reset();
  }
   editAttendance(id: number){
     
   }
   attendances: Attendance[] = [
   {
      id: 1,
      date: new Date(),
      status: 1,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
      course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      status: 3,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
       course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      status: 2,
      student: {id: 1, picture: '../../assets/student3.avif', name: 'Pedro Tavarez'},
      subject: {id: 1, description: 'Español'},
       course: {id: 1, description: 'Primero de secundaria'}
   },
   {
      id: 1,
      date: new Date(),
      status: 1,
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
   status: Item[] = [
      {id: 1, description: 'Presente'},
      {id: 2, description: 'Ausente'},
      {id: 3, description: 'Excusa'},
   ]
  }