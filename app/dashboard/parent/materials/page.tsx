"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FolderOpen, Download, Search, FileText, File, Image, Video, Calendar, User, BookOpen
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

interface Material {
  id: string
  subject: string
  teacherName: string
  title: string
  description: string
  fileName: string
  fileType: string
  fileSize: number
  category: "notes" | "assignment" | "reading" | "video"
  uploadDate: string
  isNew: boolean
  downloaded: boolean
}

const mockMaterials: Material[] = [
  {
    id: "mat-1",
    subject: "Mathematics",
    teacherName: "Mr. Roberts",
    title: "Chapter 5: Quadratic Equations",
    description: "Complete notes on quadratic equations with solved examples.",
    fileName: "chapter5-notes.pdf",
    fileType: "pdf",
    fileSize: 2048000,
    category: "notes",
    uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: true,
    downloaded: false,
  },
  {
    id: "mat-2",
    subject: "Mathematics",
    teacherName: "Mr. Roberts",
    title: "Assignment 3: Calculus Problems",
    description: "Practice assignment. Due date: Jan 20, 2026",
    fileName: "assignment3.pdf",
    fileType: "pdf",
    fileSize: 1024000,
    category: "assignment",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: true,
    downloaded: false,
  },
  {
    id: "mat-3",
    subject: "Physics",
    teacherName: "Dr. Williams",
    title: "Physics Lab Video: Pendulum Experiment",
    description: "Demonstration of simple pendulum experiment.",
    fileName: "pendulum-experiment.mp4",
    fileType: "video",
    fileSize: 15360000,
    category: "video",
    uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    downloaded: true,
  },
  {
    id: "mat-4",
    subject: "Chemistry",
    teacherName: "Mrs. Davis",
    title: "Organic Chemistry Reference Guide",
    description: "Comprehensive guide covering reactions and mechanisms.",
    fileName: "organic-chem-guide.pdf",
    fileType: "pdf",
    fileSize: 5120000,
    category: "reading",
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    downloaded: true,
  },
  {
    id: "mat-5",
    subject: "English",
    teacherName: "Mrs. Anderson",
    title: "Shakespeare's Hamlet - Study Guide",
    description: "Character analysis and themes from Hamlet.",
    fileName: "hamlet-study-guide.pdf",
    fileType: "pdf",
    fileSize: 3072000,
    category: "reading",
    uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false,
    downloaded: true,
  },
]

export default function ClassMaterialsPage() {
  useEffect(() => {
      document.title = "Class Materials"
    }, [])
  const { toast } = useToast()
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "English", "Science", "History"]

  const filteredMaterials = materials.filter((mat) => {
    const matchesSearch =
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = filterSubject === "all" || mat.subject === filterSubject
    const matchesCategory = filterCategory === "all" || mat.category === filterCategory
    return matchesSearch && matchesSubject && matchesCategory
  })

  const handleDownload = (material: Material) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === material.id ? { ...m, isNew: false, downloaded: true } : m))
    )
    toast({
      title: "Downloading",
      description: `Downloading ${material.fileName}...`,
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === "pdf" || fileType === "doc") return <FileText className="w-8 h-8" />
    if (fileType === "jpg" || fileType === "png") return <Image className="w-8 h-8" />
    if (fileType === "mp4" || fileType === "avi") return <Video className="w-8 h-8" />
    return <File className="w-8 h-8" />
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      notes: "bg-info text-white",
      assignment: "bg-warning text-white",
      reading: "bg-success text-white",
      video: "bg-primary text-white",
    }
    return colors[category as keyof typeof colors] || "bg-muted"
  }

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-blue-500",
      Physics: "bg-purple-500",
      Chemistry: "bg-green-500",
      English: "bg-orange-500",
      Science: "bg-teal-500",
      History: "bg-red-500",
    }
    return colors[subject] || "bg-gray-500"
  }

  const newCount = materials.filter((m) => m.isNew).length
  const downloadedCount = materials.filter((m) => m.downloaded).length
  const totalSize = materials.reduce((sum, mat) => sum + mat.fileSize, 0)

  return (
    <ParentLayout title="Class Materials" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Materials</p>
                  <p className="text-3xl font-bold text-foreground">{materials.length}</p>
                </div>
                <FolderOpen className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">New Materials</p>
                  <p className="text-3xl font-bold text-warning">{newCount}</p>
                </div>
                <FileText className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Downloaded</p>
                  <p className="text-3xl font-bold text-success">{downloadedCount}</p>
                </div>
                <Download className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-3xl font-bold text-info">{formatFileSize(totalSize)}</p>
                </div>
                <BookOpen className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Subject:</p>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject === "all" ? "All Subjects" : subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">Type:</p>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["all", "notes", "assignment", "reading", "video"].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Types" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: "250ms" }}>
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary">
                    {getFileIcon(material.fileType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground line-clamp-2">{material.title}</h3>
                      {material.isNew && <Badge className="bg-warning text-white shrink-0">New</Badge>}
                    </div>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs text-white ${getSubjectColor(material.subject)}`}>
                      {material.subject}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{material.description}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <User className="w-3 h-3" />
                  <span>{material.teacherName}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Badge className={getCategoryBadge(material.category)}>{material.category}</Badge>
                  <Badge variant="outline">{formatFileSize(material.fileSize)}</Badge>
                  {material.downloaded && <Badge variant="outline" className="text-success border-success">Downloaded</Badge>}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(material.uploadDate).toLocaleDateString()}
                  </span>
                </div>

                <Button className="w-full" onClick={() => handleDownload(material)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ParentLayout>
  )
}
