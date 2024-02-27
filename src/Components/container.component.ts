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
        <div class="flex flex-col flex-1 items-stretch bg-[#F7F7F7]">
            <!-- Header -->
            <div class="flex items-center justify-between h-[9vh] bg-white px-10 shadow-md">
                <h1 class="sub-title text-tertiary">Colegio Santa Teresita</h1>
                <!-- User -->
                <div class="flex justify-between items-center m-5 rounded-lg">
                    <img src="../assets/pedros-profile.jpeg" class="rounded-full h-12 w-12 object-cover mx-5">
                    <div class="flex flex-col font-semibold">
                        <span> Pedro Tavarez <i class="fa-solid fa-chevron-down pl-3"></i></span>
                        <span class="font-bold text-tertiary text-xs">Profesor</span>
                    </div>
                    
                </div>
            </div>
            <!-- Main -->
            <div class="px-10 max-h-[91vh]">
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