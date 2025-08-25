import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faCheckCircle, faFile } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  faCloudArrowUp = faCloudArrowUp;
  faCheckCircle = faCheckCircle;
  faFile = faFile;

  uploadSuccess = false;
  successMessage = '';
  errorMessage = '';
  images: string[] = [];
  isLoading = false;

  selectedFile: File | null = null;
  isImageFile: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.fetchImages();
  }

  async fetchImages(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      const response = await axios.get<string[]>('http://localhost:3000/api/images');
      this.images = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des images:', error);
      this.errorMessage = 'Impossible de charger les images.';
    } finally {
      this.isLoading = false;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFile = file;

    // Check if file is image
    this.isImageFile = file.type.startsWith('image/');
    this.errorMessage = '';
    this.successMessage = '';
  }

  async confirmImport(): Promise<void> {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.uploadSuccess = false;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      this.ngZone.run(() => {
        this.uploadSuccess = true;
        this.successMessage = `L’image "${this.selectedFile?.name}" a été importée avec succès !`;

        // ⬇️ Revenir à l’état initial (bloc nuage) après confirmation
        this.selectedFile = null;

        setTimeout(() => {
          this.uploadSuccess = false;
          this.successMessage = '';
        }, 3000);
      });

      await this.fetchImages();
    } catch (error) {
      console.error('Erreur lors de l’upload:', error);
      this.ngZone.run(() => {
        this.errorMessage = 'Échec de l’upload du fichier.';
      });
    }
  }
}
