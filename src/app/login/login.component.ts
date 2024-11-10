import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public _action: string = "login";
	public registerForm: FormGroup;
	public loginForm: FormGroup;
  public errorMSG: string = "";

	public title: string = "LOGIN"
	public send: string = "Accedi"
	public actualForm: FormGroup;
	public list: String[] = [];

	public get action() {
		return this._action;
	}

  public set action(a) {
		switch (a) {
			case "login":
				this.title = "LOGIN"
				this.actualForm = this.loginForm
				this.send = "Accedi"
				break;
			case "register":
				this.title = "REGISTRAZIONE"
				this.actualForm = this.registerForm
				this.send = "Registrati"
				break;
			default:
				throw new Error
		}
		this.list = []
		Object.entries(this.actualForm.value).forEach(([k]) => this.list.push(k))
    console.log(this.list)
		this._action = a
	}
  constructor(
		private _route: ActivatedRoute,
		private _form: FormBuilder,
    private _cookies: CookieService
		//private _helper: HelperService,
	) {
		this.loginForm = this._form.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
		});
		this.registerForm = this._form.group({
			username: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")])],
			password: ["", Validators.required],
			//password: ["", Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}")])],
			nome: ["", Validators.required],
			email: ["", Validators.compose([Validators.required, Validators.email])],
			telefono: ["", Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")],
		});
		this.actualForm = this.loginForm;
		Object.entries(this.actualForm.value).forEach(([k]) => this.list.push(k))
		// this._route.paramMap.subscribe((params) => {
		// 	var hash = params.get("hash");
		// 	if (!!hash && hash.length==40 ) {
		// 		setTimeout(() => this.validate(hash), 3500);
		// 	}
		// });
	}

	ngOnInit(): void {
	}

	
	submit() {
		switch (this.action) {
			case "login":
				this.login()
				break;
			case "register":
				this.register()
				break;
			default:
				break;
		}
	}

	login() {
		if (!this.loginForm.invalid) {
			
		}
	}

	setError(msg:string, timeout:number=3500) {
		this.errorMSG = msg;
		setTimeout(() => { this.errorMSG = ""; }, timeout);
		
	}

	register() {
		if (!this.registerForm.invalid) {

		} else {
			var error: string = "";
			for (const field in this.registerForm.controls) {
				const errors = this.registerForm.controls[field].errors;
				if (!!errors) {
					if (errors["required"]) error += (field + " è obbligatorio\n");
					if (errors["pattern"]) error += (field + " invalido.\n");
					if (errors["email"]) error += ("Email invalida.\n")
				}
			}
			this.setError(error);
		}
	}  
}
