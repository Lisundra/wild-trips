export type InputsType = {
  title: string;
  text: string;
};

export type PostType = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PostsType = Array<PostType>;
// export type PostsType = PostType[];

export type PostPropsType = {
  post: PostType;
};

export type PostSliceType = {
  count: number;
  posts: PostsType;
  isLoading: boolean;
};
