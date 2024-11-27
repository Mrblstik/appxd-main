import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavigationExtras, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-lista-viajes',
  templateUrl: './lista-viajes.page.html',
  styleUrls: ['./lista-viajes.page.scss'],
})
export class ListaViajesPage implements OnInit {
  viajes: any[] = []; // Lista de viajes

  // Inyección de dependencias
  firebaseSvc = inject(FirebaseService);
  utils = inject(UtilsService);

  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    if (navigator.onLine) {
      // Si hay conexión a internet, cargar los viajes desde Firebase
      await this.obtenerViajes();
    } else {
      // Si no hay conexión, cargar los datos almacenados localmente
      await this.cargarViajesDesdeStorage();
    }
  }

  async ionViewWillEnter() {
    // Actualiza los datos al entrar en la vista
    if (navigator.onLine) {
      await this.obtenerViajes();
    } else {
      await this.cargarViajesDesdeStorage();
    }
  }

  // Obtener los viajes desde Firebase y guardarlos en el almacenamiento local
  async obtenerViajes() {
    const loading = await this.utils.loading(); // Mostrar indicador de carga
    loading.present();

    try {
      const querySnapshot = await this.firebaseSvc.firestore.collection('viajes').get().toPromise();

      this.viajes = []; // Reinicia el array en cada carga

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && typeof data === 'object') {
          this.viajes.push({ id: doc.id, ...data });
        }
      });

      console.log('Viajes obtenidos:', this.viajes);

      // Guardar los viajes en el almacenamiento local
      await this.storageService.set('viajes', this.viajes);
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
    } finally {
      loading.dismiss(); // Asegúrate de cerrar el indicador de carga
    }
  }

  // Cargar los viajes desde el almacenamiento local (modo offline)
  async cargarViajesDesdeStorage() {
    try {
      this.viajes = await this.storageService.get('viajes') || []; // Recuperar los viajes o un array vacío
      console.log('Viajes cargados desde el almacenamiento local:', this.viajes);
    } catch (error) {
      console.error('Error al cargar viajes desde el almacenamiento local:', error);
    }
  }

  // Navegar a la página de confirmación de viaje
  async verViaje(id: string) {
    const loading = await this.utils.loading(); // Mostrar loading al navegar
    loading.present();

    let xtras: NavigationExtras = {
      state: {
        id: id,
      },
    };

    this.router.navigate(['confirmacion'], xtras).then(() => {
      loading.dismiss(); // Ocultar loading después de la navegación
    }).catch(() => {
      loading.dismiss(); // Asegúrate de ocultar el loading en caso de error
    });
  }

  // Navegar al chat del viaje
  irAlChat(viajeId: string) {
    this.router.navigate(['chat', { id: viajeId }]); // Navegar al chat con el ID del viaje
  }
}
