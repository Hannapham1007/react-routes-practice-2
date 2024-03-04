import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditProductPage(props) {
  const [productToUpdate, setProductToUpdate] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const matchingProduct = props.products.find(
      (product) => Number(product.id) === Number(id)
    );
    setProductToUpdate(matchingProduct);
  }, [id]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setProductToUpdate({ ...productToUpdate, [name]: value });
  }
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const updatedProducts = props.products.map(product => {
      if (Number(product.id) === Number(id)) {
        return { ...product, ...productToUpdate }; 
      }
      return product; 
    });
  
    props.setProducts(updatedProducts);
  
    console.log('Product updated:', updatedProducts);
  }
  

  if (!productToUpdate) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleChange}
        value={productToUpdate.name}
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditProductPage;
