import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import QuillEditor from "@/components/ui/quill-editor";
import { PageData } from "./AllPagesContainer";

const formSchema = z.object({
  pageName: z.string().min(2, {
    message: "Page name must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Body must be at least 2 characters.",
  }),
});

interface AddNewPageProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  initialData?: PageData | null;
}

const AddNewPage: React.FC<AddNewPageProps> = ({
  isOpen,
  setIsOpen,
  initialData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: "",
      body: "",
    },
  });

useEffect(() => {
  if (isOpen) {
    if (initialData) {
      form.reset({
        pageName: initialData.name,
        body: initialData.body
      });
    } else {
      form.reset({
        pageName: "",
        body: ""
      });
    }
  }
}, [isOpen, initialData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="h-[600px]">
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogContent className="max-w-4xl md:max-w-7xl lg:max-w-8xl bg-white">
        <DialogHeader className="text-2xl font-bold">
          {initialData ? "Edit" : "Add"} New Page
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your page name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold text-black leading-[120%] tracking-[0%]">
                    Body
                  </FormLabel>
                  <FormControl>
                    <QuillEditor
                      id="body"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-center">
              <Button
                className="bg-primary text-white py-2 px-4 rounded-lg"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default AddNewPage;

