import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	Layout,
	Typography,
	Card, 
} from "antd"; 
import jwt_decode from 'jwt-decode'; 
import SignUpSteps from './SignUpSteps';

const { Title } = Typography;
const { Content } = Layout;
const CLIENT_ID = "1013516985437-sae0vamkj8cgmj92mhvd69mop1fosiha.apps.googleusercontent.com";

export default function SignUp() {
	const [errMsg, setErrMsg] = useState('') 
	const { role } = useParams()
	function handleCallbackResponse(response) {
		console.log(response.credential);
		let userObject = jwt_decode(response.credential);
		console.log(userObject);
	}
	function onSuccess(googleUser) {
		console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
	}
	function onFailure(error) {
		console.log(error);
	}
	useEffect(() => {
		console.log(role) 
		/* global google */
		const google = window?.google;
		google?.accounts.id.initialize({
			client_id: CLIENT_ID,
			callback: handleCallbackResponse
		});
		google?.accounts.id.renderButton(
			document.getElementById("signIn"),
			{
				theme: "outline", size: "large",
				'onsuccess': onSuccess,
				'onfailure': onFailure
			});

		google?.accounts.id.prompt();
	}, []);

	return (
		<>

			<div className="layout-default ant-layout layout-sign-up">

				<Content className="p-0">
					<div className="sign-up-header">
						<div className="content">
							<Title>S'enregistrer</Title>
						</div>
					</div>
					<Card
						className="card-signup header-solid h-full ant-card pt-0"
						bordered="false"
					>
					{/* <Card
						className="card-signup header-solid h-full ant-card pt-0"
						title={<h5>Register With</h5>}
						bordered="false"
					>

						<div className="sign-up-gateways">
							<div id='signIn'></div>
							 <Button type="false">
                <img src={logo3} alt="logo 3" />
              </Button> 
						</div>
						<p className="text-center my-25 font-semibold text-muted">Or</p> */}
						<SignUpSteps role={role} />

					</Card>
				</Content>
			</div>
		</>
	);
}
