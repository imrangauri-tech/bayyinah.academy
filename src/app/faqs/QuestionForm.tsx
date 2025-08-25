"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z.string().min(2, "Please enter your full name").max(50, "Max 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Please provide a little more detail (min 10 characters)")
    .max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof formSchema>;

const QuestionForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "question",
          data: values
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        console.error("FAQ submit error:", json);
        alert(json?.error || "Failed to send. Please try again.");
        return;
      }

      alert("Thanks! Your question has been sent.");
      form.reset();
    } catch (e) {
      console.error(e);
      alert("Network error. Please try again.");
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
          noValidate
        >
          {/* NAME */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="gap-y-3">
                <FormLabel className="text-white">Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    autoComplete="name"
                    {...field}
                    className="bg-white h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="gap-y-3">
                <FormLabel className="text-white">Your Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    {...field}
                    className="bg-white h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="gap-y-3 col-span-full">
                <FormLabel className="text-white">Enter your query here</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your text"
                    {...field}
                    className="bg-white h-28"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            className="col-span-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send"}
          </Button>
        </form>
      </Form>
    </React.Fragment>
  );
};

export default QuestionForm;
