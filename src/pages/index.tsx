import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ICreatePost,
  IPost,
  getPosts,
  useCreatePost,
  useGetPosts,
} from "@/services/main.service";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const posts = await getPosts();
  // Pass data to the page via props
  return { props: { posts } };
}) satisfies GetServerSideProps<{ posts: IPost[] }>;

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const queryClient = useQueryClient();

  const {
    data: postsData,
    isLoading,
    isError,
  } = useGetPosts({
    initialData: posts,
    queryKey: ["posts"],
  });

  const { mutate, mutateAsync } = useCreatePost({
    onSuccess(data, variables, context) {
      // const postsCached = queryClient.getQueryData(["posts"]) as IPost[];
      // const newPosts = [data, ...postsCached];
      queryClient.setQueryData(["posts"], (prevData: IPost[]) => {
        return [data, ...prevData];
      });
    },
  });

  const { register, handleSubmit } = useForm<ICreatePost>();

  const onSubmit = async (data: ICreatePost) => {
    mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Occured</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" {...register("body")} />
        <input type="text" placeholder="Body" {...register("title")} />
        <button type="submit">Add Todo</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
