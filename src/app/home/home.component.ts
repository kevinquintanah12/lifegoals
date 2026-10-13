import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Meta } from '../models/meta.model';
import { MetaServiceService } from '../services/meta-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  metas$!: Observable<Meta[]>;
  nuevaMeta = '';

  constructor(private metaService: MetaServiceService) {}

  ngOnInit(): void {
    this.metas$ = this.metaService.obtenerMetas();
  }

  agregarMeta(): void {
    const texto = this.nuevaMeta.trim();

    if (!texto) {
      return;
    }

    this.metaService.agregarMeta(texto)
      .then(() => {
        this.nuevaMeta = '';
      })
      .catch(error => {
        console.error('No se pudo agregar la meta:', error);
      });
  }

  eliminarMeta(id?: string): void {
    if (!id) {
      return;
    }

    this.metaService.eliminarMeta(id)
      .catch(error => {
        console.error('No se pudo eliminar la meta:', error);
      });
  }
}