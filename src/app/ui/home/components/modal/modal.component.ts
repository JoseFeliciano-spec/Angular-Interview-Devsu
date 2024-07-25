import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
