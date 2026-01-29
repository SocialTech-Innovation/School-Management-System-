"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { 
  Upload, FileText, Download, Trash2, Search,
  File as FileIcon, Image, Video, BookOpen, Calendar, FolderOpen
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Material {
  id: string
  classId: string
  className: string
  title: string
  description: string
  fileUrl: string
  fileName: string
  fileType: string
  fileSize: number
  category: "notes" | "assignment" | "reading" | "video" | "other"
  uploadDate: string
  downloads: number
}

const mockMaterials: Material[] = [
  {
    id: "mat-1",
    classId: "1",
    className: "Class 10-A",
    title: "Chapter 5: Quadratic Equations",
    description: "Complete notes on quadratic equations with solved examples and practice problems.",
    fileUrl: "/materials/chapter5-notes.pdf",
    fileName: "chapter5-notes.pdf",
    fileType: "pdf",
    fileSize: 2048000,
    category: "notes",
    uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 32
  },
  {
    id: "mat-2",
    classId: "1",
    className: "Class 10-A",
    title: "Assignment 3: Calculus Problems",
    description: "Practice assignment on differentiation and integration. Due date: Jan 20, 2026",
    fileUrl: "/materials/assignment3.pdf",
    fileName: "assignment3.pdf",
    fileType: "pdf",
    fileSize: 1024000,
    category: "assignment",
    uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 35
  },
  {
    id: "mat-3",
    classId: "2",
    className: "Class 9-B",
    title: "Physics Lab Video: Pendulum Experiment",
    description: "Demonstration of simple pendulum experiment with data collection and analysis.",
    fileUrl: "/materials/pendulum-experiment.mp4",
    fileName: "pendulum-experiment.mp4",
    fileType: "video",
    fileSize: 15360000,
    category: "video",
    uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 28
  },
  {
    id: "mat-4",
    classId: "3",
    className: "Class 11-C",
    title: "Organic Chemistry Reference Guide",
    description: "Comprehensive guide covering nomenclature, reactions, and mechanisms.",
    fileUrl: "/materials/organic-chem-guide.pdf",
    fileName: "organic-chem-guide.pdf",
    fileType: "pdf",
    fileSize: 5120000,
    category: "reading",
    uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    downloads: 40
  }
]

const classes = [
  { id: "1", name: "Class 10-A - Mathematics" },
  { id: "2", name: "Class 9-B - Physics" },
  { id: "3", name: "Class 11-C - Chemistry" }
]

export default function ClassMaterialsPage() {
  useEffect(() => {
    document.title = "Class Materials"
  }, [])
  
  const { toast } = useToast()
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClass, setFilterClass] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Upload form state
  const [selectedClass, setSelectedClass] = useState("")
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadCategory, setUploadCategory] = useState<Material["category"]>("notes")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const filteredMaterials = materials.filter(mat => {
    const matchesSearch = mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mat.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = filterClass === "all" || mat.classId === filterClass
    const matchesCategory = filterCategory === "all" || mat.category === filterCategory
    
    return matchesSearch && matchesClass && matchesCategory
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Maximum file size is 50MB",
          variant: "destructive"
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedClass || !uploadTitle.trim() || !selectedFile) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields and select a file",
        variant: "destructive"
      })
      return
    }

    const classInfo = classes.find(c => c.id === selectedClass)!
    const fileType = selectedFile.name.split('.').pop() || ""

    const newMaterial: Material = {
      id: `mat-${Date.now()}`,
      classId: selectedClass,
      className: classInfo.name.split(' - ')[0],
      title: uploadTitle,
      description: uploadDescription,
      fileUrl: `/materials/${selectedFile.name}`,
      fileName: selectedFile.name,
      fileType: fileType,
      fileSize: selectedFile.size,
      category: uploadCategory,
      uploadDate: new Date().toISOString(),
      downloads: 0
    }

    setMaterials(prev => [newMaterial, ...prev])

    toast({
      title: "Material Uploaded",
      description: `"${uploadTitle}" has been uploaded successfully.`
    })

    setSelectedClass("")
    setUploadTitle("")
    setUploadDescription("")
    setUploadCategory("notes")
    setSelectedFile(null)
    setShowUploadModal(false)
  }

  const handleDelete = (materialId: string) => {
    setMaterials(prev => prev.filter(m => m.id !== materialId))
    toast({
      title: "Material Deleted",
      description: "The material has been removed."
    })
  }

  const handleDownload = (material: Material) => {
    setMaterials(prev => prev.map(m => 
      m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
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
    return <FileIcon className="w-8 h-8" />
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

  const totalSize = materials.reduce((sum, mat) => sum + mat.fileSize, 0)
  const totalDownloads = materials.reduce((sum, mat) => sum + mat.downloads, 0)

  return (
    <TeacherLayout title="Class Materials" showBackButton>
      <div className="space-y-6">
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
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                  <p className="text-3xl font-bold text-info">{formatFileSize(totalSize)}</p>
                </div>
                <Upload className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                  <p className="text-3xl font-bold text-success">{totalDownloads}</p>
                </div>
                <Download className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                  <p className="text-3xl font-bold text-warning">{classes.length}</p>
                </div>
                <BookOpen className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials List */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader className="space-y-4">
            {/* Top row: Title left, Upload button right */}
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="truncate">Uploaded Materials</CardTitle>

              <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2 flex-shrink-0">
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload Class Material</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Select Class *</Label>
                      <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose a class..." />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Title *</Label>
                      <Input
                        className="mt-2"
                        placeholder="e.g., Chapter 5 Notes"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        className="mt-2"
                        placeholder="Brief description of the material..."
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Category *</Label>
                      <Select value={uploadCategory} onValueChange={(v) => setUploadCategory(v as Material["category"])}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notes">Notes</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="reading">Reading Material</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Select File * (Max 50MB)</Label>
                      <Input
                        type="file"
                        className="mt-2"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.png,.mp4,.avi"
                      />
                      {selectedFile && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
                      <Button className="w-full sm:w-auto" variant="outline" onClick={() => setShowUploadModal(false)}>
                        Cancel
                      </Button>
                      <Button className="w-full sm:w-auto" onClick={handleUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Material
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Controls row: search + filters below */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>{cls.name.split(' - ')[0]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-muted-foreground">No materials found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery ? "Try adjusting your search or filters" : "Upload your first material to get started"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMaterials.map((material, index) => (
                  <Card
                    key={material.id}
                    className="hover:shadow-lg transition-all animate-slide-up"
                    style={{ animationDelay: `${250 + index * 30}ms` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary flex-shrink-0">
                          {getFileIcon(material.fileType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                            {material.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">{material.className}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {material.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={getCategoryBadge(material.category)}>
                          {material.category}
                        </Badge>
                        <Badge variant="outline">
                          {formatFileSize(material.fileSize)}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(material.uploadDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {material.downloads} downloads
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleDownload(material)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete material?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete &quot;{material.title}&quot;? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(material.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TeacherLayout>
  )
}
