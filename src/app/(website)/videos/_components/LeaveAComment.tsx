"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const FormSchema = z.object({
  comment: z.string().min(10, {
    message: "comment must be at least 10 characters.",
  }),
});

export function LeaveAComment() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container w-full flex flex-col items-center justify-center">
      <div className="w-full md:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <h4 className="text-lg md:text-xl font-semibold font-manrope leading-[120%] tracking-[0%] text-black uppercase text-left pb-3 md:pb-4 ">
                    Leave A comment
                  </h4>
                  <FormLabel className="text-lg md:text-xl font-semibold font-manrope leading-[120%] tracking-[0%] text-secondary">
                    you must be <Link href="/login" className="underline">logged in</Link> to the post
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Comments"
                      className=" h-[150px] text-lg md:text-xl font-semibold font-manrope leading-[120%] tracking-[0%] text-black placeholder:text-[#929292] capitalize border-[1.5px] border-secondary rounded-[8px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 md:mt-5 lg:mt-6">
                <Button className="text-white py-3 px-6 text-base font-bold font-manrope leading-[120%] tracking-[0%] bg-primary" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
