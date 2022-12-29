import { SearchOutlined } from '@ant-design/icons';
import { Checkbox, Input, List, Space } from 'antd';
import CheckableTag from 'antd/es/tag/CheckableTag';
import { Link } from 'react-router-dom';

const Filters = ({ selectedSizes, setSize, onChange, handleChange, selectedTags, inputHandler }) => {
    const availabilities = ["En Stock", "Pré-commande", "En arrivage", "Epuisé", "Disponibilité limitée", "En rupture de stock"];
    const sizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

    return (
        <div className="sizes">
            <Link to="/"><h2>Accueil</h2></Link>
            <Input
                className="header-search"
                placeholder="recherche..."
                prefix={<SearchOutlined />}
                onChange={inputHandler}
            />
            <h2>Filtres</h2>
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
            <h3>Les marques</h3>
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
