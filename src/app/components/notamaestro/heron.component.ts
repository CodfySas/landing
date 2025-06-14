import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heron',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="inicio" class="hero" style="padding-bottom: 0.5rem;">
      <div class="hero-background">
        <div class="hero-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text animate-fade-in-up">
            <h1>
              Transforma la gestión educativa con
              <span class="text-primary">Nota Maestro</span>
            </h1>
            <p class="hero-subtitle">
              La plataforma integral que revoluciona la administración escolar. 
              Gestiona notas, asistencias, boletines y mucho más desde una sola aplicación web.
            </p>
            <div class="hero-buttons">
              <a href="https://notamaestro.com" target="_blank" class="btn btn-primary">
                <i class="fas fa-rocket"></i>
                Acceder
              </a>
              <a href="https://www.youtube.com/watch?v=9jVZbGGrVNM" target="_blank" class="btn btn-secondary">
                <i class="fas fa-play"></i>
                Ver Demo
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">Web Responsive</span>
              </div>
              <div class="stat">
                <span class="stat-number">24/7</span>
                <span class="stat-label">Disponibilidad</span>
              </div>
              <div class="stat">
                <span class="stat-number">Seguro</span>
                <span class="stat-label">Datos Protegidos</span>
              </div>
            </div>
          </div>
          <div class="hero-visual animate-fade-in-up">
            <div class="hero-card">
              <div class="hero-card-header">
                <div class="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span class="card-title">notamaestro.com</span>
              </div>
              <div class="hero-card-body">
                <div class="dashboard-preview">
                  <div class="dashboard-header">
                    <div class="user-info">
                      <div class="avatar"></div>
                      <div class="user-details">
                        <span class="user-name">Prof. María García</span>
                        <span class="user-role">Coordinadora Académica</span>
                      </div>
                    </div>
                  </div>
                  <div class="dashboard-content">
                    <div class="dashboard-item">
                      <i class="fas fa-clipboard-check"></i>
                      <span>Boletines Generados</span>
                      <strong>127</strong>
                    </div>
                    <div class="dashboard-item">
                      <i class="fas fa-users"></i>
                      <span>Estudiantes Activos</span>
                      <strong>342</strong>
                    </div>
                    <div class="dashboard-item">
                      <i class="fas fa-chart-line"></i>
                      <span>Promedio General</span>
                      <strong>4.2</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Variables CSS */
    :host {
      --primary-color: #e78617;
      --primary-dark: #d4751a;
      --primary-light: #f4a442;
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --bg-secondary: #f8f9fa;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;
      --spacing-3xl: 64px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      padding-top: 150px;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .hero-shapes {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .shape {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      opacity: 0.1;
      animation: float 6s ease-in-out infinite;
    }

    .shape-1 {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape-2 {
      width: 150px;
      height: 150px;
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }

    .shape-3 {
      width: 100px;
      height: 100px;
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: var(--spacing-3xl);
      position: relative;
      z-index: 1;
    }

    .hero-text h1 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: var(--spacing-lg);
      color: var(--text-primary);
    }

    .text-primary {
      color: var(--primary-color);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
      line-height: 1.6;
    }

    .hero-buttons {
      display: flex;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-3xl);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md) var(--spacing-xl);
      border: none;
      border-radius: var(--radius-md);
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
    }

    .btn-secondary {
      background: white;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
    }

    .btn-secondary:hover {
      background: var(--primary-color);
      color: white;
      transform: translateY(-2px);
    }

    .hero-stats {
      display: flex;
      gap: var(--spacing-xl);
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .hero-visual {
      display: flex;
      justify-content: center;
    }

    .hero-card {
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 400px;
      overflow: hidden;
      transform: perspective(1000px) rotateY(-5deg);
    }

    .hero-card-header {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      padding: var(--spacing-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .card-dots {
      display: flex;
      gap: var(--spacing-xs);
    }

    .card-dots span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
    }

    .card-title {
      color: white;
      font-weight: 500;
      flex: 1;
      text-align: center;
    }

    .hero-card-body {
      padding: var(--spacing-xl);
    }

    .dashboard-header {
      margin-bottom: var(--spacing-xl);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: var(--text-primary);
    }

    .user-role {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .dashboard-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
    }

    .dashboard-item i {
      color: var(--primary-color);
      font-size: 1.25rem;
    }

    .dashboard-item span {
      flex: 1;
      color: var(--text-secondary);
    }

    .dashboard-item strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .hero {
        padding-top: 120px;
      }

      .hero-content {
        grid-template-columns: 1fr;
        gap: var(--spacing-2xl);
        text-align: center;
      }

      .hero-text h1 {
        font-size: 2.5rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .hero-stats {
        justify-content: center;
      }

      .hero-card {
        transform: none;
      }
    }

    @media (max-width: 480px) {
      .hero-text h1 {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .hero-stats {
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class HeroNComponent implements OnInit {
  ngOnInit() {
    // Animación de aparición
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-fade-in-up');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-fade-in-up');
        }, index * 200);
      });
    }, 100);
  }
}