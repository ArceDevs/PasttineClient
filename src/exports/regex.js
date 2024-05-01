const regex = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  phone: /^[0-9]{9}$/,
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  fullname: /^([A-Z][a-z]+(\s|$))+[A-Z][a-z]*$|^[A-Z][a-z]*$/,
  address: /^[a-zA-ZÀ-ÿ0-9\s]{1,100}$/,
  postalCode: /^[0-9]{5}$/,
  city: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  country: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  cardNumber: /^[0-9]{16}$/,
  cardName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  cardExpiration: /^[0-9]{4}$/,
  cardCvv: /^[0-9]{3}$/,
  creditCard: /^[0-9]{16}$/,
  cp: /^[0-9]{5}$/,
  dateCard: /^(0[1-9]|1[0-2])\/(2[3-9]|30)$/,
  province: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s-]+$/,
  birthDate: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/
}
export default regex