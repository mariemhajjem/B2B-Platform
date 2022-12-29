
export default function filterList(products, method) {
	if (method == null) return products;

	else {
		return products.filter(product => {
			/* const sizeArray = product.size.split(" ");
			if(arr.length > 0) {
						if(sizeArray.some(r => arr.indexOf(r) >= 0)) {
								return product;
				} 
			}
			else {
					return products;
			} */
			return product;
		})
	}
}

