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

import "react-phone-number-input/style.css";
import PhoneInput, { Country } from "react-phone-number-input";
import { useCountryCode } from "@/hooks/useCountry";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(50, "Max 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Please enter your phone number"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  message: z.string().min(10, "Please provide a message (min 10 characters)").max(500, "Message is too long").optional(),
});

const ReqForm = () => {
  const {countryCode} = useCountryCode();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setShowConfirmation(true);
        form.reset();
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
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
              <FormItem className="gap-y-3">
                <FormLabel className="text-white">Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="bg-white h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="gap-y-3">
                <FormLabel className="text-white">Mobile No</FormLabel>
                <FormControl>
                  <PhoneInput
                  international
                    defaultCountry={
                      countryCode == "undefined"
                        ? "AE"
                        : (countryCode as Country)
                    }
                    value={field.value}
                    onChange={(phone) => {
                      field.onChange(phone);
                    }}
                    className="h-10 bg-white px-3.5 rounded-md"
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
                    placeholder="Enter your email"
                    {...field}
                    className="bg-white h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Preferred Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem className="gap-y-3">
                  <FormLabel className="text-white">Preferred Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-white h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem className="gap-y-3">
                  <FormLabel className="text-white">Preferred Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="bg-white h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* MESSAGE */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="gap-y-3">
                <FormLabel className="text-white">
                  Short your personal message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your message"
                    {...field}
                    className="bg-white h-28"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"secondary"} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Get request"}
          </Button>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-[#f4af2f]" />
            <DialogTitle className="text-2xl font-bold">Thank you!</DialogTitle>
            <DialogDescription>
            Your request has been received. Our team will get in touch with you shortly.
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

export default ReqForm;
