import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private storage: Storage) {}

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async ngOnInit() {
    await this.storage.create();
  }

  async iniciarSesion() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      loading.present();
  
      this.firebaseSvc.signIn(this.form.value as User).then(res => {
        // Validar valores antes de guardar
        const email = this.form.value.email ?? ''; // Default a string vacío
        const password = this.form.value.password ?? '';

        // Guardar email y contraseña en el local storage
        this.storage.set('EmailUsuario', email);
        this.storage.set('PasswordUsuario', password);

        console.log(`Guardado en storage: Email: ${email}, Password: ${password}`);
        
        // Navegar a la página de inicio
        this.router.navigate(['/home']);
      }).catch(error => {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 5000,
          color: 'primary',
          position: 'top',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}
