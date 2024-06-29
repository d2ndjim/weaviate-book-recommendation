"use server";

import { NearTextType } from "@/types";
import weaviate, { WeaviateClient, ApiKey } from "weaviate-ts-client";

const weaviateClusterUrl = process.env.WCD_URL?.replace("https://", "");

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: weaviateClusterUrl || "localhost:3000",
  apiKey: new ApiKey(process.env.WCD_API_KEY!!),
  headers: {
    "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
  },
});

export async function similaritySearchNearText(query: [string] | []) {
  let nearText: NearTextType = {
    concepts: [],
  };


  nearText.certainty = 0.7;

  nearText.concepts = query;

  const response = client.graphql
    .get()
    .withClassName("Book")
    .withFields(
      "title isbn10 isbn13 categories thumbnail description num_pages average_rating published_year authors",
    )
    .withNearText(nearText)
    .withLimit(30);

  const result = await response.do();

  return result;
  
}
