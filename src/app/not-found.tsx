"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white">
      <div className="w-full max-w-3xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 w-full max-w-[640px] transition-transform duration-500 ease-out hover:scale-105 transform">
          <Image
            src="/404.png"
            alt="404 Error illustration"
            width={640}
            height={300}
            priority
            className="mx-auto h-auto w-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-4">
          Page Not Found!
        </h1>

        {/* Copy */}
        <p className="text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          The page you're seeking might have moved or been removed.
          <br className="hidden sm:block" />
          Let's guide you back to your Quranic journey
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Button
            asChild
            className="rounded-full px-6 py-3 h-auto text-white bg-[#0B3A63] hover:bg-[#082C4A] transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg transform"
          >
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
