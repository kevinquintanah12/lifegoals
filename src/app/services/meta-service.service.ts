import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  private collectionName = 'metas';

  constructor(private firestore: AngularFirestore) {}

  obtenerMetas(): Observable<Meta[]> {
    return this.firestore
      .collection<Meta>(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(action => {
            const data = action.payload.doc.data() as Meta;
            const id = action.payload.doc.id;

            return { ...data, id };
          })
        )
      );
  }

  agregarMeta(texto: string) {
    const meta: Meta = {
      meta: texto
    };

    return this.firestore
      .collection(this.collectionName)
      .add(meta);
  }

  eliminarMeta(id: string) {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }
}