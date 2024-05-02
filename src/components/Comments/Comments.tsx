import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate } from "src/utils/formatDate";
import { Avatar } from "../Avatar";
import { Comment } from "../Comment/Comment";
import { Author, CommentEntity, CommentWithAuthor } from "./types";
import { HeartIcon } from "../HeartIcon";

const Header = styled.div`
  display: flex;
  margin-top: 52px;
  justify-content: space-between; 
  width: 100%

  justify-content: flex-start;
  align-items: flex-start;

  border-bottom: 0.2px solid rgb(118, 118, 118);
`;


const ImageWrapper = styled.div`
// cursor: pointer;
display: flex;

  /* Add styles for image wrapper here */
`;

const СountComments = styled.div`
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
`;

const CountLikes = styled.div`
  margin-left: 10px;
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 15px;
  font-weight: 700;
`;


const CommentsList = styled.div`
  > * {
    margin-top: 32px;
  }
`;

const PageButton = styled.button`
  cursor: pointer;
  width: 234px;
  height: 36px;

  margin: 60px auto 64px auto;
  border-radius: 4px;
  backdrop-filter: blur(27px);
  background: rgb(49, 52, 57);
`;

const Text = styled.div`
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;

const fetchAuthors = async () => {
  const response = await axios.get("/api/authors");
  return response.data;
};

const fetchComments = async (page: number) => {
  const response = await axios.get("/api/comments", { params: { page } });
  return response.data.data;
};

const transformComments = (
  comments: CommentEntity[],
  authors: Author[]
): CommentWithAuthor[] => {
  return comments.map(comment => {
    const author = authors.find(author => author.id === comment.author) || {
      id: 0,
      name: "",
      avatar: ""
    };
    return {
      ...comment,
      author,
      child_comments: []
    };
  });
};

export const Comments = () => {
  const [isHeartActive, setIsHeartActive] = useState(false); // Состояние для отслеживания активации сердца

  const handleHeartClick = () => {

    setIsHeartActive(!isHeartActive);
  };

  const [currentPage, setCurrentPage] = useState(1); // Define currentPage here
  const { data: authors } = useQuery<Author[]>("authors", fetchAuthors);
  const { data: comments, isLoading, isError } = useQuery<CommentEntity[]>(
    ["comments", currentPage],
    () => fetchComments(currentPage),
    {
      staleTime: Infinity
    }
  );

  const totalPages = 1; // Just an example, replace it with your logic

  const transformedComments = useMemo(() => transformComments(comments || [], authors || []), [comments, authors]);

  const totalComments = 150;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header>
        <СountComments>
          {totalComments && <span>{totalComments} комментариев</span>}
        </СountComments>
        <ImageWrapper onClick={handleHeartClick}>
          <HeartIcon
            isActive={isHeartActive}
            onClick={handleHeartClick}
            borderColorActive="grey"
            borderColorNoActive="grey"
            fillActive="none"
            fillNoActive="none" />
          <CountLikes>
            {8632}
          </CountLikes>
        </ImageWrapper>
      </Header>

      <CommentsList>
        {transformedComments.map((comment: CommentWithAuthor) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </CommentsList>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <PageButton key={page} onClick={() => handlePageChange(page)}>
              <Text>
                {'Загрузить ещё'}
              </Text>
            </PageButton>
          )
        )}
      </div>
    </>
  );
};
