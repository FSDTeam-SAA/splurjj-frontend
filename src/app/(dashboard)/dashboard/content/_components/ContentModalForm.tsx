"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon, Loader2, Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import QuillEditor from "@/components/ui/quill-editor";
import { Content } from "./ContentDataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

// Zod Schema
const formSchema = z
  .object({
    image1: z.union([z.instanceof(File), z.string()]).optional(),
    imageLink: z.string().url().optional().or(z.literal("")),
    advertising_image: z.union([z.instanceof(File), z.string()]).optional(),
    advertisingLink: z.string().url().optional().or(z.literal("")),
    tags: z.array(z.string()).max(10, "Max 10 tags"),
    author: z.string().min(2, {
      message: "Author must be at least 2 characters.",
    }),
    heading: z.string().min(2, {
      message: "Heading must be at least 2 characters.",
    }),
    sub_heading: z.string().min(2, {
      message: "Sub Heading must be at least 2 characters.",
    }),
    body1: z.string().min(2, {
      message: "Body must be at least 2 characters.",
    }),
    date: z.date({
      required_error: "Please select a date.",
      invalid_type_error: "Invalid date.",
    }),
  })
  .refine((data) => data.image1 || data.imageLink, {
    message: "Please provide an image file or link",
    path: ["image1"],
  });

type FormData = z.infer<typeof formSchema>;

interface ContentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: Content | null | undefined;
  categoryId: string | string[];
  subcategoryId: string | string[];
 
}

export default function ContentModalForm({
  isOpen,
  onClose,
  initialContent,
  categoryId,
  subcategoryId,
}: ContentFormModalProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(undefined);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  const queryClient = useQueryClient();

  console.log(categoryId, subcategoryId);
  console.log({ initialContent });

  console.log("initialContent", initialContent);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      image1: "",
      imageLink: "",
      tags: [],
      author: "",
      date: new Date(),
      heading: "",
      sub_heading: "",
      body1: "",
    },
  });


  useEffect(() => {
  if (initialContent) {
    form.reset({
      image1: initialContent.image1 || undefined,
      imageLink: initialContent.imageLink || "",
      advertising_image: initialContent.advertising_image || undefined,
      advertisingLink: initialContent.advertisingLink || "",
      tags: initialContent.tags || [],
      author: initialContent.author || "",
      heading: initialContent.heading || "",
      sub_heading: initialContent.sub_heading || "",
      body1: initialContent.body1 || "",
      date: initialContent.date ? new Date(initialContent.date) : new Date(),
    });
  } else {
    form.reset({
      image1: undefined,
      imageLink: "",
      advertising_image: undefined,
      advertisingLink: "",
      tags: [],
      author: "",
      heading: "",
      sub_heading: "",
      body1: "",
      date: new Date(),
    });
  }
}, [initialContent, form]);

  const { watch, setValue } = form;
  const image1 = watch("image1");
  const imageLink = watch("imageLink");
  const tags = watch("tags");

  // Preview URLs
  useEffect(() => {
    if (image1 instanceof File) {
      const url = URL.createObjectURL(image1);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof image1 === "string" && image1) {
      // If it's a string (existing image URL), use it directly
      setImagePreviewUrl(image1);
    } else {
      setImagePreviewUrl(null);
    }
  }, [image1]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "image") {
        setValue("image1", file);
        setValue("imageLink", "");
      }
    }
  };

  const removeFile = (type: "image") => {
    if (type === "image") {
      setValue("image1", undefined);
      setImagePreviewUrl(null);
    }
  };

  // Add tag
  const addTag = () => {
    const newTag = tagInput.trim();
    const currentTags = watch("tags");

    if (newTag && !currentTags.includes(newTag) && currentTags.length < 10) {
      const updatedTags = [...currentTags, newTag];
      setValue("tags", updatedTags);
      setTagInput("");
    }
  };

  // Remove tag
  const removeTag = (index: number) => {
    const currentTags = watch("tags");
    const updatedTags = currentTags.filter((_, i) => i !== index);
    setValue("tags", updatedTags);
  };


  const url = initialContent
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${initialContent?.id}?_method=PUT`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents`;

  const method = initialContent ? "POST" : "POST";

  const { mutate, isPending } = useMutation<FormData>({
    mutationKey: ["add-content-and-edit-content"],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (formData: any) =>
      fetch(`${url}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
         form.reset();
        return;
        
      }
      form.reset();
      onClose();
      toast.success(data?.message || "Content added successfully");

      queryClient.invalidateQueries({ queryKey: ["all-contents"] });
    },
  });

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append("category_id", categoryId.toString());
    formData.append("subcategory_id", subcategoryId.toString());
    formData.append("heading", data.heading);
    formData.append("author", data.author);
    formData.append("date", data.date.toISOString().split("T")[0]);

    formData.append("sub_heading", data.sub_heading);
    formData.append("body1", data.body1);
    formData.append("image1", data.image1 || "");
    formData.append("imageLink", data.imageLink || "");

    formData.append("tags", JSON.stringify(data.tags));

    console.log("Submitted data:", data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutate(formData as any);
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className=" -mt-4">
            <DialogTitle className="text-2xl font-semibold text-black leading-normal">
              {initialContent ? "Edit Content" : "Add New Content"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              {/* heading */}
              <div className="">
                <FormField
                  control={form.control}
                  name="heading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Heading
                      </FormLabel>
                      <FormControl className="">
                        <QuillEditor
                          id="heading"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* sub heading  */}
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="sub_heading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Write Sub Heading
                      </FormLabel>
                      <FormControl>
                        <QuillEditor
                          id="sub_heading"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* author  */}
              <div className="">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Author
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Write Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* date  */}
              <div className="py-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Date
                      </FormLabel>
                      <div className="relative flex gap-2 ">
                        <FormControl>
                          <Input
                            value={field.value.toLocaleDateString("en-US", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                            onChange={(e) => {
                              const parsed = new Date(e.target.value);
                              if (!isNaN(parsed.getTime())) {
                                field.onChange(parsed);
                                setMonth(parsed);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "ArrowDown") {
                                e.preventDefault();
                                setOpen(true);
                              }
                            }}
                            className="bg-background pr-10 "
                            placeholder="June 01, 2025"
                          />
                        </FormControl>

                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            >
                              <CalendarIcon className="size-3.5" />
                              <span className="sr-only">Select date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0 bg-white"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date);
                                  setOpen(false);
                                  setMonth(date);
                                }
                              }}
                              month={month}
                              onMonthChange={setMonth}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags Input */}
              <div>
                <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                  Tags
                </FormLabel>
                <div className="flex items-center gap-2 mb-3 mt-2 relative">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="shrink-0 absolute top-1.5 right-3 bg-none"
                  >
                    <Plus className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="h-[30px] flex items-center gap-1 bg-gray-200 pl-4 pr-1 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-0.5"
                        onClick={() => removeTag(i)}
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* body text */}
              <div className=" py-4">
                <FormField
                  control={form.control}
                  name="body1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Write Body Text
                      </FormLabel>
                      <FormControl>
                        <QuillEditor
                          id="body1"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Upload */}
              <div className="">
                <h2 className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                  Image
                </h2>
                <div className="border border-[#e2e8f0] rounded-lg p-5 mt-2">
                  <FormField
                    control={form.control}
                    name="image1"
                    render={() => (
                      <FormItem>
                        {imagePreviewUrl ||
                        (typeof image1 === "string" && image1) ? (
                          <div className="relative">
                            <Image
                              src={imagePreviewUrl || (image1 as string)}
                              alt="Preview"
                              width={400}
                              height={400}
                              className="w-full h-48 object-contain bg-white/10 rounded-lg p-2"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile("image")}
                              className="absolute top-2 right-2 bg-black/50 text-black p-1 rounded-full hover:bg-black/70"
                            >
                              <X className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-center">
                              <FormLabel className="w-full text-base text-center font-medium font-poppins text-black leading-[120%] tracking-[0%] pb-2">
                                Upload your image file
                              </FormLabel>
                            </div>
                            <FormControl>
                              <div className="relative flex items-center justify-center border rounded-[8px]">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, "image")}
                                  disabled={!!imageLink}
                                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border text-black"
                                  id="image-upload"
                                />
                                <button
                                  type="button"
                                  className="text-black px-6 py-2 bg-white w-[115px] h-[89px]"
                                >
                                  <label
                                    htmlFor="image-upload"
                                    className={`flex flex-col items-center gap-2 ${
                                      imageLink
                                        ? "opacity-50 pointer-events-none"
                                        : ""
                                    }`}
                                  >
                                    <Upload className="w-8 h-8" />
                                    Upload
                                  </label>
                                </button>
                              </div>
                            </FormControl>
                          </>
                        )}
                        <FormMessage className="text-white/90" />
                      </FormItem>
                    )}
                  />

                  {/* Rest of your code remains the same */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-white/30" />
                    <span className="text-black text-lg leading-normal font-semibold font-poppins pt-4 pb-2">
                      Or
                    </span>
                    <div className="flex-1 h-px bg-white/30" />
                  </div>

                  <FormField
                    control={form.control}
                    name="imageLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black text-sm">
                          Embed image link
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            disabled={!!image1}
                            className="border border-[#e2e8f0]"
                          />
                        </FormControl>
                        {field.value && (
                          <p className="text-xs text-white/70 bg-white/10 p-2 rounded mt-1">
                            Link added: {field.value}
                          </p>
                        )}
                        <FormMessage className="text-white/90" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="text-center pt-5">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="bg-primary text-white px-12 py-3 rounded-lg text-lg font-medium"
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
