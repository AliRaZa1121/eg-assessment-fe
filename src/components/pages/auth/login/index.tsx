import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/mainLogo.png";
import { AuthLogin } from "../../../../utilities/interface/auth.interface";
import { AuthService } from '../../../../services/auth.service';
import { RoutePaths } from "../../../../utilities/constant/appRoutes";
import "../auth.scss";
import { access } from "fs";
import { LOCAL_STORAGE_KEYS } from "../../../../utilities/constant/localStorageKeys";

const Login = () => {
    const [loginLoader, setLoginLoader] = useState(false);

    const onFinish = async (values: AuthLogin) => {
        console.log("Received values of form: ", values);
        setLoginLoader(true); 
        try {
            const { data } = await AuthService.login(values);
            if (data) {
                console.log("data", data);
                console.log("data.data", data?.data);

                const authToken = {
                    accessToken: data?.data?.accessToken,
                    refreshToken: data?.data?.refreshToken,
                };

                const user = data?.data?.user;

                localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
                localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, JSON.stringify(authToken));
                window.location.href = RoutePaths.Dashboard.INDEX;
            }
        } catch (error) {
            console.error("Login error: ", error);
        } finally {
            setLoginLoader(false); 
        }
    };

    console.log("loginLoader", loginLoader);
    return (
        <section className="auth-screen d-flex justify-content-center align-items-center">
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="light auth-screen__wrapper d-flex flex-column justify-content-center align-items-center">
                    <img src={logo} className="auth-logo" alt="logo" />
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
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="d-flex justify-content-end">
                                <Link to={RoutePaths.Auth.FORGOT_EMAIL} className="auth-form-forgot">
                                    Forgot password
                                </Link>
                            </div>
                        </Form.Item>
                        <Form.Item className="text-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="auth-form-button w-100"
                                loading={loginLoader}
                            >
                                Log in
                            </Button>
                        </Form.Item>

                        <Form.Item className="text-center">
                            <Link to={RoutePaths.Auth.SIGN_UP} className="auth-form-forgot">
                                Register Now
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Login;
