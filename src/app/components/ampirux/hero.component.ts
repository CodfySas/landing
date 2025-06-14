import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="highlight">Ampirux</span>
            El Software Definitivo para tu Barbería
          </h1>
          <p class="hero-subtitle">
            Gestiona citas, inventario, ventas y métricas de tu barbería desde una sola plataforma. 
            Optimiza tu negocio y aumenta tus ganancias con nuestra solución integral.
          </p>
          <div class="hero-buttons">
            <a href="https://ampirux.com" target="_blank" class="btn btn-primary">
              Iniciar Ahora
            </a>
            <button class="btn btn-secondary">
              Ver Demo
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">20+</span>
              <span class="stat-label">Barberías Activas</span>
            </div>
            <div class="stat">
              <span class="stat-number">95%</span>
              <span class="stat-label">Satisfacción</span>
            </div>
            <div class="stat">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Soporte</span>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="dashboard-preview">
            <div class="dashboard-header">
              <div class="dashboard-title">Dashboard Ampirux</div>
              <div class="dashboard-date">Hoy: 15 Enero 2025</div>
            </div>
            <div class="dashboard-metrics">
              <div class="metric-card sales">
                <div class="metric-icon">💰</div>
                <div class="metric-info">
                  <span class="metric-value">$630.450</span>
                  <span class="metric-label">Ventas del Día</span>
                </div>
              </div>
              <div class="metric-card expenses">
                <div class="metric-icon">📊</div>
                <div class="metric-info">
                  <span class="metric-value">$140.000</span>
                  <span class="metric-label">Gastos</span>
                </div>
              </div>
              <div class="metric-card top-service">
                <div class="metric-icon">✂️</div>
                <div class="metric-info">
                  <span class="metric-value">Corte Clásico</span>
                  <span class="metric-label">Top Servicio</span>
                </div>
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

    .hero-section {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #1DA382 0%, #0F8A6B 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      color: white;
      position: relative;
      overflow: hidden;
      padding-top: 120px;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="4"/></g></svg>') repeat;
      opacity: 0.3;
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .highlight {
      color: #FFD700;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.95;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
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
      color: #1DA382;
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
      color: #1DA382;
      transform: translateY(-2px);
    }

    .hero-stats {
      display: flex;
      gap: 2rem;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      color: #FFD700;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .dashboard-preview {
      background: white;
      border-radius: 20px;
      padding: 1.5rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      color: #333;
      transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
      transition: transform 0.3s ease;
    }

    .dashboard-preview:hover {
      transform: perspective(1000px) rotateY(-5deg) rotateX(2deg);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .dashboard-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1DA382;
    }

    .dashboard-date {
      font-size: 0.9rem;
      color: #666;
    }

    .dashboard-metrics {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .metric-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 12px;
      transition: transform 0.2s ease;
    }

    .metric-card:hover {
      transform: translateX(5px);
    }

    .metric-card.sales {
      background: linear-gradient(135deg, #1DA382, #0F8A6B);
      color: white;
    }

    .metric-card.expenses {
      background: linear-gradient(135deg, #FF6B6B, #E55252);
      color: white;
    }

    .metric-card.top-service {
      background: linear-gradient(135deg, #4ECDC4, #44B3AC);
      color: white;
    }

    .metric-icon {
      font-size: 1.5rem;
    }

    .metric-value {
      display: block;
      font-size: 1.1rem;
      font-weight: 700;
    }

    .metric-label {
      font-size: 0.9rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .hero-stats {
        justify-content: center;
      }

      .dashboard-preview {
        transform: none;
      }
    }
  `]
})
export class HeroAComponent {}