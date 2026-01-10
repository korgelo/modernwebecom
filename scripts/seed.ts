import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const sql = neon(connectionString);

const SITE_NAME = "SuyoohTechBlog";
const AFFILIATE_DISCLAIMER =
  "SuyoohTechBlog is supported by its audience. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you.";

const TRENDING_POSTS = [
  {
    id: "apple-ai-ios-18",
    title: "Apple Intelligence arrives with iOS 18.2 features",
    shortTitle: "Apple AI & iOS 18.2",
    slug: "apple-intelligence-ios-18-guide",
    description:
      "iOS 18.2 marks a major shift for iPhone users with ChatGPT integration and Image Playground.",
    keyInsight:
      "Native AI integration is redefining the premium smartphone user experience.",
    category: "Software",
    ctaText: "Explore AI Features",
  },
  {
    id: "nvidia-rtx-50-leaks",
    title: "NVIDIA RTX 50-Series: Blackwell GPU Specs Leaked",
    shortTitle: "NVIDIA RTX 50-Series",
    slug: "nvidia-rtx-50-series-specs-leak",
    description:
      "Ahead of CES 2025, leaks for the RTX 5090 and 5080 suggest massive performance gains.",
    keyInsight:
      "Blackwell architecture is poised to dominate high-end gaming performance in 2025.",
    category: "Hardware",
    ctaText: "View GPU Specs",
  },
  {
    id: "openai-o1-model-launch",
    title: "OpenAI o1 Reasoning Model: New Era of AI Logic",
    shortTitle: "OpenAI o1 Model",
    slug: "openai-o1-reasoning-model-full-release",
    description:
      "OpenAI has transitioned its o1 model to full availability for complex reasoning.",
    keyInsight:
      "AI is shifting from simple chat to advanced multi-step reasoning capabilities.",
    category: "Artificial Intelligence",
    ctaText: "Try OpenAI o1",
  },
  {
    id: "samsung-galaxy-s25-rumors",
    title: "Samsung Galaxy S25: Ultra Thinner Design & Specs",
    shortTitle: "Galaxy S25 Rumors",
    slug: "samsung-galaxy-s25-ultra-rumors",
    description:
      "The Galaxy S25 Ultra is set to debut with a sleek design and Snapdragon 8 Elite chip.",
    keyInsight:
      "The Snapdragon 8 Elite chipset will likely lead 2025 mobile performance benchmarks.",
    category: "Mobile",
    ctaText: "Pre-order Updates",
  },
  {
    id: "nintendo-switch-2-updates",
    title: "Nintendo Switch 2: New Production Reports & Display",
    shortTitle: "Nintendo Switch 2",
    slug: "nintendo-switch-2-production-leaks",
    description:
      "Recent production reports confirm backward compatibility for the Nintendo Switch 2.",
    keyInsight:
      "Backward compatibility ensures a smooth transition for the existing Nintendo user base.",
    category: "Gaming",
    ctaText: "Check Release Date",
  },
];

async function seed() {
  console.log("Starting database seed...");
  console.log("Note: This script seeds site settings and trending posts only.");
  console.log("Post data is managed directly in the database.");

  try {
    console.log("Inserting site settings...");
    await sql`
      INSERT INTO site_settings (key, value) 
      VALUES ('SITE_NAME', ${SITE_NAME}), ('AFFILIATE_DISCLAIMER', ${AFFILIATE_DISCLAIMER})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;

    console.log("Inserting trending posts...");
    for (const post of TRENDING_POSTS) {
      await sql`
        INSERT INTO trending_posts (id, title, short_title, slug, description, key_insight, category, cta_text)
        VALUES (${post.id}, ${post.title}, ${post.shortTitle}, ${post.slug}, ${post.description}, ${post.keyInsight}, ${post.category}, ${post.ctaText})
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          short_title = EXCLUDED.short_title,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description,
          key_insight = EXCLUDED.key_insight,
          category = EXCLUDED.category,
          cta_text = EXCLUDED.cta_text
      `;
    }
    console.log(`Inserted ${TRENDING_POSTS.length} trending posts`);

    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
