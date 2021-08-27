import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function nicknameValidator(nickname: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if ((control.value.match(/^[a-z0-9A-Z]{6,20}$/)) || (!control.touched)){
      return null;
    } else {
      return { 'invalidNickname': true };
    }
  }
}
