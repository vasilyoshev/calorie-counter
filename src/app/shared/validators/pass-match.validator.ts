import { FormGroup } from '@angular/forms';

export function ValidatePassMatch(group: FormGroup): Object {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notsame: true };
}
