import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="beneficios" class="section">
      <div class="container">
        <div class="section-title">
          <h2>¿Por qué elegir Nota Maestro?</h2>
          <p class="section-subtitle">
            Transforma tu institución educativa con la plataforma más completa del mercado
          </p>
        </div>

        <div class="benefits-grid">
          <div class="benefit-card" *ngFor="let benefit of benefits; let i = index" 
               [class.benefit-featured]="benefit.featured">
            <div class="benefit-number">{{ i + 1 }}</div>
            <div class="benefit-icon">
              <i [class]="benefit.icon"></i>
            </div>
            <h4>{{ benefit.title }}</h4>
            <p>{{ benefit.description }}</p>
            <ul class="benefit-list" *ngIf="benefit.items">
              <li *ngFor="let item of benefit.items">
                <i class="fas fa-check"></i>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <div class="cta-section">
          <div class="cta-content">
            <h3>¿Listo para revolucionar tu gestión educativa?</h3>
            <p>Únete a las instituciones que ya confían en Nota Maestro para optimizar sus procesos académicos.</p>
            <div class="cta-buttons">
              <a href="https://notamaestro.com" target="_blank" class="btn btn-primary">
                <i class="fas fa-rocket"></i>
                Acceder
              </a>
              <a href="#contacto" class="btn btn-outline">
                <i class="fas fa-phone"></i>
                Solicitar Demo
              </a>
            </div>
          </div>
          <div class="cta-stats">
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-school"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">20+</span>
                <span class="stat-label">Instituciones</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Estudiantes</span>
              </div>
            </div>
            <div class="stat-item">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-content">
                <span class="stat-number">4.7/5</span>
                <span class="stat-label">Satisfacción</span>
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
      --success-color: #27ae60;
      --text-primary: #2c3e50;
      --text-secondary: #7f8c8d;
      --bg-secondary: #f8f9fa;
      --border-color: #e0e6ed;
      --spacing-xs: 4px;
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;
      --spacing-xl: 32px;
      --spacing-2xl: 48px;
      --spacing-3xl: 64px;
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-lg: 20px;
      --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
      --shadow-lg: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    .section {
      padding: var(--spacing-3xl) 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-lg);
    }

    .section-title {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }

    .section-title h2 {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }

    .section-subtitle {
      text-align: center;
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto var(--spacing-2xl);
      line-height: 1.5;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--spacing-xl);
      margin-bottom: var(--spacing-3xl);
    }

    .benefit-card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      position: relative;
      transition: all 0.3s ease;
    }

    .benefit-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .benefit-featured {
      border: 2px solid var(--primary-color);
      transform: scale(1.02);
    }

    .benefit-featured::before {
      content: 'Destacado';
      position: absolute;
      top: -10px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
    }

    .benefit-number {
      position: absolute;
      top: -15px;
      left: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
    }

    .benefit-icon {
      width: 70px;
      height: 70px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 2rem;
      margin-bottom: var(--spacing-lg);
      margin-top: var(--spacing-md);
    }

    .benefit-card h4 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .benefit-card p {
      margin-bottom: var(--spacing-lg);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .benefit-list {
      list-style: none;
      padding: 0;
    }

    .benefit-list li {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .benefit-list i {
      color: var(--success-color);
      font-size: 0.75rem;
    }

    .cta-section {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      border-radius: var(--radius-lg);
      padding: var(--spacing-3xl);
      color: white;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .cta-section::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: rotate(45deg);
    }

    .cta-content {
      position: relative;
      z-index: 1;
      margin-bottom: var(--spacing-3xl);
    }

    .cta-content h3 {
      font-size: 2.5rem;
      margin-bottom: var(--spacing-lg);
      font-weight: 700;
    }

    .cta-content p {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-xl);
      opacity: 0.9;
      line-height: 1.5;
    }

    .cta-buttons {
      display: flex;
      gap: var(--spacing-lg);
      justify-content: center;
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

    .cta-section .btn-primary {
      background: white;
      color: var(--primary-color);
    }

    .cta-section .btn-primary:hover {
      background: var(--bg-secondary);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      color: white;
      border: 2px solid white;
    }

    .cta-section .btn-outline:hover {
      background: white;
      color: var(--primary-color);
    }

    .cta-stats {
      display: flex;
      justify-content: center;
      gap: var(--spacing-3xl);
      position: relative;
      z-index: 1;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .stat-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    .stat-content {
      display: flex;
      flex-direction: column;
    }

    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .benefits-grid {
        grid-template-columns: 1fr;
      }

      .benefit-card {
        text-align: center;
      }

      .cta-content h3 {
        font-size: 2rem;
      }

      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }

      .cta-stats {
        flex-direction: column;
        gap: var(--spacing-xl);
      }

      .section-title h2 {
        font-size: 2rem;
      }

      .btn {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .cta-section {
        padding: var(--spacing-2xl) var(--spacing-lg);
      }

      .cta-content h3 {
        font-size: 1.75rem;
      }

      .cta-content p {
        font-size: 1rem;
      }

      .section-title h2 {
        font-size: 1.75rem;
      }

      .section-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class BenefitsComponent {
  benefits = [
    {
      icon: 'fas fa-clock',
      title: 'Ahorro de Tiempo',
      description: 'Automatiza procesos que antes tomaban horas, ahora los realizas en minutos.',
      items: [
        'Generación automática de boletines',
        'Cálculo automático de promedios',
        'Reportes instantáneos',
        'Notificaciones automáticas'
      ]
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Mejora del Rendimiento',
      description: 'Obtén insights valiosos sobre el desempeño académico de tu institución.',
      items: [
        'Métricas en tiempo real',
        'Análisis de tendencias',
        'Identificación de áreas de mejora',
        'Seguimiento de objetivos'
      ],
      featured: true
    },
    {
      icon: 'fas fa-users',
      title: 'Mejor Comunicación',
      description: 'Mantén a toda la comunidad educativa conectada y bien informada.',
      items: [
        'Foros interactivos',
        'Notificaciones en tiempo real',
        'Comunicación directa',
        'Retroalimentación continua'
      ]
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Seguridad Garantizada',
      description: 'Protege la información sensible con los más altos estándares de seguridad.',
      items: [
        'Encriptación de datos',
        'Copias de seguridad automáticas',
        'Control de acceso por roles',
        'Cumplimiento normativo'
      ]
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Acceso Universal',
      description: 'Funciona perfectamente en cualquier dispositivo, en cualquier momento.',
      items: [
        'Responsive design',
        'Aplicación web optimizada',
        'Sin instalaciones necesarias',
        'Compatibilidad total'
      ]
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Reducción de Costos',
      description: 'Elimina gastos en papel, impresiones y sistemas separados.',
      items: [
        'Sin costos de impresión',
        'Reducción de papelería',
        'Un solo sistema integral',
        'ROI comprobado'
      ]
    }
  ];
}