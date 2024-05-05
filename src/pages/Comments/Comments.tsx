import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { Comment } from "../../components/Comment/Comment";
import { Author, CommentEntity, CommentQueryData, CommentWithAuthor } from "./types";
import { HeartIcon } from "../../components/HeartIcon";
import { Loader } from "../../components/Loader";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { calculateTotalLikes, transformComments } from "./utils";
import { Skeleton } from "../../components/Skeleton";

const CommentsHeader = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  align-items: flex-start;
  padding-bottom: 10px;
  border-bottom: 0.2px solid rgb(118, 118, 118);
`;

const HeartIconWrapper = styled.div`
  display: flex;
`;

const CommentsContainer = styled.div`
  min-width: 100%;

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

const TextRepeat = styled.div`
  margin-top: 32px;
`;


export const Comments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isHeartIconActive, setIsHeartIconActive] = useState(false);
  const [previousComments, setPreviousComments] = useState<CommentEntity[]>([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [retryError, setRetryError] = useState(false);


  const fetchAuthors = async () => {
    try {
      const response = await axios.get("/api/authors");

      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
      throw error;
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments", { params: { page: currentPage } });

      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке комментариев:", error);
      throw error;
    }
  };

  const { data: authors, isLoading: authorsLoading, isError: authorsError } = useQuery<Author[]>("authors", fetchAuthors);
  const { data: dataComments, isLoading: commentsLoading, isError: commentsError, refetch: refetchComments } = useQuery<CommentQueryData, Error, CommentQueryData>(
    ["comments", currentPage],
    () => fetchComments(),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !isPageLoaded || retryError
    }
  );

  const isError = commentsError || authorsError

  useEffect(() => {
    if (dataComments && dataComments.data && dataComments.data.length > 0) {
      const newComments = dataComments.data.filter(comment => !previousComments.find(prevComment => prevComment.id === comment.id));
      if (newComments.length > 0) {
        setPreviousComments(prev => [...prev, ...newComments]);
        setIsPageLoaded(true);
        setRetryError(false);
      }
    }
  }, [dataComments, previousComments, currentPage]);

  const handleHeartClick = () => {
    setIsHeartIconActive(!isHeartIconActive);
  };

  const handlePageChange = () => {
    setCurrentPage(currentPage + 1);
    setRetryError(true);
  };

  const handleRetry = () => {
    setRetryError(true);
    refetchComments();
  };

  const renderContent = () => {

    let comments = [];

    if (currentPage === 1) {
      comments = dataComments?.data || [];
    } else {
      comments = [...previousComments, ...(dataComments?.data || [])];
    }

    const totalLikes = calculateTotalLikes(comments);
    const transformedComments = transformComments(comments, authors || []);
    const isNoMoreComments = dataComments && dataComments.pagination && dataComments.pagination.page >= dataComments.pagination.total_pages;

    return (
      <>
        <CommentsHeader>
          {!commentsLoading &&
            <>
              <Text fontWeight="700" lineHeight="22px">
                {comments.length > 0 && <span>{comments.length} комментариев</span>}
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
                <Text lineHeight="22px" margin="0 0 0 8px">{totalLikes}</Text>
              </HeartIconWrapper>
            </>
          }

          {commentsLoading &&
            <>
              <Skeleton width="150px" />
              <Skeleton width="70px" />
            </>}
        </CommentsHeader>

        <CommentsContainer>
          {transformedComments.map((comment: CommentWithAuthor) => (
            <Comment key={comment.id} comment={comment} depth={0} />
          ))}

          {commentsLoading && Array.from({ length: 8 }).map((_, index) => <Skeleton height="68px" />)}
        </CommentsContainer>

        {(!isNoMoreComments && !isError) &&
          <Button onClick={handlePageChange} title="Загрузить ещё" disabled={commentsLoading} />
        }

        {isError &&
          <TextRepeat>
            <Text alignment="center">Ошибка при загрузке данных. Попробуйте еще раз.</Text>
            <Button onClick={handleRetry} title="Попробовать еще раз" />
          </TextRepeat>
        }

        {(commentsLoading || authorsLoading) &&
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        }

      </>
    );
  };

  return (
    <>{renderContent()}</>
  );
};
