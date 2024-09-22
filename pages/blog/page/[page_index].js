import fs from "fs";
import path from "path";

import Layout from "@/components/Layout";
import Post from "@/components/Post";
import CategoryList from "@/components/CategoryList";
import { getPosts } from "@/lib/posts";

export default function BlogPage({ posts, categories }) {
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="md:w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="md:w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();

  // get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  return {
    props: {
      posts: posts,
      categories: uniqueCategories,
    },
  };
}
