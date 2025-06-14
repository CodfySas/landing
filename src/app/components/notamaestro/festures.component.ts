import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="caracteristicas" class="section bg-secondary">
      <div class="container">
        <div class="section-title">
          <h2>Funcionalidades Principales</h2>
          <p class="section-subtitle">
            Todo lo que necesitas para una gestión educativa completa y eficiente
          </p>
        </div>

        <!-- Características principales -->
        <div class="grid grid-3 mb-xl">
          <div class="card" *ngFor="let feature of mainFeatures">
            <div class="icon">
              <i [class]="feature.icon"></i>
            </div>
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.description }}</p>
            <div class="feature-highlights">
              <span *ngFor="let highlight of feature.highlights" class="highlight">
                {{ highlight }}
              </span>
            </div>
          </div>
        </div>

        <!-- Sección para docentes -->
        <div class="feature-section">
          <div class="feature-section-header">
            <h3><i class="fas fa-chalkboard-teacher"></i> Para Docentes</h3>
            <p>Herramientas especializadas que facilitan el trabajo diario del educador</p>
          </div>
          <div class="grid grid-2">
            <div class="card" *ngFor="let feature of teacherFeatures">
              <div class="feature-icon">
                <i [class]="feature.icon"></i>
              </div>
              <div class="feature-content">
                <h5>{{ feature.title }}</h5>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección administrativa -->
        <div class="feature-section">
          <div class="feature-section-header">
            <h3><i class="fas fa-users-cog"></i> Gestión Administrativa</h3>
            <p>Administración completa de la institución educativa</p>
          </div>
          <div class="grid grid-2">
            <div class="card" *ngFor="let feature of adminFeatures">
              <div class="feature-icon">
                <i [class]="feature.icon"></i>
              </div>
              <div class="feature-content">
                <h5>{{ feature.title }}</h5>
                <p>{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Características técnicas -->
        <div class="tech-features">
          <h3 class="text-center mb-xl">Características Técnicas</h3>
          <div class="grid grid-4">
            <div class="tech-card" *ngFor="let tech of techFeatures">
              <div class="tech-icon">
                <i [class]="tech.icon"></i>
              </div>
              <h5>{{ tech.title }}</h5>
              <p>{{ tech.description }}</p>
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
      --primary-light: #f4a442;
      --accent-color: #3498db;
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

    .bg-secondary {
      background-color: var(--bg-secondary);
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

    .grid {
      display: grid;
      gap: var(--spacing-xl);
    }

    .grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
    .grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
    .grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

    .mb-xl {
      margin-bottom: var(--spacing-xl);
    }

    .card {
      background: white;
      border-radius: var(--radius-lg);
      padding: var(--spacing-xl);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover::before {
      opacity: 1;
    }

    .icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: var(--spacing-lg);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      color: white;
      box-shadow: var(--shadow-md);
    }

    .card h4 {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }

    .card p {
      margin-bottom: var(--spacing-md);
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .feature-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-lg);
    }

    .highlight {
      background: var(--primary-color);
      color: white;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .feature-section {
      margin-top: var(--spacing-3xl);
    }

    .feature-section-header {
      text-align: center;
      margin-bottom: var(--spacing-2xl);
    }

    .feature-section-header h3 {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      color: var(--primary-color);
      margin-bottom: var(--spacing-md);
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .feature-section-header h3 i {
      font-size: 2rem;
    }

    .feature-section-header p {
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: var(--spacing-md);
    }

    .feature-section .card {
      display: flex;
      gap: var(--spacing-lg);
      align-items: flex-start;
      text-align: left;
    }

    .feature-icon {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .feature-content h5 {
      margin-bottom: var(--spacing-sm);
      color: var(--text-primary);
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .feature-content p {
      margin-bottom: 0;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    .tech-features {
      margin-top: var(--spacing-3xl);
      padding: var(--spacing-3xl) var(--spacing-xl);
      background: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
    }

    .tech-features h3 {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }

    .text-center {
      text-align: center;
    }

    .tech-card {
      text-align: center;
      padding: var(--spacing-lg);
    }

    .tech-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-color), #5dade2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      margin: 0 auto var(--spacing-lg);
    }

    .tech-card h5 {
      color: var(--text-primary);
      margin-bottom: var(--spacing-sm);
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .tech-card p {
      font-size: 0.875rem;
      margin-bottom: 0;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .grid-2,
      .grid-3,
      .grid-4 {
        grid-template-columns: 1fr;
      }

      .feature-section .card {
        flex-direction: column;
        text-align: center;
      }

      .feature-icon {
        align-self: center;
      }

      .tech-features {
        padding: var(--spacing-2xl) var(--spacing-lg);
      }

      .section-title h2 {
        font-size: 2rem;
      }

      .feature-section-header h3 {
        font-size: 1.75rem;
      }
    }

    @media (max-width: 480px) {
      .section-title h2 {
        font-size: 1.75rem;
      }

      .section-subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class FeaturesComponent {
  mainFeatures = [
    {
      icon: 'fas fa-clipboard-list',
      title: 'Gestión de Notas',
      description: 'Sistema completo para el registro, cálculo y seguimiento de calificaciones estudiantiles.',
      highlights: ['Cálculo automático', 'Histórico completo', 'Múltiples períodos']
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Boletines Digitales',
      description: 'Generación automática de boletines personalizados con diseño profesional.',
      highlights: ['Descarga PDF', 'Diseño personalizable', 'Envío automático']
    },
    {
      icon: 'fas fa-user-check',
      title: 'Control de Asistencia',
      description: 'Registro digital de asistencia con reportes detallados y alertas automáticas.',
      highlights: ['Registro rápido', 'Reportes automáticos', 'Notificaciones']
    }
  ];

  teacherFeatures = [
    {
      icon: 'fas fa-calendar-alt',
      title: 'Planeaciones Académicas',
      description: 'Organiza y gestiona tus planeaciones de clase de manera digital y estructurada.'
    },
    {
      icon: 'fas fa-sitemap',
      title: 'Mallas Curriculares',
      description: 'Administra el currículo académico con herramientas de seguimiento y evaluación.'
    },
    {
      icon: 'fas fa-tasks',
      title: 'Calificación Online',
      description: 'Evalúa talleres y exámenes directamente desde la plataforma con corrección automática.'
    },
    {
      icon: 'fas fa-comments',
      title: 'Foro Interactivo',
      description: 'Facilita la comunicación entre estudiantes, docentes y padres de familia.'
    }
  ];

  adminFeatures = [
    {
      icon: 'fas fa-clock',
      title: 'Horarios Académicos',
      description: 'Crea y gestiona horarios de clases con asignación automática de recursos.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Informes Personalizados',
      description: 'Genera reportes detallados adaptados a las necesidades específicas de tu institución.'
    },
    {
      icon: 'fas fa-file-export',
      title: 'Exportación de Datos',
      description: 'Exporta cualquier información a Excel o PDF para análisis externos.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Métricas y Gráficas',
      description: 'Visualiza el rendimiento académico con gráficas interactivas y métricas clave.'
    }
  ];

  techFeatures = [
    {
      icon: 'fas fa-mobile-alt',
      title: 'Totalmente Responsive',
      description: 'Funciona perfectamente en todos los dispositivos y tamaños de pantalla.'
    },
    {
      icon: 'fas fa-cloud',
      title: 'En la Nube',
      description: 'Acceso desde cualquier lugar con conexión a internet, sin instalaciones.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Seguridad Avanzada',
      description: 'Protección de datos con encriptación y copias de seguridad automáticas.'
    },
    {
      icon: 'fas fa-sync-alt',
      title: 'Actualizaciones Automáticas',
      description: 'Siempre tendrás la última versión sin interrupciones en el servicio.'
    }
  ];
}