import React from "react"
import styled from "styled-components"
import { Divider, List, Typography } from "antd"

const Container = styled.div`
	width: 100%;
`
const SListItem = styled(List.Item)`
	display: flex;
`
const ResentContainer = styled.div`
	width: 30%;
	margin-left: 10%;
`

const ResentTitle = styled(Typography.Text)`
	width: 60%;
	overflow-x: hidden;
`

const LandingPage = ({ recentBoards }) => {
	return (
		<Container>
			<ResentContainer>
				<Divider orientation="left">최근 업로드 게시물</Divider>
				<List
					dataSource={recentBoards}
					renderItem={(item) => (
						<SListItem>
							<Typography.Text mark style={{ marginRight: "8px" }}>
								{item.bindex === 1 ? "1번게시판" : "2번게시판"}
							</Typography.Text>{" "}
							<ResentTitle>
								<a href={`/board/${item._id}?bindex=${item.bindex}`}>
									{item.title.length < 19
										? item.title
										: item.title.slice(0, 19) + " ..."}
								</a>
							</ResentTitle>
							<List.Item.Meta description={item.writer.name} />
						</SListItem>
					)}
				/>
			</ResentContainer>
		</Container>
	)
}

export default LandingPage
