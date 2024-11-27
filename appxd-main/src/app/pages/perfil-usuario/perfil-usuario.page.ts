import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  userData: any; // Datos del usuario
  vehiculoData: any; // Datos del vehículo

  // Inyección de dependencias
  firebaseSvc = inject(FirebaseService);
  utils = inject(UtilsService);

  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    if (navigator.onLine) {
      // Si hay conexión a internet, obtenemos los datos desde Firebase
      await this.obtenerDatosUsuario();
    } else {
      // Si no hay conexión, cargamos los datos desde el almacenamiento local
      await this.cargarDatosDesdeStorage();
    }
  }

  // Obtener los datos del usuario desde Firebase y guardarlos en el almacenamiento local
  async obtenerDatosUsuario() {
    const loading = await this.utils.loading(); // Mostrar un indicador de carga
    loading.present();

    try {
      const user = await this.firebaseSvc.auth.currentUser;

      if (user) {
        const path = `users/${user.uid}`;
        console.log('User UID:', user.uid);

        // Obtener los datos del usuario desde Firebase
        this.userData = await this.firebaseSvc.getDocument(path);
        console.log('User Data:', this.userData);

        // Guardar los datos en el almacenamiento local
        await this.storageService.set('userData', this.userData);

        // Obtener datos del vehículo y guardarlos
        this.firebaseSvc.obtenerVehiculoPorUserId(user.uid).subscribe(async (vehiculos) => {
          this.vehiculoData = vehiculos[0];
          console.log('Vehículo Data:', this.vehiculoData);

          await this.storageService.set('vehiculoData', this.vehiculoData);
        });
      } else {
        console.warn('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error fetching user data from Firebase:', error);
    } finally {
      loading.dismiss(); // Ocultar el indicador de carga
    }
  }

  // Cargar los datos del almacenamiento local en modo offline
  async cargarDatosDesdeStorage() {
    try {
      // Recuperar datos del usuario
      this.userData = await this.storageService.get('userData') || {
        name: 'Nombre no disponible',
        lastname: 'Apellido no disponible',
        email: 'Email no disponible',
      };
      console.log('User Data (Offline):', this.userData);

      // Recuperar datos del vehículo
      this.vehiculoData = await this.storageService.get('vehiculoData') || {};
      console.log('Vehículo Data (Offline):', this.vehiculoData);
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  }

  // Navegar al historial de viajes
  verHistorial() {
    console.log('Accediendo al historial de viajes...');
    this.router.navigate(['/historial-viajes']);
  }

  // Navegar a la página de edición de información personal
  editarInformacion() {
    console.log('Accediendo a la edición de información personal...');
    this.router.navigate(['/registro-usuario']);
  }
}
