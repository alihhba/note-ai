"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/modal-store";
import { noteSchema, noteValidation } from "@/lib/validation/noteVallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

const CreateNoteModal = () => {
  const { data, isOpen, onClose, type } = useModal();
  const router = useRouter();

  const form = useForm<noteValidation>({
    values: {
      title: "",
      content: "",
    },
    resolver: zodResolver(noteSchema),
  });

  const isFormLoading = form.formState.isSubmitting;

  const onSubmit = async (values: noteValidation) => {
    try {
      await axios.post("/api/notes", values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const isModalOpen = isOpen && type === "createNode";
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
                        className="outline-none border-black/130 w-full focus-visible:ring-0 focus-visible:ring-offset-0 "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button className="mt-3 w-full" disabled={isFormLoading}>
                  {isFormLoading ? <Loader2  className="w-4 h-4 animate-spin"/> : <p>Submit</p>}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );  
};

export default CreateNoteModal;
