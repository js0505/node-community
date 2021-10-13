import React, { useState } from "react"
import { Button, Form, Input, PageHeader, message } from "antd"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../_actions/user_action"

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
const RegisterPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const onSubmitHandler = () => {
		if (password !== confirmPassword) {
			alert("Password mismatch")
			return
		} else {
			let body = {
				name,
				email,
				password,
			}
			dispatch(registerUser(body)).then((res) => {
				if (res.payload.err) {
					switch (res.payload.err.code) {
						case 11000:
							return message.error("해당 이메일이 이미 존재합니다.")
						default:
							return
					}
				}

				if (res.payload.success) {
					history.push("/login")
				}
			})
		}
	}

	return (
		<Container>
			<PageHeader title={"회원가입"} />
			<SForm layout="vertical" onFinish={onSubmitHandler}>
				<Form.Item
					label="이름"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<SInput
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Username"
					/>
				</Form.Item>
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

				<Form.Item
					label="비밀번호 확인"
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<SInput
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder="Confirm Password"
					/>
				</Form.Item>
				<br />
				<SButton htmlType="submit">Register</SButton>
			</SForm>
		</Container>
	)
}

export default RegisterPage
