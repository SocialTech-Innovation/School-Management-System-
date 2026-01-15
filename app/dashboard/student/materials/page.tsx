"use client"

import { useEffect, useState } from "react"
import { StudentLayout } from "@/components/dashboard/student-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, Search, FileText, File, Image, Video,
  FolderOpen, Calendar, User, BookOpen, TrendingUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Material {
  id: string
  subject: string
  teacherName: string
  teacherAvatar: string
  title: string
  description: string
  fileName: string
  fileType: string
  fileSize: number
  category: "notes" | "assignment" | "reading" | "video" | "other"
  uploadDate: string
  isNew: boolean
}

const mockMaterials: Material[] = [
  {
    id: "mat-1",
    subject: "Mathematics",
    teacherName: "Prof. Sarah Anderson",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    title: "Chapter 5: Quadratic Equations",
    description: "Complete notes on quadratic equations with solved examples and practice problems.",
    fileName: "chapter5-notes.pdf",
    fileType: "pdf",
    fileSize: 2048000,
    category: "notes",
    uploadDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: true
  },
  {
    id: "mat-2",
    subject: "Mathematics",
    teacherName: "Prof. Sarah Anderson",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    title: "Assignment 3: Calculus Problems",
    description: "Practice assignment on differentiation and integration. Due date: Jan 20, 2026",
    fileName: "assignment3.pdf",
    fileType: "pdf",
    fileSize: 1024000,
    category: "assignment",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: true
  },
  {
    id: "mat-3",
    subject: "Physics",
    teacherName: "Prof. James Wilson",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    title: "Physics Lab Video: Pendulum Experiment",
    description: "Demonstration of simple pendulum experiment with data collection and analysis.",
    fileName: "pendulum-experiment.mp4",
    fileType: "video",
    fileSize: 15360000,
    category: "video",
    uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  },
  {
    id: "mat-4",
    subject: "Chemistry",
    teacherName: "Prof. Emily Chen",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    title: "Organic Chemistry Reference Guide",
    description: "Comprehensive guide covering nomenclature, reactions, and mechanisms.",
    fileName: "organic-chem-guide.pdf",
    fileType: "pdf",
    fileSize: 5120000,
    category: "reading",
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  },
  {
    id: "mat-5",
    subject: "English",
    teacherName: "Prof. David Brown",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    title: "Shakespeare's Hamlet - Study Guide",
    description: "Character analysis, themes, and key quotes from Hamlet.",
    fileName: "hamlet-study-guide.pdf",
    fileType: "pdf",
    fileSize: 3072000,
    category: "reading",
    uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  },
  {
    id: "mat-6",
    subject: "Biology",
    teacherName: "Prof. Maria Garcia",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    title: "Cell Structure Presentation",
    description: "Detailed PowerPoint presentation on cell structure and organelles.",
    fileName: "cell-structure.pptx",
    fileType: "pptx",
    fileSize: 8192000,
    category: "notes",
    uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  },
  {
    id: "mat-7",
    subject: "History",
    teacherName: "Prof. Robert Taylor",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert",
    title: "World War II Timeline",
    description: "Important events and dates of World War II with maps and photos.",
    fileName: "ww2-timeline.pdf",
    fileType: "pdf",
    fileSize: 4096000,
    category: "notes",
    uploadDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  },
  {
    id: "mat-8",
    subject: "Mathematics",
    teacherName: "Prof. Sarah Anderson",
    teacherAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    title: "Trigonometry Practice Problems",
    description: "50 practice problems with solutions for trigonometric identities and equations.",
    fileName: "trig-practice.pdf",
    fileType: "pdf",
    fileSize: 1536000,
    category: "assignment",
    uploadDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    isNew: false
  }
]

export default function StudentMaterialsPage() {
  useEffect(() => {
      document.title = "My Class Materials"
    }, [])
  const { toast } = useToast()
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "English", "Biology", "History"]

  const filteredMaterials = materials.filter(mat => {
    const matchesSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mat.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = filterSubject === "all" || mat.subject === filterSubject
    const matchesCategory = filterCategory === "all" || mat.category === filterCategory
    
    return matchesSearch && matchesSubject && matchesCategory
  })

  const handleDownload = (material: Material) => {
    // Mark as not new after download
    setMaterials(prev => prev.map(m => 
      m.id === material.id ? { ...m, isNew: false } : m
    ))
    
    toast({
      title: "Downloading",
      description: `Downloading ${material.fileName}...`
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === "pdf" || fileType === "doc" || fileType === "docx") return <FileText className="w-8 h-8" />
    if (fileType === "jpg" || fileType === "png" || fileType === "gif") return <Image className="w-8 h-8" />
    if (fileType === "mp4" || fileType === "avi" || fileType === "mov") return <Video className="w-8 h-8" />
    if (fileType === "ppt" || fileType === "pptx") return <FileText className="w-8 h-8" />
    return <File className="w-8 h-8" />
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      notes: "bg-info",
      assignment: "bg-warning",
      reading: "bg-success",
      video: "bg-primary",
      other: "bg-muted"
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-blue-500",
      Physics: "bg-purple-500",
      Chemistry: "bg-green-500",
      English: "bg-orange-500",
      Biology: "bg-teal-500",
      History: "bg-red-500"
    }
    return colors[subject] || "bg-gray-500"
  }

  const newMaterialsCount = materials.filter(m => m.isNew).length
  const totalSize = materials.reduce((sum, mat) => sum + mat.fileSize, 0)

  return (
    <StudentLayout title="Class Materials">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Class Materials</h1>
            <p className="text-muted-foreground mt-1">Access study materials shared by your teachers</p>
          </div>
        </div>

        {/* Stats */}
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
                  <p className="text-3xl font-bold text-warning">{newMaterialsCount}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-3xl font-bold text-info">{formatFileSize(totalSize)}</p>
                </div>
                <Download className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Subjects</p>
                  <p className="text-3xl font-bold text-success">{subjects.length - 1}</p>
                </div>
                <BookOpen className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Tabs value={filterSubject} onValueChange={setFilterSubject} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-4 lg:grid-cols-7">
                  {subjects.map(subject => (
                    <TabsTrigger key={subject} value={subject}>
                      {subject === "all" ? "All" : subject}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant={filterCategory === "all" ? "default" : "outline"}
                onClick={() => setFilterCategory("all")}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filterCategory === "notes" ? "default" : "outline"}
                onClick={() => setFilterCategory("notes")}
              >
                Notes
              </Button>
              <Button
                size="sm"
                variant={filterCategory === "assignment" ? "default" : "outline"}
                onClick={() => setFilterCategory("assignment")}
              >
                Assignments
              </Button>
              <Button
                size="sm"
                variant={filterCategory === "reading" ? "default" : "outline"}
                onClick={() => setFilterCategory("reading")}
              >
                Reading
              </Button>
              <Button
                size="sm"
                variant={filterCategory === "video" ? "default" : "outline"}
                onClick={() => setFilterCategory("video")}
              >
                Videos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="animate-slide-up" style={{ animationDelay: "250ms" }}>
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12">
                <div className="text-center">
                  <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium text-muted-foreground">No materials found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchQuery ? "Try adjusting your search or filters" : "Check back later for new materials"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterials.map((material, index) => (
                <Card
                  key={material.id}
                  className="hover:shadow-lg transition-all animate-slide-up"
                  style={{ animationDelay: `${300 + index * 30}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary">
                        {getFileIcon(material.fileType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground line-clamp-2">
                            {material.title}
                          </h3>
                          {material.isNew && (
                            <Badge className="bg-warning text-white shrink-0">New</Badge>
                          )}
                        </div>
                        <div className={`inline-block px-2 py-0.5 rounded text-xs text-white ${getSubjectColor(material.subject)}`}>
                          {material.subject}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {material.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <User className="w-3 h-3" />
                      <span>{material.teacherName}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryBadge(material.category)}>
                        {material.category}
                      </Badge>
                      <Badge variant="outline">
                        {formatFileSize(material.fileSize)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(material.uploadDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-muted-foreground">{material.fileName}</span>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => handleDownload(material)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  )
}
