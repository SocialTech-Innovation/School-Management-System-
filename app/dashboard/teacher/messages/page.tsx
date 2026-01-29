"use client"

import { useState, useEffect } from "react"
import { TeacherLayout } from "@/components/dashboard/teacher-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Send, Inbox, Archive, Search, Filter, MessageCircle, 
  User, Clock, Mail, Phone, CheckCircle, AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  studentId: string
  studentName: string
  studentAvatar: string
  parentName: string
  parentEmail: string
  parentPhone: string
  subject: string
  message: string
  reply?: string
  timestamp: string
  status: "unread" | "read" | "replied"
  isFromParent: boolean
}

const mockMessages: Message[] = [
  {
    id: "msg-1",
    studentId: "1",
    studentName: "Emma Johnson",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    parentName: "Michael Johnson",
    parentEmail: "michael.j@email.com",
    parentPhone: "+1 234-567-8901",
    subject: "Request for Parent-Teacher Meeting",
    message: "Hello Professor, I would like to schedule a meeting to discuss Emma's progress in Mathematics. Are you available next week?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "unread",
    isFromParent: true
  },
  {
    id: "msg-2",
    studentId: "2",
    studentName: "Liam Smith",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    parentName: "Sarah Smith",
    parentEmail: "sarah.s@email.com",
    parentPhone: "+1 234-567-8902",
    subject: "Absence Notification",
    message: "Dear Teacher, Liam will be absent tomorrow due to a doctor's appointment. Please excuse his absence.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "read",
    isFromParent: true
  },
  {
    id: "msg-3",
    studentId: "3",
    studentName: "Olivia Brown",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    parentName: "David Brown",
    parentEmail: "david.b@email.com",
    parentPhone: "+1 234-567-8904",
    subject: "Re: Mid-term Results",
    message: "Thank you for the detailed feedback on Olivia's performance. We will work with her on the areas you mentioned.",
    reply: "I appreciate your support. Olivia is doing well overall. Please focus on algebraic concepts with her.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "replied",
    isFromParent: true
  },
  {
    id: "msg-4",
    studentId: "4",
    studentName: "Noah Williams",
    studentAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    parentName: "Emily Williams",
    parentEmail: "emily.w@email.com",
    parentPhone: "+1 234-567-8906",
    subject: "Homework Clarification",
    message: "Hi, Noah is having difficulty understanding the homework assigned on Monday. Could you provide some additional guidance?",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: "unread",
    isFromParent: true
  }
]

export default function ParentCommunicationPage() {
  useEffect(() => {
      document.title = "Parent Messages"
    }, [])
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [replyText, setReplyText] = useState("")
  
  // Compose form
  const [selectedStudent, setSelectedStudent] = useState("")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeMessage, setComposeMessage] = useState("")

  const students = [
    { id: "1", name: "Emma Johnson", parent: "Michael Johnson" },
    { id: "2", name: "Liam Smith", parent: "Sarah Smith" },
    { id: "3", name: "Olivia Brown", parent: "David Brown" },
    { id: "4", name: "Noah Williams", parent: "Emily Williams" },
  ]

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeTab === "inbox") return matchesSearch && msg.status === "unread"
    if (activeTab === "read") return matchesSearch && msg.status === "read"
    if (activeTab === "replied") return matchesSearch && msg.status === "replied"
    return matchesSearch
  })

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message)
    setShowMessageModal(true)
    
    // Mark as read
    if (message.status === "unread") {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? { ...m, status: "read" as const } : m
      ))
    }
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return

    setMessages(prev => prev.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, reply: replyText, status: "replied" as const }
        : m
    ))

    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedMessage.parentName} has been sent.`
    })

    setReplyText("")
    setShowMessageModal(false)
  }

  const handleComposeMessage = () => {
    if (!selectedStudent || !composeSubject.trim() || !composeMessage.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    const student = students.find(s => s.id === selectedStudent)!
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`,
      parentName: student.parent,
      parentEmail: "parent@email.com",
      parentPhone: "+1 234-567-8900",
      subject: composeSubject,
      message: composeMessage,
      timestamp: new Date().toISOString(),
      status: "replied",
      isFromParent: false
    }

    setMessages(prev => [newMessage, ...prev])

    toast({
      title: "Message Sent",
      description: `Your message to ${student.parent} has been sent.`
    })

    // Reset form
    setSelectedStudent("")
    setComposeSubject("")
    setComposeMessage("")
    setShowComposeModal(false)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const unreadCount = messages.filter(m => m.status === "unread").length

  return (
    <TeacherLayout title="Parent Communication" showBackButton>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="animate-slide-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread Messages</p>
                  <p className="text-3xl font-bold text-warning">{unreadCount}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "50ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                  <p className="text-3xl font-bold text-foreground">{messages.length}</p>
                </div>
                <Inbox className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Replied</p>
                  <p className="text-3xl font-bold text-success">
                    {messages.filter(m => m.status === "replied").length}
                  </p>
                </div>
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                  <p className="text-3xl font-bold text-info">92%</p>
                </div>
                <MessageCircle className="w-10 h-10 text-info" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Card */}
        <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Messages</CardTitle>
              <div className="flex items-center gap-2">
                {/* Search moved below the Messages title */}
                <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
                  <DialogTrigger asChild>
                  <Button size="sm" className="whitespace-nowrap">
                    <Send className="w-4 h-4 mr-2" />
                    Compose
                  </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send Message to Parent</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                    <label className="text-sm font-medium mb-2 block">Select Student</label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                      <SelectValue placeholder="Choose a student..." />
                      </SelectTrigger>
                      <SelectContent>
                      {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>
                        {student.name} - Parent: {student.parent}
                        </SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                    </div>
                    <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="Enter subject..."
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                    />
                    </div>
                    <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Type your message..."
                      value={composeMessage}
                      onChange={(e) => setComposeMessage(e.target.value)}
                      rows={6}
                    />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                    <Button className="w-full sm:w-auto" variant="outline" onClick={() => setShowComposeModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleComposeMessage}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    </div>
                  </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All ({messages.length})</TabsTrigger>
              <TabsTrigger value="inbox">
                Unread ({messages.filter(m => m.status === "unread").length})
              </TabsTrigger>
              <TabsTrigger value="replied">
                Replied ({messages.filter(m => m.status === "replied").length})
              </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-3">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <Inbox className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium text-muted-foreground">No messages found</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {searchQuery ? "Try adjusting your search" : "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((message, index) => (
                    <Card
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`cursor-pointer transition-all hover:shadow-md animate-slide-up ${
                        message.status === "unread" ? "border-l-4 border-l-warning bg-warning/5" : ""
                      }`}
                      style={{ animationDelay: `${250 + index * 30}ms` }}
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={message.studentAvatar} />
                            <AvatarFallback>{message.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold text-foreground">{message.parentName}</p>
                                <p className="text-sm text-muted-foreground">
                                  Parent of {message.studentName}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {message.status === "unread" && (
                                  <Badge variant="outline" className="bg-warning text-warning-foreground">New</Badge>
                                )}
                                {message.status === "replied" && (
                                  <Badge className="bg-success">Replied</Badge>
                                )}
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatTimestamp(message.timestamp)}
                                </span>
                              </div>
                            </div>
                            <p className="font-medium text-foreground mb-1">{message.subject}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Message Detail Modal */}
        <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-6">
                {/* Parent Info */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={selectedMessage.studentAvatar} />
                    <AvatarFallback>{selectedMessage.studentName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-foreground">{selectedMessage.parentName}</p>
                    <p className="text-sm text-muted-foreground mb-2">Parent of {selectedMessage.studentName}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {selectedMessage.parentEmail}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {selectedMessage.parentPhone}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedMessage.subject}</h3>
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                {/* Previous Reply */}
                {selectedMessage.reply && (
                  <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-l-primary">
                    <p className="text-sm font-medium text-primary mb-2">Your Reply:</p>
                    <p className="text-foreground">{selectedMessage.reply}</p>
                  </div>
                )}

                {/* Reply Section */}
                {selectedMessage.status !== "replied" && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Your Reply</label>
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={5}
                    />
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowMessageModal(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSendReply} disabled={!replyText.trim()}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TeacherLayout>
  )
}
