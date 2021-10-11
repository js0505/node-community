import React, { useEffect, useState } from "react"
import QueryString from "qs"
import { useLocation } from "react-router"
import { useParams, useHistory } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"
import { useDispatch, useSelector } from "react-redux"
import { deleteBoard, getDetail } from "../../../../_actions/board_action"
import { addScrap } from "../../../../_actions/scrap_action"
import { Button, message, Popconfirm } from "antd"
import Loader from "../../../modules/Loader"
import Moment from "react-moment"
import styled from "styled-components"
import "react-quill/dist/quill.snow.css"

const Container = styled.div`
	width: 80%;
	margin: 0 auto;
`

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

const Title = styled.div`
	margin-left: 10%;
	font-size: 1.5rem;
	margin-bottom: 10px;
`
const Writer = styled.div`
	margin-right: 5%;
	opacity: 0.5;
	display: flex;
	flex-direction: column;
`

const WriterSpan = styled.span`
	margin-bottom: 5px;
`

const Description = styled.div`
	margin-left: 10%;
`
const SButton = styled(Button)`
	margin-right: 10px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: right;
`
const BoardDetail = () => {
	const user = useSelector((state) => state.user.userData)
	const [detailItem, setDetailItem] = useState({})
	const [loading, setLoading] = useState(null)
	const { id } = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	const location = useLocation()
	const query = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	})

	useEffect(() => {
		setLoading(true)
		dispatch(getDetail(id)).then((res) => {
			setDetailItem(res.payload.result)
		})
		setLoading(false)
	}, [dispatch, id])

	const onDeleteBoardHandler = async () => {
		await dispatch(deleteBoard(id))
			.then(() => {
				message.success("삭제 되었습니다.")
				history.push(`/board?bindex=${query.bindex}`)
			})
			.catch((e) => console.log(e))
	}
	const onScrapHandler = async () => {
		const body = {
			user: user._id,
			post: id,
		}
		await dispatch(addScrap(body)).then((res) => {
			if (!res.payload.success) {
				message.warning(res.payload.message)
				return
			} else {
				message.success("스크랩 성공")
			}
		})
	}
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				detailItem.writer && (
					<>
						<Container>
							<Header>
								<Title>
									<p>{detailItem.title}</p>
								</Title>
								<Writer>
									<WriterSpan>작성자 : {detailItem.writer.name}</WriterSpan>
									<WriterSpan>
										작성일자 :{" "}
										<Moment format={"YY-MM-DD"}>
											{detailItem.writer.createdAt}
										</Moment>
									</WriterSpan>
								</Writer>
							</Header>
							<hr style={{ opacity: "0.4" }} />
							<br />
							<ButtonContainer>
								{detailItem.writer._id !== user?._id ? (
									<>
										<SButton onClick={onScrapHandler}>스크랩</SButton>
									</>
								) : (
									<>
										<SButton href={`/board/update/${id}`}>수정</SButton>
										<SButton>
											<Popconfirm
												title={"삭제 하시겠습니까?"}
												onConfirm={onDeleteBoardHandler}
											>
												삭제
											</Popconfirm>
										</SButton>
									</>
								)}
							</ButtonContainer>
							<Description className="ql-editor">
								{ReactHtmlParser(detailItem.description)}
							</Description>
						</Container>
					</>
				)
			)}
		</>
	)
}

export default BoardDetail
