import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputCustomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
