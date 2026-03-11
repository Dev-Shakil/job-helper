import { MapPin, CalendarDays, Briefcase, DollarSign, Clock } from "lucide-react"

const job = {
  title: "Junior Graphic Designer (Web)",
  company: "Oreo Studio",
  category: ["Design", "Development"],
  location: "New York",
  salary: "$150 - $180 / week",
  type: "Full Time",
  urgent: true,
  postedDate: "June 20, 2021",
  expiration: "July 31, 2030",
  experience: "4 Year",
  gender: "Both",
  qualification: "Bachelor Degree",
  careerLevel: "Officer",
  description:
    "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges.",
  responsibilities: [
    "Be involved in every step of the product design cycle.",
    "Work with BAs, product managers and tech teams.",
    "Maintain quality of design process.",
    "Estimate design tickets during planning sessions.",
    "Contribute to sketching sessions.",
    "Ensure design choices are data led.",
    "Design pixel perfect responsive UIs.",
    "Present work to the wider business.",
  ],
  skills: [
    "3 years experience as Product Designer",
    "Experience with Sketch, InVision or Framer",
    "Experience in agile environment",
    "Familiar with Jira and Confluence",
  ],
}

export default function JobDetailsPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-jost">

      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto p-6 flex justify-between items-center">

          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              O
            </div>

            <div>
              <h1 className="text-2xl font-semibold">{job.title}</h1>

              <div className="flex items-center gap-5 text-gray-500 text-sm mt-1">

                <span className="flex items-center gap-1">
                  <Briefcase size={16} /> {job.category.join(", ")}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={16} /> {job.postedDate}
                </span>

                <span className="flex items-center gap-1">
                  <DollarSign size={16} /> {job.salary}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
                  {job.type}
                </span>

                {job.urgent && (
                  <span className="px-3 py-1 text-xs bg-orange-100 text-orange-500 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <p className="text-sm text-gray-500">
              Application ends: <span className="text-red-500">May 18, 2026</span>
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Apply Now
            </button>

            <button className="border rounded-md p-2">🔖</button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 mt-8 p-6">

        {/* LEFT CONTENT */}
        <div className="col-span-2 bg-white p-6 rounded-lg">

          <h2 className="text-lg font-semibold mb-4">Job Description</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {job.description}
          </p>

          <h3 className="font-semibold mb-3">Key Responsibilities</h3>

          <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="font-semibold mb-3">Skill & Experience</h3>

          <ul className="list-disc ml-6 text-gray-600 space-y-2">
            {job.skills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* SHARE */}
          <div className="mt-8 flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Facebook
            </button>

            <button className="bg-purple-500 text-white px-4 py-2 rounded">
              Twitter
            </button>

            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Pinterest
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* JOB OVERVIEW */}
          <div className="bg-white rounded-lg p-6">

            <h3 className="font-semibold mb-4">Job Overview</h3>

            <div className="space-y-4 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Date Posted</span>
                <span>{job.postedDate}</span>
              </div>

              <div className="flex justify-between">
                <span>Location</span>
                <span>{job.location}</span>
              </div>

              <div className="flex justify-between">
                <span>Offered Salary</span>
                <span>{job.salary}</span>
              </div>

              <div className="flex justify-between">
                <span>Expiration</span>
                <span>{job.expiration}</span>
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <span>{job.experience}</span>
              </div>

              <div className="flex justify-between">
                <span>Gender</span>
                <span>{job.gender}</span>
              </div>

              <div className="flex justify-between">
                <span>Qualification</span>
                <span>{job.qualification}</span>
              </div>

              <div className="flex justify-between">
                <span>Career Level</span>
                <span>{job.careerLevel}</span>
              </div>

            </div>
          </div>

          {/* MAP */}
          <div className="bg-white p-6 rounded-lg">

            <h3 className="font-semibold mb-4">Job Location</h3>

            <div className="w-full h-52 bg-gray-200 rounded flex items-center justify-center text-gray-500">
              Map Placeholder
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}