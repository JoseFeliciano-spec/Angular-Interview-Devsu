import { Component } from '@angular/core';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [InputCustomComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {}
