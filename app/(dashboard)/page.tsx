// import { BookRecommendation } from "@/components/book-recommendation";
// import { createCollection, nearTextQuery, processBooks } from "@/weaviate-workflow/actions";

import { BookRecommendation } from "@/components/prompt";

export default async function Home() {
  // If building locally in development mode, uncomment the following lines
  // await createCollection();
  // await processBooks();
  // await nearTextQuery()
  return (
    <>
      <BookRecommendation />
    </>
  );
}
