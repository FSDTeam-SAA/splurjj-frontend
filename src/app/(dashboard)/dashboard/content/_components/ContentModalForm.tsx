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
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

// Zod Schema
const formSchema = z
  .object({
    imageFile: z.instanceof(File).optional(),
    imageLink: z.string().url().optional().or(z.literal("")),
    advertisingFile: z.instanceof(File).optional(),
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
  .refine((data) => data.imageFile || data.imageLink, {
    message: "Please provide an image file or link",
    path: ["imageFile"],
  })
  .refine((data) => data.advertisingFile || data.advertisingLink, {
    message: "Please provide an advertising file or link",
    path: ["advertisingFile"],
  });

type FormData = z.infer<typeof formSchema>;



interface ContentFormModalProps {
  isOpen: boolean
  onClose: () => void
  initialContent?: Content | null | undefined
  categoryId: string | string[]
  subcategoryId: string | string[]
  isEditing?: boolean
  editingContent?: Content | null
}

export default function ContentModalForm({
  isOpen,
  onClose,
  initialContent,
  categoryId,
  subcategoryId,
  editingContent,
}: ContentFormModalProps) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [adPreviewUrl, setAdPreviewUrl] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(undefined);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  console.log(categoryId, subcategoryId)
  console.log({initialContent})

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageFile: undefined,
      imageLink: "",
      advertisingFile: undefined,
      advertisingLink: "",
      tags: [],
      author: "",
      date: new Date(),
      heading: "",
      sub_heading: "",
      body1: "",
    },
  });

  const { watch, setValue } = form;
  const imageFile = watch("imageFile");
  const imageLink = watch("imageLink");
  const advertisingFile = watch("advertisingFile");
  const advertisingLink = watch("advertisingLink");
  const tags = watch("tags");

  // Preview URLs
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreviewUrl(null);
  }, [imageFile]);

  useEffect(() => {
    if (advertisingFile) {
      const url = URL.createObjectURL(advertisingFile);
      setAdPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setAdPreviewUrl(null);
  }, [advertisingFile]);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "advertising"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "image") {
        setValue("imageFile", file);
        setValue("imageLink", "");
      } else {
        setValue("advertisingFile", file);
        setValue("advertisingLink", "");
      }
    }
  };

  const removeFile = (type: "image" | "advertising") => {
    if (type === "image") {
      setValue("imageFile", undefined);
      setImagePreviewUrl(null);
    } else {
      setValue("advertisingFile", undefined);
      setAdPreviewUrl(null);
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

const isEditing = !!editingContent;
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${editingContent?.id}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents`;

      const method = isEditing ? "POST" : "POST";


  const {mutate, isPending} = useMutation({
    mutationKey: ["add-content-and-edit-content"],
    
    mutationFn : (data: FormData) => fetch(`${url}`,{
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
  })

  const onSubmit = (data: FormData) => {
    // const result = {
    //   image: data.imageFile?.name || data.imageLink || null,
    //   advertising: data.advertisingFile?.name || data.advertisingLink || null,
    //   tags: data.tags,
    //   date: new Date().toISOString(),
    // };

    console.log("Submitted data:", data);
    mutate(data);
  };

  return (
    <div className=" py-10 space-y-6">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>
              {/* {isEditing ? "Edit Blog Content" : "Add New Blog Content"} */}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-6 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-3">
                  {/* heading */}
                  <div>
                    <FormField
                      control={form.control}
                      name="heading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold text-black">
                            Heading
                          </FormLabel>
                          <FormControl>
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
                  {/* author  */}
                  <div>
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Write Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* date  */}
                  <div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-3">
                          <FormLabel className="px-1">
                            Subscription Date
                          </FormLabel>
                          <div className="relative flex gap-2">
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
                                className="bg-background pr-10"
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
                                className="w-auto overflow-hidden p-0"
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
                  {/* sub heading  */}
                  <div>
                    <FormField
                      control={form.control}
                      name="sub_heading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold text-black">
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
                  {/* sub heading  */}
                  <div>
                    <FormField
                      control={form.control}
                      name="body1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-bold text-black">
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
                </div>

                {/* File Uploads */}
                <div className="md:col-span-2 space-y-6">
                  {/* Image Upload */}
                  <div className="">
                    <h2 className="text-black font-medium text-sm mb-4">
                      Image-1
                    </h2>
                    <FormField
                      control={form.control}
                      name="imageFile"
                      render={() => (
                        <FormItem>
                          {imagePreviewUrl ? (
                            <div className="relative">
                              <Image
                                src={imagePreviewUrl}
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
                                <X className="w-4 h-4" />
                              </button>
                              <p className="text-black text-xs mt-1">
                                {imageFile?.name} (
                                {Math.round((imageFile?.size || 0) / 1024)} KB)
                              </p>
                            </div>
                          ) : (
                            <>
                              <FormLabel className="text-black text-sm">
                                Upload your image file
                              </FormLabel>
                              <FormControl>
                                <div className="relative  flex items-center justify-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileUpload(e, "image")
                                    }
                                    disabled={!!imageLink}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border text-black"
                                    id="image-upload"
                                  />
                                  <button
                                    type="button"
                                    className=" text-black px-6 py-2 rounded-[8px] bg-white w-[115px] h-[89px] border"
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

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-white/30" />
                      <span className="text-black text-sm">Or</span>
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
                              disabled={!!imageFile}
                              className="bg-white/20 border-white/30 text-black placeholder:text-white/60 rounded-lg border"
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

                  {/* Advertising Upload */}
                  <div className="">
                    <h2 className="text-black font-medium text-sm mb-4">
                      Advertising
                    </h2>
                    <FormField
                      control={form.control}
                      name="advertisingFile"
                      render={() => (
                        <FormItem>
                          {adPreviewUrl ? (
                            <div className="relative">
                              <Image
                                src={adPreviewUrl}
                                alt="Preview"
                                width={400}
                                height={400}
                                className="w-full h-48 object-contain bg-white/10 rounded-lg p-2"
                              />
                              <button
                                type="button"
                                onClick={() => removeFile("advertising")}
                                className="absolute top-2 right-2 bg-black/50 text-black p-1 rounded-full hover:bg-black/70"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <p className="text-black text-xs mt-1">
                                {advertisingFile?.name} (
                                {Math.round(
                                  (advertisingFile?.size || 0) / 1024
                                )}{" "}
                                KB)
                              </p>
                            </div>
                          ) : (
                            <>
                              <FormLabel className="text-black text-sm">
                                Upload your advertising file
                              </FormLabel>
                              <FormControl>
                                <div className="relative flex items-center justify-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileUpload(e, "advertising")
                                    }
                                    disabled={!!advertisingLink}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="ad-upload"
                                  />
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    className=" text-gray-700 px-6 py-2 rounded-[8px] bg-white w-[115px] h-[89px] border"
                                    asChild
                                  >
                                    <label
                                      htmlFor="ad-upload"
                                      className={`flex flex-col items-center gap-2 ${
                                        advertisingLink
                                          ? "opacity-50 pointer-events-none"
                                          : ""
                                      }`}
                                    >
                                      <Upload className="!w-8 !h-8" />
                                      Upload
                                    </label>
                                  </Button>
                                </div>
                              </FormControl>
                            </>
                          )}
                          <FormMessage className="text-white/90" />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-white/30" />
                      <span className="text-black text-sm">Or</span>
                      <div className="flex-1 h-px bg-white/30" />
                    </div>

                    <FormField
                      control={form.control}
                      name="advertisingLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black text-sm">
                            Embed advertising link
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://example.com/ad.jpg"
                              {...field}
                              disabled={!!advertisingFile}
                              className="bg-white/20 border-white/30 text-black placeholder:text-white/60 rounded-lg"
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
              </div>

              {/* Tags Input */}
              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex items-center gap-2 mb-3 relative">
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

                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full text-sm"
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

              {/* Submit */}
              <div className="text-center">
                <Button
                disabled={isPending}
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-3 rounded-lg text-lg font-medium"
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
