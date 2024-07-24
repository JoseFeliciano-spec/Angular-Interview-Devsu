import { Component } from '@angular/core';
import { InputCustomComponent } from '@/app/ui/home/components/input-custom/input-custom.component';
import { ButtonCustomComponent } from '@/app/ui/home/components/button-custom/button-custom.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [InputCustomComponent, ButtonCustomComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  constructor(private router: Router) {}
  onClick = () => {
    this.router.navigateByUrl('');
  };
}
