import { Space } from 'antd';
import React, { Fragment } from 'react';
import Produit from '../pages/Home/Produit';

const CardList = ({products}) => {

    return (
        <Fragment>
            {
                <div>
                    <span className="products-length">{products.length} Produit(s) trouvés.</span>
                    <div className="card-list">
                        {
                            products.length === 0 ? <p className="text-center">Désolé, aucun produit trouvé dans cette catégories</p> :
                            products.map((item,key) => {
                                return (
                                    <Space key={key}> <Produit key={key} produit={item} /> </Space>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default CardList
