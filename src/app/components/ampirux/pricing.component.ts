import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pricing-plans',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="pricing-section">
      <div class="container">
        <div class="header">
          <h1 style="color: #FFD700;">Planes Ampirux</h1>
        </div>

        <div class="pricing-grid" style="margin-bottom: 1rem;">
          <!-- Plan Básico -->
          <div class="plan-card">
            <h3 class="plan-title">Básico</h3>
            <div class="plan-price">$49.900<span class="plan-period">/mes</span></div>
            <div class="invoice-info">50 facturas diarias | Sin facturación electrónica</div>
            
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Integración con WhatsApp
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Sin configuración de empleados
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Agendamiento de citas por whatsapp
              </li>
            </ul>
            
            <a class="cta-button" href="/#contacto">Comenzar</a>
          </div>

          <!-- Plan Starter -->
          <div class="plan-card">
            <h3 class="plan-title">Starter</h3>
            <div class="plan-price">$99.900<span class="plan-period">/mes</span></div>
            <div class="invoice-info">100 facturas diarias | Sin facturación electrónica</div>
            
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Gestión de hasta 3 empleados
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Cálculo de comisiones
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Reportes básicos
              </li>
            </ul>
            
            <a class="cta-button" href="/#contacto">Comenzar</a>
          </div>

          <!-- Plan Plus -->
          <div class="plan-card">
            <h3 class="plan-title">Plus</h3>
            <div class="plan-price">$239.900<span class="plan-period">/mes</span></div>
            <div class="invoice-info">Facturación electrónica | Hasta 150 facturas diarias</div>
            
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Gestión de hasta 10 empleados
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Cálculo y liquidación de nómina
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Reportes avanzados
              </li>
            </ul>
            
            <a class="cta-button" href="/#contacto">Comenzar</a>
          </div>

          <!-- Plan Pro (Featured) -->
          <div class="plan-card featured">
            <h3 class="plan-title">Pro</h3>
            <div class="plan-price">$449.900<span class="plan-period">/mes</span></div>
            <div class="invoice-info">Facturación electrónica ilimitada</div>
            
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Sin límites de empleados
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Gestión de usuarios, roles y permisos
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Sistema de promociones inteligentes
              </li>
            </ul>
            
            <a class="cta-button" href="/#contacto">Comenzar</a>
          </div>

          <!-- Plan Enterprise -->
          <div class="plan-card">
            <h3 class="plan-title">Enterprise</h3>
            <div class="plan-price">$619.900<span class="plan-period">/mes</span></div>
            <div class="invoice-info">Facturas ilimitadas | Facturación electrónica ilimitada</div>
            
            <ul class="features-list">
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Múltiples sucursales
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Catálogo digital para clientes
              </li>
              <li class="feature-item">
                <span class="feature-check">✓</span>
                Bitácora del sistema
              </li>
            </ul>
            
            <a class="cta-button" href="/#contacto">Contactar</a>
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

    .pricing-section {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(45deg, #7b2cbf 0%,#691bad 100%);
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      margin: 0 auto;
      max-width: 1400px;
    }

    .header {
      text-align: center;
      color: white;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .plan-card {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 15px;
      padding: 30px 25px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .plan-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .plan-card.featured {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      transform: scale(1.05);
    }

    .plan-card.featured::before {
      content: " MÁS POPULAR";
      position: absolute;
      top: 25px;
      right: -40px;
      background: #fbbf24;
      color: #1f2937;
      padding: 5px 40px;
      font-size: 0.7rem;
      font-weight: 700;
      transform: rotate(45deg);
    }

    .plan-title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .plan-price {
      font-size: 2rem;
      font-weight: 800;
      margin-bottom: 5px;
      color: #8b5cf6;
    }

    .plan-card.featured .plan-price {
      color: #fbbf24;
    }

    .plan-period {
      font-size: 0.9rem;
      opacity: 0.7;
      margin-bottom: 20px;
    }

    .activation-badge {
      background: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 20px;
      display: inline-block;
    }

    .plan-card.featured .activation-badge {
      background: #fbbf24;
      color: #1f2937;
    }

    .plan-card:nth-child(2) .activation-badge {
      background: #ef4444;
    }

    .plan-card:nth-child(3) .activation-badge {
      background: #f97316;
    }

    .plan-card:nth-child(5) .activation-badge {
      background: #8b5cf6;
    }

    .invoice-info {
      background: #f3f4f6;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 0.9rem;
      color: #374151;
    }

    .plan-card.featured .invoice-info {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .features-list {
      text-align: left;
      margin-bottom: 30px;
      list-style: none;
    }

    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 0.9rem;
    }

    .feature-check {
      width: 20px;
      height: 20px;
      background: #10b981;
      border-radius: 50%;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      flex-shrink: 0;
    }

    .plan-card.featured .feature-check {
      background: #fbbf24;
      color: #1f2937;
    }

    .cta-button {
      align-self: end;
      margin-top: auto;
      background: #8b5cf6;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: 100%;
    }

    .cta-button:hover {
      background: #7c3aed;
    }

    .plan-card.featured .cta-button {
      background: #fbbf24;
      color: #1f2937;
    }

    .plan-card.featured .cta-button:hover {
      background: #f59e0b;
    }

    .plan-card:nth-child(5) .cta-button {
      background: #6b7280;
    }

    .plan-card:nth-child(5) .cta-button:hover {
      background: #4b5563;
    }

    @media (max-width: 768px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
      
      .plan-card.featured {
        transform: none;
      }

      .header h1 {
        font-size: 2rem;
      }

      .header p {
        font-size: 1rem;
      }

      .plan-price {
        font-size: 2.5rem;
      }
    }
  `]
})
export class PricingPlansComponent {
  
  onPlanSelect(planType: string): void {
    // Aquí puedes manejar la lógica cuando se selecciona un plan
    console.log(`Plan seleccionado: ${planType}`);
    
    // Ejemplo de acciones que podrías realizar:
    // - Navegar a una página de registro
    // - Mostrar un modal con más información
    // - Enviar datos a un servicio
    // - Emitir un evento al componente padre
  }
}