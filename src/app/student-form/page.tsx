"use client";

import React, { useState, useEffect } from "react";
import PageHeroSection from "@/components/common/PageHeroSection";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
  ageGroup: string;
  gender: string;
  learningInterest: string;
  studentCount: string;
  pricingPlan: string;
  preferredDate: string;
  preferredTime: string;
  daysPerWeek: string[];
}

const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

const StudentFormPage = () => {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<StudentFormData>();

  const onSubmitStep1 = () => {
    setStep(2);
  };

  // ✅ Brevo integration here (no JSX changes)
  const onSubmitFinal = async (data: StudentFormData) => {
    setIsSubmitting(true);
    // normalize phone to +E.164-like
    const phone =
      typeof data.phone === "string" && data.phone.trim().length
        ? data.phone.startsWith("+")
          ? data.phone
          : `+${data.phone}`
        : "";

    const payload = {
      formType: "student" as const,
      data: {
        ...data,
        phone,
        // ensure daysPerWeek is an array
        daysPerWeek: Array.isArray(data.daysPerWeek) ? data.daysPerWeek : [],
      },
      meta: {
        page: "/student-form",
        ts: Date.now(),
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
    };

    try {
      const res = await fetch("/api/student-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json && json.error)) {
        console.error("Brevo submit failed:", json);
        alert(json?.error || "Submission failed. Please try again.");
        return;
      }

      // your existing success behavior
      setShowPopup(true);
      setPopupVisible(true);
      setTimeout(() => {
        reset();
        setStep(1);
      }, 2000);
    } catch (e) {
      console.error(e);
      alert("Network error. Please try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (showPopup) setPopupVisible(true);
  }, [showPopup]);

  return (
    <React.Fragment>
      <div aria-describedby="student-form-page">
        <PageHeroSection title="Let’s begin your journey together" />

        <section className="pt-20 pb-16 bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="w-full sm:max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
              {/* Step Indicator */}
              <div className="flex items-center mb-8 w-full">
                {/* Step 1 */}
                <div className="flex flex-col items-start w-1/2">
                  <span className={`mb-2 text-sm font-medium ${step >= 1 ? "text-blue-900" : "text-gray-400"}`}>
                    Step 1
                  </span>
                  <div className="flex items-center w-full">
                    <div className={`w-5 h-5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-blue-900" : "bg-blue-200"}`} />
                    <div className="mx-1" />
                    <div className={`flex-1 h-[6px] rounded-full transition-colors duration-300 ${step >= 1 ? "bg-blue-900" : "bg-blue-200"}`} />
                  </div>
                </div>
                <div className="mx-1" />
                {/* Step 2 */}
                <div className="flex flex-col items-start w-1/2">
                  <span className={`mb-2 text-sm font-medium ${step >= 2 ? "text-blue-900" : "text-gray-400"}`}>
                    Step 2
                  </span>
                  <div className="flex items-center w-full">
                    <div className={`w-5 h-5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-blue-900" : "bg-blue-200"}`} />
                    <div className="mx-1" />
                    <div className={`flex-1 h-[6px] rounded-full transition-colors duration-300 ${step >= 2 ? "bg-blue-900" : "bg-blue-200"}`} />
                  </div>
                </div>
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmitStep1)} className="grid gap-6">
                  {/* First & Last Name */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium">First name</label>
                      <input
                        {...register("firstName", { required: "First name is required" })}
                        placeholder="First name"
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Last name</label>
                      <input
                        {...register("lastName", { required: "Last name is required" })}
                        placeholder="Last name"
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      placeholder="Email address"
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Age Group & Gender */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Age Group */}
                    <div>
                      <label className="block mb-1 text-sm font-medium">Select Age Group</label>
                      <select
                        {...register("ageGroup", { required: "Age group is required" })}
                        className="w-full border border-gray-300 rounded-md px-3 h-[42px] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Age Group</option>
                        <option value="5-10">5-10 years</option>
                        <option value="11-15">11-15 years</option>
                        <option value="16-20">16-20 years</option>
                        <option value="21+">21+ years</option>
                      </select>
                      {errors.ageGroup && <p className="text-red-500 text-xs mt-1">{errors.ageGroup.message}</p>}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block mb-1 text-sm font-medium">Gender</label>
                      <div className="flex gap-6 mt-2">
                        {["Male", "Female"].map((g) => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              value={g}
                              {...register("gender", { required: "Gender is required" })}
                              className="hidden peer"
                            />
                            <span className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-[#F4B841] peer-checked:bg-[#F4B841] peer-checked:ring-2 peer-checked:ring-[#F4B841] peer-checked:ring-offset-1" />
                            <span className="text-sm">{g}</span>
                          </label>
                        ))}
                      </div>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Mobile</label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <PhoneInput
                          country="in"
                          value={field.value}
                          onChange={field.onChange}
                          inputProps={{ name: field.name, required: true }}
                          containerClass="!w-full"
                          inputClass="!w-full !h-[42px] !pl-[48px] !pr-4 !text-sm !border !border-gray-300 !rounded-md"
                          buttonClass="!border !border-gray-300 !rounded-l-md !bg-white"
                        />
                      )}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Country */}
                  <div className="relative">
                    <label className="block mb-1 text-sm font-medium">Country</label>
                    <div className="relative">
                      <select
                        {...register("country", { required: "Country is required" })}
                        className="w-full border border-gray-300 rounded-md px-3 pr-8 h-[42px] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Choose your country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end">
                    <Button type="submit" className="px-8 py-2 bg-[#003B73] text-white rounded-md">
                      Next Step
                    </Button>
                  </div>
                </form>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmitFinal)} className="grid gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Select the course</h3>
                    <div className="flex flex-wrap gap-x-10 gap-y-3">
                      {["Quran", "Islamic Studies", "Arabic"].map((val) => (
                        <label key={val} className="flex items-center gap-3 cursor-pointer select-none">
                          <input
                            type="radio"
                            value={val}
                            {...register("learningInterest", { required: "Please select a learning interest" })}
                            className="appearance-none w-5 h-5 rounded-full border border-gray-300 bg-white focus:outline-none relative checked:bg-[#F4B841] checked:border-[#F4B841] after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-7 after:h-7 after:rounded-full after:border-2 after:border-[#F4B841] after:opacity-40 checked:after:block after:hidden"
                          />
                          <span className="text-gray-700 text-lg">{val}</span>
                        </label>
                      ))}
                    </div>
                    {errors.learningInterest && (
                      <p className="text-red-500 text-xs mt-1">Please select a learning interest</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">How Many Hours per Week?</h3>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <label key={n}>
                          <input type="radio" value={n} {...register("studentCount", { required: "Please select number of hours" })} className="peer hidden" />
                          <div className="w-14 h-14 flex items-center justify-center rounded-full peer-checked:bg-[#F4B841] peer-checked:text-white bg-[#F5F7FA] text-gray-700 font-bold cursor-pointer text-lg transition">
                            {n}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.studentCount && (
                      <p className="text-red-500 text-xs mt-1">Please select number of hours</p>
                    )}
                  </div>

                  {/* Pricing Plan */}
                  <div className="mt-6">
                    <div className="grid grid-cols-2 items-end">
                      <h3 className="text-lg font-semibold text-neutral-800">Choose Your Pricing Plan</h3>
                      <span className="text-lg font-semibold text-neutral-800">Pricing / Month</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {[
                        { name: "Basic", rate: 8, monthly: 32 },
                        { name: "Essential", rate: 9, monthly: 36 },
                        { name: "Premium", rate: 11, monthly: 44 },
                        { name: "Platinum", rate: 14, monthly: 56 },
                      ].map((plan) => {
                        const selected = watch("pricingPlan") === plan.name;
                        return (
                          <div key={plan.name} className="grid grid-cols-2 gap-4 items-center">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="radio"
                                value={plan.name}
                                {...register("pricingPlan", { required: "Please select a plan" })}
                                className="peer hidden"
                              />
                              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-[#F4B841]" : "border-gray-400"}`}>
                                {selected && <span className="w-2.5 h-2.5 bg-[#F4B841] rounded-full" />}
                              </span>
                              <span className={`text-base flex items-baseline gap-1 ${selected ? "font-semibold text-neutral-900" : "font-medium text-neutral-600"}`}>
                                <span className="inline-block min-w-[90px]">{plan.name}</span>
                                <span className="inline-block min-w-[50px] text-right">- ${plan.rate}</span>
                                <span className="text-sm ml-1">/H</span>
                              </span>
                            </label>

                            <div className={`w-20 text-center py-1 rounded-md border font-semibold text-sm ${selected ? "bg-[#F4B841] text-white border-[#F4B841]" : "bg-gray-100 text-gray-800 border-gray-300"}`}>
                              ${plan.monthly}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {errors.pricingPlan && <p className="text-red-500 text-xs mt-2">{errors.pricingPlan.message}</p>}
                  </div>

                  {/* Days per Week */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Which Days Work Best for You?</h3>
                    <div className="flex gap-8 mb-8">
                      {["Mon", "Tue", "Wed", "Thu"].map((day) => (
                        <label key={day} className="cursor-pointer">
                          <input
                            type="checkbox"
                            value={day}
                            {...register("daysPerWeek", { required: "Please select at least one day" })}
                            className="hidden peer"
                          />
                          <div className="w-[70px] py-2 rounded-lg text-sm font-medium text-center border transition peer-checked:bg-[#F4B841] peer-checked:text-white peer-checked:border-[#F4B841] border-gray-300 text-neutral-700 hover:border-[#F4B841]/70">
                            {day}
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-8">
                      {["Fri", "Sat", "Sun"].map((day) => (
                        <label key={day} className="cursor-pointer">
                          <input
                            type="checkbox"
                            value={day}
                            {...register("daysPerWeek", { required: "Please select at least one day" })}
                            className="hidden peer"
                          />
                          <div className="w-[70px] py-2 rounded-lg text-sm font-medium text-center border transition peer-checked:bg-[#F4B841] peer-checked:text-white peer-checked:border-[#F4B841] border-gray-300 text-neutral-700 hover:border-[#F4B841]/70">
                            {day}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.daysPerWeek && <p className="text-red-500 text-xs mt-1">{errors.daysPerWeek.message}</p>}
                  </div>



                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-1">Preferred Date</label>
                      <input type="date" {...register("preferredDate", { required: "Preferred date is required" })} className="w-full border rounded-lg px-4 py-2 text-sm" />
                      {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Preferred Time</label>
                      <input type="time" {...register("preferredTime", { required: "Preferred time is required" })} className="w-full border rounded-lg px-4 py-2 text-sm" />
                      {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-3">
                    <Button type="button" onClick={() => setStep(1)} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md">
                      Previous
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-900 text-white px-8 py-2 rounded-md">
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Popup */}
          {showPopup && (
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-500 ${popupVisible ? "opacity-100" : "opacity-0"}`}>
              <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-xl font-semibold text-green-600 mb-2">Thank you for reaching out!</h2>
                <p className="text-gray-700 mb-4 text-sm">
                  We have received your message and will get back to you as soon as possible.
                  Keep an eye on your inbox for our response.
                </p>
                <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-blue-600 text-white rounded-full">
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </React.Fragment>
  );
};

export default StudentFormPage;
