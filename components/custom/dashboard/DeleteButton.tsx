"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { deleteSummary } from "@/actions/summary-action";
import { toast } from "sonner";

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteSummary(summaryId);
      if (!res.success) {
        toast.error("Failed to delete summary.");
      } else {
        toast.success("Summary deleted successfully.");
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-rose-500 bg-rose-50 hover:text-white hover:bg-rose-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Delete summary"
        >
          <Trash2Icon className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Delete summary
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Are You Sure ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-end gap-3 mt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              disabled={isPending}
              className="text-gray-700"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="bg-rose-500 hover:bg-rose-600"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete summary"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
