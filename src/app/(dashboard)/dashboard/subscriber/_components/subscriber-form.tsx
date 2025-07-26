"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
});
import "react-quill/dist/quill.snow.css";

const formSchema = z.object({
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

// Quill modules configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
];

const SubscriberForm = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white w-full max-w-[1000px] pt-[116px] pl-[134px] pr-[135px] pb-[94px]">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-[40px] font-bold text-black leading-[120%]">
            Compose Mail
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4 border border-[#B6B6B6] rounded-[8px] p-6"
          >
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold text-black leading-[120%]">
                    Subject Title:
                  </FormLabel>
                  <div className="mt-4">
                    <FormControl>
                      <Input
                        className="h-[73px] border border-[#E7E7E7] bg-white rounded-[8px] py-[27px] px-[18px] dark:text-black"
                        placeholder="Write title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl font-bold text-black leading-[120%]">
                    Description:
                  </FormLabel>
                  <div className="mt-3">
                    <div className="border border-[#707070] rounded-md overflow-hidden">
                      <ReactQuill
                      className="dark:text-black"
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog content here..."
                        style={{
                          height: "300px",
                        }}
                      />
                    </div>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-end pt-6">
              <Button 
                className="py-3 px-[29px] rounded-[8px] bg-[#34A1E8] text-base font-normal leading-[120%] text-[#F4F4F4]" 
                type="submit"
              >
                Send Email
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      <style jsx global>{`
        .ql-editor {
          min-height: 300px !important;
          font-family: inherit;
        }
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: 1px solid #707070 !important;
        }
        .ql-container {
          border-bottom: none !important;
          border-left: none !important;
          border-right: none !important;
        }
        .ql-snow .ql-tooltip {
          z-index: 1000;
        }
      `}</style>
    </Dialog>
  );
};

export default SubscriberForm;