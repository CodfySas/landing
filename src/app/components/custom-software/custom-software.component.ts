import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-custom-software",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="desarrollo" class="custom-software">
      <div class="overlay"></div>
      <div class="container">
        <div class="content">
          <h2>Desarrollo de Software a Medida</h2>
          <p>
            Creamos soluciones tecnológicas personalizadas que se adaptan 
            perfectamente a las necesidades específicas de tu negocio.
          </p>
          
          <div class="process">
            <div class="process-step">
              <div class="step-number">1</div>
              <h3>Análisis</h3>
              <p>Entendemos tu negocio y definimos los requerimientos específicos.</p>
            </div>
            
            <div class="process-step">
              <div class="step-number">2</div>
              <h3>Diseño</h3>
              <p>Creamos la arquitectura y diseñamos la experiencia de usuario.</p>
            </div>
            
            <div class="process-step">
              <div class="step-number">3</div>
              <h3>Desarrollo</h3>
              <p>Construimos tu solución con las mejores prácticas y tecnologías.</p>
            </div>
            
            <div class="process-step">
              <div class="step-number">4</div>
              <h3>Implementación</h3>
              <p>Desplegamos la solución y capacitamos a tu equipo.</p>
            </div>
          </div>
          
          <a href="/#contacto" class="cta-button">Solicita una consulta</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    .custom-software {
      padding: 100px 0;
      background-size: cover;
      background-position: center;
      position: relative;
      color: white;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(16, 15, 31, 0.9);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    .content {
      text-align: center;
    }
    
    h2 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      max-width: 800px;
      margin: 0 auto 50px;
      line-height: 1.6;
    }
    
    .process {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: center;
      margin-bottom: 50px;
    }
    
    .process-step {
      flex: 1;
      min-width: 200px;
      max-width: 250px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 30px 20px;
      transition: transform 0.3s;
    }
    
    .process-step:hover {
      transform: translateY(-10px);
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .step-number {
      width: 50px;
      height: 50px;
      background-color: #429cd8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 auto 20px;
    }
    
    .process-step h3 {
      font-size: 1.5rem;
      margin-bottom: 15px;
    }
    
    .process-step p {
      font-size: 1rem;
      margin-bottom: 0;
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
  `,
  ],
})
export class CustomSoftwareComponent {}
