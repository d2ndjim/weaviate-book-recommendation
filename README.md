# Book Recommendation System (Bookly)
[![Weaviate](https://img.shields.io/static/v1?label=powered%20by&message=Weaviate%20%E2%9D%A4&color=green&style=flat-square)](https://weaviate.io/) 
[![Demo](https://img.shields.io/badge/Check%20out%20the%20demo!-yellow?&style=flat-square&logo=react&logoColor=white)](https://weaviate-book-recommendation.vercel.app/)


This project is a book recommendation service that suggests books based on a user's inputted genre and book titles. It's built upon a database of 7000 books retrieved from Kaggle. Using Ada v2 as the large language model, vector embeddings were created with the Kaggle dataset to allow for quick vector search to find semantically similar books through natural language input. The frontend is built using Next.js and styled with TailwindCSS.

![Project Screenshot](/bookly.png)

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Data Source](#data-source)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## 💫 Features

- Input genre and book titles to get book recommendations
- Vector Search on Weaviate Vector database of 7000 books
- Responsive design, thanks to TailwindCSS
- Uses OpenAI for vector generation and inference.

## 🛠 Installation

To run the project locally, follow these steps:

Clone the repository
   ```
   git clone https://github.com/d2ndjim/weaviate-book-recommendation.git
   ```

### The Data Pipeline

The data pipeline shows you how to connect with Weaviate, generate embeddings using integrated modules with Weaviate through OpenAI, and then query them using semantic search and vector search. Choose between one of the following options.

#### Data Pipeline Using OpenAI

If you're using OpenAI with this project, make sure to create a Weaviate Cloud cluster in WCD and get an API key from OpenAI. There are instructions to get an API key from the official [OpenAI Docs](https://platform.openai.com/docs/api-reference/introduction). You'll also need to fund the account.

### The Web Application

Once you've set up Weaviate and understand how the data pipeline works you can move over to the web application written in NextJS. 

**Note**: The web application is configured only to use OpenAI and WCD as an introduction on how to leverage Weaviate. It can be modified to use Ollama and a locally running Weaviate instance, but this project won't do that ouf of the box.

Additionally, this project has access to an existing WCD Cluster with an API Key configured to only allow READing from the public WCD cluster.

Install dependencies
   ```
   cd weaviate-book-recommendation
   yarn install
   ```
Run the app
   ```
   yarn run dev
   ```
Try out the app in a browser at http://localhost:3000

## 🧰 Usage

To use the service, simply type in a genre and several book titles in the provided input fields. The system will then generate several book recommendations based on your inputs.

You can try this at https://weaviate-book-recommendation.vercel.app/

You must set at least on OPENAI_API_KEY environment variable. You can also set up your own Weaviate cluster and create embeddings yourself. If you choose not to do this, BookRecs will use a Read Only API key for an existing Weaviate cluster containing the Kaggle dataset. 


## 💾 Data Source

The book data used for this project is sourced from the following Kaggle dataset: [7k books with metadata](https://www.kaggle.com/datasets/dylanjcastillo/7k-books-with-metadata). The dataset has been converted to a vector embedding using the sentence-transformer model for improved natural language processing and stored in a Weaviate clustor for fast vector lookups.

## 💻 Tech Stack

- [NodeJS version 18.12.1 or above](https://nodejs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Weaviate >1.25](https://weaviate.io/)

## 🕷 Known Issues

- Some book images are inaccessible due to dead links on the original data set

## 💰 Large Language Model (LLM) Costs with OpenAI

This application utilizes OpenAI models. For OpenAI -- be advised that the usage costs for these models will be billed to the API access key you provide. Primarily, costs are incurred during data embedding and answer generation processes. The default vectorization engine for this project is `text-embedding-3-small`.

## 💖 Credit

Inspiration for this project was gotten from Weaviate's [Bookrecs application](https://github.com/weaviate/BookRecs.git)

