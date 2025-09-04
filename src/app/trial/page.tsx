"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeroSection from "@/components/common/PageHeroSection";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface TrialFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  learningInterest: string;
  studentCount: string;
  preferredTeacher: string;
  referralSource: string;
  preferredDate: string;
  preferredTime: string;
}

const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];



const TrialFormPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-detect country and country code
  const [geoCountry, setGeoCountry] = useState("");
  const [geoCountryCode, setGeoCountryCode] = useState("");
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setGeoCountry(data.country_name || "");
        setGeoCountryCode((data.country_code || "").toLowerCase());
      });
  }, []);

  // Calculate tomorrow's date in YYYY-MM-DD format
  const tomorrow = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrialFormData>();

  const onSubmitStep1 = () => {
    setStep(2);
  };

  const onSubmitFinal = async (data: TrialFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // --- Enhanced Brevo submission with proper data structure ---
      const phone = data.phone?.startsWith("+") ? data.phone : `+${data.phone}`;
      const payload = {
        formType: "trial" as const,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          country: data.country,
          phone: phone,
          learningInterest: data.learningInterest,
          studentCount: data.studentCount,
          preferredTeacher: data.preferredTeacher,
          referralSource: data.referralSource,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        },
        meta: {
          page: "/trial",
          ts: Date.now(),
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
        },
      };

      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const json = await res.json();
      
      if (!res.ok || !json?.ok) {
        console.error("Brevo error:", json);
        setSubmitError(json?.error || "Failed to submit. Please try again.");
        return;
      }

      // --- Success behavior - Redirect to thank you page ---
      console.log("Trial form submitted successfully, redirecting to thank you page");
      router.push('/thank-you');
      
    } catch (e) {
      console.error("Submission error:", e);
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // No longer needed as popup is removed
  }, []);

  return (
    <React.Fragment>
      <div aria-describedby="sitemap-page">
        <PageHeroSection title="Let's begin your journey together" />

        <section className="pt-20 pb-16 bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4">
    
 <div className="w-full sm:max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
    {/* Step Indicator */}
      <div className="flex items-center mb-8 w-full">
        {/* Step 1 */}
      <div className="flex flex-col items-start w-1/2">
    {/* Step Label */}
    <span
      className={`mb-2 text-sm font-medium ${
        step >= 1 ? "text-blue-900" : "text-gray-400"
      }`}
    >
      Step 1
    </span>
    {/* Circle + Line */}
    <div className="flex items-center w-full">
      {/* Circle */}
      <div
        className={`w-5 h-5 rounded-full transition-colors duration-300 ${
          step >= 1 ? "bg-blue-900" : "bg-blue-200"
        }`}
      />
      {/* Space */}
      <div className="mx-1" />
      {/* Line */}
      <div
        className={`flex-1 h-[6px] rounded-full transition-colors duration-300 ${
          step >= 1 ? "bg-blue-900" : "bg-blue-200"
        }`}
      />
    </div>
  </div>

  {/* Space between steps */}
  <div className="mx-1" />

  {/* Step 2 */}
  <div className="flex flex-col items-start w-1/2">
    {/* Step Label */}
    <span
      className={`mb-2 text-sm font-medium ${
        step >= 2 ? "text-blue-900" : "text-gray-400"
      }`}
    >
      Step 2
    </span>
    {/* Circle + Line */}
    <div className="flex items-center w-full">
      {/* Circle */}
      <div
        className={`w-5 h-5 rounded-full transition-colors duration-300 ${
          step >= 2 ? "bg-blue-900" : "bg-blue-200"
        }`}
      />
      {/* Space */}
      <div className="mx-1" />
      {/* Line after Step 2 */}
      <div
        className={`flex-1 h-[6px] rounded-full transition-colors duration-300 ${
          step >= 2 ? "bg-blue-900" : "bg-blue-200"
        }`}
      />
    </div>
  </div>
</div>

              {/* Step 1 */}
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitStep1)} className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
  <div>
    <label className="block mb-1 text-sm font-medium">First Name</label>
    <input
      {...register("firstName", { required: true })}
      placeholder="First Name"
      className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.firstName && (
      <p className="text-red-500 text-sm mt-1">Required</p>
    )}
  </div>

  <div>
    <label className="block mb-1 text-sm font-medium">Last Name</label>
    <input
      {...register("lastName", { required: true })}
      placeholder="Last Name"
      className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {errors.lastName && (
      <p className="text-red-500 text-sm mt-1">Required</p>
    )}
  </div>
</div>


                <div>
  <label className="block mb-1 text-sm font-medium">Email</label>
  <input
    {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })}
    type="email"
    placeholder="Email address"
    className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email.type === 'pattern' ? errors.email.message : 'Required'}</p>
  )}
</div>

                 <div className="grid gap-6">
  {/* Phone Input */}
  <div>
    <label className="block mb-1 text-sm font-medium">Phone</label>
    <Controller
      name="phone"
      control={control}
      rules={{ required: "Phone number is required" }}
      render={({ field }) => (
        <PhoneInput
          country={geoCountryCode || undefined}
          value={field.value}
          onChange={field.onChange}
          inputProps={{ name: field.name, required: true }}
          containerClass="!w-full"
          inputClass="!w-full !h-[42px] !pl-[48px] !pr-4 !text-sm !border !rounded-lg"
          buttonClass="!border !rounded-l-lg"
        />
      )}
    />
    {errors.phone && (
      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
    )}
  </div>

  {/* Country Dropdown */}
<div className="relative">
  <label className="block mb-1 text-sm font-medium">Country</label>
  <div className="relative">
    <select
      {...register("country", { required: "Country is required" })}
      className="w-full border border-gray-300 rounded-md px-3 pr-8 h-[42px] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={geoCountry && countries.includes(geoCountry) ? geoCountry : undefined}
      onChange={e => {
        // let react-hook-form handle the value
        register("country").onChange(e);
      }}
    >
      <option value="">Choose your country</option>
      {countries.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
    {/* Simple downward chevron */}
    <span
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-2.5 h-2.5 border-t-2 border-r-2 border-gray-500 rotate-135"
    ></span>
  </div>
  {errors.country && (
    <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
  )}
</div>

</div>

                <div className="flex justify-end">
                        <Button
                type="submit" className="px-8 py-2 bg-blue-900 text-white rounded-md">
                 Next Step
                </Button>
                </div>

                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmitFinal)} className="grid gap-6 text-left">
                  <div>
  <h3 className="font-semibold text-lg mb-3">What would you like to learn?</h3>
<div className="flex flex-wrap gap-x-10 gap-y-3">
  {["Quran", "Islamic Studies", "Arabic"].map((val) => (
    <label
      key={val}
      className="flex items-center gap-3 cursor-pointer select-none"
    >
      <input
        type="radio"
        value={val}
        {...register("learningInterest", { required: "Please select a learning interest" })}
        className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white
                   focus:outline-none relative
                   checked:bg-[#F4B841] checked:border-[#F4B841]
                   after:content-[''] after:absolute after:top-1/2 after:left-1/2
                   after:-translate-x-1/2 after:-translate-y-1/2
                   after:w-7 after:h-7 after:rounded-full
                   after:border-2 after:border-[#F4B841] after:opacity-40
                   checked:after:block after:hidden"
      />
      <span className="text-gray-700 text-lg">{val}</span>
    </label>
  ))}

  <div className="basis-full" />

  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="radio"
      value="Others"
              {...register("learningInterest", { required: "Please select a learning interest" })}
      className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white
                 focus:outline-none relative
                 checked:bg-[#F4B841] checked:border-[#F4B841]
                 after:content-[''] after:absolute after:top-1/2 after:left-1/2
                 after:-translate-x-1/2 after:-translate-y-1/2
                 after:w-7 after:h-7 after:rounded-full
                 after:border-2 after:border-[#F4B841] after:opacity-40
                 checked:after:block after:hidden"
    />
    <span className="text-gray-700 text-lg">Others</span>
  </label>
</div>
{errors.learningInterest && (
  <p className="text-red-500 text-sm mt-1">Please select a learning interest</p>
)}
</div>


              <div>
  <h3 className="font-semibold text-lg mb-3">How many students will join?</h3>
  <div className="flex gap-4">
    {[1, 2, 3, 4, 5].map((n) => (
      <label key={n}>
        <input
          type="radio"
          value={n}
          {...register("studentCount", { required: "Please select number of students" })}
          className="peer hidden"
        />
        <div className="w-14 h-14 flex items-center justify-center rounded-full peer-checked:bg-[#F4B841] peer-checked:text-white bg-[#F5F7FA] text-gray-700 font-bold cursor-pointer text-lg transition">
          {n}
        </div>
      </label>
    ))}
  </div>
  {errors.studentCount && (
    <p className="text-red-500 text-sm mt-1">Please select number of students</p>
  )}
</div>


     <div>
  <h3 className="font-semibold text-lg mb-3">Your preferred teacher</h3>
  <div className="flex flex-wrap gap-x-10 gap-y-6">
    {["Male", "Female", "Either"].map((val) => (
      <label key={val} className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="radio"
          value={val}
          {...register("preferredTeacher", { required: "Please select teacher preference" })}
          className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white
                     focus:outline-none relative
                     checked:bg-[#F4B841] checked:border-[#F4B841]
                     after:content-[''] after:absolute after:top-1/2 after:left-1/2
                     after:-translate-x-1/2 after:-translate-y-1/2
                     after:w-7 after:h-7 after:rounded-full
                     after:border-2 after:border-[#F4B841] after:opacity-40
                     checked:after:block after:hidden"
        />
        <span className="text-gray-700 text-lg">{val}</span>
      </label>
    ))}
  </div>
  {errors.preferredTeacher && (
    <p className="text-red-500 text-sm mt-1">Please select teacher preference</p>
  )}
</div>



         <div>
  <h3 className="font-semibold text-lg mb-3">How did you find us?</h3>
  <div className="flex flex-wrap gap-x-10 gap-y-3">
    {/* First row */}
    {["Friends", "Social Media", "Email"].map((val) => (
      <label key={val} className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="radio"
          value={val}
          {...register("referralSource", { required: "Please select how you found us" })}
          className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white
                     focus:outline-none relative
                     checked:bg-[#F4B841] checked:border-[#F4B841]
                     after:content-[''] after:absolute after:top-1/2 after:left-1/2
                     after:-translate-x-1/2 after:-translate-y-1/2
                     after:w-7 after:h-7 after:rounded-full
                     after:border-2 after:border-[#F4B841] after:opacity-40
                     checked:after:block after:hidden"
        />
        <span className="text-gray-700 text-lg">{val}</span>
      </label>
    ))}

    {/* Force new line */}
    <div className="basis-full" />

    {/* Second row */}
    {["Google", "Others"].map((val) => (
      <label key={val} className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="radio"
          value={val}
          {...register("referralSource", { required: "Please select how you found us" })}
          className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white
                     focus:outline-none relative
                     checked:bg-[#F4B841] checked:border-[#F4B841]
                     after:content-[''] after:absolute after:top-1/2 after:left-1/2
                     after:-translate-x-1/2 after:-translate-y-1/2
                     after:w-7 after:h-7 after:rounded-full
                     after:border-2 after:border-[#F4B841] after:opacity-40
                     checked:after:block after:hidden"
        />
        <span className="text-gray-700 text-lg">{val}</span>
      </label>
    ))}
  </div>
  {errors.referralSource && (
    <p className="text-red-500 text-sm mt-1">Please select how you found us</p>
  )}
</div>
              

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-1">Preferred Date</label>
                      <input type="date" min={tomorrow} {...register("preferredDate", { required: "Preferred date is required" })} className="w-full border rounded-lg px-4 py-2 text-sm" />
                      {errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">Please select a preferred date</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Preferred Time</label>
                      <input type="time" {...register("preferredTime", { required: "Preferred time is required" })} className="w-full border rounded-lg px-4 py-2 text-sm" />
                      {errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">Please select a preferred time</p>
                      )}
                    </div>
                  </div>

                  {/* Error Display */}
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}

                <div className="flex justify-end mt-4 space-x-3">
  <Button
    type="button"
    onClick={() => setStep(1)}
    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md"
    disabled={isSubmitting}
  >
    Previous
  </Button>
  <Button
    type="submit"
    className="bg-blue-900 text-white px-8 py-2 rounded-md"
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        Submitting...
      </div>
    ) : (
      'Submit'
    )}
  </Button>
</div>

                </form>
              )}
            </div>
          </div>

          {/* Popup */}
          {/* Removed as per edit hint */}
        </section>
      </div>
    </React.Fragment>
  );
};

export default TrialFormPage;
