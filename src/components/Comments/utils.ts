import { CommentEntity, Author, CommentWithAuthor } from "./types";

export const transformComments = (
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

  rootComments.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return dateB.getTime() - dateA.getTime();
  });

  return rootComments;
};

export const calculateTotalLikes = (comments: CommentEntity[]): number => {
  let totalLikes = 0;

  comments.forEach(comment => {
    totalLikes += comment.likes;
  });

  return totalLikes;
};
