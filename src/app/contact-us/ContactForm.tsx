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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setShowConfirmation(true);
        form.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* NAME */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="gap-y-3 group">
                <FormLabel className="text-white transition-all duration-300 ease-out group-hover:text-sky-blue-200">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    {...field}
                    className="bg-white h-10 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
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
              <FormItem className="gap-y-3 group">
                <FormLabel className="text-white transition-all duration-300 ease-out group-hover:text-sky-blue-200">Email address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email Address"
                    {...field}
                    className="bg-white h-10 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBJECT */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="gap-y-3 group">
                <FormLabel className="text-white transition-all duration-300 ease-out group-hover:text-sky-blue-200">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is this about?"
                    {...field}
                    className="bg-white h-10 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
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
              <FormItem className="gap-y-3 group">
                <FormLabel className="text-white transition-all duration-300 ease-out group-hover:text-sky-blue-200">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    {...field}
                    className="bg-white min-h-[120px] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg transform"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Messages */}
          {submitStatus.type === 'error' && (
            <div className="p-3 rounded-md bg-red-100 text-red-800 border border-red-200">
              {submitStatus.message}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="flex items-center justify-center w-full pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FAAF2F] hover:bg-[#e89b1e] text-black text-lg px-8 py-3 h-auto rounded-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-[#f4af2f]" />
            <DialogTitle className="text-2xl font-bold">Thank you for contacting us!</DialogTitle>
            <DialogDescription>
             Your message has been received. Our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-[#f4af2f] hover:bg-[#d19424] text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ContactForm;
