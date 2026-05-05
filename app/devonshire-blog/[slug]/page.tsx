import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import blogData from "../blog-data.json";

// Type definitions
interface BlogPost {
  title: string;
  date: string;
  image: string;
  content: string;
  excerpt?: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = Object.keys(blogData);
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogData[slug as keyof typeof blogData] as BlogPost;
  if (!post) return {};

  return {
    title: `${post.title} | Devonshire Recruiting & Consulting Partners`,
    description: post.excerpt || `Recruiting and career insights from the Devonshire team.`,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogData[slug as keyof typeof blogData] as BlogPost;

  if (!post) {
    return (
      <>
        <Header />
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <h1>Blog Post Not Found</h1>
          <Link href="/blog">← Back to Blog</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div
        className="page-header"
        style={{
          backgroundImage: "url(/wp-content/uploads/2022/12/AdobeStock_174847508-copy.jpeg)",
        }}
      >
        <div className="container page-header-content">
          <h1>{post.title}</h1>
        </div>
      </div>

      <article style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ marginBottom: 30 }}>
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                color: "#333",
              }}
            />

            <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #e0e0e0" }}>
              <Link
                href="/blog"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  backgroundColor: "#f38131",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: 4,
                }}
              >
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
}