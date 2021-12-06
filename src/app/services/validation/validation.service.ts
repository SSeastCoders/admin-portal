// Original version created by Cory Rylan: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
import { AbstractControl } from '@angular/forms';

export class ValidationService {

    static getValidatorErrorMessage(code: string) {
        const config: any = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidAdminEmailAddress': 'Invalid admin email address',
            'invalidPassword': 'Invalid password. Password must contain a number, uppercase and be 7-20 characters long.',
            'invalidBirthdate': 'Invalid birthdate, must be over 18',
            'invalidConfirmPassword': 'Invalid password re-entry, passwords must match',
            'invalidUsername': 'Invalid username, Username must 5 - 20 alphanumeric characters',
            'invalidUser': 'Invalid user id number',
            'invalidUsers': 'Invalid users, user list must be unique',
            'invalidNickName': 'Invalid nickname, must 5 - 20 alphanumeric characters',
            'invalidNumber': 'The input must be a number',

        };
        return config[code];
    }

    static creditCardValidator(control: AbstractControl) {
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control: AbstractControl) {
        if (control.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static adminEmailValidator(control: AbstractControl) {
      if (control.value.match(/^[A-Za-z0-9](\.?|_?[A-Za-z0-9]){5,}@smoothstack\.com$/)) {
          return null;
      } else {
          return { 'invalidAdminEmailAddress': true };
      }
    }

    static passwordValidator(control: AbstractControl) {
        if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,20}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static birthdateValidator(control: AbstractControl) {

      const tooOld = Date.parse((new Date().getFullYear()-120)+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()) ;
      const tooYoung = Date.parse((new Date().getFullYear()-18)+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate());

      if ((((Date.parse(control.value)) > tooOld ) && ((Date.parse(control.value)) < tooYoung )) || (!control.touched)){
          return null;
      } else {
          return { 'invalidBirthdate': true };
      }
    }

    static confirmPasswordValidator(control: AbstractControl, confirmControl: AbstractControl) {
      if (control.value.match(confirmControl)) {
          return null;
      } else {
          return { 'invalidConfirmPassword': true };
      }
    }

    static usernameValidator(control: AbstractControl) {
      if (control.value.match(/^[a-z0-9A-Z]{6,20}$/)){
          return null;
      } else {
          return { 'invalidUsername': true };
      }
    }

    static nickNameValidator(control: AbstractControl) {
      if ((control?.value.match(/^[a-z0-9A-Z ]{6,20}$/))) {
          return null;
      } else {
        return { 'invalidNickname': true };
      }
    }

    static userValidator(control: AbstractControl) {
      if ((control?.value.match(/^[0-9]{1,15}$/)) || (!control?.touched)) {
          return null;
      } else {
          return { 'invalidUser': true };
      }
    }

    static usersValidator(control: AbstractControl) {
      if ((new Set(control.value?.array) !== control.value?.array?.length) || (!control.touched)) {
          return null;
      } else {
          return { 'invalidUsers': true };
      }
    }

    static numberValidator(control: AbstractControl) {
        if (!isNaN(control.value)) {
            return null;
        } else {
            return { 'invalidNumber': true };
        }
    }
}
