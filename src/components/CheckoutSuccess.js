import React  from 'react'
// import '../styles/components/checkoutSuccess.css'

export default function CheckoutSuccess({ ticket, formData, user }) {
  console.log(ticket, formData, user)
  const { Factura, Detalles } = ticket
  return (
    <div className='container-success'>
      <div className='user-data'>
        <h2>Datos de facturación</h2>
        <div className='user-info'>
          <div className='user-name'>Pedido emitido por Admin</div>
          <div className='user-email'>pasttine.contact@gmail.com</div>
          <div className='user-phone'>{user.Telefono}</div>
        </div>
      </div>
      <div className='ticket-data'>
        <h2>Factura</h2>
        <div className='ticket-info'>
          <div className='ticket-number'>#{Factura.Id+ Date.now()}</div>
          <div className='ticket-date'>{Factura.Fecha}</div>
        </div>
      </div>
      <div className='ticket-details'>
        <h2>Detalles</h2>
        <div className='ticket-details-info'>
          {Detalles.map((detail, index) => (
            <div className='ticket-detail' key={index}>
              <div className='ticket-detail-name'>{detail.Nombre}</div>
              <div className='ticket-detail-price'>${detail.PrecioFactura}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Datos de usuario
// {
//   "Id": 4,
//   "Auth": "eyJhbGciOiJIUzI1NiJ9.cGFzdHRpbmUuY29udGFjdEBnbWFpbC5jb20.jh0JQ_P3SzTXT5ZulUO8qc-iU-enAbCAfnseCmEqwBw",
//   "Email": "pasttine.contact@gmail.com",
//   "Nombre": "Alonso ",
//   "Apellido": "Arce",
//   "Username": "Admin",
//   "Telefono": "656863784",
//   "FechaNac": "10/10/2000",
//   "PFP": "media/images/users/4-99_small.jpg"
// }

//Datos de facturacion
// {
//   "address": "Calle Garcia de Parede, 29, 1A",
//   "address2": "Second",
//   "province": "Madrid",
//   "phone": "123456789",
//   "cp": "28010",
//   "userId": 4,
//   "remember": true
// }

// {
//   "Factura": {
//       "Id": 27,
//       "UsuarioAux": 4,
//       "Precio": 10.032,
//       "Promocion": 0,
//       "FechaCompra": null,
//       "Anulado": false,
//       "Estado": "Pagado",
//       "FechaCreacion": "2023-12-13T14:29:08.156Z"
//   },
//   "Detalles": [
//       {
//           "IdFactura": 2,
//           "ProductoAux": 16,
//           "Cantidad": 1,
//           "PrecioFactura": 5.13,
//           "FacturaAux": 27,
//           "RacionComprada": 0,
//           "SaborComprado": null,
//           "Id": 16,
//           "Nombre": "Helado de pistacho",
//           "Precio": 4.5,
//           "IVA": 14,
//           "Signo": "€/ud",
//           "Peso": "0",
//           "Raciones": 0,
//           "Sabores": null,
//           "Stock": 75,
//           "Rating": 3,
//           "Favorito": false,
//           "Img": "{\"Small\":\"media/images/products/small/18_small.jpg\",\"Medium\":\"media/images/products/medium/18_medium.jpg\",\"Big\":\"media/images/products/big/18_big.jpg\"}",
//           "Descripcion": "Helado de pistacho con trozos de pistachos.",
//           "CategoriaAux": 7,
//           "Eliminado": false,
//           "FechaCreacion": "2023-12-13T13:56:05.623Z"
//       },
//       {
//           "IdFactura": 3,
//           "ProductoAux": 12,
//           "Cantidad": 1,
//           "PrecioFactura": 4.902,
//           "FacturaAux": 27,
//           "RacionComprada": 0,
//           "SaborComprado": null,
//           "Id": 12,
//           "Nombre": "Helado de menta",
//           "Precio": 4.3,
//           "IVA": 14,
//           "Signo": "€/ud",
//           "Peso": "0",
//           "Raciones": 0,
//           "Sabores": null,
//           "Stock": 120,
//           "Rating": 3,
//           "Favorito": false,
//           "Img": "{\"Small\":\"media/images/products/small/14_small.jpg\",\"Medium\":\"media/images/products/medium/14_medium.jpg\",\"Big\":\"media/images/products/big/14_big.jpg\"}",
//           "Descripcion": "Helado de menta refrescante con trozos de chocolate.",
//           "CategoriaAux": 7,
//           "Eliminado": false,
//           "FechaCreacion": "2023-12-13T13:56:05.623Z"
//       }
//   ]
// }