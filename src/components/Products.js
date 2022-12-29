import React, {useState} from 'react';

import CardList from './CardList';

const Products = ({products, sortProducts}) =>  {

    const [value, setValue] = useState('Select');

    const setList = (e) => {
        setValue(e.target.value);
        sortProducts(e.target.value);
    }
    
    return (
        <div className="products">

            <div className="products-nav">
                <h3>Products</h3>
                <div className="sort-list">
                    Sort by&nbsp;: &nbsp;
                    <select value={value} onChange={setList}>
                        <option value="Select">Select</option>
                        <option value="Highest to Lowest">Prix décroissant</option>
                        <option value="Lowest to Highest">Prix croissant</option>
                    </select>
                </div>
            </div>

            <CardList products={products} />
            
        </div>
    )
}

export default Products;
