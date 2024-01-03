import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ICreatePost {
  title: string;
  body: string;
}

export const createPost = (variables: ICreatePost) => {
  return {
    ...variables,
    userId: 10,
    id: Math.random(),
  };
};

export const getPosts = async (): Promise<IPost[]> => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await data.json();
};

export const useGetPosts = (options?: UseQueryOptions<IPost[]>) => {
  return useQuery<IPost[]>({
    ...options,
    queryKey: ["posts"],
    queryFn: async () => getPosts(),
  });
};

export const useCreatePost = (
  options?: UseMutationOptions<IPost, unknown, ICreatePost>
) => {
  return useMutation<IPost, unknown, ICreatePost>({
    ...options,
    mutationFn: async (data: ICreatePost) => createPost(data),
  });
};
