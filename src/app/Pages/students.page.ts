import { Component } from "@angular/core";
import { Student } from "src/Models/models";
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
            <button class="button primary mx-5">
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
                <img [src]="student.picture" alt="student" class="h-16 w-16 rounded-full object-cover">
              </div>              
            </td>
            <td>
              <p>{{student.firstName}}</p>
            </td>
            <td>{{student.lastName}}</td>
            <td>{{student.age | number}}</td>
            <td>{{student.gender.description}}</td>
            <td>{{student.course.description}}</td>
            <td class="actions space-x-4 text-xl">
              <i class="fa-solid fa-pen-to-square edit" (click)="editStudent(student.id)"></i>
              <i class="fa-solid fa-trash-can delete" (click)="deleteStudent(student.id)"></i>
          </tr>
				</tbody>
			</table> 
      <div class="flex w-full bg-white justify-end py-4">
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
    `,
    styles: []
})
export class StudentsPage {
  p: number = 1;
  constructor(){

  }
  deleteStudent(id: number){
    
  }
  editStudent(id: number){
    
  }
  
  
  // data dummie for testing
  students: Student[] = [
    {
      id: 1,
      picture: "../../assets/student1.avif",
      firstName: "Juan",
      lastName: "Pérez",
      gender: { id: 1, description: "Male" },
      age: 16,
      course: { id: 1, description: "Mathematics" }
    },
    {
      id: 2,
      picture: "../../assets/student2.webp",
      firstName: "María",
      lastName: "García",
      gender: { id: 2, description: "Female" },
      age: 15,
      course: { id: 3, description: "Science" }
    },
    {
      id: 3,
      picture: "../../assets/student3.avif",
      firstName: "Carlos",
      lastName: "López",
      gender: { id: 1, description: "Male" },
      age: 17,
      course: { id: 2, description: "History" }
    },
    {
      id: 4,
      picture: "../../assets/student8.jpeg",
      firstName: "Ana",
      lastName: "Martínez",
      gender: { id: 2, description: "Female" },
      age: 16,
      course: { id: 1, description: "Mathematics" }
    },
    {
      id: 5,
      picture: "../../assets/student1.avif",
      firstName: "Pedro",
      lastName: "Rodríguez",
      gender: { id: 1, description: "Male" },
      age: 15,
      course: { id: 3, description: "Science" }
    },
    {
      id: 6,
      picture: "../../assets/student6.jpeg",
      firstName: "Laura",
      lastName: "Fernández",
      gender: { id: 2, description: "Female" },
      age: 17,
      course: { id: 2, description: "History" }
    },
    {
      id: 7,
      picture: "../../assets/student5.jpeg",
      firstName: "David",
      lastName: "Gómez",
      gender: { id: 1, description: "Male" },
      age: 16,
      course: { id: 1, description: "Mathematics" }
    },
    {
      id: 8,
      picture: "../../assets/student4.jpeg",
      firstName: "Daniel",
      lastName: "Hernández",
      gender: { id: 1, description: "Male" },
      age: 17,
      course: { id: 2, description: "History" }
    },
  ];
}