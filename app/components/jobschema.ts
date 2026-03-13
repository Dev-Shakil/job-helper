export const jobPostSchema = z.object({
  job: z.object({
    title: z.string().min(3, "Job title must be at least 3 characters"),
    description: z.string().min(10, "Job description must be at least 10 characters"),
    designation_id: z.number({ invalid_type_error: "Please select a designation" }).int().positive("Invalid designation"),
    employment_type: z.enum(
      ["full_time", "part_time", "contract", "internship", "freelance"],
      { errorMap: () => ({ message: "Please select employment type" }) }
    ),
    workplace_type: z.enum(["office", "home", "hybrid"], {
      errorMap: () => ({ message: "Please select workplace type" }),
    }),
    experience_level: z.string().min(1, "Please select experience level"),
    job_responsibility: z.string().optional(),
    job_requirement: z.string().min(5, "Job requirements must be at least 5 characters"),
    other_benefits: z.string().optional(),
    vacancy_count: z.number({ invalid_type_error: "Please enter vacancy count" }).int().min(1, "At least 1 vacancy required"),
    salary_min: z.number({ invalid_type_error: "Please enter minimum salary" }).min(0),
    salary_max: z.number({ invalid_type_error: "Please enter maximum salary" }).min(0),
    currency: z.string().min(1, "Please select currency"),
    salary_period: z.enum(["hour", "month", "year"], {
      errorMap: () => ({ message: "Please select salary period" }),
    }),
    // ✅ Fixed: matches actual option values
    salary_display_type: z.enum(["show_range", "hidden", "negotiatable"], {
      errorMap: () => ({ message: "Please select salary display type" }),
    }),
    apply_deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Please enter a valid deadline date",
    }),
    tags: z.array(z.string()).optional(),
  }),

  location: z.object({
    location_id: z.number({ invalid_type_error: "Please select a location" }).int().positive("Invalid location"),
  }),

  skills: z.array(
    z.object({
      skill_id: z.number().int().positive(),
      is_must_have: z.boolean().optional(),
    })
  ).min(1, "Please select at least one skill"),

  benefits: z.array(
    z.object({
      benefit_id: z.number().int().positive(),
    })
  ).min(1, "Please select at least one benefit"),

  candidate_criteria: z.object({
    is_gender_restricted: z.boolean(),
    is_age_restricted: z.boolean(),
    age_min: z.number().int().min(16, "Minimum age must be at least 16").nullable().optional(),
    age_max: z.number().int().max(80, "Maximum age cannot exceed 80").nullable().optional(),
    prefer_video_resume: z.boolean().optional(),
    gender: z.enum(["male", "female", "other", "any"]).optional(),
    blood_group: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "any"]).optional(),
    experience_required: z.boolean().optional(),
    min_years_experience: z.number().int().min(0).optional(),
    max_years_experience: z.number().int().min(0).optional(),
    industry_experience: z.string().optional(),
  }).refine(
    (data) => !data.is_gender_restricted || !!data.gender,
    { message: "Please select a gender", path: ["gender"] }
  ).refine(
    (data) => !data.is_age_restricted || (data.age_min != null && data.age_max != null),
    { message: "Please provide both min and max age", path: ["age_min"] }
  ),

  education_requirements: z.array(
    z.object({
      parent_degree_id: z.number({ invalid_type_error: "Please select degree level" }).int().positive("Invalid degree"),
      sub_degree_id: z.number({ invalid_type_error: "Please select sub degree" }).int().positive("Invalid sub degree").optional(),
      major: z.string().min(2, "Major must be at least 2 characters"),
    })
  ).min(1, "At least one education requirement is needed"),

  contact: z.object({
    contact_type: z.string().min(1, "Please select contact type"),
    name: z.string().min(2, "Contact name must be at least 2 characters"),
    designation: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    mobile: z.string().regex(/^\+?\d{9,15}$/, "Please enter a valid phone number"),
  }),
});
const [postNewJob, { isLoading: isPosting }] = usePostNewJobMutation();

const onSubmit = async (data: JobPostFormValues, status: string) => {
  const payload = {
    ...data,
    job: { ...data.job, status },
  };

  try {
    // ✅ Await the mutation — don't check isSuccess
    await postNewJob(payload as JobPayload).unwrap();
    toast.success("Your Job Posted Successfully");
    router.push("/employers-profile/my-job");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to post job");
  }
};
Fixed Education Row errors — add .message
tsx{errors?.education_requirements?.[index]?.parent_degree_id && (
  <p className="text-xs text-red-500 mt-0.5">
    {/* ✅ Was missing .message */}
    {errors.education_requirements[index].parent_degree_id?.message}
  </p>
)}

{errors?.education_requirements?.[index]?.sub_degree_id && (
  <p className="text-xs text-red-500 mt-0.5">
    {errors.education_requirements[index].sub_degree_id?.message}
  </p>
)}

{Object.keys(errors).length > 0 && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
    <p className="font-semibold mb-1">Please fix the following before submitting:</p>
    <ul className="list-disc list-inside space-y-0.5">
      {errors.job?.title && <li>{errors.job.title.message}</li>}
      {errors.job?.description && <li>{errors.job.description.message}</li>}
      {errors.job?.designation_id && <li>{errors.job.designation_id.message}</li>}
      {errors.job?.employment_type && <li>{errors.job.employment_type.message}</li>}
      {errors.job?.apply_deadline && <li>{errors.job.apply_deadline.message}</li>}
      {errors.location?.location_id && <li>{errors.location.location_id.message}</li>}
      {errors.skills?.message && <li>{errors.skills.message}</li>}
      {errors.benefits?.message && <li>{errors.benefits.message}</li>}
      {errors.contact?.email && <li>{errors.contact.email.message}</li>}
      {errors.contact?.mobile && <li>{errors.contact.mobile.message}</li>}
      {errors.education_requirements?.message && <li>{errors.education_requirements.message}</li>}
    </ul>
  </div>
)}