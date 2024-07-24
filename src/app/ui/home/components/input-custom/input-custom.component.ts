import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'input-custom',
  standalone: true,
  imports: [],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
})
export class InputCustomComponent {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() style: string = '';
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() isDisable: boolean = false;
}
