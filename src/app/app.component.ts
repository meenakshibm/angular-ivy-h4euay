import { Component, VERSION } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  profileForm: FormGroup;
  submitted = false;
  show = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.minLength(8),
          Validators.pattern('^(?=.{8,}$)(?=.*?[a-z])(?=.*?[A-Z]).*$'),
        ],
      ],
    });
  }
  get f() {
    return this.profileForm.controls;
  }

  onSubmit = function (users: any) {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }

    //console.log(users);

    if (
      users.password.includes(users.firstName) ||
      users.password.includes(users.lastName)
    ) {
      console.log('submitted false');
      this.show = true;
      //this.profileForm.invalid = true;
      this.submitted = false;
    } else {
      this.submitted = true;
      this.show = false;
      console.log('submitted true');
    }

    //this.submitted = false;
    let url = 'https://demo-api.now.sh/user';
    this.http.post(url, users);
    console.log(users);

    /*const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    this.http
      .post(url, users)
      .subscribe((res) => console.log('Data Post Done'));*/
  };
  onReset() {
    this.submitted = false;
    this.profileForm.reset();
  }
}
