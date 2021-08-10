import { FormGroup } from '@angular/forms';

export function CheckBirthdate(input: string) {

    const today = new Date(); 
    try{
        const inputDate = Date.parse(input);
        const minorCutOff = Date.parse((today.getFullYear()-18)+'-'+(today.getMonth()+1)+'-'+today.getDate());
        const tooOld = Date.parse('1900-01-01');

        return (formGroup: FormGroup) => {

            const dateControl = formGroup.controls[inputDate];

            if ((inputDate < minorCutOff) || (inputDate > tooOld)){
                dateControl.setErrors({ validator: true });
            } else {
                dateControl.setErrors({validator: true});
            }
        }
    }catch(err){
        return (formGroup: FormGroup) => {
        };
    }
  }