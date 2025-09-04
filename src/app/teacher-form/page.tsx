"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "@/components/ui/button";
import PageHeroSection from "@/components/common/PageHeroSection";
import { useRouter } from "next/navigation"; 

// Validation Schema (all fields required)
const teacherFormSchema = z.object({
  // Step 1
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  nationality: z.string().min(1, "Nationality is required"),
  occupation: z.string().min(1, "Occupation is required"),
  gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  dob: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  aboutMe: z.string().min(10, "About me must be at least 10 characters"),
  facebook: z.string().min(1, "Facebook is required"),
  profileImage: z
    .any()
    .refine((v) => v && v.length > 0, "Profile image is required"),
  // Step 2
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.string().min(1, "Experience is required"),
  motherLanguage: z.string().min(1, "Mother language is required"),
  otherLanguage: z.string().min(1, "Other language is required"),
  cv: z
    .any()
    .refine((v) => v && v.length > 0, "CV is required"),
  // Step 3
  readingAudio: z
    .any()
    .refine((v) => v && v.length > 0, "Reading audio is required"),
  recitationAudio: z
    .any()
    .refine((v) => v && v.length > 0, "Recitation audio is required"),
  // Step 4
  applyingFor: z.string().min(1, "Please select what you're applying for"),
  teachTajweedInEnglish: z.string().min(1, "Please select your preference"),
  preferredInterviewTime: z.string().min(1, "Preferred interview time is required"),
  hoursPerWeek: z.string().min(1, "Hours per week is required"),
  haveIjazah: z.string().min(1, "Please select if you have Ijazah"),
  haveChildren: z.string().min(1, "Please select if you have children"),
  expectedSalary: z.string().min(1, "Expected salary is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  idealCandidate: z.string().min(1, "Please describe your ideal candidate"),
  discoverySources: z.array(z.string()).min(1, "Please select how you found us"),
  declaration: z.boolean().refine((val) => val === true, "You must agree to the declaration"),
});

type TeacherFormData = z.infer<typeof teacherFormSchema>;

export default function TeacherFormPage() {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherFormSchema),
    mode: "onBlur",
  });

  // Geolocation state for country and code
  const [geoCountry, setGeoCountry] = useState("");
  const [geoCountryCode, setGeoCountryCode] = useState("");
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        setGeoCountry(data.country_name || "");
        setGeoCountryCode((data.country_code || "").toLowerCase());
        if (data.country_code) {
          setValue("country", data.country_code.toLowerCase());
        }
      });
  }, [setValue]);

  // ✅ Validate only fields in the current step
  const stepFields: Record<number, (keyof TeacherFormData)[]> = {
    1: [
      "firstName",
      "lastName",
      "nationality",
      "occupation",
      "gender",
      "email",
      "phone",
      "country",
      "dob",
      "maritalStatus",
      "aboutMe",
      "facebook",
      "profileImage",
    ],
    2: ["qualification", "experience", "motherLanguage", "otherLanguage", "cv"],
    3: ["readingAudio", "recitationAudio"],
    4: ["applyingFor", "teachTajweedInEnglish", "preferredInterviewTime", "hoursPerWeek", "haveIjazah", "haveChildren", "expectedSalary", "employmentType", "idealCandidate", "discoverySources", "declaration"],
  };

  // ⬇️ ONLY CHANGE: onSubmit now posts FormData to /api/teacher-apply
  const onSubmit = async (data: TeacherFormData) => {
    setIsSubmitting(true);
    try {
      const fd = new FormData();

      // scalars
      fd.set("firstName", data.firstName || "");
      fd.set("lastName", data.lastName || "");
      fd.set("nationality", data.nationality || "");
      fd.set("occupation", data.occupation || "");
      fd.set("gender", data.gender || "");
      fd.set("email", data.email || "");
      fd.set("phone", data.phone?.startsWith("+") ? data.phone : `+${data.phone || ""}`);
      fd.set("country", data.country || "");
      fd.set("dob", data.dob || "");
      fd.set("maritalStatus", data.maritalStatus || "");
      fd.set("aboutMe", data.aboutMe || "");
      fd.set("facebook", data.facebook || "");
      fd.set("qualification", data.qualification || "");
      fd.set("experience", data.experience || "");
      fd.set("motherLanguage", data.motherLanguage || "");
      fd.set("otherLanguage", data.otherLanguage || "");

      // Additional fields from step 4
      fd.set("applyingFor", data.applyingFor || "");
      fd.set("teachTajweedInEnglish", data.teachTajweedInEnglish || "");
      fd.set("preferredInterviewTime", data.preferredInterviewTime || "");
      fd.set("hoursPerWeek", data.hoursPerWeek || "");
      fd.set("haveIjazah", data.haveIjazah || "");
      fd.set("haveChildren", data.haveChildren || "");
      fd.set("expectedSalary", data.expectedSalary || "");
      fd.set("employmentType", data.employmentType || "");
      fd.set("idealCandidate", data.idealCandidate || "");
      
      // Handle discovery sources array
      const discoverySources = data.discoverySources || [];
      discoverySources.forEach((source: string) => {
        fd.append("discoverySources", source);
      });
      
      fd.set("declaration", data.declaration ? "true" : "false");

      // files (add only if provided — Zod already enforces they exist)
      if (data.profileImage?.[0]) fd.set("profileImage", data.profileImage[0]);
      if (data.cv?.[0]) fd.set("cv", data.cv[0]);
      if (data.readingAudio?.[0]) fd.set("readingAudio", data.readingAudio[0]);
      if (data.recitationAudio?.[0]) fd.set("recitationAudio", data.recitationAudio[0]);

      const res = await fetch("/api/teacher-apply", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.error) {
        console.error("Teacher apply failed:", json);
        alert(json?.error || "Submission failed. Please try again.");
        return;
      }

      // unchanged success behavior
      setShowPopup(true);
      setTimeout(() => {
        router.push("/career");
      }, 5000);
    } catch (e) {
      console.error(e);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HERO added to match student form */}
      <div aria-describedby="teacher-form-page">
        <PageHeroSection title="Teacher Application" />
      </div>

      {/* ORIGINAL CONTENT UNCHANGED BELOW */}
      <div className="pt-20 pb-16 bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="w-full sm:max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-12 w-full max-w-2xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center w-1/4">
                <span
                  className={`mb-2 text-sm font-medium ${
                    step === 1
                      ? "text-blue-900 font-semibold"
                      : step > 1
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  Step 1
                </span>
                <div className="flex items-center w-full">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step === 1
                        ? "bg-blue-900 text-white"
                        : step > 1
                        ? "bg-blue-200 text-blue-900"
                        : "bg-blue-200 text-gray-400"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`flex-1 h-[6px] mx-1 rounded-full transition-colors duration-300 ${
                      step >= 1 ? "bg-blue-900" : "bg-blue-200"
                    }`}
                  />
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center w-1/4">
                <span
                  className={`mb-2 text-sm font-medium ${
                    step === 2
                      ? "text-blue-900 font-semibold"
                      : step > 2
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  Step 2
                </span>
                <div className="flex items-center w-full">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step === 2
                        ? "bg-blue-900 text-white"
                        : step > 2
                        ? "bg-blue-200 text-blue-900"
                        : "bg-blue-200 text-gray-400"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`flex-1 h-[6px] mx-1 rounded-full transition-colors duration-300 ${
                      step >= 2 ? "bg-blue-900" : "bg-blue-200"
                    }`}
                  />
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center w-1/4">
                <span
                  className={`mb-2 text-sm font-medium ${
                    step === 3
                      ? "text-blue-900 font-semibold"
                      : step > 3
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  Step 3
                </span>
                <div className="flex items-center w-full">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step === 3
                        ? "bg-blue-900 text-white"
                        : step > 3
                        ? "bg-blue-200 text-blue-900"
                        : "bg-blue-200 text-gray-400"
                    }`}
                  >
                    3
                  </div>
                  <div
                    className={`flex-1 h-[6px] mx-1 rounded-full transition-colors duration-300 ${
                      step >= 3 ? "bg-blue-900" : "bg-blue-200"
                    }`}
                  />
                </div>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col items-center w-1/4">
                <span
                  className={`mb-2 text-sm font-medium ${
                    step === 4 ? "text-blue-900 font-semibold" : "text-gray-400"
                  }`}
                >
                  Step 4
                </span>
                <div className="flex items-center w-full">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      step === 4 ? "bg-blue-900 text-white" : "bg-blue-200 text-gray-400"
                    }`}
                  >
                    4
                  </div>
                  <div
                    className={`flex-1 h-[6px] mx-1 rounded-full transition-colors duration-300 ${
                      step === 4 ? "bg-blue-900" : "bg-blue-200"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* FORM */}
            <form
              onSubmit={(e) => {
                if (step < 4) {
                  e.preventDefault(); // prevent submission before final step
                  return;
                }
                handleSubmit(onSubmit)(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && step < 4) e.preventDefault();
              }}
              className="grid gap-6"
            >
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-2">Fill your application</h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium">First Name</label>
                      <input
                        {...register("firstName", { required: "First name is required" })}
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                        placeholder="First name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Last Name</label>
                      <input
                        {...register("lastName", { required: "Last name is required" })}
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                        placeholder="Last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Gender</label>
                    <select
                      {...register("gender", { required: "Gender is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs">{errors.gender.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}

                  {/* Auto-detect country and code for Mobile */}

                  {/* Auto-detect country and code for Mobile */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Mobile</label>
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
                          inputClass="!w-full !h-[42px] !pl-[48px] !pr-4 !text-sm !border !border-gray-300 !rounded-md"
                          buttonClass="!border !border-gray-300 !rounded-l-md !bg-white"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Country</label>
                    <select
                      {...register("country", { required: "Country is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px] text-gray-700"
                    >
                      <option value="" disabled>
                        Choose your country
                      </option>
                      <option value="af">Afghanistan</option>
                      <option value="al">Albania</option>
                      <option value="dz">Algeria</option>
                      <option value="ad">Andorra</option>
                      <option value="ao">Angola</option>
                      <option value="ag">Antigua &amp; Deps</option>
                      <option value="ar">Argentina</option>
                      <option value="am">Armenia</option>
                      <option value="au">Australia</option>
                      <option value="at">Austria</option>
                      <option value="az">Azerbaijan</option>
                      <option value="bs">Bahamas</option>
                      <option value="bh">Bahrain</option>
                      <option value="bd">Bangladesh</option>
                      <option value="bb">Barbados</option>
                      <option value="by">Belarus</option>
                      <option value="be">Belgium</option>
                      <option value="bz">Belize</option>
                      <option value="bj">Benin</option>
                      <option value="bt">Bhutan</option>
                      <option value="bo">Bolivia</option>
                      <option value="ba">Bosnia Herzegovina</option>
                      <option value="bw">Botswana</option>
                      <option value="br">Brazil</option>
                      <option value="bn">Brunei</option>
                      <option value="bg">Bulgaria</option>
                      <option value="bf">Burkina</option>
                      <option value="bi">Burundi</option>
                      <option value="kh">Cambodia</option>
                      <option value="cm">Cameroon</option>
                      <option value="ca">Canada</option>
                      <option value="cv">Cape Verde</option>
                      <option value="cf">Central African Rep</option>
                      <option value="td">Chad</option>
                      <option value="cl">Chile</option>
                      <option value="cn">China</option>
                      <option value="co">Colombia</option>
                      <option value="km">Comoros</option>
                      <option value="cg">Congo</option>
                      <option value="cd">{"Congo {Democratic Rep}"}</option>
                      <option value="cr">Costa Rica</option>
                      <option value="hr">Croatia</option>
                      <option value="cu">Cuba</option>
                      <option value="cy">Cyprus</option>
                      <option value="cz">Czech Republic</option>
                      <option value="dk">Denmark</option>
                      <option value="dj">Djibouti</option>
                      <option value="dm">Dominica</option>
                      <option value="do">Dominican Republic</option>
                      <option value="tl">East Timor</option>
                      <option value="ec">Ecuador</option>
                      <option value="eg">Egypt</option>
                      <option value="sv">El Salvador</option>
                      <option value="gq">Equatorial Guinea</option>
                      <option value="er">Eritrea</option>
                      <option value="ee">Estonia</option>
                      <option value="et">Ethiopia</option>
                      <option value="fj">Fiji</option>
                      <option value="fi">Finland</option>
                      <option value="fr">France</option>
                      <option value="ga">Gabon</option>
                      <option value="gm">Gambia</option>
                      <option value="ge">Georgia</option>
                      <option value="de">Germany</option>
                      <option value="gh">Ghana</option>
                      <option value="gr">Greece</option>
                      <option value="gd">Grenada</option>
                      <option value="gt">Guatemala</option>
                      <option value="gn">Guinea</option>
                      <option value="gw">Guinea-Bissau</option>
                      <option value="gy">Guyana</option>
                      <option value="ht">Haiti</option>
                      <option value="hn">Honduras</option>
                      <option value="hu">Hungary</option>
                      <option value="is">Iceland</option>
                      <option value="in">India</option>
                      <option value="id">Indonesia</option>
                      <option value="ir">Iran</option>
                      <option value="iq">Iraq</option>
                      <option value="ie">{"Ireland {Republic}"}</option>
                      <option value="il">Israel</option>
                      <option value="it">Italy</option>
                      <option value="ci">Ivory Coast</option>
                      <option value="jm">Jamaica</option>
                      <option value="jp">Japan</option>
                      <option value="jo">Jordan</option>
                      <option value="kz">Kazakhstan</option>
                      <option value="ke">Kenya</option>
                      <option value="ki">Kiribati</option>
                      <option value="kp">Korea North</option>
                      <option value="kr">Korea South</option>
                      <option value="xk">Kosovo</option>
                      <option value="kw">Kuwait</option>
                      <option value="kg">Kyrgyzstan</option>
                      <option value="la">Laos</option>
                      <option value="lv">Latvia</option>
                      <option value="lb">Lebanon</option>
                      <option value="ls">Lesotho</option>
                      <option value="lr">Liberia</option>
                      <option value="ly">Libya</option>
                      <option value="li">Liechtenstein</option>
                      <option value="lt">Lithuania</option>
                      <option value="lu">Luxembourg</option>
                      <option value="mk">Macedonia</option>
                      <option value="mg">Madagascar</option>
                      <option value="mw">Malawi</option>
                      <option value="my">Malaysia</option>
                      <option value="mv">Maldives</option>
                      <option value="ml">Mali</option>
                      <option value="mt">Malta</option>
                      <option value="mh">Marshall Islands</option>
                      <option value="mr">Mauritania</option>
                      <option value="mu">Mauritius</option>
                      <option value="mx">Mexico</option>
                      <option value="fm">Micronesia</option>
                      <option value="md">Moldova</option>
                      <option value="mc">Monaco</option>
                      <option value="mn">Mongolia</option>
                      <option value="me">Montenegro</option>
                      <option value="ma">Morocco</option>
                      <option value="mz">Mozambique</option>
                      <option value="mm">{"Myanmar {Burma}"}</option>
                      <option value="na">Namibia</option>
                      <option value="nr">Nauru</option>
                      <option value="np">Nepal</option>
                      <option value="nl">Netherlands</option>
                      <option value="nz">New Zealand</option>
                      <option value="ni">Nicaragua</option>
                      <option value="ne">Niger</option>
                      <option value="ng">Nigeria</option>
                      <option value="no">Norway</option>
                      <option value="om">Oman</option>
                      <option value="pk">Pakistan</option>
                      <option value="pw">Palau</option>
                      <option value="pa">Panama</option>
                      <option value="pg">Papua New Guinea</option>
                      <option value="py">Paraguay</option>
                      <option value="pe">Peru</option>
                      <option value="ph">Philippines</option>
                      <option value="pl">Poland</option>
                      <option value="pt">Portugal</option>
                      <option value="qa">Qatar</option>
                      <option value="ro">Romania</option>
                      <option value="ru">Russian Federation</option>
                      <option value="rw">Rwanda</option>
                      <option value="kn">St Kitts &amp; Nevis</option>
                      <option value="lc">St Lucia</option>
                      <option value="vc">Saint Vincent &amp; the Grenadines</option>
                      <option value="ws">Samoa</option>
                      <option value="sm">San Marino</option>
                      <option value="st">Sao Tome &amp; Principe</option>
                      <option value="sa">Saudi Arabia</option>
                      <option value="sn">Senegal</option>
                      <option value="rs">Serbia</option>
                      <option value="sc">Seychelles</option>
                      <option value="sl">Sierra Leone</option>
                      <option value="sg">Singapore</option>
                      <option value="sk">Slovakia</option>
                      <option value="si">Slovenia</option>
                      <option value="sb">Solomon Islands</option>
                      <option value="so">Somalia</option>
                      <option value="za">South Africa</option>
                      <option value="ss">South Sudan</option>
                      <option value="es">Spain</option>
                      <option value="lk">Sri Lanka</option>
                      <option value="sd">Sudan</option>
                      <option value="sr">Suriname</option>
                      <option value="sz">Swaziland</option>
                      <option value="se">Sweden</option>
                      <option value="ch">Switzerland</option>
                      <option value="sy">Syria</option>
                      <option value="tw">Taiwan</option>
                      <option value="tj">Tajikistan</option>
                      <option value="tz">Tanzania</option>
                      <option value="th">Thailand</option>
                      <option value="tg">Togo</option>
                      <option value="to">Tonga</option>
                      <option value="tt">Trinidad &amp; Tobago</option>
                      <option value="tn">Tunisia</option>
                      <option value="tr">Turkey</option>
                      <option value="tm">Turkmenistan</option>
                      <option value="tv">Tuvalu</option>
                      <option value="ug">Uganda</option>
                      <option value="ua">Ukraine</option>
                      <option value="ae">United Arab Emirates</option>
                      <option value="uk">United Kingdom</option>
                      <option value="us">United States</option>
                      <option value="uy">Uruguay</option>
                      <option value="uz">Uzbekistan</option>
                      <option value="vu">Vanuatu</option>
                      <option value="va">Vatican City</option>
                      <option value="ve">Venezuela</option>
                      <option value="vn">Vietnam</option>
                      <option value="ye">Yemen</option>
                      <option value="zm">Zambia</option>
                      <option value="zw">Zimbabwe</option>
                    </select>
                    {errors.country && (
                      <p className="text-red-500 text-xs">{errors.country.message}</p>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Date of Birth</label>
                    <input
                      type="date"
                      {...register("dob", { required: "Date of birth is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                    />
                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Nationality</label>
                      <input
                        {...register("nationality", { required: "Nationality is required" })}
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                        placeholder="Nationality"
                      />
                      {errors.nationality && (
                        <p className="text-red-500 text-xs">{errors.nationality.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Occupation</label>
                      <input
                        {...register("occupation", { required: "Occupation is required" })}
                        className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                        placeholder="Occupation"
                      />
                      {errors.occupation && (
                        <p className="text-red-500 text-xs">{errors.occupation.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Marital Status</label>
                    <select
                      {...register("maritalStatus", { required: "Marital status is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                    >
                      <option value="">Select</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                    </select>
                    {errors.maritalStatus && (
                      <p className="text-red-500 text-xs">{errors.maritalStatus.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">About Me</label>
                    <textarea
                      {...register("aboutMe", { required: "About me is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 py-2"
                      rows={4}
                      placeholder="Write yourself..."
                    />
                    {errors.aboutMe && (
                      <p className="text-red-500 text-xs">{errors.aboutMe.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Facebook</label>
                    <input
                      {...register("facebook", { required: "Facebook is required" })}
                      className="w-full border border-gray-300 rounded-md px-4 h-[42px]"
                      placeholder="Facebook ID"
                    />
                    {errors.facebook && (
                      <p className="text-red-500 text-xs">{errors.facebook.message}</p>
                    )}
                  </div>

                  {/* Profile Image */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">Profile Image</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      id="profileImage"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (!["image/jpeg", "image/png"].includes(file.type)) {
                            setError("profileImage", {
                              type: "manual",
                              message: "Only JPG and PNG images are accepted.",
                            });
                            return;
                          }
                          if (file.size > 2 * 1024 * 1024) {
                            setError("profileImage", {
                              type: "manual",
                              message: "File size must be under 2MB.",
                            });
                            return;
                          }

                          const dt = new DataTransfer();
                          dt.items.add(file);
                          setValue("profileImage", dt.files, { shouldValidate: true });
                          clearErrors("profileImage");
                        } else {
                          setValue("profileImage", new DataTransfer().files, { shouldValidate: true });
                        }
                      }}
                    />
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="profileImage"
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-6 py-2 rounded-md shadow-sm"
                      >
                        Upload Image
                      </label>
                      {watch("profileImage")?.[0] && (
                        <span className="text-gray-600 text-sm truncate max-w-[180px]">
                          {watch("profileImage")?.[0].name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG. Max size: 2MB.
                    </p>
                    {errors.profileImage && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.profileImage.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-7">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Academic & Professional Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Please tell us about your education, occupation, and experience
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Education</label>
                    <input
                      {...register("qualification", { required: "Qualification is required" })}
                      placeholder="Masters in Commerce"
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                    {errors.qualification && (
                      <p className="text-red-500 text-xs mt-1">{errors.qualification.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Year of Experience</label>
                    <input
                      {...register("experience", { required: "Experience is required" })}
                      placeholder="5 Years"
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                    {errors.experience && (
                      <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Mother Language
                    </label>
                    <select
                      {...register("motherLanguage", { required: "Mother language is required" })}
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="">Select</option>
                      <option value="english">English</option>
                      <option value="arabic">Arabic</option>
                      <option value="urdu">Urdu</option>
                      <option value="french">French</option>
                      <option value="germany">Germany</option>
                      <option value="russian">Russian</option>
                    </select>
                    {errors.motherLanguage && (
                      <p className="text-red-500 text-xs mt-1">{errors.motherLanguage.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Other Language
                    </label>
                    <select
                      {...register("otherLanguage", { required: "Other language is required" })}
                      className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option value="">Select</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="tamil">Tamil</option>
                      <option value="urdu">Urdu</option>
                    </select>
                    {errors.otherLanguage && (
                      <p className="text-red-500 text-xs mt-1">{errors.otherLanguage.message as string}</p>
                    )}
                  </div>

                  {/* Upload CV */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Upload CV</label>
                    <div className="flex items-center gap-3">
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setValue("cv", new DataTransfer().files, { shouldValidate: true });
                            return;
                          }
                          const ok =
                            [
                              "application/pdf",
                              "application/msword",
                              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ].includes(file.type) && file.size <= 5 * 1024 * 1024;
                          if (!ok) {
                            setError("cv", {
                              type: "manual",
                              message: "Upload PDF/DOC/DOCX up to 5MB.",
                            });
                            return;
                          }
                          clearErrors("cv");
                          const dt = new DataTransfer();
                          dt.items.add(file);
                          setValue("cv", dt.files, { shouldValidate: true });
                        }}
                      />
                      <label
                        htmlFor="cv-upload"
                        className="inline-flex h-11 cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-5 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
                      >
                        Upload your CV
                      </label>
                      {watch("cv") && (
                        <span className="text-sm text-gray-600 truncate max-w-[180px]">
                          📄 {watch("cv")?.[0]?.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: PDF, DOC, DOCX. Max size: 5MB.
                    </p>
                    {errors.cv && <p className="text-red-500 text-xs mt-1">{String(errors.cv.message)}</p>}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Reading & Reciting</h2>
                    <p className="text-sm text-gray-500">
                      Please read & recite the below and upload an audio file
                    </p>
                  </div>

                  {/* Paragraph Box */}
                  <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                    The Birth of the Prophet Muhammad, son of Abdullah, son of Abdul Muttalib, and
                    member of the Quraysh tribe, was born in Makkah 53 years before the Hijrah. His
                    father died before he was born, and he was raised by his grandfather, Abdul
                    Muttalib, and then by his uncle, Abu Talib, after his grandfather died. He traveled
                    to Syria as a young boy with his uncle in a merchants’ caravan, and later made the
                    same journey in the service of a wealthy widow named Khadijah. He handled the
                    widow’s business so faithfully,                    and the report of his behavior from her old servant
                    who had accompanied him was so good, that she married her young agent soon after;
                    and the marriage proved to be a very happy one, despite the fact that she was fifteen
                    years older than he was.
                  </div>

                  {/* Reading Audio */}
                  <div>
                    <p className="mb-2 text-sm text-gray-700 font-medium">
                      Read the above paragraph and upload audio file.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        id="reading-audio"
                        type="file"
                        accept="audio/mpeg,audio/wav,audio/mp3"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setValue("readingAudio", new DataTransfer().files, { shouldValidate: true });
                            return;
                          }
                          if (!["audio/mpeg", "audio/wav", "audio/mp3"].includes(file.type)) {
                            setError("readingAudio", {
                              type: "manual",
                              message: "Only MP3 and WAV audio are accepted.",
                            });
                            return;
                          }
                          if (file.size > 10 * 1024 * 1024) {
                            setError("readingAudio", {
                              type: "manual",
                              message: "File size must be under 10MB.",
                            });
                            return;
                          }
                          clearErrors("readingAudio");
                          const dt = new DataTransfer();
                          dt.items.add(file);
                          setValue("readingAudio", dt.files, { shouldValidate: true });
                        }}
                      />
                      <label
                        htmlFor="reading-audio"
                        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload your Audio
                      </label>
                      {watch("readingAudio") && (
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                          🎧 {watch("readingAudio")?.[0]?.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: MP3, WAV. Max size: 10MB.
                    </p>
                    {errors.readingAudio && (
                      <p className="mt-1 text-xs text-red-500">
                        {String(errors.readingAudio.message)}
                      </p>
                    )}
                  </div>

                  {/* Recitation Audio */}
                  <div>
                    <p className="mb-2 text-sm text-gray-700 font-medium">
                      Please recite the first 10 Ayah of Surah An-Naba and upload audio file.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        id="recitation-audio"
                        type="file"
                        accept="audio/mpeg,audio/wav,audio/mp3"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) {
                            setValue("recitationAudio", new DataTransfer().files, { shouldValidate: true });
                            return;
                          }
                          if (!["audio/mpeg", "audio/wav", "audio/mp3"].includes(file.type)) {
                            setError("recitationAudio", {
                              type: "manual",
                              message: "Only MP3 and WAV audio are accepted.",
                            });
                            return;
                          }
                          if (file.size > 10 * 1024 * 1024) {
                            setError("recitationAudio", {
                              type: "manual",
                              message: "File size must be under 10MB.",
                            });
                            return;
                          }
                          clearErrors("recitationAudio");
                          const dt = new DataTransfer();
                          dt.items.add(file);
                          setValue("recitationAudio", dt.files, { shouldValidate: true });
                        }}
                      />
                      <label
                        htmlFor="recitation-audio"
                        className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload your Audio
                      </label>
                      {watch("recitationAudio") && (
                        <span className="text-sm text-gray-600 truncate max-w-[200px]">
                          🎧 {watch("recitationAudio")?.[0]?.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: MP3, WAV. Max size: 10MB.
                    </p>
                    {errors.recitationAudio && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.recitationAudio.message as string}
                      </p>
                    )}
                  </div>
                </div>
              )}

{step === 4 && (
  <div className="space-y-6">
    {(() => {
      // responsive toggle buttons for "How did you find us"
      const toggleSource = (opt: string) => {
        const current: string[] = watch("discoverySources") || [];
        const set = new Set(current);
        if (set.has(opt)) {
          set.delete(opt);
        } else {
          set.add(opt);
        }
        setValue("discoverySources", Array.from(set), { shouldDirty: true, shouldValidate: true });
      };

      return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEFT */}
            <div className="space-y-4">
              {/* Applying for (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Applying for</p>
                <div className="relative">
                  <select
                    {...register("applyingFor", { required: "Please select what you're applying for" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>Quran</option>
                    <option>Arabic Study</option>
                    <option>Islamic</option>
                    <option>Admin</option>
                  </select>
                  {errors.applyingFor && (
                    <p className="text-red-500 text-xs mt-1">{errors.applyingFor.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>

              {/* Can you teach Tajweed in English (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Can you teach Tajweed in English</p>
                <div className="relative">
                  <select
                    {...register("teachTajweedInEnglish", { required: "Please select an option" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {errors.teachTajweedInEnglish && (
                    <p className="text-red-500 text-xs mt-1">{errors.teachTajweedInEnglish.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>

              {/* Preferred Interview Time (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Preferred Interview Time</p>
                <div className="relative">
                  <select
                    {...register("preferredInterviewTime", { required: "Please select preferred interview time" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                  {errors.preferredInterviewTime && (
                    <p className="text-red-500 text-xs mt-1">{errors.preferredInterviewTime.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>

              {/* Hours per week (TEXT INPUT) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">How many hours per week can you work</p>
                <input
                  type="text"
                  placeholder="e.g., 10"
                  {...register("hoursPerWeek", { required: "Please specify hours per week" })}
                  className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
                {errors.hoursPerWeek && (
                  <p className="text-red-500 text-xs mt-1">{errors.hoursPerWeek.message}</p>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              {/* Do you have Ijazah (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Do you have Ijazah</p>
                <div className="relative">
                  <select
                    {...register("haveIjazah", { required: "Please select an option" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {errors.haveIjazah && (
                    <p className="text-red-500 text-xs mt-1">{errors.haveIjazah.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.0 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>

              {/* Do you have Children (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Do you have Children</p>
                <div className="relative">
                  <select
                    {...register("haveChildren", { required: "Please select an option" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>No</option>
                    <option>Younger than 3 year old</option>
                    <option>Younger than 5 year old</option>
                    <option>Other</option>
                  </select>
                  {errors.haveChildren && (
                    <p className="text-red-500 text-xs mt-1">{errors.haveChildren.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>

              {/* Expected Salary (TEXT INPUT) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Expected Salary (USD Per Hour)</p>
                <input
                  type="text"
                  placeholder="$ per hour"
                  {...register("expectedSalary", { required: "Please specify expected salary" })}
                  className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
                {errors.expectedSalary && (
                  <p className="text-red-500 text-xs mt-1">{errors.expectedSalary.message}</p>
                )}
              </div>

              {/* Employment Type (select) */}
              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Employment Type</p>
                <div className="relative">
                  <select
                    {...register("employmentType", { required: "Please select employment type" })}
                    className="h-11 w-full rounded-sm border border-gray-300 bg-white px-3 pr-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none"
                  >
                    <option value="" disabled>Select</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    </select>
                  {errors.employmentType && (
                    <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>
                  )}
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ideal Candidate (TEXT FIELD / textarea) */}
          <div className="mt-4">
            <p className="mb-1 text-sm font-medium text-gray-700">What makes you Ideal Candidate</p>
            <textarea
              rows={4}
              placeholder="Write what makes you an ideal candidate..."
              {...register("idealCandidate", { required: "Please describe what makes you an ideal candidate" })}
              className="w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            {errors.idealCandidate && (
              <p className="text-red-500 text-xs mt-1">{errors.idealCandidate.message}</p>
            )}
          </div>

          {/* How did you find out about us – responsive buttons */}
          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-700">How did you find out about us</p>
            <div className="flex flex-wrap gap-3">
              {["Facebook","Linkedin","Google","Bayyinah Website","Advertisement","Others"].map((opt) => {
                const selected: string[] = watch("discoverySources") || [];
                const active = selected.includes(opt);
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => {
                      const current: string[] = watch("discoverySources") || [];
                      const set = new Set(current);
                      if (set.has(opt)) set.delete(opt);
                      else set.add(opt);
                      setValue("discoverySources", Array.from(set), { shouldDirty: true, shouldValidate: true });
                    }}
                    className={[
                      "rounded-lg px-4 py-2 text-sm border transition",
                      "w-full sm:w-auto text-center",
                      active
                        ? "bg-amber-400 text-white border-amber-400"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {errors.discoverySources && (
              <p className="text-red-500 text-xs mt-1">{errors.discoverySources.message}</p>
            )}
          </div>

          {/* Declaration checkbox */}
          <label className="mt-6 flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              {...(register("declaration" as any, { required: true }) as any)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <span>
              I declare that the information I have provided in this registration form is
              true and accurate to the best of my knowledge.
            </span>
          </label>

          {/* Hidden field for discoverySources to ensure it's registered */}
          <input
            type="hidden"
            {...register("discoverySources", { 
              required: "Please select how you found out about us",
              validate: (value) => (value && value.length > 0) || "Please select at least one option"
            })}
          />
        </div>
      );
    })()}
  </div>
)}
              {/* Buttons */}
              <div className="pt-6 flex justify-end">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium rounded-md px-6 py-3 shadow-sm transition-colors mr-3"
                  >
                    Previous
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const valid = await trigger(stepFields[step]);
                      if (valid) setStep(step + 1);
                    }}
                    className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded-md px-6 py-3 shadow-sm transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded-md px-6 py-3 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
              <h3 className="text-xl font-semibold mb-4">Form Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Thank you for registering as a Teacher. Redirecting to the career page in 5 seconds...
              </p>
              <Button onClick={() => setShowPopup(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
