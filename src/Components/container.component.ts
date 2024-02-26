import { Component } from "@angular/core";

@Component({
    selector: 'container-component',
    template: `
    <div class="flex items-stretch fixed inset-0 bg-black">
        <!-- Sidebar -->
        <div class="flex flex-col w-64 bg-gray-100">
            <!-- Logo -->
            <div class="flex justify-center items-center bg-blue-400 w-full p-5">
                <h1 class="text-2xl font-bold">AcademiK</h1>
            </div>

            <!-- Menu -->
            <span *ngFor="let item of menu" class="flex justify-center items-center bg-blue-500 w-full p-5">
                <i class="fas {{item.icon}}"></i>
                <a [routerLink]="item.route" class="px-3">{{item.name}}</a>
            </span>
        </div>
        <!-- Content -->
        <div class="flex flex-col flex-1 items-stretch bg-blue-100">
            <!-- Header -->
            <div class="flex items-stretch">
                <h1 class="text-2xl font-bold">Header</h1>
            </div>
            <!-- Main -->
            <div class="flex-1">
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
        
    `,
    styles: []
  })
  export class ContainerComponent {
    menu = [{
        name: 'Estudiantes',
        route: 'students',
        icon: 'fa-solid fa-graduation-cap'
      },{
        name: 'Calificaciones',
        route: 'grades',
        icon: ''
      },{
        name: 'Asistencia',
        route: 'attendances',
        icon: ''
    }];
  }