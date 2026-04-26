import { getBlogPosts, getAllTags } from "../src/lib/mdx.js";
import fs from "node:fs";
import path from "node:path";

async function generateBlogData() {
  try {
    const [posts, tags] = await Promise.all([getBlogPosts(), getAllTags()]);

    const data = {
      posts,
      tags,
    };

    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(
      path.join(publicDir, "blog-data.json"),
      JSON.stringify(data, null, 2),
    );

    console.log("Blog data generated successfully");
  } catch (error) {
    console.error("Error generating blog data:", error);
    process.exit(1);
  }
}

generateBlogData();
