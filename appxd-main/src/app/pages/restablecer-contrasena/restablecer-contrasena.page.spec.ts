import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string;

  constructor(private alertController: AlertController) {}

  async resetPassword() {
    if (this.email) {
      // Lógica para enviar correo de restablecimiento
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Se ha enviado un enlace para restablecer tu contraseña.',
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingresa un correo electrónico válido.',
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
