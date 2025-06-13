import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="terms-container">
      <h1>Términos y Condiciones de Uso</h1>
      
      <div class="last-updated">
        <p><strong>Última actualización:</strong> 12/06/2025</p>
      </div>

      <div class="intro-section">
        <p>
          Los presentes Términos y Condiciones (en adelante, "Términos") regulan el uso del sitio web 
          codfysas.com (en adelante, "el Sitio") operado por CODFY S.A.S. 
          (en adelante, "la Empresa", "nosotros", "nuestro" o "nos"). Al acceder y utilizar este sitio web, 
          usted (en adelante, "el Usuario" o "usted") acepta quedar vinculado por estos Términos y todas 
          las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de todas las 
          leyes locales aplicables.
        </p>
        <p>
          Si no está de acuerdo con alguno de estos términos, tiene prohibido usar o acceder a este sitio. 
          Los materiales contenidos en este sitio web están protegidos por las leyes de derechos de autor 
          y marcas comerciales aplicables.
        </p>
      </div>

      <h2>1. Definiciones</h2>
      <p>
        Para los efectos de estos Términos, se entenderá por:
      </p>
      <ul>
        <li><strong>Sitio Web:</strong> La plataforma digital accesible a través de codfysas.com</li>
        <li><strong>Servicios:</strong> Todos los servicios, contenidos, funcionalidades y productos ofrecidos a través del Sitio Web</li>
        <li><strong>Usuario:</strong> Cualquier persona que acceda, navegue o utilice el Sitio Web</li>
        <li><strong>Contenido:</strong> Toda la información, datos, textos, imágenes, videos, audio y otros materiales disponibles en el Sitio Web</li>
        <li><strong>Cuenta:</strong> El perfil de usuario creado para acceder a ciertos servicios del Sitio Web</li>
      </ul>

      <h2>2. Aceptación de los Términos</h2>
      <p>
        Al acceder y utilizar este Sitio Web, usted reconoce que ha leído, entendido y acepta estar 
        sujeto a estos Términos y Condiciones, así como a nuestra Política de Privacidad. Si no está 
        de acuerdo con estos términos, debe cesar inmediatamente el uso del Sitio Web.
      </p>
      <p>
        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones 
        entrarán en vigor inmediatamente después de su publicación en el Sitio Web. Es responsabilidad 
        del Usuario revisar periódicamente estos Términos para mantenerse informado de cualquier cambio.
      </p>

      <h2>3. Uso Permitido del Sitio Web</h2>
      <p>
        Se concede al Usuario una licencia limitada, no exclusiva, no transferible y revocable para 
        acceder y usar el Sitio Web de acuerdo con estos Términos. Este uso está sujeto a las siguientes restricciones:
      </p>
      <ul>
        <li>El Usuario no puede usar el Sitio Web para fines comerciales sin autorización expresa</li>
        <li>No se permite la reproducción, duplicación, copia, venta, reventa o explotación de cualquier parte del Sitio Web</li>
        <li>Está prohibido el uso de robots, spiders, scrapers u otras tecnologías automatizadas</li>
        <li>No se permite intentar obtener acceso no autorizado a cualquier parte del Sitio Web</li>
        <li>El Usuario no puede interferir con el funcionamiento normal del Sitio Web</li>
      </ul>

      <h2>4. Registro de Cuenta y Seguridad</h2>
      <p>
        Para acceder a ciertos servicios del Sitio Web, es posible que se requiera crear una cuenta. 
        Al registrarse, el Usuario se compromete a:
      </p>
      <ul>
        <li>Proporcionar información precisa, actual y completa durante el proceso de registro</li>
        <li>Mantener y actualizar promptamente la información de registro</li>
        <li>Mantener la confidencialidad de su contraseña y cuenta</li>
        <li>Notificar inmediatamente cualquier uso no autorizado de su cuenta</li>
        <li>Aceptar la responsabilidad por todas las actividades que ocurran bajo su cuenta</li>
      </ul>
      <p>
        Nos reservamos el derecho de suspender o terminar cuentas que violen estos Términos o que 
        consideremos apropiado a nuestro exclusivo criterio.
      </p>

      <h2>5. Contenido del Usuario</h2>
      <p>
        Si el Sitio Web permite a los usuarios enviar, publicar o transmitir contenido, el Usuario 
        retiene la propiedad de dicho contenido, pero otorga a la Empresa una licencia mundial, 
        no exclusiva, libre de regalías para usar, reproducir, modificar, adaptar, publicar, 
        traducir y distribuir dicho contenido.
      </p>
      <p>
        El Usuario es el único responsable del contenido que publique y garantiza que:
      </p>
      <ul>
        <li>Posee todos los derechos necesarios sobre el contenido</li>
        <li>El contenido no infringe derechos de terceros</li>
        <li>El contenido no es difamatorio, obsceno, ofensivo o ilegal</li>
        <li>El contenido no contiene virus, malware o código malicioso</li>
      </ul>

      <h2>6. Propiedad Intelectual</h2>
      <p>
        Todo el contenido del Sitio Web, incluyendo pero no limitado a textos, gráficos, logos, 
        íconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, 
        es propiedad de la Empresa o sus proveedores de contenido y está protegido por las leyes 
        de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
      </p>
      <p>
        El uso no autorizado de cualquier material del Sitio Web puede violar las leyes de derechos 
        de autor, marcas comerciales y otras leyes, y puede resultar en responsabilidad civil y penal.
      </p>

      <h2>7. Política de Privacidad y Protección de Datos</h2>
      <p>
        La recopilación, uso y protección de datos personales se rige por nuestra Política de Privacidad, 
        que forma parte integral de estos Términos. Al usar el Sitio Web, usted consiente la recopilación 
        y uso de su información personal de acuerdo con dicha política.
      </p>
      <p>
        Nos comprometemos a proteger la privacidad de nuestros usuarios y cumplir con todas las leyes 
        aplicables de protección de datos, incluyendo el Reglamento General de Protección de Datos (GDPR) 
        cuando sea aplicable.
      </p>

      <h2>8. Cookies y Tecnologías de Seguimiento</h2>
      <p>
        Utilizamos cookies y tecnologías similares para mejorar la experiencia del usuario, analizar 
        el tráfico del sitio web y personalizar el contenido. Las cookies son pequeños archivos de 
        datos que se almacenan en su dispositivo cuando visita nuestro sitio web.
      </p>
      <p>
        Puede configurar su navegador para rechazar todas las cookies o para indicar cuando se envía 
        una cookie. Sin embargo, algunas funciones del sitio web pueden no funcionar correctamente 
        si las cookies están deshabilitadas.
      </p>

      <h2>9. Limitación de Responsabilidad</h2>
      <p>
        En ningún caso la Empresa, sus directores, empleados, socios, agentes, proveedores o afiliados 
        serán responsables por daños indirectos, incidentales, especiales, consecuenciales o punitivos, 
        incluyendo pero no limitado a pérdida de beneficios, datos, uso, buena voluntad u otras 
        pérdidas intangibles, resultantes de:
      </p>
      <ul>
        <li>El uso o la imposibilidad de usar el Sitio Web</li>
        <li>Cualquier conducta o contenido de terceros en el Sitio Web</li>
        <li>Acceso no autorizado, uso o alteración de sus transmisiones o contenido</li>
        <li>Cualquier otro asunto relacionado con el Sitio Web</li>
      </ul>
      <p>
        La responsabilidad total de la Empresa hacia usted por todas las reclamaciones relacionadas 
        con el Sitio Web no excederá la cantidad pagada por usted, si la hubiera, por el acceso al Sitio Web.
      </p>

      <h2>10. Indemnización</h2>
      <p>
        El Usuario acepta indemnizar, defender y eximir de responsabilidad a la Empresa, sus afiliados, 
        directores, empleados y agentes de y contra cualquier reclamación, daño, obligación, pérdida, 
        responsabilidad, costo o deuda, y gastos (incluyendo pero no limitado a honorarios de abogados) 
        que surjan de:
      </p>
      <ul>
        <li>La violación de estos Términos por parte del Usuario</li>
        <li>La violación de cualquier derecho de terceros por parte del Usuario</li>
      </ul>

      <h2>11. Terminación</h2>
      <p>
        Podemos terminar o suspender su cuenta y acceso al Sitio Web inmediatamente, sin previo aviso 
        o responsabilidad, por cualquier motivo, incluyendo pero no limitado a la violación de estos Términos.
      </p>
      <p>
        Al terminar, su derecho a usar el Sitio Web cesará inmediatamente. Si desea terminar su cuenta, 
        puede simplemente dejar de usar el Sitio Web.
      </p>

      <h2>12. Ley Aplicable y Jurisdicción</h2>
      <p>
        Estos Términos se regirán e interpretarán de acuerdo con las leyes de Colombia, 
        sin dar efecto a ningún principio de conflictos de leyes. Cualquier disputa que surja de o 
        esté relacionada con estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales 
        de Colombia.
      </p>

      <h2>13. Divisibilidad</h2>
      <p>
        Si alguna disposición de estos Términos es considerada inválida o inaplicable por un tribunal 
        de jurisdicción competente, las disposiciones restantes permanecerán en pleno vigor y efecto.
      </p>

      <h2>14. Acuerdo Completo</h2>
      <p>
        Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo 
        entre usted y la Empresa con respecto al uso del Sitio Web y reemplazan todos los acuerdos 
        anteriores y contemporáneos, ya sean escritos u orales, relacionados con dicho uso.
      </p>

      <h2>15. Contacto</h2>
      <p>
        Si tiene alguna pregunta sobre estos Términos y Condiciones, puede contactarnos a través de:
      </p>
      <div class="contact-info">
        <p><strong>Email:</strong> ceo&#64;codfysas.com</p>
        <p><strong>Teléfono:</strong> 3003139837</p>
        <p><strong>Dirección:</strong> Cra 21 # 18 - 2, Piso 1. Baranoa, Atlántico</p>
      </div>

      <div class="acknowledgment">
        <p>
          <strong>Al continuar usando este sitio web, usted reconoce que ha leído, entendido y 
          acepta estar sujeto a estos Términos y Condiciones.</strong>
        </p>
      </div>
    </section>
  `,
  styles: [
    `
      .terms-container {
        max-width: 900px;
        margin: 100px auto 50px auto;
        padding: 0 30px;
        color: #333;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.7;
      }

      h1 {
        font-size: 2.8rem;
        margin-bottom: 1.5rem;
        color: #2c3e50;
        text-align: center;
        border-bottom: 3px solid #429cd8;
        padding-bottom: 1rem;
      }

      .last-updated {
        background-color: #f8f9fa;
        padding: 15px;
        border-left: 4px solid #429cd8;
        margin-bottom: 2rem;
        border-radius: 4px;
      }

      .intro-section {
        background-color: #f0f8ff;
        padding: 25px;
        border-radius: 8px;
        margin-bottom: 2rem;
        border: 1px solid #e1ecf4;
      }

      h2 {
        font-size: 1.8rem;
        margin-top: 2.5rem;
        margin-bottom: 1rem;
        color: #429cd8;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #e9ecef;
      }

      p {
        font-size: 1.05rem;
        line-height: 1.7;
        margin-bottom: 1.2rem;
        text-align: justify;
      }

      ul {
        margin: 1rem 0;
        padding-left: 2rem;
      }

      li {
        margin-bottom: 0.8rem;
        font-size: 1.05rem;
        line-height: 1.6;
      }

      .contact-info {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin: 1.5rem 0;
        border: 1px solid #dee2e6;
      }

      .contact-info p {
        margin-bottom: 0.8rem;
      }

      .acknowledgment {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 8px;
        padding: 25px;
        margin-top: 3rem;
        text-align: center;
      }

      .acknowledgment p {
        margin: 0;
        font-size: 1.1rem;
        color: #856404;
      }

      strong {
        color: #2c3e50;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .terms-container {
          margin: 80px 20px 30px 20px;
          padding: 0 15px;
        }

        h1 {
          font-size: 2.2rem;
        }

        h2 {
          font-size: 1.5rem;
        }

        p, li {
          font-size: 1rem;
        }

        .intro-section,
        .contact-info,
        .acknowledgment {
          padding: 20px;
        }

        ul {
          padding-left: 1.5rem;
        }
      }

      @media (max-width: 480px) {
        .terms-container {
          margin: 60px 10px 20px 10px;
          padding: 0 10px;
        }

        h1 {
          font-size: 1.8rem;
        }

        h2 {
          font-size: 1.3rem;
        }

        .intro-section,
        .contact-info,
        .acknowledgment {
          padding: 15px;
        }
      }
    `,
  ],
})
export class TermsPageComponent {}