// src/pages/Blog.jsx
const Blog = () => {
  const blogPosts = [
    {
      title: "Modern Marriage & Healthy Relationships: A Guide for Brides, Grooms & Families",
      date: "July 17, 2025",
      content: [
        "In today’s fast-paced world, building a healthy marriage isn’t just about rituals or ceremonies—it’s about connection, mutual respect, and trust. Whether you are a bride or a groom, understanding your partner's expectations, personal goals, and emotional needs is the foundation of a lasting relationship.",
        "Cultural traditions in Indian weddings are rich and beautiful, but it’s also important to embrace communication and equality. A happy marriage thrives on open discussions, shared responsibilities, and emotional support from both families.",
        "From pre-marriage counseling to modern-day compatibility checks, platforms like Bhavana Matrimony help ensure that every couple begins their journey with clarity and confidence.",
        "Families play a vital role, too. A bride should feel welcomed and respected in her new home, and a groom should understand and support her transitions. Mutual love between both families helps in creating a positive environment.",
        "Remember, a successful marriage is not just a union of two people but of values, dreams, and commitment."
      ],
      tags: [
        "#MarriageTips",
        "#HealthyRelationship",
        "#MatrimonyIndia",
        "#BrideAndGroomGoals",
        "#BhavanaMatrimony",
        "#IndianWeddingCulture"
      ]
    },
    {
      title: "Top 5 Qualities to Look for in a Life Partner",
      date: "July 10, 2025",
      content: [
        "Choosing a life partner is one of the most important decisions in your life. While looks and financial status often come to mind, emotional compatibility and shared values are the real cornerstones of a happy marriage.",
        "Here are the top five qualities to look for in a potential match: 1) Respect, 2) Communication Skills, 3) Shared Goals, 4) Emotional Maturity, and 5) Family Values.",
        "Bhavana Matrimony allows users to filter and find matches based on deep personal preferences and compatibility factors.",
        "Choosing wisely will set the stage for a peaceful, joyful, and balanced marital life."
      ],
      tags: [
        "#LifePartner",
        "#MarriageAdvice",
        "#MatrimonyTips",
        "#RelationshipGoals",
        "#BhavanaMatrimony"
      ]
    },
    {
      title: "Why Family Involvement Is Crucial in Indian Marriages",
      date: "July 3, 2025",
      content: [
        "In Indian culture, marriage is not just between two individuals—it’s a union of two families. The involvement of parents and elders helps ensure alignment of values, traditions, and long-term happiness.",
        "While modern couples seek autonomy, the blessings, experience, and support of family members often create a stronger marital foundation.",
        "Bhavana Matrimony respects traditional family involvement and offers features like family-managed profiles, horoscopes, and community-specific search filters."
      ],
      tags: [
        "#IndianMarriage",
        "#FamilySupport",
        "#TraditionAndModernity",
        "#CulturalValues",
        "#BhavanaMatrimony"
      ]
    },
    {
      title: "Pre-Marriage Counseling: Is It Worth It?",
      date: "June 25, 2025",
      content: [
        "Many modern couples are choosing to go for pre-marriage counseling before tying the knot. It offers a safe space to discuss finances, emotional expectations, responsibilities, and future plans.",
        "Such counseling can help identify red flags, set mutual expectations, and build a solid communication base.",
        "Bhavana Matrimony encourages couples to take this modern step towards building a stable married life."
      ],
      tags: [
        "#MarriagePreparation",
        "#CouplesCounseling",
        "#BhavanaMatrimony",
        "#MarriageReadiness",
        "#RelationshipHealth"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Our Blog</h1>
      <p className="text-gray-600 mb-10">
        Read the latest stories, wedding tips, relationship advice, and news updates from Bhavana Matrimony.
      </p>

      <div className="space-y-10">
        {blogPosts.map((post, index) => (
          <article key={index} className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">Published on {post.date} by Bhavana Matrimony</p>
            {post.content.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-blue-500">
              {post.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
