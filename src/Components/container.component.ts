import { Component } from "@angular/core";

@Component({
    selector: 'container-component',
    template: `
    <div class="flex items-stretch fixed inset-0">
        <!-- Sidebar -->
        <div class="flex flex-col w-64">
            <!-- Logo -->
            <div class="flex justify-center items-center w-full p-5">
                <img src="../assets/academik-logo.png" alt="Logo" class="h-24">
            </div>

            <!-- Menu -->
            <div *ngFor="let item of menu" [routerLink]="item.route" class="flex justify-center items-center w-full p-5 hover:text-primary ease-linear duration-200 cursor-pointer" routerLinkActive="bg-primary text-secondary hover:text-secodary hover:scale-100 font-medium">
                <div class="flex justify-between items-center w-2/3" routerLinkActive="text-secondary">
                    <i class="{{item.icon}} pr-3 w-10"></i>
                    <a class="flex-1">{{item.name}}</a>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div class="flex flex-col flex-1 items-stretch bg-blue-100">
            <!-- Header -->
            <div class="flex items-stretch bg-white shadow-b-lg shadow-lg shadow-blue-300/20 ">
                <h1 class="text-2xl font-bold px-5">Header</h1>
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
        icon: 'fa-solid fa-star'
      },{
        name: 'Asistencia',
        route: 'attendances',
        icon: 'fa-solid fa-clipboard-user',
      }, {
        name: 'Configuración',
        route: 'settings',
        icon: 'fa-solid fa-gear'
      }];
  }