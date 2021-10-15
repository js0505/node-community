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
					name="email"
					rules={[
						{
							required: true,
							message: "이메일을 입력 해주세요.",
						},
					]}
				>
					<SInput
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="이메일"
					/>
				</Form.Item>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "비밀번호를 입력 해주세요.",
						},
					]}
				>
					<SInput
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="비밀번호"
					/>
				</Form.Item>

				<br />
				<SButton htmlType="submit">로그인</SButton>
				<br />
				<p>
					아직 회원이 아니신가요? <a href="/register">회원가입</a>
				</p>
			</SForm>
		</Container>
	)
}

export default LoginPage
