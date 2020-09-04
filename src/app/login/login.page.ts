import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../pojo/user.class';
import {FormGroup, FormControl} from '@angular/forms';
import validator from 'validator';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    user: User = new User();

    constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {
    }

    ngOnInit() {
    }

    async login() {
        const user = await this.authService.login(this.user);

        if (user != null) {
            this.router.navigateByUrl('/home');
        } else {
            const toast = await this.toastController.create({
                message: 'Invalid email or password',
                duration: 2500
            });
            toast.present();
        }
    }
}
