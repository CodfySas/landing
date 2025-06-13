import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms"
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <section id="contacto" class="contact">
      <div class="container">
        <h2>Contáctanos</h2>
        <p class="section-description">
          Estamos listos para ayudarte a transformar tu negocio con nuestras soluciones tecnológicas.
        </p>
        
        <div class="contact-container">
          <div class="contact-info">
            <div class="info-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <h3>Dirección</h3>
                <p>Cra 21 # 18 - 2, Piso 1. Baranoa, Atlántico</p>
              </div>
            </div>
            
            <div class="info-item">
              <i class="fas fa-phone"></i>
              <div>
                <h3>Teléfono</h3>
                <p>+300 313 9837</p>
              </div>
            </div>
            
            <div class="info-item">
              <i class="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>ventas&#64;codfysas.com</p>
              </div>
            </div>
            
            <div class="social-media">
              <a href="https://www.facebook.com/61558057554191/" target="_blank" class="social-icon"><i class="fab fa-facebook-f"></i></a>
              <a href="https://www.tiktok.com/@codfysas" target="_blank" class="social-icon"><i class="fab fa-tiktok"></i></a>
              <a href="https://www.instagram.com/codfy_sas/" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
              <a href="https://wa.me/3003139837" target="_blank" class="social-icon"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>
          
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
            <div class="form-group">
              <input type="text" formControlName="name" placeholder="Nombre completo" required>
              <div class="error-message" *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                Por favor ingresa tu nombre
              </div>
            </div>
            
            <div class="form-group">
              <input type="email" formControlName="email" placeholder="Correo electrónico" required>
              <div class="error-message" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                Por favor ingresa un correo válido
              </div>
            </div>
            
            <div class="form-group">
              <input type="tel" formControlName="phone" placeholder="Teléfono">
            </div>
            
            <div class="form-group">
              <select formControlName="subject" required>
                <option value="" disabled selected>Selecciona un tema</option>
                <option value="NotaMaestro">NotaMaestro</option>
                <option value="Ampirux">Ampirux</option>
                <option value="Toolveris">Toolveris</option>
                <option value="Desarrollo a medida">Desarrollo a medida</option>
                <option value="Otro">Otro</option>
              </select>
              <div class="error-message" *ngIf="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched">
                Por favor selecciona un tema
              </div>
            </div>
            
            <div class="form-group">
              <textarea formControlName="message" placeholder="Mensaje" rows="5" required></textarea>
              <div class="error-message" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                Por favor ingresa tu mensaje
              </div>
            </div>
            
            <button type="submit" [disabled]="contactForm.invalid" class="submit-button">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
    .contact {
      padding: 100px 0;
      background-color: #f9f9f9;
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
    
    .contact-container {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
      justify-content: space-between;
    }
    
    .contact-info {
      flex: 1;
      min-width: 300px;
      text-align: left;
    }
    
    .info-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
    }
    
    .info-item i {
      font-size: 1.5rem;
      color: #429cd8;
      margin-right: 15px;
      margin-top: 5px;
    }
    
    .info-item h3 {
      font-size: 1.2rem;
      color: #100f1f;
      margin-bottom: 5px;
    }
    
    .info-item p {
      font-size: 1rem;
      color: #555;
      margin: 0;
    }
    
    .social-media {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }
    
    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #429cd8;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    
    .social-icon:hover {
      background-color: #100f1f;
    }
    
    .contact-form {
      flex: 1;
      min-width: 300px;
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      text-align: left;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    input, select, textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #429cd8;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 5px;
    }
    
    .submit-button {
      background-color: #429cd8;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      width: 100%;
    }
    
    .submit-button:hover {
      background-color: #3589c2;
    }
    
    .submit-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `,
  ],
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl(""),
    subject: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
  })

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.contactForm.valid) {
        const value = this.contactForm.value
        this.http.post('https://formspree.io/f/mblyovyw', {
          email: value.email,
          message: `Hola! Equipo de Codfy, estoy interesado en ${value.subject}.
          ${value.message}
          
          Atentamente, ${value.name}, Telefono: ${value.phone}`
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Mensaje enviado!',
              text: 'Nos pondremos en contacto contigo pronto.',
              confirmButtonColor: '#429cd8'
            });
            this.contactForm.reset();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Hubo un problema al enviar tu mensaje. Por favor, intenta de nuevo más tarde.',
              confirmButtonColor: '#e74c3c'
            });
          }
        });
      }
    }
  }
}
