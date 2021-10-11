import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { message, Form, Button, Input, PageHeader } from "antd"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../_actions/user_action"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`

const SForm = styled(Form)`
	display: flex;
	flex-direction: column;
	width: 20%;
`

const SInput = styled(Input)`
	width: 100%;
	height: 3rem;
	border-radius: 10px;
`

const SButton = styled(Button)`
	width: 100%;
	height: 3rem;
	border-radius: 10px;
`

const LoginPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const onSubmitHandler = () => {
		let body = {
			email,
			password,
		}
		dispatch(loginUser(body)).then((res) => {
			if (!res.payload.loginSuccess) {
				message.warning(res.payload.message)
			} else {
				history.push("/")
			}
		})
	}
	return (
		<Container>
			<PageHeader title={"로그인"} />
			<SForm layout="vertical" onFinish={onSubmitHandler}>
				<Form.Item
					label="이메일"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}
				>
					<SInput
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					/>
				</Form.Item>

				<Form.Item
					label="비밀번호"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<SInput
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>

				<br />
				<SButton htmlType="submit">Login</SButton>
				<br />
				<p>
					아직 회원이 아니신가요? <a href="/register">회원가입</a>
				</p>
			</SForm>
		</Container>
	)
}

export default LoginPage
