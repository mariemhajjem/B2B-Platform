import { useSelector } from 'react-redux'
import './total.css'

function Total() {

  const {cart} = useSelector((state) => state.persistedReducer)

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart?.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }

  return (
    <div className="total">
      <h2>SOMMAIRE</h2>
      <div>
        <p className="total__p">
          total ({getTotal().totalQuantity} items)
          : Total de la commande <strong>${getTotal().totalPrice}</strong>
        </p>
      </div>
    </div>
  )
}

export default Total