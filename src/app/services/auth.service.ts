import {Injectable} from '@angular/core';
/*
  Importo la librería de firbase al servicio
 */
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../pojo/user.class';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLogged: any = false;

    constructor(public afAuth: AngularFireAuth) {
        /*Compruebo si hay un usuario logeado, si lo hay obtengo el usuario, sino obtendré un valor false*/
        afAuth.authState.subscribe(user => (this.isLogged = user));
    }

    // Método para realizar login
    async login(user: User) {
        try {
            return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
        } catch (error) {
            console.log('Error on login', error);
        }
    }

    // Método para registrarse
    async register(user: User) {
        try {
            return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

        } catch (error) {
            console.log('Error on register user', error);
        }
    }


    async signout() {
        try {
            return await this.afAuth.signOut();

        } catch (error) {
            console.log('Error can not sign out', error);
        }
    }
}
