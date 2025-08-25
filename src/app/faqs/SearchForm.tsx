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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  searchQuery: z.string().min(1, "Please enter a search term"),
});

const SearchForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Implement actual search functionality
    if (values.searchQuery.trim()) {
      // You can implement search logic here
      // For now, we'll log the search query
      console.log("Searching for:", values.searchQuery);
      
      // Example: You could redirect to search results page
      // router.push(`/faqs/search?q=${encodeURIComponent(values.searchQuery)}`);
      
      // Or trigger a search function
      // performSearch(values.searchQuery);
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
                    name="searchQuery"
                    render={({ field }) => (
              <FormItem className="">
                <div aria-describedby="input-wrapper" className="relative">
                  <FormControl>
                    <Input
                      placeholder="Enter the keyword..."
                      {...field}
                      className="bg-white w-80 pr-24 md:pr-28 sm:w-md h-12"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant={"secondary"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full text-base md:text-xl"
                  >
                    Search
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

export default SearchForm;
