import React, { useState, useEffect } from 'react';

import './Produits.css';
import Filters from '../../components/Filters';
import Products from '../../components/Products';
import filterList from '../../components/filterList'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProduits, getProduitsByCategory } from '../../redux/reducers/produits';
import Navbar from './Navbar';

export default function Produits() {
	const [products, setProducts] = useState([]);
	const [brand, setBrand] = useState(new Map())
	const [selectedSizes, setSelectedSizes] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);
	const { allProduits, loading } = useSelector((state) => state.produits);
	const [input, setInput] = useState('');
	const { category_id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProduits());
	}, [])

	useEffect(() => {
		let timer
		if (selectedTags.length === 0 && !input)
			setProducts((_) => { return allProduits?.filter(prod => prod.category_id?._id === category_id) })
		else if (selectedTags.length && input) {
			setProducts((_) => {
				return allProduits?.filter(prod => prod.category_id?._id === category_id)
					.filter((produit) => selectedTags.includes(produit.product_availability) && produit.product_label.toLowerCase().includes(input))
			})
		} else if (input){
			setProducts((_) => {
				return allProduits?.filter(prod => prod.category_id?._id === category_id)
					.filter((produit) => produit.product_label.toLowerCase().includes(input))
			})
			/* timer = setTimeout(() => {
				setProducts((_) => {
					return products.filter((produit) => produit.product_label.toLowerCase().includes(input))
				})
			}, 1000); */
		} else if (selectedTags.length) {
			setProducts((_) => {
				return allProduits?.filter(prod => prod.category_id?._id === category_id)
					.filter((produit) => selectedTags.includes(produit.product_availability))
			})
		}

		// Clear the timer before setting a new one
		return () => {
			clearTimeout(timer);
		};
	}, [category_id,loading, selectedTags, input])

	const inputHandler = e => setInput(e.target.value.toLowerCase());
	const handleChange = (tag, checked) => {
		const nextSelectedTags = checked
			? [...selectedTags, tag]
			: selectedTags.filter((t) => t !== tag);
		console.log('You are interested in: ', nextSelectedTags);
		setSelectedTags(nextSelectedTags);
	};

	const setSize = (size) => {
		const sizes = [...selectedSizes];

		if (sizes.includes(size)) {
			const index = sizes.indexOf(size);
			sizes.splice(index, 1);
		}
		else {
			sizes.push(size);
		}
		setSelectedSizes(sizes);
		setProducts(filterList(sizes, 'size'));
	}

	const onChange = (checkedValue, index) => {
		const arr = []
		if (checkedValue.length < 1) brand.delete(index)
		else brand.set(index, checkedValue[0]);
		setBrand(brand)
		// map.clear() 
		const mapIter = brand.values();
		for (let i = 0; i < brand.size; i++) {
			arr.push(mapIter.next().value);
		}
		if (arr.length)
			setProducts((_) => {
				return products.filter((produit) => arr.includes(produit.product_availability))
			})
	};

	const sortProducts = (method) => {
		const array = products;

		if (method === "Lowest to Highest") {
			array.sort(function (a, b) {
				return a.product_price - b.product_price
			})
		}
		else if (method === "Highest to Lowest") {
			array.sort(function (a, b) {
				return b.product_price - a.product_price
			})
		}
		setProducts(array);
	}

	return (
		<>
		<Navbar />
			<div className="App">
				<Filters inputHandler={inputHandler} selectedSizes={selectedSizes} setSize={setSize} selectedTags={selectedTags} handleChange={handleChange} />
				<Products products={products} sortProducts={sortProducts} />
			</div>
		</>
	)
}