import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GalleryResolver implements Resolve<string[]> {
  async resolve(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>('http://localhost:3000/api/images');
      return response.data;
    } catch (err) {
      console.error('Erreur lors du chargement des images:', err);
      return []; // fallback to empty array
    }
  }
}
