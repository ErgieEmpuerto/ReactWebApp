import React, { useEffect, useState } from 'react';

const App = () => {
  const [page, setPage] = useState('index');
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (page === 'index') {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => setProducts(products));
    } else if (page === 'product') {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => setProduct(product));
    }
  }, [page, productId]);

  const handleProductClick = id => {
    setPage('product');
    setProductId(id);
  };

  const handleGoBack = () => {
    setPage('index');
    setProductId(null);
  };

  return (
    <div>
      {page === 'index' && (
        <div>
          <h1>Product Listing</h1>
          <div id="productList">
            {products.map(product => (
              <div key={product.id}>
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <button onClick={() => handleProductClick(product.id)}>Product Link</button>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}

      {page === 'product' && (
        <div>
          <h1>Product Details</h1>
          {product ? (
            <div>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate}</p>
              <p>Reviews: {product.rating.count}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default App;