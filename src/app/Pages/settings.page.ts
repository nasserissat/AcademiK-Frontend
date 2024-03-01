import { Component } from "@angular/core";

@Component({
    selector: 'settings-page.ts',
    template: `
       <div class="flex flex-col h-[80vh] justify-center items-center space-y-4">
         <img src="../../assets/nasserfoto.jpg" alt="Nasser foto" class="h-48 w-48 rounded-full shadow object-cover">
         <h1>Nasser Emil Issa Tavares</h1>
         <p>Software Engineer</p>
         <p>Full Stack Developer</p>
         <p>nasseremil25@gmail.com</p>
         <p>829-805-8311</p>
       </div>
    `,
    styles: []
  })
  export class SettingsPage {
  }