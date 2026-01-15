// Photo Lightbox / Slideshow
class Lightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.lightboxElement = null;
        this.init();
    }

    init() {
        // Create lightbox HTML
        this.createLightbox();

        // Get all photo items
        const photoItems = document.querySelectorAll('.photo-item');
        this.images = Array.from(photoItems).map(item => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                alt: img.alt || ''
            };
        });

        // Add click handlers to photos
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.open(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightboxElement.classList.contains('active')) return;

            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-nav lightbox-prev" aria-label="Previous">&lsaquo;</button>
            <div class="lightbox-content">
                <img src="" alt="">
            </div>
            <button class="lightbox-nav lightbox-next" aria-label="Next">&rsaquo;</button>
        `;

        document.body.appendChild(lightbox);
        this.lightboxElement = lightbox;

        // Event listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.close();
        });
    }

    open(index) {
        this.currentIndex = index;
        this.updateImage();
        this.lightboxElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.lightboxElement.classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const img = this.lightboxElement.querySelector('.lightbox-content img');
        const image = this.images[this.currentIndex];
        img.src = image.src;
        img.alt = image.alt;
    }
}

// Initialize lightbox when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.photo-grid')) {
        new Lightbox();
    }
});
