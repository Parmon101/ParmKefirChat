export type Author = {
  id: number
  name: string
  avatar: string
}

export type CommentEntity = {
  id: number
  created: string
  text: string
  author: number
  parent: number
  likes: number
}


export type CommentWithAuthor = {
  author: Author;
  child_comments: CommentWithAuthor[];
} & Omit<CommentEntity, 'author'>;


export type Pagination = {
  page: number
  size: number
  total_pages: number
}


export type CommentQueryData = {
  data: CommentEntity[]
  pagination?: Pagination
}
