import JobCard from "../components/JobCard"
import JobFilters from "../components/JobFilters"


export default function JobsPage() {
  const jobs = [
    {
      title: "Junior Graphic Designer (Web)",
      company: "Design Studio",
      category: "Design, Development",
      location: "New York",
      salary: "$150 - $180 / week",
      type: "Full Time",
      urgent: true,
    },
    {
      title: "Finance Manager & Health",
      company: "Modern Finance",
      category: "Design",
      location: "New York",
      salary: "$450 - $500 / month",
      type: "Full Time",
      urgent: true,
    },
    {
      title: "Executive, HR Operations",
      company: "LinkedIn",
      category: "Customer, Marketing",
      location: "New York",
      salary: "$15 - $18 / hour",
      type: "Temporary",
      urgent: true,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto py-10 grid grid-cols-12 gap-6">

      {/* Sidebar */}
      <div className="col-span-3">
        <JobFilters />
      </div>

      {/* Job List */}
      <div className="col-span-9 space-y-6">

        <div className="flex justify-between items-center">

          <p className="text-sm text-muted-foreground">
            Showing 1 – 10 of 18 results
          </p>

          <div className="flex gap-3">
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Sort by (Default)</option>
            </select>

            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>12 Per Page</option>
            </select>
          </div>
        </div>

        {jobs.map((job, i) => (
          <JobCard key={i} job={job} />
        ))}

      </div>

    </div>
  )
}



//single Job
// "use client"
// import { useState } from "react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import {
//   MapPin, CalendarDays, Briefcase, DollarSign, Clock,
//   Bookmark, Share2, ChevronRight, Users, Award,
//   Building2, Globe, CheckCircle2, Zap, ExternalLink,
//   Facebook, Twitter, Linkedin
// } from "lucide-react"

// const job = {
//   title: "Junior Graphic Designer (Web)",
//   company: "Oreo Studio",
//   category: ["Design", "Development"],
//   location: "New York, USA",
//   salary: "$150 – $180 / week",
//   type: "Full Time",
//   urgent: true,
//   postedDate: "June 20, 2021",
//   expiration: "July 31, 2030",
//   experience: "4 Years",
//   gender: "Both",
//   qualification: "Bachelor Degree",
//   careerLevel: "Officer",
//   description:
//     "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for clients around the globe.",
//   responsibilities: [
//     "Be involved in every step of the product design cycle from ideation to delivery",
//     "Collaborate with BAs, product managers and tech teams to shape requirements",
//     "Maintain quality of design process and ensure consistency across products",
//     "Estimate design tickets during agile planning sessions",
//     "Contribute to sketching sessions and creative brainstorming workshops",
//     "Ensure all design decisions are data-led and user-tested",
//     "Design pixel-perfect responsive UIs across all breakpoints",
//     "Present work clearly to wider business stakeholders",
//   ],
//   skills: [
//     "3+ years experience as a Product Designer",
//     "Proficiency with Sketch, InVision, or Framer",
//     "Comfortable working in agile teams",
//     "Familiar with Jira and Confluence",
//   ],
// }

// const overviewItems = [
//   { icon: CalendarDays, label: "Date Posted", value: job.postedDate },
//   { icon: MapPin,        label: "Location",    value: job.location   },
//   { icon: DollarSign,   label: "Salary",       value: job.salary     },
//   { icon: Clock,        label: "Expiration",   value: job.expiration },
//   { icon: Award,        label: "Experience",   value: job.experience },
//   { icon: Users,        label: "Gender",       value: job.gender     },
//   { icon: Globe,        label: "Qualification",value: job.qualification },
//   { icon: Building2,    label: "Career Level", value: job.careerLevel },
// ]

// export default function JobDetailsPage() {
//   const [saved, setSaved] = useState(false)

//   return (
//     <TooltipProvider>
//       <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
//           .display-font { font-family: 'Playfair Display', serif; }
//           .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); }
//           .accent-gradient { background: linear-gradient(135deg, #f59e0b, #ef4444); }
//           .apply-glow { box-shadow: 0 0 24px rgba(245,158,11,0.4); transition: all 0.25s ease; }
//           .apply-glow:hover { box-shadow: 0 0 36px rgba(245,158,11,0.6); transform: translateY(-1px); }
//           .card-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
//           .card-lift:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
//           .urgent-pulse::before {
//             content: ''; display: inline-block; width: 7px; height: 7px;
//             border-radius: 50%; background: #ef4444; margin-right: 6px;
//             animation: urgentPulse 1.4s ease-in-out infinite;
//           }
//           @keyframes urgentPulse {
//             0%,100% { opacity:1; transform: scale(1); }
//             50%      { opacity:.4; transform: scale(1.5); }
//           }
//           .skill-pill { transition: all 0.2s; cursor: default; }
//           .skill-pill:hover { background: #f59e0b !important; color: #0f172a !important; border-color: #f59e0b !important; }
//           .resp-row { border-left: 2px solid transparent; padding-left: 12px; transition: border-color 0.2s; }
//           .resp-row:hover { border-left-color: #f59e0b; }
//           .map-grid {
//             background-color: #e2e8f0;
//             background-image: linear-gradient(rgba(148,163,184,0.4) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(148,163,184,0.4) 1px, transparent 1px);
//             background-size: 24px 24px;
//           }
//         `}</style>

//         {/* ── BREADCRUMB ── */}
//         <div className="bg-slate-800 py-2 px-6">
//           <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400">
//             <span className="hover:text-amber-400 cursor-pointer transition-colors">Home</span>
//             <ChevronRight size={12} />
//             <span className="hover:text-amber-400 cursor-pointer transition-colors">Find Jobs</span>
//             <ChevronRight size={12} />
//             <span className="text-slate-200 font-medium">Job Details</span>
//           </div>
//         </div>

//         {/* ── HERO ── */}
//         <div className="hero-gradient py-10 px-6">
//           <div className="max-w-6xl mx-auto">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

//               {/* Left: identity */}
//               <div className="flex gap-5 items-start">
//                 <Avatar className="w-16 h-16 rounded-2xl border-2 border-amber-400/40 shadow-lg">
//                   <AvatarFallback className="rounded-2xl text-2xl font-black text-amber-400 display-font" style={{ background: "rgba(245,158,11,0.12)" }}>
//                     O
//                   </AvatarFallback>
//                 </Avatar>

//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">{job.company}</span>
//                     <CheckCircle2 size={13} className="text-amber-400" />
//                     <span className="text-slate-500 text-xs">Verified</span>
//                   </div>

//                   <h1 className="display-font text-2xl md:text-3xl font-black text-white leading-tight mb-3">
//                     {job.title}
//                   </h1>

//                   <div className="flex flex-wrap gap-x-5 gap-y-2 text-slate-400 text-sm">
//                     {[
//                       { icon: Briefcase,    text: job.category.join(" · ") },
//                       { icon: MapPin,       text: job.location             },
//                       { icon: DollarSign,   text: job.salary               },
//                       { icon: CalendarDays, text: `Posted ${job.postedDate}` },
//                     ].map(({ icon: Icon, text }) => (
//                       <span key={text} className="flex items-center gap-1.5">
//                         <Icon size={13} className="text-amber-400/70" />
//                         {text}
//                       </span>
//                     ))}
//                   </div>

//                   <div className="flex gap-2 mt-3">
//                     <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
//                       {job.type}
//                     </Badge>
//                     {job.urgent && (
//                       <Badge className="urgent-pulse text-xs font-semibold" style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)" }}>
//                         Urgent
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Right: actions */}
//               <div className="flex flex-col items-end gap-3">
//                 <p className="text-xs text-slate-400">
//                   Deadline:{" "}
//                   <span className="text-red-400 font-semibold">May 18, 2026</span>
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => setSaved(!saved)}
//                         className="rounded-xl border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-amber-400 transition-all"
//                       >
//                         <Bookmark size={16} className={saved ? "fill-amber-400 text-amber-400" : "text-slate-400"} />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>{saved ? "Saved!" : "Save Job"}</TooltipContent>
//                   </Tooltip>

//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <Button variant="outline" size="icon" className="rounded-xl border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-amber-400 transition-all">
//                         <Share2 size={16} className="text-slate-400" />
//                       </Button>
//                     </TooltipTrigger>
//                     <TooltipContent>Share</TooltipContent>
//                   </Tooltip>

//                   <Button
//                     className="apply-glow rounded-xl px-6 font-bold text-slate-900 border-0"
//                     style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
//                   >
//                     Apply Now <ExternalLink size={14} className="ml-1" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── MAIN ── */}
//         <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* ── LEFT CONTENT ── */}
//           <div className="lg:col-span-2 space-y-6">

//             <Tabs defaultValue="description">
//               <TabsList className="w-full justify-start bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
//                 <TabsTrigger value="description" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 data-[state=active]:font-bold transition-all">
//                   Job Description
//                 </TabsTrigger>
//                 <TabsTrigger value="company" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 data-[state=active]:font-bold transition-all">
//                   About Company
//                 </TabsTrigger>
//                 <TabsTrigger value="similar" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-slate-900 data-[state=active]:font-bold transition-all">
//                   Similar Jobs
//                 </TabsTrigger>
//               </TabsList>

//               <TabsContent value="description" className="mt-4 space-y-4">

//                 {/* Overview */}
//                 <Card className="card-lift border-0 shadow-sm rounded-2xl">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="display-font text-xl text-slate-800">Overview</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-slate-600 leading-relaxed text-sm">{job.description}</p>
//                   </CardContent>
//                 </Card>

//                 {/* Responsibilities */}
//                 <Card className="card-lift border-0 shadow-sm rounded-2xl">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="display-font text-xl text-slate-800">Key Responsibilities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {job.responsibilities.map((item, i) => (
//                       <div key={i} className="resp-row flex items-start gap-3">
//                         <Zap size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
//                         <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>

//                 {/* Skills */}
//                 <Card className="card-lift border-0 shadow-sm rounded-2xl">
//                   <CardHeader className="pb-3">
//                     <CardTitle className="display-font text-xl text-slate-800">Skills & Experience</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex flex-wrap gap-2">
//                       {job.skills.map((skill, i) => (
//                         <Badge
//                           key={i}
//                           variant="outline"
//                           className="skill-pill rounded-full px-4 py-1.5 text-xs font-medium border-amber-300 text-amber-700 bg-amber-50"
//                         >
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Share */}
//                 <Card className="border-0 shadow-sm rounded-2xl" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
//                   <CardContent className="flex items-center justify-between p-5">
//                     <div>
//                       <p className="text-white font-semibold text-sm">Share this opportunity</p>
//                       <p className="text-slate-400 text-xs mt-0.5">Help a friend find their next role</p>
//                     </div>
//                     <div className="flex gap-2">
//                       {[
//                         { Icon: Facebook,  bg: "#1877f2", label: "Facebook"  },
//                         { Icon: Twitter,   bg: "#1da1f2", label: "Twitter"   },
//                         { Icon: Linkedin,  bg: "#0077b5", label: "LinkedIn"  },
//                       ].map(({ Icon, bg, label }) => (
//                         <Tooltip key={label}>
//                           <TooltipTrigger asChild>
//                             <Button
//                               size="icon"
//                               className="rounded-xl w-9 h-9 border-0 transition-all hover:scale-110"
//                               style={{ background: bg }}
//                             >
//                               <Icon size={15} className="text-white" />
//                             </Button>
//                           </TooltipTrigger>
//                           <TooltipContent>{label}</TooltipContent>
//                         </Tooltip>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>

//               </TabsContent>

//               <TabsContent value="company" className="mt-4">
//                 <Card className="border-0 shadow-sm rounded-2xl">
//                   <CardContent className="p-8 text-center text-slate-400">
//                     <Building2 size={40} className="mx-auto mb-3 opacity-30" />
//                     <p className="text-sm">Company profile coming soon.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>

//               <TabsContent value="similar" className="mt-4">
//                 <Card className="border-0 shadow-sm rounded-2xl">
//                   <CardContent className="p-8 text-center text-slate-400">
//                     <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
//                     <p className="text-sm">Similar jobs coming soon.</p>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>

//           {/* ── RIGHT SIDEBAR ── */}
//           <div className="space-y-5">

//             {/* Apply CTA */}
//             <Card className="border-0 rounded-2xl overflow-hidden shadow-lg" style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)" }}>
//               <CardContent className="p-6">
//                 <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-1">Ready to join?</p>
//                 <h3 className="display-font text-white text-xl font-black mb-4">Start your application</h3>
//                 <Button
//                   className="apply-glow w-full rounded-xl font-bold text-slate-900 border-0 py-5"
//                   style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
//                 >
//                   Apply Now <ExternalLink size={14} className="ml-1.5" />
//                 </Button>
//                 <p className="text-slate-500 text-xs text-center mt-3">
//                   Deadline: <span className="text-red-400 font-medium">May 18, 2026</span>
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Job Overview */}
//             <Card className="card-lift border-0 shadow-sm rounded-2xl">
//               <CardHeader className="pb-2">
//                 <CardTitle className="display-font text-lg text-slate-800">Job Overview</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-1 px-5 pb-5">
//                 {overviewItems.map(({ icon: Icon, label, value }, i) => (
//                   <div key={label}>
//                     <div className="flex items-center justify-between py-2.5">
//                       <div className="flex items-center gap-2.5">
//                         <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.1)" }}>
//                           <Icon size={13} className="text-amber-500" />
//                         </div>
//                         <span className="text-xs text-slate-500">{label}</span>
//                       </div>
//                       <span className="text-xs font-semibold text-slate-700">{value}</span>
//                     </div>
//                     {i < overviewItems.length - 1 && <Separator className="opacity-50" />}
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             {/* Location */}
//             <Card className="card-lift border-0 shadow-sm rounded-2xl overflow-hidden">
//               <CardHeader className="pb-2">
//                 <CardTitle className="display-font text-lg text-slate-800">Job Location</CardTitle>
//               </CardHeader>
//               <CardContent className="px-5 pb-5">
//                 <div className="map-grid rounded-xl h-40 flex flex-col items-center justify-center gap-2 relative">
//                   <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
//                     <MapPin size={18} className="text-amber-500" />
//                   </div>
//                   <span className="text-xs font-semibold text-slate-700 bg-white/80 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm">
//                     {job.location}
//                   </span>
//                 </div>
//                 <Button variant="outline" className="w-full mt-3 rounded-xl text-xs border-slate-200 hover:border-amber-400 hover:text-amber-600 transition-all">
//                   <ExternalLink size={12} className="mr-1.5" /> Open in Google Maps
//                 </Button>
//               </CardContent>
//             </Card>

//           </div>
//         </div>
//       </div>
//     </TooltipProvider>
//   )
// }