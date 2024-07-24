import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-custom',
  standalone: true,
  imports: [],
  templateUrl: './button-custom.component.html',
  styleUrl: './button-custom.component.css',
})
export class ButtonCustomComponent {
  @Input() label: string = '';
  @Input() style: object = {};
  @Input() onClick!: () => void;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
