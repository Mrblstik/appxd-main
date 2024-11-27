import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  emailUsuario: string | null = null;
  passwordUsuario: string | null = null;

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    // Cargar los datos del usuario desde el Storage al inicializar la página
    await this.cargarDatosUsuario();
  }

  // Cargar los datos del usuario desde el StorageService
  async cargarDatosUsuario() {
    try {
      this.emailUsuario = await this.storageService.get('EmailUsuario'); // Obtiene el email guardado
      this.passwordUsuario = await this.storageService.get('PasswordUsuario'); // Obtiene la contraseña guardada

      console.log('Correo:', this.emailUsuario);
      console.log('Contraseña:', this.passwordUsuario);
    } catch (error) {
      console.error('Error al cargar los datos del Storage:', error);
    }
  }

  // Verificar manualmente los datos del Storage al presionar un botón
  async VerStorage() {
    try {
      const email = await this.storageService.get('EmailUsuario'); // Obtiene el email
      const password = await this.storageService.get('PasswordUsuario'); // Obtiene la contraseña
      console.log('Correo:', email);
      console.log('Contraseña:', password);

      // Mostrar alerta con los datos almacenados
      alert(`Correo: ${email || 'No disponible'}\nContraseña: ${password || 'No disponible'}`);
    } catch (error) {
      console.error('Error al obtener datos del Storage:', error);
    }
  }
}