"use server";

import fs from "fs";
import csvParser from "csv-parser";

import weaviate, {
  WeaviateClient,
  vectorizer,
  generative,
} from "weaviate-client";
import { Book } from "@/types";

const client: WeaviateClient = await weaviate.connectToWeaviateCloud(
  process.env.WCD_URL!!,
  {
    authCredentials: new weaviate.ApiKey(process.env.WCD_API_KEY!!),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
    },
  },
);




export async function createCollection() {
  const books = await client.collections.create({
    name: "Book",
    vectorizers: vectorizer.text2VecOpenAI(),
    generative: generative.openAI(),
  });
  console.log(`Collection ${books.name} created!`);
}



export const processBooks = async () => {
  const bookCollection = client.collections.get("Book");
  const books: Book[] = [];

  fs.createReadStream("./weaviate-workflow/7k-books-kaggle.csv")
    .pipe(csvParser())
    .on("data", (book) => {
      const parsedBook: Book = {
        isbn13: book["isbn13"],
        isbn10: book["isbn10"],
        title: book["title"],
        subtitle: book["subtitle"],
        authors: book["authors"],
        categories: book["categories"],
        thumbnail: book["thumbnail"],
        description: book["description"],
        published_year: book["published_year"],
        average_rating: book["average_rating"],
        num_pages: book["num_pages"],
        ratings_count: book["ratings_count"],
      };
      books.push(parsedBook);
    })
    .on("end", async () => {
      const response = await bookCollection.data.insertMany(books);
      console.log("CSV file successfully processed");
      client.close();
    })
    .on("error", (err) => {
      console.error("Error reading CSV file", err);
      client.close();
    });
};


export async function nearTextQuery() {
  const book = client.collections.get("Book");

  const result = await book.query.nearText("biology", {
    limit: 2,
  });

  for (let object of result.objects) {
    console.log(JSON.stringify(object.properties, null, 2));
  }
  
  return result;
}
