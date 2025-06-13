import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <img src="assets/logo.png" alt="CODFY Logo" height="60">
            <p>TRAZABILIDAD E INNOVACIÓN</p>
          </div>
          
          <div class="footer-links">
            <div class="link-column">
              <h3>Productos</h3>
              <a href="https://notamaestro.com" target="_blank">NotaMaestro</a>
              <a href="https://ampirux.com" target="_blank">Ampirux</a>
              <a href="https://toolveris.com" target="_blank">Toolveris</a>
            </div>
            
            <div class="link-column">
              <h3>Empresa</h3>
              <a href="#nosotros">Sobre Nosotros</a>
              <a href="#productos">Productos</a>
              <a href="#desarrollo">App a tu medida</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} CODFY. Todos los derechos reservados.</p>
          <div class="legal-links">
            <a href="/terminos">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
    .footer {
      background-color: #100f1f;
      color: white;
      padding: 70px 0 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .footer-content {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
      justify-content: space-between;
      margin-bottom: 50px;
    }
    
    .footer-logo {
      flex: 1;
      min-width: 200px;
    }
    
    .footer-logo p {
      margin-top: 10px;
      font-size: 0.9rem;
      color: #aaa;
    }
    
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;
    }
    
    .link-column {
      min-width: 150px;
    }
    
    .link-column h3 {
      font-size: 1.2rem;
      margin-bottom: 20px;
      color: #429cd8;
    }
    
    .link-column a {
      display: block;
      color: #aaa;
      margin-bottom: 10px;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .link-column a:hover {
      color: white;
    }
    
    .footer-bottom {
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }
    
    .footer-bottom p {
      font-size: 0.9rem;
      color: #aaa;
    }
    
    .legal-links {
      display: flex;
      gap: 20px;
    }
    
    .legal-links a {
      font-size: 0.9rem;
      color: #aaa;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .legal-links a:hover {
      color: white;
    }
    
    @media (max-width: 768px) {
      .footer-content, .footer-bottom {
        flex-direction: column;
        text-align: center;
      }
      
      .footer-links {
        justify-content: center;
      }
    }
  `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()
}
