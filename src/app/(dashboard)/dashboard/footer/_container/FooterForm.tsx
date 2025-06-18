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
import { ColorPicker } from "@/components/ui/color-picker";

const formSchema = z.object({
  facebook_link: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid Facebook URL.",
    }),
  instagram_link: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid Instagram URL.",
    }),
  youtube_link: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid YouTube URL.",
    }),
  twitter_link: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid Twitter URL.",
    }),
  google_play: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid Google Play URL.",
    }),
  app_store: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "Please enter a valid App Store URL.",
    }),
  copyright: z.string().min(10, "Copyright is required"),
  color: z.string().min(6, {
    message: "Please pick a background color.",
  }),
});

export function FooterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook_link: "",
      instagram_link: "",
      youtube_link: "",
      twitter_link: "",
      google_play: "",
      app_store: "",
      copyright: "",
      color: "#000000",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Values:", values);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* Color Picker */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-black">
                    Add Backgorund Color
                  </FormLabel>
                  <FormControl>
                    <ColorPicker
                      selectedColor={field.value ?? "#FFFFFF"}
                      onColorChange={field.onChange}
                      previousColor={"#000000"}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm font-medium" />
                </FormItem>
              )}
            />
          </div>
          {/* social url input field  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            <div className="">
              <FormField
                control={form.control}
                name="facebook_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      Facebook Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://www.facebook.com/your-profile"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="instagram_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      Instagram Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://www.instagram.com/your-profile"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="youtube_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      YouTube Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://www.youtube.com/your-channel"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="twitter_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      Twitter Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://www.twitter.com/your-profile"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="app_store"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      App Store Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://www.apple.com/app-store/your-app"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="google_play"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                      Google Play Url Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                        placeholder="https://play.google.com/store/your-apps"
                        type="url"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm font-medium" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <FormField
              control={form.control}
              name="copyright"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-normal font-poppins leading-[120%] tracking-[0%] text-[#212121]">
                    Copyright
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-[51px] border border-[#595959] placeholder:text-[#595959] text-[#212121] font-poppins font-normal text-base tracking-[0%] rounded-[8px]"
                      placeholder="Copyright © 2025 Your Company. All rights reserved."
                      type="text"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm font-medium" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center items-center pt-5">
            <Button
              size={"lg"}
              type="submit"
              className="py-3 px-10 rounded-lg bg-primary text-white font-semibold leading-normal text-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
