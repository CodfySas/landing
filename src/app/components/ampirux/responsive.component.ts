import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-responsive-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="responsive-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Adaptable a Cualquier Dispositivo</h2>
          <p class="section-subtitle">
            Accede a Ampirux desde cualquier lugar y dispositivo. Nuestra plataforma está optimizada 
            para brindar la mejor experiencia en desktop, tablet y móvil.
          </p>
        </div>
        
        <div class="devices-showcase">
          <div class="device desktop">
            <div class="device-frame">
              <div class="device-screen">
                <div class="screen-content">
                  <div class="nav-bar">
                    <div class="logo">Ampirux</div>
                    <div class="nav-items">
                      <span>Dashboard</span>
                      <span>Citas</span>
                      <span>Servicios</span>
                    </div>
                  </div>
                  <div class="content-area">
                    <div class="widget">
                      <div class="widget-title">Ventas</div>
                      <div class="widget-value">$2,450</div>
                    </div>
                    <div class="widget">
                      <div class="widget-title">Citas</div>
                      <div class="widget-value">28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Desktop</div>
          </div>
          
          <div class="device tablet">
            <div class="device-frame">
              <div class="device-screen">
                <div class="screen-content">
                  <div class="nav-bar mobile">
                    <div class="logo">Ampirux</div>
                    <div class="menu-icon">☰</div>
                  </div>
                  <div class="content-area mobile">
                    <div class="widget">
                      <div class="widget-title">Ventas</div>
                      <div class="widget-value">$2,450</div>
                    </div>
                    <div class="widget">
                      <div class="widget-title">Citas</div>
                      <div class="widget-value">28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Tablet</div>
          </div>
          
          <div class="device mobile">
            <div class="device-frame">
              <div class="device-screen">
                <div class="screen-content">
                  <div class="nav-bar mobile">
                    <div class="logo small">Ampirux</div>
                    <div class="menu-icon">☰</div>
                  </div>
                  <div class="content-area stacked">
                    <div class="widget full">
                      <div class="widget-title">Ventas del Día</div>
                      <div class="widget-value">$2,450</div>
                    </div>
                    <div class="widget full">
                      <div class="widget-title">Citas Hoy</div>
                      <div class="widget-value">28</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Móvil</div>
          </div>
        </div>
        
        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">📱</div>
            <h4>Diseño Responsivo</h4>
            <p>Interfaz que se adapta perfectamente a cualquier tamaño de pantalla</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔄</div>
            <h4>Sincronización en Tiempo Real</h4>
            <p>Todos tus datos se sincronizan instantáneamente entre dispositivos</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>Rendimiento Optimizado</h4>
            <p>Carga rápida y funcionamiento fluido en conexiones lentas</p>
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

    .responsive-section {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      padding: 5rem 0;
      background: #ffffff;
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
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .devices-showcase {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 2rem;
      margin-bottom: 4rem;
      padding: 2rem 0;
    }

    .device {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .device-frame {
      background: #333;
      border-radius: 20px;
      padding: 1rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transition: transform 0.3s ease;
    }

    .device-frame:hover {
      transform: translateY(-5px);
    }

    .device.desktop .device-frame {
      width: 300px;
      height: 200px;
      border-radius: 10px;
      padding: 0.5rem;
    }

    .device.tablet .device-frame {
      width: 180px;
      height: 240px;
      border-radius: 15px;
      padding: 0.8rem;
    }

    .device.mobile .device-frame {
      width: 120px;
      height: 200px;
      border-radius: 20px;
      padding: 0.5rem;
    }

    .device-screen {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .screen-content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .nav-bar {
      background: #7b2cbf;
      color: white;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
    }

    .nav-bar.mobile {
      padding: 0.3rem 0.5rem;
      font-size: 0.7rem;
    }

    .logo {
      font-weight: 700;
    }

    .logo.small {
      font-size: 0.6rem;
    }

    .nav-items {
      display: flex;
      gap: 1rem;
    }

    .menu-icon {
      font-size: 1rem;
    }

    .content-area {
      flex: 1;
      padding: 0.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .content-area.mobile {
      padding: 0.3rem;
      gap: 0.3rem;
    }

    .content-area.stacked {
      grid-template-columns: 1fr;
    }

    .widget {
      background: #f8f9fa;
      border-radius: 6px;
      padding: 0.5rem;
      text-align: center;
      border: 1px solid #e0e0e0;
    }

    .widget.full {
      padding: 0.3rem;
    }

    .widget-title {
      font-size: 0.6rem;
      color: #666;
      margin-bottom: 0.2rem;
    }

    .widget-value {
      font-size: 0.8rem;
      font-weight: 700;
      color: #7b2cbf;
    }

    .device-label {
      font-weight: 600;
      color: #7b2cbf;
      font-size: 1.1rem;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-top: 3rem;
    }

    .feature-item {
      text-align: center;
      padding: 2rem;
      background: #f8fffe;
      border-radius: 20px;
      border: 1px solid rgba(29, 163, 130, 0.1);
    }

    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .feature-item h4 {
      font-size: 1.2rem;
      font-weight: 600;
      color: #7b2cbf;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }

    .feature-item p {
      color: #666;
      line-height: 1.5;
      margin-bottom: 0;
    }

    @media (max-width: 968px) {
      .devices-showcase {
        flex-direction: column;
        align-items: center;
        gap: 3rem;
      }

      .features-list {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .container {
        padding: 0 1rem;
      }
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }

      .device.desktop .device-frame {
        width: 250px;
        height: 160px;
      }

      .device.tablet .device-frame {
        width: 150px;
        height: 200px;
      }

      .device.mobile .device-frame {
        width: 100px;
        height: 170px;
      }
    }
  `]
})
export class ResponsiveShowcaseComponent {}