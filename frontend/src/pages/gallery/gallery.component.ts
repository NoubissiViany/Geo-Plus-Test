import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  images: string[] = [];
  imageDetails: Record<string, { width?: number; height?: number; size?: number }> = {};
  faDownload = faDownload;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.images = this.route.snapshot.data['images'] || [];
  }

  getFileName(url: string): string {
    try {
      // Handles absolute & relative URLs
      const u = new URL(url, window.location.origin);
      return u.pathname.split('/').pop() || 'image';
    } catch {
      return url.split('/').pop() || 'image';
    }
  }

  getImageDetails(imgUrl: string, event: Event): void {
    const img = event.target as HTMLImageElement;
    this.imageDetails[imgUrl] = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  }

  // Robust download that works even for many cross-origin cases
  async downloadImage(imgUrl: string): Promise<void> {
    try {
      const res = await fetch(imgUrl, { mode: 'cors' }); // may require CORS headers from your server
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = this.getFileName(imgUrl);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
      // Fallback: open in new tab
      window.open(imgUrl, '_blank');
    }
  }
}
