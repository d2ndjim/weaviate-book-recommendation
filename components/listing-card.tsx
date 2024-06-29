import { Book } from "@/types";
import Image from "next/image";
import { ViewBook } from "./view-book";

type ListingCardProps = {
  data: Book;
  isOpen: boolean;
  openModal: (book_title: string) => void;
  setOpen: (value: boolean) => void;
  selectedBook: Book | undefined;
};

export const ListingCard = ({ data, isOpen, openModal, setOpen, selectedBook }: ListingCardProps) => {
  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex w-full flex-col gap-2">
        <div
          className="
            relative 
            aspect-square 
            w-full 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              h-full 
              w-full 
              object-cover 
              transition 
              group-hover:scale-110
            "
            src={data.thumbnail}
            alt={data.title}
          />
          <div
            className="
            absolute
            right-3
            top-3
          "
          >
            <ViewBook isOpen={isOpen} setOpen={setOpen} title={data.title} openModal={openModal} selectedBook={selectedBook} />
          </div>
        </div>
        <div className="text-lg font-semibold">{data.title}</div>
        <div className="font-light text-neutral-500">{data.authors}</div>
      </div>
    </div>
  );
};
