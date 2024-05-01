export function calcPrice(precios, offers) {
  if (precios.Precio === undefined || parseFloat(precios.Precio) === 0) return 0
  let base = parseFloat(precios.Precio)
  let total = base + base * (parseFloat(precios.IVA) / 100)

  if (precios.Raciones !== undefined && precios.Raciones !== null && precios.Raciones !== 0) {
    let precioRaciones = total * (parseFloat(precios.Raciones) / 100)
    total = (total / 8) + precioRaciones
  }

  if (offers !== null) {
    let totalDiscount = calcDiscount(total, offers)
    if (totalDiscount !== 0) total -= totalDiscount
  }

  return total 
}

export function calcDiscount(total, offers) {
  let totalDiscount = 0

  if (offers !== undefined && offers.length > 0) {
    if (typeof offers === 'string') offers = JSON.parse(offers)
    let discounts = []
    for (let i = 0; i < offers.length; i++) {
      if (offers[i].Tipo === '%') discounts.push(total * (parseFloat(offers[i].Descuento) / 100))
      else discounts.push(parseFloat(offers[i].Descuento))
    }
    return totalDiscount = discounts.reduce((a, b) => a + b, 0)
  }
  return 0
}