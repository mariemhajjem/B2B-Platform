import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { Divider, Input, Space } from "antd";

const footerS = {
	background: "rgb(248, 248, 248)",
	margin: "20px",
	pading: "20px",
};
// const changeLanguage = (ln) => {
//   return () => {
//     i18n.changeLanguage(ln);
//   };
// };
function Footer() {
	const { t } = useTranslation();
	return (<>
		<Space id="Contact" size={120} align="center" wrap split={<Divider type="vertical" />}
			style={{ display: "flex", justifyContent: "center" }}>
			<div >
				<div>
					<div >
						<h4>information</h4>
					</div>
					<div>
						<ul style={{ listStyleType: "none", color: "#a09e9c", marginLeft: "-2em" }}>
							<li><a href="#" style={{ color: "#a09e9c" }}>about us</a></li>
							<li><a href="#" style={{ color: "#a09e9c" }}>contact us</a></li>
							<li><a href="#" style={{ color: "#a09e9c" }}>store</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div>
				<div>
					<div>
						<h4>mon compte</h4>
					</div>
					<div>
						<ul style={{ listStyleType: "none", color: "#a09e9c", marginLeft: "-2em" }}>
							<li ><a href="#" style={{ color: "#a09e9c" }}>profile</a></li>
							<li><a href="#" style={{ color: "#a09e9c" }} >wishlist</a></li>
							<li><a href="#" style={{ color: "#a09e9c" }}>historique de commandes</a></li>
							<li><a href="#" style={{ color: "#a09e9c" }}>ma carte</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div>
				<div>
					<div>
						<h4>newsletter</h4>
					</div>
					<div>
						<p>
							ABONNEZ-VOUS À NOTRE NEWSLETTER.
						</p>
					</div>
					<div>
						<div>
							<Input type="text" className="form-control" placeholder="Votre adresse Email...." onPressEnter={() => { }} />
						</div>
					</div>
				</div>
			</div>
		</Space>
		<footer id="footer" className="footer">
			<div className="container">
				<div className="hm-footer-copyright text-center">
					<div className="footer-social">
						<a href="#"><i className="fa fa-facebook"></i></a>
						<a href="#"><i className="fa fa-instagram"></i></a>
						<a href="#"><i className="fa fa-linkedin"></i></a>
						<a href="#"><i className="fa fa-pinterest"></i></a>
					</div>
					<p>
						2022 &copy;copyright. designed and developed by Mariem Hajjem
					</p>
				</div>
			</div>
			<div id="scroll-Top">
				<div className="return-to-top">
					<i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
				</div>

			</div>

		</footer> </>
	);
}
export default Footer;
