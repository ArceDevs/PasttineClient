import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/pages/terms.css'

export default function Terms() {

  return (
    <div className='terms-services'>
      <h1>Términos y Condiciones de Uso</h1>
      <p><strong>Fecha de última actualización:</strong> 13/11/2023</p>
      
      <p>Bienvenido a PASTTINE, un portal de comercio electrónico especializado en la venta de productos de hostelería a nivel internacional. Te invitamos a leer detenidamente los siguientes términos y condiciones antes de utilizar nuestro sitio web. Al acceder o utilizar nuestro sitio, aceptas cumplir con estos términos y condiciones.</p>

      <h2>1. Aceptación de los Términos</h2>
      <p>Al acceder o utilizar PASTTINE, confirmas que has leído, comprendido y aceptado estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, te rogamos que no utilices nuestro sitio web.</p>

      <h2>2. Uso del Sitio</h2>
      <h3>2.1. Registro</h3>
      <p>Al realizar una compra en nuestro sitio, es posible que debas registrarte y proporcionar información personal. Asegúrate de que esta información sea precisa y actualizada.</p>

      <h3>2.2. Edad mínima</h3>
      <p>Debes ser mayor de 18 años para utilizar nuestro sitio web y realizar compras. Si eres menor de 18 años, debes contar con la autorización y supervisión de un adulto para utilizar nuestro sitio.</p>

      <h3>2.3. Acceso y seguridad</h3>
      <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, y de todas las actividades que ocurran en tu cuenta. Notifícanos de inmediato cualquier uso no autorizado de tu cuenta o cualquier violación de seguridad.</p>

      <h2>3. Compras y Pagos</h2>
      <h3>3.1. Productos y Precios</h3>
      <p>Los productos ofrecidos en nuestro sitio web están sujetos a disponibilidad y a cambios de precio sin previo aviso. Nos esforzamos por proporcionar información precisa sobre productos y precios, pero no garantizamos la exactitud de dicha información.</p>

      <h3>3.2. Proceso de Compra</h3>
      <p>El proceso de compra se describe en detalle en nuestro sitio web. Al realizar una compra, aceptas cumplir con los términos y condiciones de venta que se aplican a tu transacción.</p>

      <h3>3.3. Pago</h3>
      <p>Aceptamos diversos métodos de pago, que se especifican en nuestro sitio web. Todos los pagos están sujetos a verificación y aprobación.</p>

      <h2>4. Envíos y Devoluciones</h2>
      <h3>4.1. Envíos</h3>
      <p>Los detalles sobre los plazos de entrega y los costos de envío se proporcionan en nuestro sitio web. Haremos todo lo posible para cumplir con los plazos de entrega indicados, pero no podemos garantizar la entrega en un plazo específico.</p>

      <h3>4.2. Devoluciones</h3>
      <p>Consulta nuestra política de devoluciones en nuestro sitio web para obtener información sobre cómo proceder en caso de productos defectuosos o insatisfactorios.</p>

      <h2>5. Propiedad Intelectual</h2>
      <h3>5.1. Derechos de Autor</h3>
      <p>Todos los contenidos y materiales en PASTTINE están protegidos por derechos de autor y son propiedad exclusiva de [Tu empresa]. No puedes utilizar, reproducir o distribuir estos contenidos sin nuestro permiso por escrito.</p>

      <h2>6. Privacidad</h2>
      <h3>6.1. Política de Privacidad</h3>
      <p>Nuestra política de privacidad describe cómo recopilamos, utilizamos y protegemos tus datos personales. Al utilizar nuestro sitio web, aceptas nuestras prácticas de privacidad.</p>

      <h2>7. Cambios en los Términos</h2>
      <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia una vez que se publiquen en nuestro sitio web. Te recomendamos revisar estos términos periódicamente.</p>

      <h2>8. Contacto</h2>
      <p>Si tienes alguna pregunta o comentario sobre estos términos y condiciones, no dudes en contactarnos a través de <a href="mailto:pasttine.contact@gmail.com">pasttine.contact@gmail.com</a> o nuestro <NavLink to="/contacto">formulario de contacto</NavLink>.</p>

      <p>Gracias por elegir PASTTINE como tu destino para productos de hostelería. Esperamos que tengas una experiencia satisfactoria en nuestro sitio web.</p>
    </div>
  )
}
