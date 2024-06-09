import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const items = [
  {
    id: 1,
    title: "Test Item",
    price: 6,
    description: "A test item for demonstration purposes.",
  },
  {
    id: 2,
    title: "Item 1",
    price: 10,
    description: "A high-quality item with a fair price.",
  },
  {
    id: 3,
    title: "Item 2",
    price: 15,
    description: "A premium item with excellent features.",
  },
  {
    id: 4,
    title: "Item 3",
    price: 5,
    description: "An affordable item with good value.",
  },
  {
    id: 5,
    title: "Item 4",
    price: 10,
    description: "A reliable item at a reasonable price.",
  },
  {
    id: 6,
    title: "Item 5",
    price: 25,
    description: "A luxurious item with top-notch quality.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
