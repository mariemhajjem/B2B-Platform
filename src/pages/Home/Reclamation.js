import React from "react";
import { Divider, Form, Space, Input, Button } from "antd";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

function Reclamation() {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = ({ email, reclamation }) => {
        let data = {
            email,
            reclamation,
        }
        /* try {
            dispatch(updateProduit(data));
        } catch (err) {
          console.log(err)
        } */
    };

    return (<>
        <Space id="Contact" size={120} align="center" wrap split={<Divider type="vertical" />}
            style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <div>
                    <div>
                        <h1>Faire une réclamation</h1> 
                        <div>
                            Votre confiance et votre fidélité nous sont précieuses.
                        </div> 
                        <div>
                            Si vous n’êtes pas satisfait,
                            faites-nous part de votre motif de réclamation.
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width : "35em"}}>
                <div>
                    <div>
                        <h4>Formulaire réclamation</h4>
                        <Form
                            name="produit"
                            form={form}
                            onFinish={onFinish}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input placeholder="Votre adresse Email...." />
                            </Form.Item>

                            <Form.Item
                                name="reclamation"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <TextArea placeholder="Votre réclamation...." rows={4} showCount maxLength={100} />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" shape="round"> Envoyer </Button>
                            </Form.Item>

                        </Form>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </Space>
    </>
    );
}
export default Reclamation;
