const formatPrice = (precio) => {
  return Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
  }).format(precio);
}

export default formatPrice;
