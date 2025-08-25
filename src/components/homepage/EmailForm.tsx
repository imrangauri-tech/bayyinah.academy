"use client";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const formSchema = z.object({
  email: z.string().email(),
});

interface EmailFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSuccess, onError }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    onError(""); // Clear previous errors

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        onSuccess();
        form.reset();
      } else {
        onError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch {
      onError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <div aria-describedby="input-wrapper" className="relative">
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="bg-white w-80 pr-24 md:pr-28 sm:w-md h-12 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant={"secondary"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full text-base md:text-xl transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </React.Fragment>
  );
};

export default EmailForm;
