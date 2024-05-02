import { memo, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../Avatar";
import { formatDate } from "src/utils/formatDate";
import { CommentWithAuthor } from "../Comments/types";
import { HeartIcon } from "../HeartIcon";

interface CommentProps {
  comment: CommentWithAuthor;
  depth?: number;
}

const CommentContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

const AvatarColumn = styled.div`
  grid-row: 1;
  grid-column: 1;
`;

const ProfileColumn = styled.div`
  margin-left: 20px;
  grid-row: 1;
  grid-column: 2;
  justify-self: start;

  height: 43px;
`;

const ImageWrapperColumn = styled.div`
  grid-row: 1;
  grid-column: 3;
  justify-self: end;

  display: flex;
`;


const CommentText = styled.div`
  margin-left: 20px;
  grid-row: 2;
  grid-column: span 2 / 4;

  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0%;
  text-align: left;
`;

const AuthorName = styled.div`
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0%;
  text-align: left;
  text-transform: uppercase;
`;
const Time = styled.div`
  color: rgb(130, 151, 171);
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0%;
  text-align: left;
`;


const CountLikes = styled.div`
  margin-left: 10px;
  color: rgb(255, 255, 255);
  font-family: Lato;
  font-size: 15px;
  font-weight: 700;
`;

const HeartIconWrapper = styled.div`
  cursor: pointer;
`;

export const Comment = memo(({ comment, depth = 0 }: CommentProps) => {
  const [isHeartActive, setIsHeartActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setLikes((prevLikes) => prevLikes + (isLiked ? -1 : 1));
    setIsHeartActive(!isHeartActive);
  };

  const nextDepth = depth === 0 ? depth + 1 : depth;


  return (
    <>
      <CommentContainer className="comment" style={{ marginLeft: depth > 0 ? `${depth * 34}px` : 0 }}>
        <AvatarColumn>
          <Avatar size={68} src={comment.author?.avatar} />
        </AvatarColumn>
        <ProfileColumn>
          <AuthorName>{comment.author?.name}</AuthorName>
          <Time>{formatDate(comment.created)}</Time>
        </ProfileColumn>
        <ImageWrapperColumn>
          <HeartIconWrapper>
            <HeartIcon
              isActive={isHeartActive}
              onClick={handleHeartClick}
              borderColorActive="#D44F4F"
              borderColorNoActive="#D44F4F"
              fillActive="#D44F4F"
              fillNoActive="none"
            />
          </HeartIconWrapper>
          <CountLikes>
            {likes}
          </CountLikes>
        </ImageWrapperColumn>
        <CommentText >{comment.text}</CommentText>

      </CommentContainer>
      {comment.child_comments.map((childComment) => (
        <Comment key={childComment.id} comment={childComment} depth={nextDepth} />
      ))}
    </>

  );
});
