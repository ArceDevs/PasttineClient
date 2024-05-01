import React, { useState, useEffect } from 'react'
import { useProductIngredients } from '../controller/products.controller';
import '../styles/components/detailsTable.css'


export default function DetailsTable({ id }) {
  const { loading, error, ingredients } = useProductIngredients(id)
  const [tableData, setTableData] = useState('')

  useEffect(() => { 
    if (loading) return setTableData(<div className='loader reverse' aria-label="Los productos estan cargando"></div>)
    if (error) return setTableData(<div className='error-cards' aria-label="Fallo la carga de los productos">{error}</div>)
    if (ingredients && ingredients.length > 0) {
      setTableData(
        <div className={`container-details-table`} >
          <table className='details-table'>
          <thead>
            <tr>
              <th></th>
              <th>Grasas Vegetales</th>
              <th>Grasas Saturadas</th>
              <th>Azúcares</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.Id}>
                <td>{ingredient.Nombre}</td>
                <td>{ingredient.GrasasVegetales}</td>
                <td>{ingredient.GrasasSaturadas}</td>
                <td>{ingredient.Azucares}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>)
    }
  }, [loading, error, ingredients])

  return tableData
}