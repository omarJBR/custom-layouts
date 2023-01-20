import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements AfterViewInit {

  public isDefaultTheme: boolean = false;
  public customLayout: string = '';
  public customLayoutParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.route.queryParams.subscribe(params => {
      this.customLayoutParam = params['layout'];
      if (this.customLayoutParam) {
        this.checkIfLayoutFileExist();
      } else {
        this.isDefaultTheme = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.addEventListenerForLogInInput();
  }

  public checkIfLayoutFileExist(): void {
    this.http.get(`assets/layouts/${this.customLayoutParam.replace('.html', '')}.html`, { responseType: 'text' }).subscribe(
      {
        next: (res) => {
          this.customLayout = res;
          this.isDefaultTheme = false;
          this.toastr.success(`The custom layout with the name "${this.customLayoutParam}" is running now.`);
          window.addEventListener('load', () => {
            this.addEventListenerForLogInInput();
          });
        },
        error: (err) => {
          this.toastr.error('The custom layout that passed in the URL doesn\'t exist. The default theme will be running');
          this.location.replaceState('/login')
          this.isDefaultTheme = true;
        }
      }
    );
  }

  public addEventListenerForLogInInput(): void {
    const inputSelectors = 'input[type="submit"], input[type="button"]';
    const buttonSelectors = 'button[type="submit"], button[type="button"], button';

    const submitInput: HTMLInputElement = (<HTMLInputElement>document.querySelector(inputSelectors));
    const submitButton: HTMLInputElement = (<HTMLInputElement>document.querySelector(buttonSelectors));

    if (submitInput) {
      (<HTMLInputElement>document.querySelector(inputSelectors)).addEventListener('click', () => {
        this.login();
      });
    }

    if (submitButton) {
      (<HTMLInputElement>document.querySelector(buttonSelectors)).addEventListener('click', () => {
        this.login();
      });
    }
  }

  public login(): void {
    const emailInputSelectors = 'input[type="text"], input[name="email"], input[id="email"]';
    const passwordInputSelectors = 'input[type="password"], input[name="password"], input[id="password"]';

    const userEmail: HTMLInputElement = (<HTMLInputElement>document.querySelector(emailInputSelectors));
    const userPassword: HTMLInputElement = (<HTMLInputElement>document.querySelector(passwordInputSelectors));

    if (!userEmail || !userPassword) {
      this.toastr.error('Make sure that the custom layout has two input fields for email and password.');
      return;
    }

    if (userEmail.value === '' || userPassword.value === '') {
      this.toastr.error('Both fields email and password should be filled in.');
      return;
    }

    if (userEmail.value === 'admin@gmail.com' && userPassword.value === 'Admin') {
      this.toastr.success('Login successfully!');
    } else {
      this.toastr.error('The email or password is wrong!');
    }
  }
}
