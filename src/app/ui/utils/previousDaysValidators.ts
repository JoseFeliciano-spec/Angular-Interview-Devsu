import { AbstractControl } from '@angular/forms';
import dayjs from 'dayjs';

export function previousDaysValidators(control: AbstractControl) {
  const controlValue = control.value;
  if (!controlValue) {
    return null; // No validar si el control está vacío
  }
  const isInvalidDate =
    Date.parse(controlValue) < Date.parse(dayjs().format('YYYY-MM-DD'));
  return isInvalidDate ? { longerdate: true } : null;
}
