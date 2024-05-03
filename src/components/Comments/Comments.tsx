import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { Comment } from "../Comment/Comment";
import { Author, CommentEntity, CommentQueryData, CommentWithAuthor } from "./types";
import { HeartIcon } from "../HeartIcon";
import { Loader } from "../Loader";
import { Text } from "../Text";
import { Button } from "../Button";
import { calculateTotalLikes, transformComments } from "./utils";

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  align-items: flex-start;
  border-bottom: 0.2px solid rgb(118, 118, 118);
`;

const HeartIconWrapper = styled.div`
  display: flex;
`;

const CommentsContainer = styled.div`
  > * {
    margin-top: 32px;

    @media screen and (max-width: 562px) {
      margin-top: 24px;
    }
  }
`;

const LoaderContainer = styled.div`
  margin-top: 32px;
`;


export const Comments = () => {
  const [isHeartIconActive, setIsHeartIconActive] = useState(false);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [totalLikesCount, setTotalLikesCount] = useState(0);
  const [totalCommentsCount, setTotalCommentsCount] = useState(0);

  const defaultDataComments: CommentQueryData = { data: [], pagination: { page: 0, size: 0, total_pages: 0 } };

  const fetchAuthors = async () => {
    const response = await axios.get("/api/authors");
    return response.data;
  };

  const fetchComments = async (page: number) => {
    const response = await axios.get("/api/comments", { params: { page } });
    return response.data;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const { data: authors, isLoading: authorsLoading, isError: authorsError } = useQuery<Author[]>("authors", fetchAuthors);
  const { data: dataComments = defaultDataComments, isLoading: commentsLoading, isError: commentsError } = useQuery<CommentQueryData, Error, CommentQueryData>(
    ["comments", currentPage],
    () => fetchComments(currentPage),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false
    }
  );
  const isNoMoreComments = dataComments.pagination && dataComments.pagination.page < dataComments.pagination.total_pages;

  const [transformedComments, setTransformedComments] = useState<CommentWithAuthor[]>([]);


  useEffect(() => {
    if (!commentsLoading && !authorsLoading) {
      setTransformedComments(prevComments => [...prevComments, ...transformComments(dataComments.data || [], authors || [])]);
      setIsLoadingMoreComments(false);
    }
  }, [dataComments, authors, commentsLoading, authorsLoading, currentPage]);

  useEffect(() => {
    if (!commentsLoading && !authorsLoading) {
      setTotalCommentsCount(prevTotalComments => prevTotalComments + dataComments.data.length);
    }
  }, [dataComments, commentsLoading, authorsLoading]);

  useEffect(() => {
    if (dataComments && dataComments.data) {
      const newTotalLikes = calculateTotalLikes(dataComments.data);
      setTotalLikesCount(prevTotalLikes => prevTotalLikes + newTotalLikes);
    }
  }, [dataComments]);

  useEffect(() => {
    if (authorsError) {
      console.error("Ошибка при загрузке авторов:", authorsError);
    }
  }, [authorsError]);

  useEffect(() => {
    if (commentsError) {
      console.error("Ошибка при загрузке комментариев:", commentsError);
    }
  }, [commentsError]);

  useEffect(() => {
    if (!authorsLoading && authors) {
      // console.log("Авторы успешно загружены:", authors);
    }
  }, [authorsLoading, authors]);

  useEffect(() => {
    if (!commentsLoading && dataComments) {
      // console.log("Комментарии успешно загружены:", dataComments);
    }
  }, [commentsLoading, dataComments]);

  const handleHeartClick = () => {
    setIsHeartIconActive(!isHeartIconActive);
  };

  const handlePageChange = () => {
    if (dataComments && isNoMoreComments) {
      setIsLoadingMoreComments(true);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <CommentsHeader>
        <Text fontWeight="700">
          {totalCommentsCount && <span>{totalCommentsCount} комментариев</span>}
        </Text>
        <HeartIconWrapper>
          <HeartIcon
            isActive={isHeartIconActive}
            onClick={handleHeartClick}
            borderColorActive="grey"
            borderColorNoActive="grey"
            fillActive="none"
            fillNoActive="none"
          />
          <Text lineHeight="22px" margin="0 0 0 8px">{totalLikesCount}</Text>
        </HeartIconWrapper>
      </CommentsHeader>

      <CommentsContainer>
        {transformedComments.map((comment: CommentWithAuthor) => (
          <Comment key={comment.id} comment={comment} depth={0} />
        ))}
      </CommentsContainer>

      {isLoadingMoreComments &&
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      }

      <Button onClick={handlePageChange} disabled={dataComments && !isNoMoreComments} title="Загрузить ещё" />
    </>
  );
};
