import Filter from '../../ui/Filter';

const options = [
  { value: 'all', label: 'All' },
  { value: 'sweater', label: 'Sweater' },
  { value: 'pant', label: 'Pant' },
  { value: 'shoe', label: 'Shoe' },
  { value: 'bag', label: 'Bag' },
  { value: 'hat', label: 'Hat' },
  { value: 'shirt', label: 'Shirt' },
];

function ProductOperations() {
  return (
    <div className="productCategories__menu">
      <Filter filterField="category" options={options} />
    </div>
  );
}

export default ProductOperations;
