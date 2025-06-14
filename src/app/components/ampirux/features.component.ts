import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featuresa',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">¿Por qué elegir Ampirux?</h2>
          <p class="section-subtitle">
            Una solución completa diseñada específicamente para barberías modernas
          </p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" *ngFor="let feature of features">
            <div class="feature-icon">
              <span [innerHTML]="feature.icon"></span>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
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

    .features-section {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      padding: 5rem 0;
      background: #f8fffe;
      line-height: 1.6;
      color: #333;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #7b2cbf;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(29, 163, 130, 0.1);
      transition: all 0.3s ease;
      border: 1px solid rgba(29, 163, 130, 0.1);
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(29, 163, 130, 0.15);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #7b2cbf, #691bad);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2rem;
    }

    .feature-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #7b2cbf;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .feature-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .features-grid {
        grid-template-columns: 1fr;
      }

      .section-title {
        font-size: 2rem;
      }

      .container {
        padding: 0 1rem;
      }
    }
  `]
})
export class FeaturesAComponent {
  features = [
    {
      icon: '📅',
      title: 'Agendamiento de Citas',
      description: 'Sistema intuitivo para gestionar citas, recordatorios automáticos y calendario interactivo para optimizar tu agenda diaria.'
    },
    {
      icon: '✂️',
      title: 'Gestión de Servicios',
      description: 'Cataloga todos los servicios de tu barbería con precios, duración y descripción detallada para una mejor organización.'
    },
    {
      icon: '🛒',
      title: 'Productos en Venta',
      description: 'Administra tu catálogo de productos, controla stock y realiza ventas directamente desde la plataforma.'
    },
    {
      icon: '📦',
      title: 'Control de Inventario',
      description: 'Mantén un registro preciso de tu inventario con alertas de stock bajo y control de proveedores.'
    },
    {
      icon: '📊',
      title: 'Reportes y Métricas',
      description: 'Visualiza el rendimiento de tu negocio con gráficos detallados y métricas de ventas, gastos y ganancias.'
    },
    {
      icon: '📄',
      title: 'Exportación Excel/PDF',
      description: 'Exporta todos tus reportes y datos a Excel o PDF para análisis externos y respaldos importantes.'
    }
  ];
}