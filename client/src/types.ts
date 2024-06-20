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


//! Определяем типы для пользователей
//!
export type InputsTypeAuth = {
  login: string;
  email: string;
  password:string;
  full_name:string;
  role:string;
  profile_picture:File | null;
  bio:string | '';
};

export type UserType = {
  id: number;
  login: string;
  email: string;
  password:string;
  full_name:string;
  role:string;
  profile_picture:File | null;
  bio:string | '';
  createdAt: Date;
  updatedAt: Date;
};

export type UsersType = Array<UserType>;

export type PostUsersType = {
  user: UserType;
};

export type UserSliceType = {
  count: number;
  user: UserType | null;
  isLoading: boolean;
};