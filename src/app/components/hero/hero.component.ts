import { Component, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="inicio" class="hero">
      <img class="background-video" src="/assets/background.gif">
      <div class="overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Software para <br />Transformación Digital</h1>
          <p>Soluciones tecnológicas que impulsan tu negocio</p>
          <a href="/#contacto" class="cta-button">Cuéntanos tu necesidad</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        position: relative;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start; /* Cambiado para alinear a la izquierda */
        color: white;
        padding-top: 80px;
        padding-left: 80px; /* Añadido para dejar espacio desde el borde izquierdo */
        z-index: 50;
      }

      @media (max-width: 768px) {
        .hero {
          padding-left: 20px;  /* o 0 si quieres quitarlo totalmente */
          padding-top: 60px;   /* ajusta si quieres */
          justify-content: center; /* opcional, si quieres centrar en móvil */
        }
      }

      .container {
        max-width: 600px; /* reduje para que no ocupe todo el ancho */
        padding: 0 20px;
        position: relative;
        z-index: 2;
      }

      .hero-content {
        max-width: 600px;
        position: relative;
        z-index: 3;
        text-align: left; /* Asegura que el texto esté alineado a la izquierda */
      }

      .background-video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-50%, -50%);
        z-index: 0;
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(16, 15, 31, 0.8);
        z-index: 1;
      }

      h1 {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.2;
      }

      p {
        font-size: 1.5rem;
        margin-bottom: 30px;
      }

      .cta-button {
        background-color: #429cd8;
        color: white;
        border: none;
        padding: 15px 30px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .cta-button:hover {
        background-color: #3589c2;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class HeroComponent {
  @ViewChild('backgroundVideo', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.ensureVideoPlays();
  }

  private ensureVideoPlays(): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      const video = this.videoElement.nativeElement;
      
      // Configurar propiedades del video
      video.muted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      
      // Intentar reproducir el video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playing successfully');
          })
          .catch((error) => {
            console.warn('Error playing video:', error);
            
            // Fallback: intentar reproducir después de la primera interacción del usuario
            this.setupUserInteractionFallback(video);
          });
      }
      
      // Manejar eventos del video
      video.addEventListener('loadeddata', () => {
        console.log('Video data loaded');
        if (video.paused) {
          video.play().catch(console.warn);
        }
      });
      
      video.addEventListener('canplay', () => {
        console.log('Video can start playing');
        if (video.paused) {
          video.play().catch(console.warn);
        }
      });
    }
  }

  private setupUserInteractionFallback(video: HTMLVideoElement): void {
    const playOnInteraction = () => {
      video.play().then(() => {
        console.log('Video started playing after user interaction');
        // Remover los event listeners después de que funcione
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
      }).catch(console.warn);
    };

    // Agregar listeners para diferentes tipos de interacción
    document.addEventListener('click', playOnInteraction, { once: true });
    document.addEventListener('touchstart', playOnInteraction, { once: true });
    document.addEventListener('keydown', playOnInteraction, { once: true });
  }
}
