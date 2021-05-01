const formatter = Intl.NumberFormat('fr-fr', {
  style: 'currency',
  currency: 'EUR',
})

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
