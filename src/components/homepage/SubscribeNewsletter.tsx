"use client";
import React, { useState } from "react";
import EmailForm from "./EmailForm";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const SubscribeNewsletter = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = () => {
    setError("");
    setShowConfirmation(true);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  return (
    <React.Fragment>
      <section
        aria-describedby="subscribe-newsletter"
        className={cn(
          "bg-regal-blue-500 py-10 sm:py-16 relative overflow-hidden",
          // big shape
          "before:absolute before:z-[2] before:w-[450] before:h-[450] before:bg-[#0C4681] before:rounded-full before:top-full before:-right-40 before:-translate-y-20",
          // small shape
          'after:absolute after:z-[2] after:w-[450px] after:h-[450px] after:top-full after:-right-4 after:-translate-y-8 after:bg-[#0D4B89] after:rounded-full'
        )}
      >
        <div className="container">
          <div aria-describedby="main-wrapper">
            <div
              aria-describedby="content-wrapper"
              className="flex items-center justify-center flex-col gap-y-8 max-w-4xl mx-auto relative z-[5]"
            >
              <h6 className="px-5 text-base font-medium text-white text-center py-2.5 bg-[#155699] flex items-center justify-center rounded-full w-max border border-[#1E63AA]">
                Get the latest
              </h6>
              <h3 className="text-3xl sm:text-5xl font-bold text-white text-center leading-snug">
                SUBSCRIBE TO OUR NEWSLETTER!
              </h3>

              <p className="text-base sm:text-xl font-normal text-white text-center">
                Our most valuable blog insights are shared every two weeks. Stay
                connected on Facebook, Instagram, LinkedIn, YouTube, or
                subscribe below.
              </p>

              <div aria-describedby="form-wrapper">
                <EmailForm onSuccess={handleSuccess} onError={handleError} />
                {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <CheckCircle2 className="h-16 w-16 text-[#f4af2f]" />
            <DialogTitle className="text-2xl font-bold">Thank you for subscribing!</DialogTitle>
            <DialogDescription>
              You're now on our list. Stay tuned for updates!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-[#f4af2f] hover:bg-[#d19424] text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SubscribeNewsletter;
