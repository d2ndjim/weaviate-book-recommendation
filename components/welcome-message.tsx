"use client";


export const WelcomeMsg = () => {
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-[#020817] font-semibold">
        Welcome to Bookly 👋
      </h2>
      <p className="lg:text-base text-[##4F5261] text-sm">
        Get books recommended to you. Weaviate will use a combination of semantic search and
        keyword search, to find the books that best match your query. Semantic
        search allows you to search on the meaning of the text, which is great
        for book ideas.
      </p>
    </div>
  );
};
