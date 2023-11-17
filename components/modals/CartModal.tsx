"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-store";
import {
  editNoteSchema,
  editNoteValidation,
} from "@/lib/validation/noteVallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CartModal = () => {
  const { data, isOpen, onClose, type } = useModal();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<editNoteValidation>({
    values: {
      title: "",
      content: "",
    },
    resolver: zodResolver(editNoteSchema),
  });

  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: editNoteValidation) => {
    try {
      await axios.patch(`/api/notes/${data?.note?.id}`, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/notes/${data?.note?.id}`);
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (data?.note) {
      form.setValue("title", data.note.title);
      form.setValue("content", data.note.content);
    }
  }, [form, data?.note, isOpen]);

  const isModalOpen = isOpen && type === "cartModal";

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isFormLoading}
                        {...field}
                        className="outline-none border-black/130 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isFormLoading}
                        {...field}
                        className=" outline-none border-black/130 w-full focus-visible:ring-0 focus-visible:ring-offset-0 "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  className="mt-3 w-full"
                  type="button"
                  onClick={onDelete}
                  variant={"destructive"}
                  disabled={isDeleting || isFormLoading}
                >
                  {isDeleting  ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <p>Delete</p>
                  )}
                </Button>
                <Button
                  className="mt-3 w-full"
                  disabled={isFormLoading || isDeleting}
                >
                  {isFormLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <p>Update</p>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartModal;
