import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate } from "src/utils/formatDate";
import { Avatar } from "../Avatar";
import { Comment } from "../Comment/Comment";
import { Author, CommentEntity, CommentQueryData, CommentWithAuthor } from "./types";
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

  &:disabled {
    opacity: 0.5; 
    pointer-events: ; 
  }
`;

const Text = styled.div`
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
`;


const transformComments = (
  comments: CommentEntity[],
  authors: Author[]
): CommentWithAuthor[] => {
  const commentMap = new Map<number, CommentWithAuthor>();

  comments.forEach(comment => {
    const author = authors.find(author => author.id === comment.author) || {
      id: 0,
      name: "",
      avatar: ""
    };

    const commentWithAuthor: CommentWithAuthor = {
      ...comment,
      author,
      child_comments: []
    };

    commentMap.set(comment.id, commentWithAuthor);
  });

  const rootComments: CommentWithAuthor[] = [];

  commentMap.forEach(comment => {
    const parentComment = commentMap.get(comment.parent);

    if (parentComment) {
      parentComment.child_comments.push(comment);
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
};

console.log('transformComments', transformComments);

const fetchAuthors = async () => {
  const response = await axios.get("/api/authors");
  return response.data;
};


const fetchComments = async (page: number) => {
  const response = await axios.get("/api/comments", { params: { page } });
  return response.data;
};

export const Comments = () => {
  const [isHeartActive, setIsHeartActive] = useState(false);

  const handleHeartClick = () => {
    setIsHeartActive(!isHeartActive);
  };

  const defaultDataComments: CommentQueryData = { data: [], pagination: { page: 0, size: 0, total_pages: 0 } };


  const [currentPage, setCurrentPage] = useState(1);
  const { data: authors } = useQuery<Author[]>("authors", fetchAuthors);
  const { data: dataComments = defaultDataComments, isLoading, isError } = useQuery<CommentQueryData, Error, CommentQueryData>(
    ["comments", currentPage],
    () => fetchComments(currentPage),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  );
  const isNoMoreComments = dataComments.pagination && dataComments.pagination.page < dataComments.pagination.total_pages

  const [transformedComments, setTransformedComments] = useState<CommentWithAuthor[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setTransformedComments(prevComments => [...prevComments, ...transformComments(dataComments.data || [], authors || [])]);
    }
  }, [dataComments, authors, isLoading, currentPage]);


  const totalComments = 150;



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const handlePageChange = () => {
    if (dataComments && isNoMoreComments) {
      setCurrentPage(currentPage + 1);
    }
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
          <Comment key={comment.id} comment={comment} depth={0} />
        ))}
      </CommentsList>
      <div>
        <PageButton onClick={handlePageChange} disabled={dataComments && !isNoMoreComments}>
          <Text>
            {'Загрузить ещё'}
          </Text>
        </PageButton>
      </div>
    </>
  );
};
