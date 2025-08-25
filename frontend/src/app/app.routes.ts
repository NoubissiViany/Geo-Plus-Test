import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { GalleryComponent } from '../pages/gallery/gallery.component';
import { GalleryResolver } from '../pages/gallery/gallery.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'gallery',
    component: GalleryComponent,
    resolve: { images: GalleryResolver }, // 👈 attach the resolver
  },
  { path: '**', redirectTo: '' },
];
