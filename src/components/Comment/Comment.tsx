import { memo, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../Avatar";
import { formatDate } from "src/utils/formatDate";
import { CommentWithAuthor } from "../../pages/Comments/types";
import { HeartIcon } from "../HeartIcon";
import { Text } from "../Text";

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

  display: flex;
`;

// INFO добавил вне макета, что бы главный комментарий (без вложенностей) выделялся
const MainComment = styled.div`
  background-color: rgb(255, 255, 255, 0.2);
  width: 4px;
  height: auto;
  margin-right: 8px;
  border-radius: 4px;
`;

const ProfileColumn = styled.div`
  margin-left: 20px;
  grid-row: 1;
  grid-column: 2;
  justify-self: start;

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

  word-wrap: break-word;
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
          {!depth && <MainComment />}
          <Avatar size={68} src={comment.author?.avatar} />
        </AvatarColumn>
        <ProfileColumn>
          <Text line="22px" fontWeight="700">{comment.author?.name}</Text>
          <Text color="#8297AB" fontWeight="400" line="19px">{formatDate(comment.created)}</Text>
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
          <Text margin="0 0 0 8px">
            {likes}
          </Text>
        </ImageWrapperColumn>
        <CommentText>
          <Text line="19px" fontWeight="400">
            {comment.text}
          </Text>
        </CommentText>

      </CommentContainer>
      {comment.child_comments.map((childComment) => (
        <Comment key={childComment.id} comment={childComment} depth={nextDepth} />
      ))}
    </>

  );
});
