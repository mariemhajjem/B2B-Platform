import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
	Layout,
	Button,
	Typography,
	Card,
	Form,
	Input,
} from "antd";
import { login } from "../../redux/actions/auth";
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PersonalInfo from './PersonalInfo';
import CompanyInfo from './CompanyInfo';
import SignUpSteps from './SignUpSteps';

const { Title } = Typography;
const { Content } = Layout;
const CLIENT_ID = "1013516985437-sae0vamkj8cgmj92mhvd69mop1fosiha.apps.googleusercontent.com";

export default function SignUp() {
	const [errMsg, setErrMsg] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

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
		console.log(window.google)
		/* global google */
		const google = window.google;
		google.accounts.id.initialize({
			client_id: CLIENT_ID,
			callback: handleCallbackResponse
		});
		google.accounts.id.renderButton(
			document.getElementById("signIn"),
			{
				theme: "outline", size: "large",
				'onsuccess': onSuccess,
				'onfailure': onFailure
			});

		google.accounts.id.prompt();
	}, []);
	// If we have no user: sign in button
	// if we have a user: show the log out button




	const onFinish = async (values) => {
		const user = {
			cin: values.cin,
			firstname: values.firstname,
			lastname: values.lastname,
			email: values.email,
			birthday: values.birthday,
		};
		try {
			dispatch(login(user))
			navigate('/')
		} catch (err) {
			if (!err?.originalStatus) {
				// isLoading: true until timeout occurs
				setErrMsg('No Server Response');
			} else if (err.originalStatus === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.originalStatus === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			// errRef.current.focus();
		}
	}

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
 
		const [data, setData] = useState({});
		const [step, setStep] = useState(1);
  
		const handleNextStep = useCallback(
			(data) => {
				setData(data);
				setStep(step + 1);
			},
			[step]
		);
  
		const handlePrevStep = useCallback(
			(data) => {
				setData(data);
				setStep(step - 1);
			},
			[step]
		);
  
		const handleSubmit = useCallback((data) => {
			setData(data);
			console.log("Data", data);
		}, []);  

	return (
		<>

			<div className="layout-default ant-layout layout-sign-up">

				<Content className="p-0">
					<div className="sign-up-header">
						<div className="content">
							<Title>Sign Up</Title>
						</div>
					</div>

					<Card
						className="card-signup header-solid h-full ant-card pt-0"
						title={<h5>Register With</h5>}
						bordered="false"
					>

						<div className="sign-up-gateways">
							<div id='signIn'></div>
							{/* <Button type="false">
                <img src={logo3} alt="logo 3" />
              </Button> */}
						</div>
						<p className="text-center my-25 font-semibold text-muted">Or</p>
						<SignUpSteps />
 
					</Card>
				</Content>
			</div>
		</>
	);
}
