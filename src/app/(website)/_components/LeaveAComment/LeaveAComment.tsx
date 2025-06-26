"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import axios from "axios";

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
    message: "Comment must be at least 10 characters.",
  }),
});

interface LeaveACommentProps {
  UserEmail: string | null | undefined;
  blogId: number;
}

// Define the payload type for the API
interface CommentPayload {
  email: string;
  content_id: number;
  comment: string;
}

export function LeaveAComment({ UserEmail, blogId }: LeaveACommentProps) {

  const queryClient = new QueryClient();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string })?.token;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  // Define the mutation for posting the comment
  const mutation = useMutation({
    mutationFn: async (data: CommentPayload) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Comment submitted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", blogId], // Invalidate the comments query to refresh the
      });
      form.reset(); // Reset the form after successful submission
    },
    
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!token || !UserEmail) {
      toast.error("You must be logged in to submit a comment.");
      return;
    }

    // Prepare the payload for the API
    const payload: CommentPayload = {
      email: UserEmail,
      content_id: blogId,
      comment: data.comment,
    };

    // Trigger the mutation
    mutation.mutate(payload);
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
                  <h4 className="text-lg md:text-xl font-semibold  leading-[120%] tracking-[0%] text-black uppercase text-left pb-3 md:pb-4">
                    Leave A Comment
                  </h4>
                  <FormLabel className="text-lg md:text-xl font-semibold  leading-[120%] tracking-[0%] text-secondary">
                    You must be <Link href="/login" className="underline">logged in</Link> to post
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write Comments"
                      className="h-[150px] text-lg md:text-xl font-semibold  leading-[120%] tracking-[0%] text-black placeholder:text-[#929292] capitalize border-[1.5px] border-secondary rounded-[8px]"
                      disabled={mutation.isPending} // Disable textarea during submission
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 md:mt-5 lg:mt-6">
              <Button
                className="text-white py-3 px-6 text-base font-bold  leading-[120%] tracking-[0%] bg-primary"
                type="submit"
                disabled={mutation.isPending} // Disable button during submission
              >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}