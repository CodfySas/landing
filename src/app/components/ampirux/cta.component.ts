import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">¿Listo para Transformar tu Barbería?</h2>
          <p class="cta-subtitle">
            Únete a más de 500 barberías que ya confían en Ampirux para gestionar su negocio. 
            Comienza hoy mismo y ve la diferencia en tu productividad y ganancias.
          </p>
          
          <div class="cta-buttons">
            <a href="/#contacto" class="btn btn-primary">
              Solicitar Demo
            </a>
          </div>
          
          <div class="cta-features">
            <div class="cta-feature">
              <span class="feature-check">✅</span>
              <span>Configuración en 5 minutos</span>
            </div>
            <div class="cta-feature">
              <span class="feature-check">✅</span>
              <span>Soporte 24/7</span>
            </div>
            <div class="cta-feature">
              <span class="feature-check">✅</span>
              <span>Sin compromiso de permanencia</span>
            </div>
          </div>
        </div>
        
        <div class="cta-image">
          <div class="success-card">
            <div class="success-icon">🚀</div>
            <h3>¡Aumenta tus Ventas!</h3>
            <div class="success-stats">
              <div class="stat">
                <span class="stat-value">+45%</span>
                <span class="stat-label">Incremento en Ventas</span>
              </div>
              <div class="stat">
                <span class="stat-value">-60%</span>
                <span class="stat-label">Menos Tiempo Administrativo</span>
              </div>
              <div class="stat">
                <span class="stat-value">95%</span>
                <span class="stat-label">Satisfacción del Cliente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Reset específico para este componente */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .cta-section {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      padding: 5rem 0;
      background: linear-gradient(135deg, #7b2cbf 0%, #691bad 100%);
      color: white;
      position: relative;
      overflow: hidden;
      line-height: 1.6;
    }

    .cta-section::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 30px 30px;
      animation: float 20s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 1;
    }

    .cta-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      align-items: center;
      margin-bottom: 2rem;
    }

    .cta-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 0rem;
      color: #FFD700;
    }

    .cta-subtitle {
      font-size: 1.2rem;
      line-height: 1.6;
      margin-bottom: 0rem;
      opacity: 0.95;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 0rem;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.1rem;
      display: inline-block;
      font-family: inherit;
    }

    .btn-primary {
      background: #FFD700;
      color: #7b2cbf;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
    }

    .btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: white;
      color: #7b2cbf;
      transform: translateY(-2px);
    }

    .cta-features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cta-feature {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }

    .feature-check {
      font-size: 1.2rem;
    }

    .success-card {
      background: white;
      color: #333;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      text-align: center;
      transform: perspective(1000px) rotateY(10deg) rotateX(-5deg);
      transition: transform 0.3s ease;
    }

    .success-card:hover {
      transform: perspective(1000px) rotateY(5deg) rotateX(-2deg);
    }

    .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .success-card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #7b2cbf;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .success-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem;
      background: #f8f9fa;
      border-radius: 10px;
    }

    .stat-value {
      font-size: 1.2rem;
      font-weight: 700;
      color: #7b2cbf;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }

    @media (max-width: 968px) {
      .cta-content {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
      }

      .cta-title {
        font-size: 2.5rem;
      }

      .cta-buttons {
        justify-content: center;
        flex-wrap: wrap;
      }

      .success-card {
        transform: none;
      }

      .container {
        padding: 0 1rem;
      }
    }

    @media (max-width: 768px) {
      .cta-title {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class CtaComponent {}