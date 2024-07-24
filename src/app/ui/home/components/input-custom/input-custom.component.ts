import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';
import { Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'input-custom',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCustomComponent),
      multi: true,
    },
  ],
})
export class InputCustomComponent implements ControlValueAccessor {
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // No es necesario implementar
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
  }

  get errorClass() {
    if(this.errors?.length >0 && this.errors !== undefined){
      return "inputerrors"
    }
    return '';
  }
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() isDisable: boolean = false;
  @Input() errors: any;
}
