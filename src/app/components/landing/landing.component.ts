import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroComponent } from "../hero/hero.component";
import { AboutComponent } from "../about/about.component";
import { ProductsComponent } from "../products/products.component";
import { CustomSoftwareComponent } from "../custom-software/custom-software.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent, ProductsComponent, CustomSoftwareComponent, ContactComponent],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-products></app-products>
    <app-custom-software></app-custom-software>
    <app-contact></app-contact>
  `,
  styles: [
    `
      .hero {
        position: relative;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start; /* Cambiado para alinear a la izquierda */
        color: white;
        padding-top: 80px;
        padding-left: 80px; /* Añadido para dejar espacio desde el borde izquierdo */
        z-index: 50;
      }

      @media (max-width: 768px) {
        .hero {
          padding-left: 20px;  /* o 0 si quieres quitarlo totalmente */
          padding-top: 60px;   /* ajusta si quieres */
          justify-content: center; /* opcional, si quieres centrar en móvil */
        }
      }

      .container {
        max-width: 600px; /* reduje para que no ocupe todo el ancho */
        padding: 0 20px;
        position: relative;
        z-index: 2;
      }

      .hero-content {
        max-width: 600px;
        position: relative;
        z-index: 3;
        text-align: left; /* Asegura que el texto esté alineado a la izquierda */
      }

      .background-video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-50%, -50%);
        z-index: 0;
        object-fit: cover;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(16, 15, 31, 0.8);
        z-index: 1;
      }

      h1 {
        font-size: 4rem;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.2;
      }

      p {
        font-size: 1.5rem;
        margin-bottom: 30px;
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

      @media (max-width: 768px) {
        h1 {
          font-size: 2.5rem;
        }

        p {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class LandingComponent { }
