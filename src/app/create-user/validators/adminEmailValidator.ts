import { FormGroup, Validators } from '@angular/forms';
    
export function adminEmail(formGroup: FormGroup) {
    if (formGroup.get('role').value) {
        if (formGroup.get('role').value == 'Admin') {
            return Validators.pattern(/^[\w.+\-]+@smoothstack\.com$/) ? {
                adminEmailRequired: true,
            } : null;
        }
    }
    return null;
  }