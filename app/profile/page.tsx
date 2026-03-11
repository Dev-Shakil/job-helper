"use client"
import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MapPin, Mail, Phone, Globe, Linkedin, Github,
  Briefcase, GraduationCap, Award, Plus, Pencil,
  Trash2, Upload, CheckCircle2, Star, Download,
  X, Calendar, Building2, BookOpen, Zap, User,
  Camera, ChevronRight, TrendingUp, Clock
} from "lucide-react"

// ── initial data ──────────────────────────────────────────────
const INIT = {
  name: "Alexandra Chen",
  title: "Senior Product Designer",
  location: "San Francisco, CA",
  email: "alex.chen@email.com",
  phone: "+1 (555) 012-3456",
  website: "alexchen.design",
  linkedin: "linkedin.com/in/alexchen",
  github: "github.com/alexchen",
  bio: "Passionate product designer with 6+ years crafting intuitive digital experiences for SaaS and fintech products. I thrive at the intersection of user research, visual design, and front-end thinking — turning complex problems into elegant, human-centered solutions.",
  availability: "Open to Work",
  profileCompletion: 82,
  experience: [
    { id: 1, role: "Senior Product Designer", company: "Notion", duration: "Jan 2022 – Present", desc: "Led design system unification and shipped 12+ major features used by 20M+ users. Managed 2 junior designers." },
    { id: 2, role: "UX Designer", company: "Stripe", duration: "Mar 2019 – Dec 2021", desc: "Redesigned the merchant dashboard, increasing task completion rate by 34%. Ran bi-weekly user research sessions." },
    { id: 3, role: "UI Designer", company: "Freelance", duration: "Jun 2017 – Feb 2019", desc: "Worked with 15+ startups across e-commerce, healthcare, and edtech verticals." },
  ],
  education: [
    { id: 1, degree: "B.F.A. Interaction Design", school: "California College of the Arts", year: "2013 – 2017", grade: "Summa Cum Laude" },
    { id: 2, degree: "UX Research Certificate", school: "Nielsen Norman Group", year: "2020", grade: "Distinction" },
  ],
  skills: [
    { name: "Figma", level: 95 }, { name: "User Research", level: 88 },
    { name: "Prototyping", level: 90 }, { name: "Design Systems", level: 85 },
    { name: "Framer", level: 78 }, { name: "HTML / CSS", level: 72 },
  ],
  tags: ["Product Design", "UX Strategy", "Design Systems", "Figma", "User Research", "Prototyping", "Wireframing", "A/B Testing"],
  certifications: [
    { id: 1, name: "Google UX Design Certificate", issuer: "Google", year: "2021" },
    { id: 2, name: "Certified Usability Analyst", issuer: "HFI", year: "2022" },
  ],
}

// ── tiny helpers ──────────────────────────────────────────────
const initials = (n) => n.split(" ").map(w => w[0]).join("").toUpperCase()

function EditDialog({ title, open, onOpenChange, children, onSave }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-2xl border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="display-font text-xl text-slate-800">{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">{children}</div>
        <DialogFooter className="gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="rounded-xl font-bold text-white border-0" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }} onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── main component ────────────────────────────────────────────
export default function JobSeekerProfile() {
  const [profile, setProfile] = useState(INIT)
  const [editSection, setEditSection] = useState(null)
  const [draft, setDraft] = useState({})
  const [newTag, setNewTag] = useState("")
  const [saved, setSaved] = useState(false)
  const fileRef = useRef()

  // generic open editor
  const openEdit = (section, data) => { setDraft(data); setEditSection(section) }
  const closeEdit = () => setEditSection(null)

  const saveHero = () => {
    setProfile(p => ({ ...p, ...draft }))
    closeEdit(); flash()
  }
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  // experience CRUD
  const saveExp = () => {
    setProfile(p => {
      const list = draft.id
        ? p.experience.map(e => e.id === draft.id ? draft : e)
        : [...p.experience, { ...draft, id: Date.now() }]
      return { ...p, experience: list }
    })
    closeEdit(); flash()
  }
  const deleteExp = (id) => setProfile(p => ({ ...p, experience: p.experience.filter(e => e.id !== id) }))

  // education CRUD
  const saveEdu = () => {
    setProfile(p => {
      const list = draft.id
        ? p.education.map(e => e.id === draft.id ? draft : e)
        : [...p.education, { ...draft, id: Date.now() }]
      return { ...p, education: list }
    })
    closeEdit(); flash()
  }
  const deleteEdu = (id) => setProfile(p => ({ ...p, education: p.education.filter(e => e.id !== id) }))

  // skills
  const updateSkillLevel = (name, level) =>
    setProfile(p => ({ ...p, skills: p.skills.map(s => s.name === name ? { ...s, level } : s) }))
  const removeSkill = (name) => setProfile(p => ({ ...p, skills: p.skills.filter(s => s.name !== name) }))
  const addSkill = () => {
    if (!draft.skillName) return
    setProfile(p => ({ ...p, skills: [...p.skills, { name: draft.skillName, level: Number(draft.skillLevel) || 50 }] }))
    closeEdit(); flash()
  }

  // tags
  const removeTag = (t) => setProfile(p => ({ ...p, tags: p.tags.filter(x => x !== t) }))
  const addTag = () => {
    if (!newTag.trim()) return
    setProfile(p => ({ ...p, tags: [...p.tags, newTag.trim()] }))
    setNewTag("")
  }

  // certifications CRUD
  const saveCert = () => {
    setProfile(p => {
      const list = draft.id
        ? p.certifications.map(c => c.id === draft.id ? draft : c)
        : [...p.certifications, { ...draft, id: Date.now() }]
      return { ...p, certifications: list }
    })
    closeEdit(); flash()
  }
  const deleteCert = (id) => setProfile(p => ({ ...p, certifications: p.certifications.filter(c => c.id !== id) }))

  const dp = (k) => (e) => setDraft(d => ({ ...d, [k]: e.target.value }))

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans','Helvetica Neue',sans-serif", background: "#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');
        .display-font{font-family:'Playfair Display',serif}
        .hero-bg{background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#312e81 100%);position:relative;overflow:hidden}
        .hero-bg::before{content:'';position:absolute;top:-60px;right:-60px;width:280px;height:280px;border-radius:50%;background:rgba(99,102,241,0.12)}
        .hero-bg::after{content:'';position:absolute;bottom:-40px;left:25%;width:180px;height:180px;border-radius:50%;background:rgba(139,92,246,0.08)}
        .card-lift{transition:transform .2s,box-shadow .2s}
        .card-lift:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,102,241,0.12)}
        .edit-btn{opacity:0;transition:opacity .2s}
        .editable-row:hover .edit-btn{opacity:1}
        .avatar-overlay{position:absolute;inset:0;border-radius:50%;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;transition:background .2s;cursor:pointer}
        .avatar-wrap:hover .avatar-overlay{background:rgba(0,0,0,0.45)}
        .avatar-wrap:hover .cam-icon{opacity:1}
        .cam-icon{opacity:0;transition:opacity .2s}
        .skill-bar{height:6px;border-radius:99px;background:#e2e8f0;overflow:hidden}
        .skill-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#6366f1,#8b5cf6);transition:width .6s ease}
        .tag-pill{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:99px;font-size:12px;font-weight:600;background:#eef2ff;color:#4f46e5;border:1px solid #c7d2fe;transition:all .2s}
        .tag-pill:hover{background:#4f46e5;color:white;border-color:#4f46e5}
        .save-toast{position:fixed;bottom:24px;right:24px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:12px 20px;border-radius:12px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;box-shadow:0 8px 24px rgba(99,102,241,0.4);animation:slideUp .3s ease;z-index:100}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        .avail-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:99px;font-size:12px;font-weight:700;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.3)}
        .avail-dot{width:7px;height:7px;border-radius:50%;background:#10b981;animation:pulse 1.5s infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}
      `}</style>

      {/* ── SAVE TOAST ── */}
      {saved && (
        <div className="save-toast">
          <CheckCircle2 size={16} /> Profile updated!
        </div>
      )}

      {/* ── TOP NAV ── */}
      <div style={{ background: "#0f172a" }} className="py-3 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-slate-300 font-semibold text-sm">JobBoard</span>
            <ChevronRight size={12} className="text-slate-600" />
            <span>My Profile</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs gap-1.5">
              <Download size={13} /> Download CV
            </Button>
            <Button size="sm" className="rounded-xl text-white font-bold border-0 text-xs gap-1.5" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <Globe size={13} /> Public Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* ── HERO CARD ── */}
        <Card className="hero-bg border-0 rounded-3xl overflow-hidden shadow-2xl">
          <CardContent className="p-8 relative" style={{ zIndex: 1 }}>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              {/* Avatar + info */}
              <div className="flex gap-5 items-center">
                {/* Avatar */}
                <div className="avatar-wrap relative flex-shrink-0" style={{ width: 88, height: 88 }}>
                  <Avatar className="w-full h-full border-4 border-indigo-400/30 shadow-xl" style={{ borderRadius: "50%" }}>
                    <AvatarFallback className="text-2xl font-black text-indigo-300 display-font" style={{ background: "rgba(99,102,241,0.2)", borderRadius: "50%" }}>
                      {initials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="avatar-overlay" onClick={() => fileRef.current?.click()}>
                    <Camera size={20} className="cam-icon text-white" />
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                </div>

                <div>
                  <div className="avail-badge mb-2">
                    <span className="avail-dot" /> {profile.availability}
                  </div>
                  <h1 className="display-font text-3xl font-black text-white leading-tight">{profile.name}</h1>
                  <p className="text-indigo-300 font-semibold mt-0.5">{profile.title}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-400 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={11} className="text-indigo-400" />{profile.location}</span>
                    <span className="flex items-center gap-1"><Mail size={11} className="text-indigo-400" />{profile.email}</span>
                    <span className="flex items-center gap-1"><Phone size={11} className="text-indigo-400" />{profile.phone}</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    {[
                      { icon: Globe,    val: profile.website  },
                      { icon: Linkedin, val: profile.linkedin },
                      { icon: Github,   val: profile.github   },
                    ].map(({ icon: Icon, val }) => (
                      <span key={val} className="flex items-center gap-1 text-indigo-400 text-xs hover:text-white cursor-pointer transition-colors">
                        <Icon size={12} />{val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile completion + edit */}
              <div className="flex flex-col items-end gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[180px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Profile Strength</span>
                    <span className="text-sm font-black text-indigo-300">{profile.profileCompletion}%</span>
                  </div>
                  <Progress value={profile.profileCompletion} className="h-2" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <p className="text-xs text-slate-500 mt-2">Add certifications to reach 100%</p>
                </div>
                <Button
                  className="rounded-xl font-bold text-white border-0 gap-2"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
                  onClick={() => openEdit("hero", {
                    name: profile.name, title: profile.title, location: profile.location,
                    email: profile.email, phone: profile.phone, website: profile.website,
                    linkedin: profile.linkedin, github: profile.github, availability: profile.availability
                  })}
                >
                  <Pencil size={14} /> Edit Profile
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 editable-row flex justify-between gap-4">
              <p className="text-slate-300 text-sm leading-relaxed flex-1">{profile.bio}</p>
              <button className="edit-btn text-indigo-400 hover:text-white flex-shrink-0 transition-colors"
                onClick={() => openEdit("bio", { bio: profile.bio })}>
                <Pencil size={14} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* ── TABS ── */}
        <Tabs defaultValue="overview">
          <TabsList className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm w-full justify-start gap-1">
            {[
              { val: "overview",  icon: User,         label: "Overview"       },
              { val: "experience",icon: Briefcase,     label: "Experience"     },
              { val: "education", icon: GraduationCap, label: "Education"      },
              { val: "skills",    icon: Zap,           label: "Skills"         },
              { val: "certs",     icon: Award,         label: "Certifications" },
            ].map(({ val, icon: Icon, label }) => (
              <TabsTrigger key={val} value={val}
                className="rounded-xl gap-1.5 text-xs font-semibold data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
                style={{ "--tw-ring-color": "transparent" }}
              >
                <span className="data-[state=active]:text-white flex items-center gap-1.5">
                  <Icon size={13} />{label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── OVERVIEW TAB ── */}
          <TabsContent value="overview" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Contact Card */}
            <Card className="card-lift border-0 shadow-sm rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="display-font text-lg text-slate-800 flex items-center gap-2">
                  <Mail size={16} className="text-indigo-500" /> Contact Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Mail,    label: "Email",    val: profile.email    },
                  { icon: Phone,   label: "Phone",    val: profile.phone    },
                  { icon: MapPin,  label: "Location", val: profile.location },
                  { icon: Globe,   label: "Website",  val: profile.website  },
                  { icon: Linkedin,label: "LinkedIn", val: profile.linkedin },
                  { icon: Github,  label: "GitHub",   val: profile.github   },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#eef2ff" }}>
                      <Icon size={13} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">{label}</p>
                      <p className="text-sm font-medium text-slate-700">{val}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills snapshot */}
            <Card className="card-lift border-0 shadow-sm rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="display-font text-lg text-slate-800 flex items-center gap-2">
                  <TrendingUp size={16} className="text-indigo-500" /> Top Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.skills.slice(0, 5).map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs font-medium text-slate-600 mb-1.5">
                      <span>{s.name}</span><span className="text-indigo-500">{s.level}%</span>
                    </div>
                    <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="card-lift border-0 shadow-sm rounded-2xl md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="display-font text-lg text-slate-800 flex items-center gap-2">
                  <Star size={16} className="text-indigo-500" /> Keywords & Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.tags.map(t => (
                    <span key={t} className="tag-pill group">
                      {t}
                      <button onClick={() => removeTag(t)} className="ml-1 opacity-50 group-hover:opacity-100 hover:text-red-300 transition-colors"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input value={newTag} onChange={e => setNewTag(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addTag()}
                    placeholder="Add a keyword..." className="rounded-xl text-sm border-slate-200 h-9" />
                  <Button onClick={addTag} size="sm" className="rounded-xl text-white border-0 gap-1 px-3"
                    style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                    <Plus size={14} /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── EXPERIENCE TAB ── */}
          <TabsContent value="experience" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openEdit("exp", { role:"", company:"", duration:"", desc:"" })}
                className="rounded-xl text-white font-bold border-0 gap-2"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <Plus size={14} /> Add Experience
              </Button>
            </div>
            {profile.experience.map((exp, i) => (
              <Card key={exp.id} className="card-lift border-0 shadow-sm rounded-2xl editable-row">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#eef2ff,#e0e7ff)" }}>
                    <Building2 size={18} className="text-indigo-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-800">{exp.role}</h3>
                        <p className="text-indigo-600 text-sm font-medium">{exp.company}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <Calendar size={10} />{exp.duration}
                        </span>
                      </div>
                      <div className="edit-btn flex gap-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-indigo-50 hover:text-indigo-600"
                          onClick={() => openEdit("exp", { ...exp })}>
                          <Pencil size={12} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500"
                          onClick={() => deleteExp(exp.id)}>
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{exp.desc}</p>
                  </div>
                </CardContent>
                {i < profile.experience.length - 1 && <Separator />}
              </Card>
            ))}
          </TabsContent>

          {/* ── EDUCATION TAB ── */}
          <TabsContent value="education" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openEdit("edu", { degree:"", school:"", year:"", grade:"" })}
                className="rounded-xl text-white font-bold border-0 gap-2"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <Plus size={14} /> Add Education
              </Button>
            </div>
            {profile.education.map(edu => (
              <Card key={edu.id} className="card-lift border-0 shadow-sm rounded-2xl editable-row">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#fef3c7,#fde68a)" }}>
                    <GraduationCap size={18} className="text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                        <p className="text-amber-600 text-sm font-medium">{edu.school}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Calendar size={10} />{edu.year}</span>
                          <Badge variant="outline" className="text-xs border-amber-200 text-amber-600 bg-amber-50 rounded-full px-2">{edu.grade}</Badge>
                        </div>
                      </div>
                      <div className="edit-btn flex gap-1">
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-amber-50 hover:text-amber-600"
                          onClick={() => openEdit("edu", { ...edu })}>
                          <Pencil size={12} />
                        </Button>
                        <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500"
                          onClick={() => deleteEdu(edu.id)}>
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ── SKILLS TAB ── */}
          <TabsContent value="skills" className="mt-4">
            <Card className="border-0 shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="display-font text-lg text-slate-800">Skills & Proficiency</CardTitle>
                <Button size="sm" onClick={() => openEdit("skill", { skillName:"", skillLevel:50 })}
                  className="rounded-xl text-white border-0 gap-1.5 text-xs"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  <Plus size={13} /> Add Skill
                </Button>
              </CardHeader>
              <CardContent className="space-y-5">
                {profile.skills.map(s => (
                  <div key={s.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-indigo-500">{s.level}%</span>
                        <input type="range" min={0} max={100} value={s.level}
                          onChange={e => updateSkillLevel(s.name, Number(e.target.value))}
                          className="w-20 accent-indigo-500 cursor-pointer" />
                        <button onClick={() => removeSkill(s.name)}
                          className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="skill-bar"><div className="skill-fill" style={{ width: `${s.level}%` }} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── CERTIFICATIONS TAB ── */}
          <TabsContent value="certs" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => openEdit("cert", { name:"", issuer:"", year:"" })}
                className="rounded-xl text-white font-bold border-0 gap-2"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <Plus size={14} /> Add Certification
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.certifications.map(cert => (
                <Card key={cert.id} className="card-lift border-0 shadow-sm rounded-2xl editable-row">
                  <CardContent className="p-5 flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#d1fae5,#a7f3d0)" }}>
                      <Award size={18} className="text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-800 text-sm">{cert.name}</h3>
                          <p className="text-emerald-600 text-xs font-medium mt-0.5">{cert.issuer}</p>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400 mt-1"><Clock size={10} />{cert.year}</span>
                        </div>
                        <div className="edit-btn flex gap-1">
                          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-emerald-50 hover:text-emerald-600"
                            onClick={() => openEdit("cert", { ...cert })}>
                            <Pencil size={12} />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg hover:bg-red-50 hover:text-red-500"
                            onClick={() => deleteCert(cert.id)}>
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ══ DIALOGS ══════════════════════════════════════════ */}

      {/* Hero Edit */}
      <EditDialog title="Edit Profile Info" open={editSection==="hero"} onOpenChange={closeEdit} onSave={saveHero}>
        <div className="grid grid-cols-2 gap-3">
          {[["name","Full Name"],["title","Job Title"],["location","Location"],["phone","Phone"],["email","Email"],["website","Website"],["linkedin","LinkedIn"],["github","GitHub"]].map(([k,lbl])=>(
            <div key={k} className={k==="name"||k==="title"?"col-span-2":""}>
              <Label className="text-xs text-slate-500 mb-1 block">{lbl}</Label>
              <Input value={draft[k]||""} onChange={dp(k)} className="rounded-xl border-slate-200 text-sm h-9" />
            </div>
          ))}
          <div className="col-span-2">
            <Label className="text-xs text-slate-500 mb-1 block">Availability Status</Label>
            <Input value={draft.availability||""} onChange={dp("availability")} className="rounded-xl border-slate-200 text-sm h-9" />
          </div>
        </div>
      </EditDialog>

      {/* Bio Edit */}
      <EditDialog title="Edit Bio" open={editSection==="bio"} onOpenChange={closeEdit}
        onSave={() => { setProfile(p=>({...p, bio:draft.bio})); closeEdit(); flash() }}>
        <Textarea value={draft.bio||""} onChange={dp("bio")} rows={5} className="rounded-xl border-slate-200 text-sm resize-none" placeholder="Tell employers about yourself..." />
      </EditDialog>

      {/* Experience Edit */}
      <EditDialog title={draft.id?"Edit Experience":"Add Experience"} open={editSection==="exp"} onOpenChange={closeEdit} onSave={saveExp}>
        {[["role","Job Title"],["company","Company"],["duration","Duration (e.g. Jan 2022 – Present)"]].map(([k,lbl])=>(
          <div key={k}>
            <Label className="text-xs text-slate-500 mb-1 block">{lbl}</Label>
            <Input value={draft[k]||""} onChange={dp(k)} className="rounded-xl border-slate-200 text-sm h-9" />
          </div>
        ))}
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Description</Label>
          <Textarea value={draft.desc||""} onChange={dp("desc")} rows={3} className="rounded-xl border-slate-200 text-sm resize-none" />
        </div>
      </EditDialog>

      {/* Education Edit */}
      <EditDialog title={draft.id?"Edit Education":"Add Education"} open={editSection==="edu"} onOpenChange={closeEdit} onSave={saveEdu}>
        {[["degree","Degree / Certificate"],["school","School / Institution"],["year","Year"],["grade","Grade / Honours"]].map(([k,lbl])=>(
          <div key={k}>
            <Label className="text-xs text-slate-500 mb-1 block">{lbl}</Label>
            <Input value={draft[k]||""} onChange={dp(k)} className="rounded-xl border-slate-200 text-sm h-9" />
          </div>
        ))}
      </EditDialog>

      {/* Skill Add */}
      <EditDialog title="Add Skill" open={editSection==="skill"} onOpenChange={closeEdit} onSave={addSkill}>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Skill Name</Label>
          <Input value={draft.skillName||""} onChange={dp("skillName")} className="rounded-xl border-slate-200 text-sm h-9" placeholder="e.g. Figma" />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Proficiency: {draft.skillLevel||50}%</Label>
          <input type="range" min={0} max={100} value={draft.skillLevel||50}
            onChange={e => setDraft(d=>({...d, skillLevel: Number(e.target.value)}))}
            className="w-full accent-indigo-500" />
        </div>
      </EditDialog>

      {/* Certification Edit */}
      <EditDialog title={draft.id?"Edit Certification":"Add Certification"} open={editSection==="cert"} onOpenChange={closeEdit} onSave={saveCert}>
        {[["name","Certification Name"],["issuer","Issuing Organization"],["year","Year Obtained"]].map(([k,lbl])=>(
          <div key={k}>
            <Label className="text-xs text-slate-500 mb-1 block">{lbl}</Label>
            <Input value={draft[k]||""} onChange={dp(k)} className="rounded-xl border-slate-200 text-sm h-9" />
          </div>
        ))}
      </EditDialog>
    </div>
  )
}