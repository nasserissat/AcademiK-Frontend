import { Component } from "@angular/core";

@Component({
    selector: 'students-page.ts',
    template: `
       <div class="flex items-center justify-between px-10">
        <h1 class="title text-primary">Estudiantes</h1>
          <div class="flex items-center flex-1 justify-end mt-3">
            <!-- search-bar -->
            <div class="flex items-center relative w-1/2 mr-3">
              <i class="fa-solid fa-magnifying-glass search-icon pl-2 absolute left-0"></i>
              <input type="text" class="input w-full" placeholder="Buscar estudiantes..." >
            </div>
            <!-- filter -->
            <i class="fa-solid fa-filter mx-5 text-xl"></i>
            <!-- add student button -->
            <button class="button primary mx-5">
              <i class="fa-solid fa-plus"></i>
              Botón primario
            </button>
          </div>
        </div>
    `,
    styles: []
  })
  export class StudentsPage {
  }