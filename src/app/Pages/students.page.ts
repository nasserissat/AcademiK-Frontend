import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Item, Student, StudentData } from "src/Models/models";
import { DataService } from "src/services/data.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'students-page.ts',
    template: `
      <div class="flex items-center justify-between">
        <h1 class="title text-primary">Estudiantes</h1>
          <div class="flex items-center flex-1 justify-end mt-3">
            <!-- search-bar -->
            <div class="flex items-center relative w-1/2 mr-3">
              <i class="fa-solid fa-magnifying-glass search-icon pl-2 absolute left-0"></i>
              <input type="text" class="input search w-full" placeholder="Buscar estudiantes..." >
            </div>
            <!-- filter -->
            <div class="bg-white rounded-lg py-3.5">
              <i class="fa-solid fa-filter mx-5 info"></i>
            </div>
            <!-- add student button -->
            <button class="button primary mx-5" (click)="creating = true">
              <i class="fa-solid fa-plus"></i>
              Agregar estudiante
            </button>
          </div>
      </div>
      <!-- table -->
        <table class="table">
				<thead>
					<tr>
            <th class="rounded-l-lg">Foto</th>
            <th>Nombre</th>
						<th>Apellido</th>
						<th>Edad</th>
						<th>Género</th>
						<th>Grado</th>
						<th class="rounded-r-lg">Acciones</th>
					</tr>
				</thead>
				<tbody>
					<tr *ngFor="let student of students | paginate: { itemsPerPage: 6, currentPage: p }">
            <td>  
              <div class="flex justify-center">
                <img [src]="getImageUrl(student.picture)" alt="student" class="h-16 w-16 rounded-full object-cover shadow">
              </div>              
            </td>
            <td>
              <p>{{student.firstName}}</p>
            </td>
            <td>{{student.lastName}}</td>
            <td>{{student.age | number}}</td>
            <td>{{student.gender}}</td>
            <td>{{student.courseName}}</td>
            <td class="actions space-x-4 text-xl">
              <i class="fa-solid fa-pen-to-square edit" (click)="editStudent(student.id)"></i>
              <i class="fa-solid fa-trash-can delete" (click)="deleteStudent(student.id)"></i>
          </tr>
				</tbody>
			</table> 
      <div class="flex w-full bg-white justify-end py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
      <!-- Add students modal -->
      <modal-component *ngIf="creating || editing">
      <div class="grid grid-cols-2 p-5 items-center justify-center">
        <h1 class="col-span-2 text-xl text-gray-500 font-medium py-5 uppercase text-center">{{creating ? 'Agregar estudiante' : 'Editar estudiante'}}</h1>
       <form (ngSubmit)="save()" [formGroup]="student_form" class="col-span-2 grid grid-cols-2" > 
        <div class="form-container col-span-2">
            <label for="picture" class="flex flex-col items-center justify-center py-12 w-56 h-56 max-w-56 min-w-56 border-4 border-dashed border-gray-300 rounded-lg relative cursor-pointer">
              <div class="flex flex-col items-center justify-center absolute text-lg text-white font-bold bg-black bg-opacity-20 w-full h-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span *ngIf="!image_seleccionada">Insertar imagen</span>
              </div>
              <input type="file" id="picture" accept="image/*" class="hidden" (change)="onImageSelected($event)"/>
              <img *ngIf="image_seleccionada" [src]="loadImage()" alt="Vista previa de la imagen" />					  
            </label>
            <div class="flex justify-center">
              <button *ngIf="image_seleccionada" class="button-small danger w-auto" type="button" (click)="image_seleccionada = null">Quitar imagen</button>
            </div>
          </div>
          <div class="form-container ml-4">
              <label class="label" for="name">Nombre: </label>
              <input formControlName="name" type="text" class="input bg-tertiary/5" name="name" id="name" placeholder="Nombre del estudiante">
              <span *ngIf="student_form.get('name')?.hasError('required') && student_form.get('name')?.touched" class="text-danger">El campo es requerido</span>
          </div>
          <div class="form-container mr-4">
              <label class="label" for="last_name">Apellido: </label>
              <input formControlName="last_name" type="text" class="input bg-tertiary/5" name="last_name" id="last_name" placeholder="Apellido del estudiante">
              <span *ngIf="student_form.get('last_name')?.hasError('required') && student_form.get('last_name')?.touched" class="text-danger">El campo es requerido</span>
          </div>
          <div class="form-container ml-4">
              <label class="label" for="gender">Género: </label>
              <select formControlName="gender" class="input bg-tertiary/5 cursor-pointer" name="gender" id="gender">
                <option [value]="0" disabled selected>Seleccione un género</option>
                <option [value]="i.id" *ngFor="let i of genders">{{i.description}}</option>
              </select>
          </div>
          <div class="form-container mr-4">
              <label class="label" for="age">Edad: </label>
              <select formControlName="age" class="input bg-tertiary/5 cursor-pointer" name="age" id="age">
                <option [value]="0" disabled selected>Seleccione una edad</option>
                <option [value]="i" *ngFor="let i of [12, 13, 14, 15, 16, 17, 18, 19, 20]">{{i}}</option>
              </select>
          </div>
          <div class="form-container">
              <label class="label" for="course">Grado: </label>
              <select formControlName="course" class="input bg-tertiary/5 cursor-pointer" name="course" id="course">
                <option [value]="0" disabled selected>Seleccione un grado</option>
                <option [value]="course.id" *ngFor="let course of courses">{{course.description}}</option>
              </select>
          </div>
        
          <div class="grid col-span-2 pb-3 mx-4">
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
export class StudentsPage {
  p: number = 1;
  creating: boolean = false;
  editing: number | false = false
  student_form: FormGroup

  constructor( private fb: FormBuilder, private data: DataService, private toastr: ToastrService){
    this.getAllStudents();
    this.student_form = this.fb.group({
      image: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: [0, Validators.required],
      age: [0, Validators.required],
      course: [0, Validators.required],
    })

  }
  getAllStudents(){
    return this.data.getAllStudents().subscribe((students: Student[]) =>{ 
        this.students = students
        console.log('listado de estudiantes: ', this.students)
    }), (err: any) => console.log(err)
  }
  save(){
      let student_data: StudentData = { 
        Picture: this.image_seleccionada,
        FirstName: this.student_form.get('name')?.value,
        LastName: this.student_form.get('last_name')?.value,
        GenderId: parseInt(this.student_form.get('gender')?.value),
        Age: parseInt(this.student_form.get('age')?.value),
        CourseId: parseInt(this.student_form.get('course')?.value)
       };
      console.log('datos del estudiante: ', student_data)
      this.data.addStudent(student_data).subscribe(
        (result) => {
          this.toastr.success('Estudiante agregado exitosamente', 'estudiante agregado!')
          console.log(result)
          this.getAllStudents();
          this.student_form.reset();
          this.creating = false
        },
        (error) => {
          this.toastr.error('Error: ' + error.error.error, 'No se pudo agregar el estudiante')
          console.log(error)
          this.creating = true
        }
      );
  }
  deleteStudent(id: number){
    
  }
  editStudent(id: number){
    this.editing = id;
    
  }
  closeModal(){
    this.creating = this.editing = false;
     this.student_form.reset();
     this.image_seleccionada = null
  }
  
image_seleccionada!: any;

onImageSelected(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
  const base64data = reader.result as string;
  this.image_seleccionada = base64data;
  };
  reader.readAsDataURL(file);
}

loadImage() {
  return this.image_seleccionada;
}
getImageUrl(filename: string): string {
  return this.data.getImageUrl(filename);
}
  
  // data dummie for testing
  students: Student[] = [
  //   {
  //     id: 1,
  //     picture: "../../assets/student1.avif",
  //     firstName: "Juan",
  //     lastName: "Pérez",
  //     gender: { id: 1, description: "Male" },
  //     age: 16,
  //     course: { id: 1, description: "Mathematics" }
  //   },
  //   {
  //     id: 2,
  //     picture: "../../assets/student2.webp",
  //     firstName: "María",
  //     lastName: "García",
  //     gender: { id: 2, description: "Female" },
  //     age: 15,
  //     course: { id: 3, description: "Science" }
  //   },
  //   {
  //     id: 3,
  //     picture: "../../assets/student3.avif",
  //     firstName: "Carlos",
  //     lastName: "López",
  //     gender: { id: 1, description: "Male" },
  //     age: 17,
  //     course: { id: 2, description: "History" }
  //   },
  //   {
  //     id: 4,
  //     picture: "../../assets/student8.jpeg",
  //     firstName: "Ana",
  //     lastName: "Martínez",
  //     gender: { id: 2, description: "Female" },
  //     age: 16,
  //     course: { id: 1, description: "Mathematics" }
  //   },
  //   {
  //     id: 5,
  //     picture: "../../assets/student1.avif",
  //     firstName: "Pedro",
  //     lastName: "Rodríguez",
  //     gender: { id: 1, description: "Male" },
  //     age: 15,
  //     course: { id: 3, description: "Science" }
  //   },
  //   {
  //     id: 6,
  //     picture: "../../assets/student6.jpeg",
  //     firstName: "Laura",
  //     lastName: "Fernández",
  //     gender: { id: 2, description: "Female" },
  //     age: 17,
  //     course: { id: 2, description: "History" }
  //   },
  //   {
  //     id: 7,
  //     picture: "../../assets/student5.jpeg",
  //     firstName: "David",
  //     lastName: "Gómez",
  //     gender: { id: 1, description: "Male" },
  //     age: 16,
  //     course: { id: 1, description: "Mathematics" }
  //   },
  //   {
  //     id: 8,
  //     picture: "../../assets/student4.jpeg",
  //     firstName: "Daniel",
  //     lastName: "Hernández",
  //     gender: { id: 1, description: "Male" },
  //     age: 17,
  //     course: { id: 2, description: "History" }
  //   },
  ];
  courses: Item[] =  [
    {id: 1, description: 'Primero de secundaria'},
  ]
  genders: Item[] = 
  [{id: 1, description: 'Masculino'},
  {id: 2, description: 'Femenino'}
]

}