import { SearchOutlined } from '@ant-design/icons';
import { Input, List } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Filters = ({ selectedSizes, setSize, onChange, handleChange, selectedTags, inputHandler }) => {
    const availabilities = ["En Stock", "Pré-commande", "En arrivage", "Disponibilité limitée"];
    const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
    const { allProduits } = useSelector((state) => state.produits);
    const [brands, setBrands] = useState([])
    useEffect(() => {
        allProduits.map((prod) => {
            setBrands([...brands, prod.product_brand])
        })
    }, [])
    return (
        <div className="sizes">
            <h2>Filtres</h2>
            <Input
                className="header-search"
                placeholder="recherche..."
                prefix={<SearchOutlined />}
                onChange={inputHandler}
            />
            
            {/* <h3>Sizes</h3>
            <div className="size-list">
                {
                    sizes.map((size, index) => {
                        return (
                            <button
                                className={"size" + (selectedSizes.includes(size) ? " selected-size" : "")}
                                key={index}
                                onClick={() => setSize(size)}
                            >
                                {size}
                            </button>
                        )
                    })
                }
            </div> */}
            <h3>Disponibilité</h3>
            <div className="size-list">
                <List>
                    {availabilities.map((tag, index) => (
                        <List.Item key={index}>
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={(checked) => handleChange(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        </List.Item>
                    ))}</List>
            </div>
        </div>
    )
}

export default Filters;
