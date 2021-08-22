import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountEndPoints, AuthEndPoints } from 'src/app/services/const';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  credentials: LoginUser = new LoginUser();
  passwordForm!: FormGroup;
  show: boolean = false;
  errorMessage: string = "Invalid password, please try again";
  error: boolean = false;

  constructor(private activeModal: NgbActiveModal, public authService: AuthService, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.buildForm();
    this.error = false;
  }

  buildForm() {
    this.passwordForm = this.formBuilder.group({
        password:   ['', [Validators.required]]
    });
  }

  get password() {
    return this.passwordForm?.get('password');
  }

  public togglePass(){
    this.show = !this.show;
  }

  cancel(){
    this.activeModal.dismiss();
  }

  submit() {
    console.log("Confirmed");
    this.credentials.username = this.authService.getUsername();
    this.authService.redirectUrl = AccountEndPoints.MAIN;
    if (this.passwordForm.valid){
      this.error = false;
      this.authService.clear();
      //this.authService.login(this.credentials);
      this.http.post(`${environment.userUrl}${AuthEndPoints.LOGIN}`, this.credentials).subscribe((res) =>{
        this.activeModal.close(true);
      }, (err) =>{
        console.log("Invalid password");
        this.error = true;
      });
    }
    //if (!this.authService.loginError){
    //  //this.acctService.
    //  this.activeModal.close(true);
    //}
  }


}

