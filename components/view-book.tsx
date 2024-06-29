import { Book } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

type ViewBookProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  openModal: (book_title: string) => void;
  selectedBook: Book | undefined;
};

export const ViewBook = ({
  isOpen,
  title,
  setOpen,
  openModal,
  selectedBook,
}: ViewBookProps) => {
  const onChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="lg:w-[800px]">
          <DialogHeader className="py-4 ">
            <DialogTitle className="text-[22px] font-bold leading-[28px] text-neutral-7">
              {selectedBook?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="overflow-hidden relative h-[70vh] w-full  rounded-xl">
              <Image
                src={selectedBook?.thumbnail || ""}
                fill
                alt="Image"
                // className="w-full"
              />
            </div>
            <div className="flex-col lg:flex-row flex lg:gap-x-2 gap-y-2  mt-3">
              <p className="text-gray-600">
                Author(s): {selectedBook?.authors},{" "}
              </p>
              <p className="text-gray-600">
                Genre: {selectedBook?.categories},{" "}
              </p>
              <p className="text-gray-600">
                Genre: {selectedBook?.categories},{" "}
              </p>
              <p className="text-gray-600">
                Rating: {selectedBook?.average_rating},{" "}
              </p>
              <p className="text-gray-600">
                Year Published: {selectedBook?.published_year}
              </p>
            </div>
            <div className="mt-3">
              <p className="text-[#AEAEAE] text-lg font-semibold">{selectedBook?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Button onClick={() => openModal(title)} className="bg-neutral-500/80">
        View
      </Button>
    </>
  );
};
