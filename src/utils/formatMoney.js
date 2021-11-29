export default function formatMoney(amount) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  // const formatter = new Intl.NumberFormat('en-US', options);
  return (amount * 100) / 100;

  // formatter.format(amount / 100);
}
