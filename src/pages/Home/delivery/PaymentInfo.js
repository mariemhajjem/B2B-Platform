import React, { useState } from 'react';
import {
	Button,
	Form,
	Input,
	notification
} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCommande } from '../../../redux/reducers/commande';
import { clearCart } from '../../../redux/reducers/cartSlice';
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

export const PaymentInfo = ({
	formData,
	setFormData,
	setOrder,
	prev
}) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const user = useSelector((state) => state.auth.loggedUser);
	const { cart } = useSelector((state) => state.persistedReducer);
	const [err, setError] = useState("");
	const [code, setCode] = useState("");

	const onSubmit = (values) => {
		setFormData({
			...formData
		});
		console.log(values);
		try {

			let commande = {
				commande_address: [
					{
						address: formData.company_address,
						code_postal: formData.code_postal
					}
				],
				commande_summary: [],
				id: user.entrepriseClt?._id || user.entrepriseImport?._id
			}
			if(cart.length) {
				cart.map((prod) => commande.commande_summary.push({
					produit: prod._id,
					quantity: prod.quantity,
					price: prod.product_price,
					idFournisseur: prod.entrepriseImport
				}))
				console.log("cart: ", cart)
				dispatch(createCommande(commande))
				dispatch(clearCart()) 
			}
			setOrder()
			// navigate('/')

		} catch (error) {
			console.log(error)
		}
	}
	const clearError = () => {
	};
	const popUp = (type) => {
		notification[type]({
			message: code,
			description: err,
			onClose: clearError,
		});
	};
	return (<>
		<Form
			{...formItemLayout}
			form={form}
			name="payment"
			onFinish={onSubmit}
			initialValues={formData}
			scrollToFirstError
		>
			<p className="parag">
				{err && popUp("error")}
			</p>

			<Form.Item
				name="company_address"
				label="Siège social détaillée"
			>
				<Input onChange={(e) => setFormData({ ...formData, company_residence: e.target.value })} />
			</Form.Item>

			<div className="steps-action">
				<Form.Item {...tailFormItemLayout}>

					<Button
						style={{
							margin: '0 24px',
						}}
						onClick={() => prev()}
					>
						Précédent
					</Button>
					<Button type="primary" htmlType="submit">
						Valider commande
					</Button>
				</Form.Item>

			</div>
		</Form>
	</>
	);
};