import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="nosotros" class="about">
      <div class="container">
        <h2>Somos una Empresa de Transformación Digital</h2>
        <p>
          Nos especializamos en la construcción de soluciones tecnológicas a medida para 
          generar impacto de negocio. En CODFY, combinamos trazabilidad e innovación para 
          crear software que impulsa el crecimiento de tu empresa.
        </p>
        <div class="stats">
          <div class="stat-item">
            <h3>Análisis y Diseño</h3>
            <p>Estudiamos tus procesos y necesidades para diseñar la solución perfecta para tu negocio.</p>
          </div>
          <div class="stat-item">
            <h3>Desarrollo a Medida</h3>
            <p>Creamos software personalizado utilizando las tecnologías más adecuadas para tu proyecto.</p>
          </div>
          <div class="stat-item">
            <h3>Implementación y Capacitación</h3>
            <p>Implementamos la solución y capacitamos a tu equipo para aprovechar al máximo el software.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    .about {
      padding: 100px 0;
      background-color: white;
      text-align: center;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    h2 {
      font-size: 2.5rem;
      color: #100f1f;
      margin-bottom: 20px;
    }
    
    p {
      font-size: 1.2rem;
      color: #555;
      max-width: 800px;
      margin: 0 auto 50px;
      line-height: 1.6;
    }
    
    .stats {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 30px;
    }
    
    .stat-item {
      flex: 1;
      min-width: 200px;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }
    
    .stat-item:hover {
      transform: translateY(-10px);
    }
    
    .stat-item h3 {
      font-size: 1.5rem;
      color: #429cd8;
      margin-bottom: 10px;
    }
    
    .stat-item p {
      font-size: 1rem;
      margin-bottom: 0;
    }
  `,
  ],
})
export class AboutComponent {}
