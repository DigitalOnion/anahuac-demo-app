import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-page',
  imports: [],
  template: `
    <article class="max-w-[1200px] mx-auto p-4">
      <h1>Caso Práctico</h1>
      <p>Desarrollar una aplicación de prueba con las siguientes condiciones de entrega:</p>
      <h2>Hosting</h2>
      <ul>
        <li>Hosting en la nube (de preferencia AWS o Azure)</li>
      </ul>

      <h2>Front-end:</h2>
      <ul>
        <li>Página de login con usuario y contraseña</li>
        <li>Página de trabajo con ingreso del nombre o símbolo de una empresa</li>
        <li>Presentar la gráfica del precio diario de las acciones por un mes (o más)</li>
        <li>Bono: presentar una predicción del precio diario de las acciones próximo día.</li>
      </ul>

      <h2>Backend:</h2>
      <ul>
        <li>Programar una API con seguridad básica</li>
        <li>Función de /login dando el usuario y contraseña en forma segura, responde con el permiso o negación para el acceso a la página de trabajo.</li>
      </ul>

      <h2>Fuentes de datos:</h2>
      <ul>
        <li>Las series de datos financieros pueden obtenerse de APIs. Es necesario crear una cuenta y obtener los permisos necesarios en algún repositorio como nasdaq.com, la URL es https://data.nasdaq.com/sign-up Hay otros repositorios que tienen servicios similares.</li>
      </ul>

      <h2>Otras condiciones de entrega:</h2>
      <ul>
        <li>La aplicación debe ser funcional con una URL de la nube (no es necesario agregar un dominio)</li>
        <li>El front-end puede programarse directamente en HTML y JavaScript, o con alguna otra plataforma como Angular, React, o similar.</li>
        <li>El login se ejecuta en la nube con el código de un servidor web. Se sugiere usar Node.js pero la elección de la plataforma es opcional.</li>
        <li>El código se somete en un repositorio GIT, como GitHub, GitLab, BitBucket, y otro</li>
      </ul>
    </article>
  `,
  styles: `
  `,
})
export class PortalPage {

}
