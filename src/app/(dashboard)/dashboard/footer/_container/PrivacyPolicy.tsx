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
import QuillEditor from "@/components/ui/quill-editor";

const formSchema = z.object({
  body: z.string().min(2, {
    message: "body must be at least 2 characters.",
  }),
});

const PrivacyPolicy = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div className="bg-white shadow-lg rounded-[12px] p-5 border">
        <h2 className="text-3xl font-bold text-black leading-normal text-center">
          Privacy Policy
        </h2>
        <div className="pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-black tracking-normal leading-normal">
                      Body
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
              <div className="flex items-center justify-center pt-6">
                <Button
                  className="text-white text-base font-medium leading-normal tracking-normal "
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
