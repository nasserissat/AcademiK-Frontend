import { Component } from '@angular/core';

@Component({
  selector: 'modal-component',
  template: `
  <div class="fixed inset-0 backdrop-blur-sm backdrop-opacity-80 grid place-items-center bg-black bg-opacity-10">
    <div  class="bg-white mx-3 md:mx-10 shadow-lg rounded">
        <ng-content></ng-content>
    </div>
  </div>
  `,
  styles: []
})
export class ModalComponent {
}