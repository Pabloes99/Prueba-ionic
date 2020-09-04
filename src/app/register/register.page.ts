import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../pojo/user.class';
import {ToastController} from '@ionic/angular';
import {FormGroup, FormControl} from '@angular/forms';
import validator from 'validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    user: User = new User();

    registerForm = new FormGroup({
        userEmail: new FormControl(''),
        userPassword: new FormControl(''),
    });

    registerFormValidator = {
        userEmail: {
            empty: '',
            email: '',
        },
        userPassword: {
            empty: '',
        }
    };

    constructor(private authService: AuthService, private router: Router, public toastController: ToastController) {
    }

    ngOnInit() {
    }


    formValidator(): boolean {
        if (validator.isEmpty(this.registerForm.value.userEmail)) {
            this.registerFormValidator.userEmail.empty = 'Email can not be empty';
            return false;
        } else {
            this.registerFormValidator.userEmail.empty = '';
        }
        if (!validator.isEmail(this.registerForm.value.userEmail)) {
            this.registerFormValidator.userEmail.email = 'Enter a valid email address';
            return false;
        } else {
            this.registerFormValidator.userEmail.email = '';
        }
        if (validator.isEmpty(this.registerForm.value.userPassword)) {
            this.registerFormValidator.userPassword.empty = 'Password can not be empty';
            return false;
        } else {
            this.registerFormValidator.userPassword.empty = '';
        }

        // Asigo los valores al usuario una vez comprovados que son correctos
        this.user.email = this.registerForm.value.userEmail;
        this.user.password = this.registerForm.value.userPassword;
        return true;
    }

    async onSubmit() {
        if (this.formValidator()) {
            console.log('Formulario Validado');
            const user = await this.authService.register(this.user);

            if (user != null) {
                this.router.navigateByUrl('/login');
            }
        }
    }

    /*
    async register() {
        const user = await this.authService.register(this.user);

        if (user != null) {
            this.router.navigateByUrl('/login');
        }
    }
     */
}
