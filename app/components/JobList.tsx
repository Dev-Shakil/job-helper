import JobCard from "./JobCard"


const jobs = [
  {
    title:"Frontend Developer",
    company:"Tech Corp",
    location:"Dhaka",
    employment_type:"Full Time",
    slug:"frontend-developer"
  }
]

export default function JobList() {
  return (
    <div className="space-y-4">

      {jobs.map((job,index)=>(
        <JobCard key={index} job={job}/>
      ))}

    </div>
  )
}