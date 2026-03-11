import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { MapPin, Briefcase, DollarSign } from "lucide-react"

export default function JobCard({ job }: any) {
  return (
    <Card className="p-6 flex flex-row --font-jost hover:shadow-md transition">

      <div className="flex-1 flex  gap-4">

        <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
          {job.company[0]}
        </div>

        <div className="space-y-2">

          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">
              {job.title}
            </h3>

            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Featured
            </Badge>
          </div>

          <div className="flex gap-5 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">
              <Briefcase size={16}/>
              {job.category}
            </div>

            <div className="flex items-center gap-1">
              <MapPin size={16}/>
              {job.location}
            </div>

            <div className="flex items-center gap-1">
              <DollarSign size={16}/>
              {job.salary}
            </div>

          </div>

          <div className="flex gap-2 mt-2">

            <Badge variant="secondary">
              {job.type}
            </Badge>

            {job.urgent && (
              <Badge className="bg-orange-100 text-orange-600">
                Urgent
              </Badge>
            )}

          </div>

        </div>

      </div>

      <div className="text-muted-foreground">
        ☆
      </div>

    </Card>
  )
}