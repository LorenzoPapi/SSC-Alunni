import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../services/dataservice.service';
import { AuthService } from '../services/auth.service';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
	MatButtonModule
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
	public list: string[] = [];

	authService = inject(AuthService)
	router = inject(Router)

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
		this._action = a
	}
  constructor(
		private _route: ActivatedRoute,
		private _form: FormBuilder,
	) {
		this.loginForm = this._form.group({
			username: ["", Validators.required],
			password: ["", Validators.required],
		});
		this.registerForm = this._form.group({
			username: ["", Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")])],
			password: ["", Validators.required],
			//password: ["", Validators.compose([Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}")])],
			nome: ["", Validators.pattern("^[a-zA-Z ]+")],
			cognome: ["", Validators.pattern("^[a-zA-Z ]+")],
			telefono: ["", Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")],
			
		});
		this.actualForm = this.loginForm;
		Object.entries(this.actualForm.value).forEach(([k]) => this.list.push(k))
	}

	ngOnInit(): void {
		if (this.authService.currentUserSig() != null){
			this.router.navigate(['/calendario'])
		}
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
			var username = this.loginForm.get('username')!.value
			var password = this.loginForm.get('password')!.value
			var loginPromise = this.authService.login(username, password)
			loginPromise.then((response)=>{
				//To remove
				console.log(response.user.toJSON())
			}).catch((err : FirebaseError) => {
				this.setError(err.message)
			})
			
		} else {
			var error: string = "";
			for (const field in this.loginForm.controls) {
				const errors = this.loginForm.controls[field].errors;
				if (!!errors) {
					if (errors["required"]) error += ("Il campo " + field + " è obbligatorio\n");
					if (errors["pattern"]) error += ("Il campo " + field + " è invalido.\n");
				}
			}
			this.setError(error);
		}
	}

	setError(msg:string, timeout:number=3500) {
		this.errorMSG = msg;
		setTimeout(() => { this.errorMSG = ""; }, timeout);
	}

	register() {
		if (!this.registerForm.invalid) {
			var username = this.registerForm.get('username')!.value
			var password = this.registerForm.get('password')!.value
			var nome = this.registerForm.get("nome")!.value
			var cognome = this.registerForm.get("cognome")!.value
			var telephone = this.registerForm.get("telefono")!.value
			var registerPromise = this.authService.register(username, password)
			registerPromise.then((response) => {
				return this.authService.updateUser(response.user, nome, cognome, telephone)
			}).catch((err : FirebaseError) => {
				this.setError(err.message)
			})
		} else {
			var error: string = "";
			for (const field in this.registerForm.controls) {
				const errors = this.registerForm.controls[field].errors;
				if (!!errors) {
					if (errors["required"]) error += ("Il campo " + field + " è obbligatorio\n");
					if (errors["pattern"]) error += ("Il campo " + field + " è invalido.\n");
				}
			}
			this.setError(error);
		}
	}
}
