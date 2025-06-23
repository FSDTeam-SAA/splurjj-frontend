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
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/ui/FileUpload";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";

export type AdvertisingSetting = {
  success: boolean;
  message: string;
  data: {
    id: number;
    link: string;
    image: string;
    code: string | null;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    slug: string;
  };
};

// Conditional schema that requires either link+file OR code, but not both
const formSchema = z
  .object({
    link: z.string().optional(),
    code: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasImageData = data.link && data.link.length >= 2;
      const hasEmbedData = data.code && data.code.length >= 2;

      // Must have either image data OR embed data, but not both or neither
      return (hasImageData && !hasEmbedData) || (!hasImageData && hasEmbedData);
    },
    {
      message:
        "Please provide either ads link with image OR embed code, but not both.",
      path: ["root"], // This will show the error at form level
    }
  );

const VerticalAdvertising = () => {
  const [image, setImage] = useState<File | null>(null);
  const [leftSideActive, setLeftSideActive] = useState(false);
  const [rightSideActive, setRightSideActive] = useState(false);

  const session = useSession();
  const token = (session?.data?.user as { token?: string })?.token;

  // get api ads vertical
  const { data } = useQuery<AdvertisingSetting>({
    queryKey: ["vertical-ads"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/advertising/vertical`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log(data);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      code: "",
    },
  });

  const watchImageUrl = form.watch("link");
  const watchEmbedCode = form.watch("code");

  // Update active states based on form values and file upload
  useEffect(() => {
    const hasImageContent =
      (watchImageUrl && watchImageUrl.length >= 2) || image;
    const hasEmbedContent = watchEmbedCode && watchEmbedCode.length >= 2;

    setLeftSideActive(!!hasImageContent);
    setRightSideActive(!!hasEmbedContent);
  }, [watchImageUrl, watchEmbedCode, image]);

  // Clear opposite side when one side becomes active
  useEffect(() => {
    if (leftSideActive && rightSideActive) {
      // If both become active, prioritize the most recent change
      // This shouldn't happen in normal use, but just in case
      form.setValue("code", "");
    }
  }, [leftSideActive, rightSideActive, form]);

  // Handle clearing left side when right side is filled
  const handleEmbedCodeChange = (value: string) => {
    if (value.length >= 2 && leftSideActive) {
      form.setValue("link", "");
      setImage(null);
    }
  };

  // Handle clearing right side when left side is filled
  const handleImageUrlChange = (value: string) => {
    if (value.length >= 2 && rightSideActive) {
      form.setValue("code", "");
    }
  };

  // Handle file upload clearing right side
  const handleFileChange = (file: File | null) => {
    setImage(file);
    if (file && rightSideActive) {
      form.setValue("code", "");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["vertical-ads"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/advertising/vertical`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }),
    // onSuccess: (data) => {
    //   if (!data?.success) {
    //     toast.error(data?.message || "Something went wrong");
    //     return;
    //   }
    //   toast.success(data?.message || "Ad added successfully");
    //   form.reset();
    //   setImage(null);
    //   // queryClient.invalidateQueries({ queryKey: ["all-ads"] });
    // },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    if (typeof values?.link === "string") {
      formData.append("link", values.link);
    }
    if (typeof values?.code === "string") {
      formData.append("code", values.code);
    }
    if (image) {
      formData.append("image", image);
    }
    console.log(values, image);
    mutate(formData);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between bg-white p-6 rounded-[10px] shadow-lg">
            {/* Left Side - Ads Link & Image Upload */}
            <div
              className={`w-2/5 border rounded-[10px] p-4 bg-white shadow-xl transition-opacity duration-200 ${
                rightSideActive
                  ? "opacity-50 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div>
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black leading-normal">
                        Ads Link
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ads link"
                          {...field}
                          disabled={rightSideActive}
                          onChange={(e) => {
                            field.onChange(e);
                            handleImageUrlChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <FileUpload
                  type="image"
                  label="Upload Ads Image"
                  file={image}
                  setFile={handleFileChange}
                  disabled={rightSideActive}
                />
              </div>
            </div>

            {/* Center OR */}
            <div className="w-1/5 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-black leading-normal">
                OR
              </h2>
            </div>

            {/* Right Side - Embed Code */}
            <div
              className={`w-2/5 border rounded-[10px] p-4 bg-white shadow-xl transition-opacity duration-200 ${
                leftSideActive
                  ? "opacity-50 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black leading-normal">
                        Embed Code
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-[120px] w-full"
                          placeholder="Enter Embed Code"
                          {...field}
                          disabled={leftSideActive}
                          onChange={(e) => {
                            field.onChange(e);
                            handleEmbedCodeChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Show form-level error if validation fails */}
          {form.formState.errors.root && (
            <div className="text-red-500 text-sm">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button disabled={isPending} className="text-white" type="submit">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerticalAdvertising;
