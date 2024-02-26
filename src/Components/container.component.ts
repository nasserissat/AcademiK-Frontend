import { Component } from "@angular/core";

@Component({
    selector: 'container-component',
    template: `
    <div class="flex w-screen h-screen bg-black">
        <h1 class="text-white">Hola mundo desde el contenedor</h1>
        <router-outlet></router-outlet>
    </div>
        
    `,
    styles: []
  })
  export class ContainerComponent {
  }