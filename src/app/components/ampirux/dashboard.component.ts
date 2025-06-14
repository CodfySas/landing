import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dashboard-section">
      <div class="container">
        <div class="content-wrapper">
          <div class="text-content">
            <h2 class="section-title">Dashboard Inteligente</h2>
            <p class="section-description">
              Accede a toda la información importante de tu barbería desde un solo lugar. 
              Nuestro dashboard te permite visualizar ventas del día, gastos, top de servicios 
              y métricas clave para tomar decisiones informadas.
            </p>
            
            <div class="dashboard-features">
              <div class="dashboard-feature">
                <div class="feature-icon">💰</div>
                <div class="feature-content">
                  <h4>Ventas en Tiempo Real</h4>
                  <p>Monitorea tus ingresos diarios y semanales con actualizaciones instantáneas.</p>
                </div>
              </div>
              
              <div class="dashboard-feature">
                <div class="feature-icon">📈</div>
                <div class="feature-content">
                  <h4>Análisis de Tendencias</h4>
                  <p>Identifica patrones de consumo y servicios más demandados.</p>
                </div>
              </div>
              
              <div class="dashboard-feature">
                <div class="feature-icon">🎯</div>
                <div class="feature-content">
                  <h4>Métricas Personalizadas</h4>
                  <p>Configura los indicadores que más importan para tu negocio.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-demo">
            <div class="browser-mockup">
              <div class="browser-header">
                <div class="browser-buttons">
                  <span class="btn-close"></span>
                  <span class="btn-minimize"></span>
                  <span class="btn-maximize"></span>
                </div>
                <div class="browser-url">ampirux.com/dashboard</div>
              </div>
              
              <div class="dashboard-content">
                <div class="dashboard-header">
                  <h3>Bienvenido, Barbería Los Reyes</h3>
                  <span class="date">Martes, 15 Enero 2025</span>
                </div>
                
                <div class="metrics-row">
                  <div class="metric-item">
                    <div class="metric-icon sales">💰</div>
                    <div class="metric-details">
                      <span class="metric-value">$630.450</span>
                      <span class="metric-label">Ventas Hoy</span>
                      <span class="metric-change positive">+15%</span>
                    </div>
                  </div>
                  
                  <div class="metric-item">
                    <div class="metric-icon expenses">📊</div>
                    <div class="metric-details">
                      <span class="metric-value">$140.000</span>
                      <span class="metric-label">Gastos</span>
                      <span class="metric-change negative">-5%</span>
                    </div>
                  </div>
                  
                  <div class="metric-item">
                    <div class="metric-icon clients">👥</div>
                    <div class="metric-details">
                      <span class="metric-value">28</span>
                      <span class="metric-label">Clientes</span>
                      <span class="metric-change positive">+8%</span>
                    </div>
                  </div>
                </div>
                
                <div class="chart-section">
                  <h4>Top Servicios</h4>
                  <div class="service-item">
                    <span class="service-name">Corte Clásico</span>
                    <div class="service-bar">
                      <div class="service-progress" style="width: 85%"></div>
                    </div>
                    <span class="service-count">34</span>
                  </div>
                  <div class="service-item">
                    <span class="service-name">Barba + Corte</span>
                    <div class="service-bar">
                      <div class="service-progress" style="width: 65%"></div>
                    </div>
                    <span class="service-count">26</span>
                  </div>
                  <div class="service-item">
                    <span class="service-name">Afeitado</span>
                    <div class="service-bar">
                      <div class="service-progress" style="width: 45%"></div>
                    </div>
                    <span class="service-count">18</span>
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
    /* Reset específico para este componente */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .dashboard-section {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      padding: 5rem 0;
      background: linear-gradient(135deg, #1DA382 0%, #0F8A6B 100%);
      color: white;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #FFD700;
      line-height: 1.2;
    }

    .section-description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      opacity: 0.95;
    }

    .dashboard-features {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .dashboard-feature {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .feature-icon {
      font-size: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 0.5rem;
      border-radius: 10px;
      min-width: 50px;
      text-align: center;
    }

    .feature-content h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .feature-content p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.95rem;
    }

    .browser-mockup {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .browser-header {
      background: #f0f0f0;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .browser-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .browser-buttons span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .btn-close { background: #ff5f57; }
    .btn-minimize { background: #ffbd2e; }
    .btn-maximize { background: #28ca42; }

    .browser-url {
      background: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #666;
      flex: 1;
    }

    .dashboard-content {
      padding: 2rem;
      color: #333;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .dashboard-header h3 {
      margin: 0;
      color: #1DA382;
      font-size: 1.5rem;
      line-height: 1.2;
    }

    .date {
      color: #666;
      font-size: 0.9rem;
    }

    .metrics-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .metric-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .metric-icon {
      font-size: 1.5rem;
      padding: 0.5rem;
      border-radius: 10px;
      color: white;
    }

    .metric-icon.sales { background: #1DA382; }
    .metric-icon.expenses { background: #FF6B6B; }
    .metric-icon.clients { background: #4ECDC4; }

    .metric-details {
      display: flex;
      flex-direction: column;
    }

    .metric-value {
      font-size: 1.2rem;
      font-weight: 700;
      color: #333;
    }

    .metric-label {
      font-size: 0.8rem;
      color: #666;
    }

    .metric-change {
      font-size: 0.8rem;
      font-weight: 600;
    }

    .metric-change.positive { color: #1DA382; }
    .metric-change.negative { color: #FF6B6B; }

    .chart-section h4 {
      margin: 0 0 1rem 0;
      color: #1DA382;
      font-size: 1.2rem;
      line-height: 1.2;
    }

    .service-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .service-name {
      min-width: 120px;
      font-size: 0.9rem;
      color: #333;
    }

    .service-bar {
      flex: 1;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }

    .service-progress {
      height: 100%;
      background: linear-gradient(90deg, #1DA382, #0F8A6B);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .service-count {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1DA382;
      min-width: 30px;
      text-align: right;
    }

    @media (max-width: 768px) {
      .content-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .metrics-row {
        grid-template-columns: 1fr;
      }

      .dashboard-content {
        padding: 1rem;
      }

      .container {
        padding: 0 1rem;
      }
    }
  `]
})
export class DashboardShowcaseComponent {}