import React from "react"
import { useHistory } from "react-router-dom"
import { Menu } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../../../_actions/user_action"
import styled from "styled-components"
const { SubMenu } = Menu

const SMenu = styled(Menu)`
	height: 80px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 5px 5px -1px rgba(0, 0, 0, 0.2);
	margin-bottom: 30px;
`

const LeftMenu = styled.div`
	width: 100%;
	display: flex;
	font-size: 16px;
	margin-left: 20px;
`

const RightMenu = styled.div`
	font-size: 16px;
	margin-right: 20px;
`

const NavBar = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)

	const onLogoutHandler = () => {
		dispatch(logoutUser()).then((res) => {
			if (res.payload.status === 200) {
				history.push("/login")
			} else {
				alert("logout error")
			}
		})
	}

	return (
		<SMenu>
			<LeftMenu>
				<Menu.Item key="home">
					<a href="/">홈</a>
				</Menu.Item>
				<Menu.Item key="board1">
					<a href="/board?bindex=1">1번게시판</a>
				</Menu.Item>
				<Menu.Item key="board2">
					<a href="/board?bindex=2">2번게시판</a>
				</Menu.Item>
			</LeftMenu>

			<RightMenu>
				{user.userData && !user.userData.isAuth ? (
					<div style={{ display: "flex" }}>
						<Menu.Item>
							<a href="/login">Login</a>
						</Menu.Item>
					</div>
				) : (
					<>
						<SubMenu
							key="SubMenu"
							title={user.userData && user.userData.name}
							icon={<UserOutlined />}
						>
							{user.userData && user.userData.isAdmin && (
								<Menu.Item>
									<a href="/admin">관리자 페이지</a>
								</Menu.Item>
							)}
							<Menu.Item>
								<a href={user.userData && `/scrap/${user.userData._id}`}>
									스크랩
								</a>
							</Menu.Item>
							<Menu.Item onClick={onLogoutHandler}>로그아웃</Menu.Item>
						</SubMenu>
					</>
				)}
			</RightMenu>
		</SMenu>
	)
}

export default NavBar
