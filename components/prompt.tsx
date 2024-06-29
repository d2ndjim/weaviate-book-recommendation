"use client";

import * as z from "zod";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/constants";
import { cn } from "@/lib/utils";
import { similaritySearchNearText } from "@/weaviate-workflow/get-recommendations";
import { Book } from "@/types";
import { ListingCard } from "./listing-card";

export const BookRecommendation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [selectedBook, setSelectedbook] = useState<Book | undefined>(undefined);

  const openModal = (book_title: string) => {
    const bookSelection = recommendedBooks.filter((book: Book) => {
      return book.title === book_title;
    });
    console.log(bookSelection);
    setSelectedbook(bookSelection[0]);
    setOpen(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { query } = values;
    setIsLoading(true);

    const response = await similaritySearchNearText([query]);
    setRecommendedBooks(response.data.Get.Book);

    setIsLoading(false);
    setLoadedOnce(true);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <Card className="border-none drop-shadow-sm ">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
              <CardTitle className="text-xl line-clamp-1">
                Recommend a book
              </CardTitle>
              <Button size="sm" type="submit">
                Get Recommendation
              </Button>
            </CardHeader>
            <CardContent>
              <FormField
                name="query"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-neutral=7 text-[14px] font-normal leading-[24px]">
                      What would you like to get a book recommendation on?
                    </FormLabel>
                    <FormControl className="">
                      <Input
                        className={cn(
                          "h-[40px] border-[#BCC3D2] text-base font-normal outline-none focus-visible:ring-0 focus-visible:ring-transparent",
                          form.formState.errors.query ? "border-[#E2304F]" : "",
                        )}
                        placeholder="Recommend me a book based on..."
                        disabled={isLoading}
                        required
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.query && <FormMessage />}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <PuffLoader color="#A0FFA4" />
        </div>
      ) : (
        <>
          {loadedOnce ? (
            <>
              <div className="lg:text-3xl text-xl font-semibold mt-10 text-center">
                Recommended Books
              </div>
              <div
                className="
            grid
            grid-cols-1 
            gap-8 
            pt-24 
            sm:grid-cols-2 
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            bg-grey-100
          "
              >
                {recommendedBooks.map((book: Book) => (
                  <ListingCard
                    data={book}
                    key={book.isbn10 || book.isbn13}
                    isOpen={isOpen}
                    openModal={openModal}
                    setOpen={setOpen}
                    selectedBook={selectedBook}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center h-60 pt-10"></div>
          )}
        </>
      )}
    </div>
  );
};
