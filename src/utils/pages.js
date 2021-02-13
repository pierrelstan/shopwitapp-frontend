export default function pages(items) {
  return (items.length / 9 + 1) % 2 === 0
    ? Math.round(items.length / 9 + 1)
    : Math.floor(items.length / 9 + 1);
}
