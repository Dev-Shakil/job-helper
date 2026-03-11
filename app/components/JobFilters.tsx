"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function JobFilters() {
  return (
    <div className="bg-white border rounded-xl p-5 space-y-6">

      {/* Search */}
      <div className="space-y-2">
        <Label>Search by Keywords</Label>
        <Input placeholder="Job title, keywords..." />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>
        <Input placeholder="City or postcode" />
      </div>

      {/* Radius */}
      <div className="space-y-2">
        <Label>Radius: 50 miles</Label>
        <Slider defaultValue={[50]} max={100} />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <select className="w-full border rounded-lg px-3 py-2 text-sm">
          <option>Choose a category...</option>
        </select>
      </div>

      {/* Job Type */}
      <div className="space-y-2">
        <Label>Job type</Label>
        <select className="w-full border rounded-lg px-3 py-2 text-sm">
          <option>Job type</option>
        </select>
      </div>

    </div>
  )
}