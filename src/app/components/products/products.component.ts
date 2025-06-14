import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

interface Product {
  name: string
  description: string
  icon: string
  features: string[]
  link: string,
  color: string,
}

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="productos" class="products">
      <div class="container">
        <h2>Nuestros Productos Estrella</h2>
        <p class="section-description">
          Soluciones de software especializadas para diferentes industrias, 
          diseñadas para optimizar procesos y aumentar la productividad.
        </p>
        
        <div class="product-cards">
          <div class="product-card" *ngFor="let product of products" style="border: solid;" [ngStyle]="{ 'border-color': product.color }">
            <div class="product-icon">
              <i [class]="product.icon"></i>
            </div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <ul class="features">
              <li *ngFor="let feature of product.features">
                <i class="fas fa-check"></i> {{ feature }}
              </li>
            </ul>
            <a href="{{product.link}}" class="product-button">Conocer más</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    .products {
      padding: 100px 0;
      background-color: #f0f0f0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      text-align: center;
    }
    
    h2 {
      font-size: 2.5rem;
      color: #100f1f;
      margin-bottom: 20px;
    }
    
    .section-description {
      font-size: 1.2rem;
      color: #555;
      max-width: 800px;
      margin: 0 auto 50px;
    }
    
    .product-cards {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: center;
    }
    
    .product-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      padding: 30px;
      text-align: left;
      flex: 1;
      min-width: 300px;
      max-width: 380px;
      transition: transform 0.3s;
    }
    
    .product-card:hover {
      transform: translateY(-10px);
    }
    
    .product-icon {
      font-size: 3rem;
      color: #429cd8;
      margin-bottom: 20px;
    }
    
    .product-card h3 {
      font-size: 1.8rem;
      color: #100f1f;
      margin-bottom: 15px;
    }
    
    .product-card p {
      font-size: 1rem;
      color: #555;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .features {
      list-style: none;
      padding: 0;
      margin-bottom: 30px;
    }
    
    .features li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    
    .features li i {
      color: #429cd8;
      margin-right: 10px;
    }
    
    .product-button {
      background-color: transparent;
      color: #429cd8;
      border: 2px solid #429cd8;
      padding: 10px 20px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .product-button:hover {
      background-color: #429cd8;
      color: white;
    }
  `,
  ],
})
export class ProductsComponent {
  products: Product[] = [
    {
      name: "NotaMaestro",
      description: "Software educativo completo para la gestión de notas, asistencias y más.",
      icon: "fas fa-graduation-cap",
      features: [
        "Gestión de calificaciones",
        "Control de asistencia",
        "Comunicación con padres",
        "Reportes académicos",
      ],
      link: 'notamaestro',
      color: '#e78617'
    },
    {
      name: "Ampirux",
      description: "Sistema integral para barberías que gestiona citas, inventario y ventas.",
      icon: "fas fa-cut",
      features: ["Agenda de citas", "Control de inventario", "Gestión de ventas", "Fidelización de clientes"],
      link: 'ampirux',
      color: '#7b2cbf'
    },
    {
      name: "Toolveris",
      description: "Software especializado para ferreterías que optimiza la gestión del negocio.",
      icon: "fas fa-tools",
      features: ["Inventario detallado", "Punto de venta", "Gestión de proveedores", "Reportes de ventas"],
      link: '#contacto',
      color: '#ffffff'
    },
  ]
}
