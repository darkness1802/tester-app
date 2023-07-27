import { useNavigate } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import axios from "axios"
import { useEffect } from "react"
import { Auth } from "../types/auth.types"
import { useAuth } from "../contexts/Auth"

export default function SignIn() {

    const nav = useNavigate()
    const [form] = Form.useForm()
    const { setAuth } = useAuth()

    useEffect(() => {
        form.setFieldsValue({
            phone: '0972289587',
            password: '123456ab'
        })
    }, [])

    const handleSignin = async (values: any) => {

        console.log(values)

        let res = await axios
            .post("https://test.tracnghiem.bfd.vn/v1/auth/login", values)
        let data = res.data as Auth

        setAuth && setAuth(data)

        nav("/tester")
    }

    return <div className="page">
        <Form form={form} onFinish={handleSignin} className="p-10 bg-green-600 rounded-lg">

            <Form.Item name={"phone"}>
                <Input prefix={<UserOutlined />} placeholder="Enter Your Phone Number"/>
            </Form.Item>
            <Form.Item name={"password"}>
                <Input type="password" prefix={<LockOutlined />} placeholder="Enter Your Password"/>
            </Form.Item>

            <Button htmlType="submit" style={{width:'100%'}}>Đăng Nhập</Button>
        </Form>
    </div>
}