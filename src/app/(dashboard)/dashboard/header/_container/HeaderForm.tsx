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
// import { Input } from "@/components/ui/input";
import { ColorPicker } from "@/components/ui/color-picker";
// import { useSession } from "next-auth/react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useEffect } from "react";

const formSchema = z.object({
  bg_color: z.string().min(6, {
    message: "Please pick a background color.",
  }),
  border_color: z.string().min(6, {
    message: "Please pick a border color.",
  }),
  menu_color: z.string().min(6, {
    message: "Please pick a menu color.",
  }),
  menu_active_color: z.string().min(6, {
    message: "Please pick a menu active color.",
  }),
});

// export type FooterLink = {
//   name: string;
//   named_url: string;
// };

// export type FooterApiResponse = {
//   success: boolean;
//   message: string;
//   data: {
//     footer_links: FooterLink[];
//     facebook_link: string;
//     instagram_link: string;
//     linkedin_link: string;
//     twitter_link: string;
//     app_store_link: string;
//     google_play_link: string;
//     bg_color: string;
//     copyright: string;
//   };
// };

export function HeaderForm() {
  //   const session = useSession();
  //   const token = (session?.data?.user as { token?: string })?.token;

  //   const { data } = useQuery<FooterApiResponse>({
  //     queryKey: ["footer-content-data"],
  //     queryFn: () =>
  //       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }).then((res) => res.json()),
  //   });

  //   console.log(data?.data?.app_store_link)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bg_color: "#000000",
      border_color: "#000000",
      menu_color: "#000000",
      menu_active_color: "#000000",
    },
  });

  //    useEffect(() => {
  //     if (data?.data) {
  //       form.reset({
  //         facebook_link: data?.data?.facebook_link || "",
  //         instagram_link: data?.data?.instagram_link || "",
  //         linkedin_link: data?.data?.linkedin_link || "",
  //         twitter_link: data?.data?.twitter_link || "",
  //         google_play_link: data?.data?.google_play_link || "",
  //         app_store_link: data?.data?.app_store_link || "",
  //         copyright: data?.data?.copyright || "",
  //         bg_color: data?.data?.bg_color || "#000000",
  //       });
  //     }
  //   }, [data, form]);

  //   const { mutate, isPending } = useMutation({
  //     mutationKey: ["footer-content"],
  //     mutationFn: (values: z.infer<typeof formSchema>) =>
  //       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/footer/update`, {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(values),
  //       }).then((res) => res.json()),
  //     onSuccess: (data) => {
  //       if (!data?.success) {
  //         toast.error(data?.message || "Something went wrong");
  //         return;
  //       }
  //       toast.success(data?.message || "Footer updated successfully");
  //     },
  //   });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted Values:", values);
    // mutate(values);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
            <div>
              {/* Color Picker */}
              <FormField
                control={form.control}
                name="bg_color"
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
            <div>
              {/* Color Picker */}
              <FormField
                control={form.control}
                name="border_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Add Border Color
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
            <div>
              {/* Color Picker */}
              <FormField
                control={form.control}
                name="menu_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Add Menu Color
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
            <div>
              {/* Color Picker */}
              <FormField
                control={form.control}
                name="menu_active_color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold text-black">
                      Add Menu Active Color
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
          </div>

          <div className="flex justify-center items-center pt-5">
            <Button
              size={"lg"}
              //   disabled={isPending}
              type="submit"
              className="py-3 px-10 rounded-lg bg-primary text-white font-semibold leading-normal text-lg"
            >
              {/* {isPending ? "Sending..." : "Submit"} */}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
