import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import logo from "../../../../assets/images/mainLogo.png";
import { AuthService } from "../../../../services/auth.service";
import { AuthForgetPassword } from "../../../../utilities/interface/auth.interface";
import "../auth.scss";

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");

    const onFinish = async (values: AuthForgetPassword) => {
        setLoading(true);
        setEmail(values.email);
        try {
            const { data } = await AuthService.forgetPassword(values);
            if (data) {
                setSuccess(true);
                message.success("Password reset link has been sent to your email.");
            }
        } catch (error) {
            console.error("Forget Password error: ", error);
            message.error("Failed to send password reset link.");
        } finally {
            setLoading(false);
        }
    };

    const sendResendLinkAgain = async () => {
        setLoading(true);

        try {
            const { data } = await AuthService.resendLink({ email });
            if (data) {
                message.success("Password reset link has been sent to your email.");
            }
        } catch (error) {
            console.error("Resend Link error: ", error);
            message.error("Failed to send password reset link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-screen d-flex justify-content-center align-items-center">
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="light auth-screen__wrapper d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} className="auth-logo" alt="logo" />
                    {success ? (
                        <div className="auth-success-message">
                            <p>Password reset link has been sent to your email.</p>
                            

                            <Form.Item className="text-center">
                                <Button
                                    type="primary"
                                    onClick={sendResendLinkAgain}
                                    className="auth-form-button w-100"
                                    loading={loading}
                                >
                                    Send Again
                                </Button>
                            </Form.Item>
                        </div>
                    ) : (
                        <Form
                            name="normal_login"
                            className="auth-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please input your Email Address!" },
                                    { type: "email", message: "Please enter a valid Email Address" }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item className="text-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="auth-form-button w-100"
                                    loading={loading}
                                >
                                    Request Password Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ForgetPassword;
