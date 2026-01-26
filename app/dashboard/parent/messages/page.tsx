"use client"

import { useState, useEffect } from "react"
import { ParentLayout } from "@/components/dashboard/parent-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageCircle, Send, Search, MoreVertical, Phone, Video, PenSquare
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const childrenData = [
  { id: '1', name: 'Alex Johnson', avatar: '', class: '10-A', rollNo: 24 },
  { id: '2', name: 'Emma Johnson', avatar: '', class: '8-B', rollNo: 15 },
]

interface Message {
  id: string
  teacher: string
  role: string
  subject: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  messages: Array<{
    id: string
    sender: 'teacher' | 'parent'
    text: string
    time: string
  }>
}

const mockConversations: Message[] = [
  {
    id: '1',
    teacher: 'Mrs. Anderson',
    role: 'English Literature',
    subject: 'English',
    avatar: '',
    lastMessage: 'Alex needs to bring his signed permission slip for the museum trip by tomorrow.',
    time: '2h ago',
    unread: 2,
    messages: [
      { id: 'm1', sender: 'teacher', text: "Good morning! I wanted to discuss Alex's progress in English class.", time: '10:00 AM' },
      { id: 'm2', sender: 'parent', text: 'Good morning! Yes, please go ahead.', time: '10:15 AM' },
      { id: 'm3', sender: 'teacher', text: 'Alex has been doing exceptionally well. His essay writing has improved significantly.', time: '10:20 AM' },
      { id: 'm4', sender: 'teacher', text: 'Also, a reminder - Alex needs to bring his signed permission slip for the museum trip by tomorrow.', time: '2:00 PM' },
    ],
  },
  {
    id: '2',
    teacher: 'Mr. Roberts',
    role: 'Mathematics',
    subject: 'Math',
    avatar: '',
    lastMessage: 'Great improvement in the last algebra test. Keep it up!',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { id: 'm1', sender: 'teacher', text: 'Just wanted to let you know - Alex scored 92/100 in the last algebra test!', time: 'Yesterday, 3:00 PM' },
      { id: 'm2', sender: 'parent', text: "That's wonderful news! Thank you for letting us know.", time: 'Yesterday, 3:30 PM' },
      { id: 'm3', sender: 'teacher', text: 'Great improvement in the last algebra test. Keep it up!', time: 'Yesterday, 3:45 PM' },
    ],
  },
  {
    id: '3',
    teacher: 'Dr. Williams',
    role: 'Physics',
    subject: 'Physics',
    avatar: '',
    lastMessage: 'Please ensure Alex completes the lab assignment by Friday.',
    time: '2 days ago',
    unread: 0,
    messages: [
      { id: 'm1', sender: 'teacher', text: "Hello, I noticed Alex hasn't submitted the physics lab report yet.", time: 'Mon, 11:00 AM' },
      { id: 'm2', sender: 'parent', text: "I'll remind him about it. When is it due?", time: 'Mon, 2:00 PM' },
      { id: 'm3', sender: 'teacher', text: 'Please ensure Alex completes the lab assignment by Friday.', time: 'Mon, 2:15 PM' },
    ],
  },
]

const teachers = [
  { name: 'Mrs. Anderson', subject: 'English Literature' },
  { name: 'Mr. Roberts', subject: 'Mathematics' },
  { name: 'Dr. Williams', subject: 'Physics' },
  { name: 'Mrs. Chen', subject: 'Science' },
  { name: 'Mr. Thompson', subject: 'History' },
  { name: 'Mrs. Davis', subject: 'Chemistry' },
]

export default function TeacherMessagesPage() {
  useEffect(() => {
      document.title = "Teacher Messages"
    }, [])
  const { toast } = useToast()
  const [selectedChild, setSelectedChild] = useState(childrenData[0])
  const [conversations, setConversations] = useState<Message[]>(mockConversations)
  const [selectedConversation, setSelectedConversation] = useState<Message>(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [composeData, setComposeData] = useState({ teacher: '', message: '' })

  const filteredConversations = conversations.filter((conv) =>
    conv.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'parent' as const,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? { ...conv, messages: [...conv.messages, newMsg], lastMessage: newMessage, time: 'Just now' }
          : conv
      )
    )

    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }))

    setNewMessage('')
  }

  const handleComposeMessage = () => {
    if (!composeData.teacher || !composeData.message.trim()) {
      toast({
        title: "Error",
        description: "Please select a teacher and enter a message.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message Sent",
      description: `Your message to ${composeData.teacher} has been sent.`,
    })
    setShowCompose(false)
    setComposeData({ teacher: '', message: '' })
  }

  return (
    <ParentLayout title="Teacher Messages" selectedChild={selectedChild} onChildSelect={setSelectedChild}>
      <div className="h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Sidebar - Conversations List */}
          <Card className="col-span-12 lg:col-span-4 flex flex-col h-full bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-blue-950/20">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Conversations
                </h2>
                <Button 
                  size="sm" 
                  onClick={() => setShowCompose(!showCompose)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <PenSquare size={16} className="mr-2" />
                  New
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background"
                />
              </div>
            </div>

            {/* Compose New Message */}
            {showCompose && (
              <div className="p-4 border-b border-border bg-blue-50/50 dark:bg-blue-950/30">
                <h3 className="font-semibold mb-3 text-foreground">New Message</h3>
                <Select value={composeData.teacher} onValueChange={(val) => setComposeData({...composeData, teacher: val})}>
                  <SelectTrigger className="mb-3 bg-background">
                    <SelectValue placeholder="Select teacher..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.name} value={teacher.name}>
                        {teacher.name} - {teacher.subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Type your message..."
                  value={composeData.message}
                  onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                  className="mb-3 min-h-[100px] bg-background"
                />
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button onClick={handleComposeMessage} className="flex-1 bg-primary">
                    <Send size={16} className="mr-2" />
                    Send
                  </Button>
                  <Button variant="outline" onClick={() => setShowCompose(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-primary/10 transition-colors border-b border-border ${
                    selectedConversation.id === conv.id ? 'bg-primary/15 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <Avatar className="h-12 w-12 flex-shrink-0 border-2 border-primary/20">
                    <AvatarImage src={conv.avatar} alt={conv.teacher} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {conv.teacher.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left overflow-hidden">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-foreground">{conv.teacher}</p>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-white">{conv.unread}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{conv.role}</p>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Main Chat Area */}
          <Card className="col-span-12 lg:col-span-8 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-950/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/30">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.teacher} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedConversation.teacher.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{selectedConversation.teacher}</p>
                    <p className="text-sm text-muted-foreground">{selectedConversation.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Phone size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <Video size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10">
              <div className="space-y-4 max-w-4xl mx-auto">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'parent'
                          ? 'bg-primary text-primary-foreground ml-auto rounded-br-sm'
                          : 'bg-white dark:bg-gray-800 text-foreground border border-border rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'parent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-gradient-to-r from-primary/5 to-blue-50/50 dark:from-primary/10 dark:to-blue-950/20">
              <div className="flex items-end gap-3 max-w-4xl mx-auto">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1 min-h-[50px] max-h-[120px] resize-none bg-background"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-primary hover:bg-primary/90 h-[50px] px-6"
                  disabled={!newMessage.trim()}
                >
                  <Send size={18} className="mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ParentLayout>
  )
}
