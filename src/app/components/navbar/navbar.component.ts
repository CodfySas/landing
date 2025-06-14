import { Component, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav [class.scrolled]="!isHome || scrolled" class="navbar">
      <div class="container">
        <div class="logo">
          <img src="assets/logo.png" alt="CODFY Logo" height="50" />
        </div>
        <div class="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#productos">Productos</a>
          <a href="#desarrollo">Desarrollo a Medida</a>
          <a href="#contacto">Contáctanos</a>
        </div>
        <div class="menu-toggle">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: transparent;
        transition: background-color 0.3s ease;
        z-index: 1000;
        padding: 15px 0;
      }

      .navbar.scrolled {
        background-color: rgba(16, 15, 31);
      }

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .logo img {
        max-height: 50px;
      }

      .nav-links {
        display: flex;
        gap: 30px;
      }

      .nav-links a {
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s;
      }

      .nav-links a:hover {
        color: #429cd8;
      }

      .menu-toggle {
        display: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }

      @media (max-width: 768px) {
        .nav-links {
          display: none;
        }

        .menu-toggle {
          display: block;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  scrolled = false;
  isHome = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const navEndEvent = event as NavigationEnd;
        this.isHome = (navEndEvent.urlAfterRedirects === '/' || navEndEvent.urlAfterRedirects === '/#inicio')

        // Espera un poquito para que el scroll realmente esté en 0
        setTimeout(() => this.checkScroll(), 10);
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    this.scrolled = window.pageYOffset > 50;
  }
}
