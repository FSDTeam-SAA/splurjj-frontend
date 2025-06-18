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
import FileUpload from "@/components/ui/FileUpload";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  imageUrl: z.string().min(2, {
    message: "image url must be at least 2 characters.",
  }),
   embedCode: z.string().min(2, {
    message: "embed code must be at least 2 characters.",
  }),
});

const AdvertisingForm = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      embedCode: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
   
    console.log(values, logo);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between bg-white p-6 rounded-[10px] shadow-lg">
            <div className="w-2/5 border rounded-[10px] p-4 bg-white shadow-xl">
              <div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black leading-normal">
                        Ads Link
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                  file={logo}
                  setFile={setLogo}
                  //   existingUrl={data?.data?.logo}
                />
              </div>
            </div>
            <div className="w-1/5 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-black leading-normal">OR</h2>
            </div>
            <div className="w-2/5 border rounded-[10px] p-4 bg-white shadow-xl">
              <div>
                <FormField
                  control={form.control}
                  name="embedCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold text-black leading-normal">
                        Embed Code
                      </FormLabel>
                      <FormControl>
                        <Textarea className="h-[120px] w-full" placeholder="Enter Embed Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button className="text-white" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AdvertisingForm;
