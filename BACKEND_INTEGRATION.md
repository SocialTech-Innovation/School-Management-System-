# Backend Integration Guide - School Management System

## Overview
This document provides specifications for backend developers to integrate the frontend with a database and API endpoints.

---

## 🗄️ Database Schema

### **1. Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher', 'student', 'parent') NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **2. Teachers Table**
```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  designation VARCHAR(100),
  qualification TEXT,
  experience_years INTEGER,
  date_of_joining DATE,
  address TEXT,
  bio TEXT,
  subjects TEXT[], -- Array of subjects taught
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **3. Students Table**
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  roll_number VARCHAR(50) UNIQUE NOT NULL,
  class_id UUID REFERENCES classes(id),
  date_of_birth DATE,
  address TEXT,
  parent_name VARCHAR(200),
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  admission_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **4. Classes Table**
```sql
CREATE TABLE classes (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- e.g., "Class 10-A"
  grade_level INTEGER, -- e.g., 10
  section VARCHAR(10), -- e.g., "A"
  teacher_id UUID REFERENCES teachers(id),
  subject VARCHAR(100),
  room_number VARCHAR(20),
  schedule TEXT, -- JSON or text describing schedule
  academic_year VARCHAR(20),
  max_students INTEGER DEFAULT 40,
  current_enrollment INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **5. Subjects Table**
```sql
CREATE TABLE subjects (
  id UUID PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL, -- e.g., "MATH-101"
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- Core, Science, Languages, etc.
  grade_level INTEGER,
  teacher_id UUID REFERENCES teachers(id),
  total_students INTEGER DEFAULT 0,
  periods_per_week INTEGER DEFAULT 5,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **6. Attendance Table**
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  student_id UUID REFERENCES students(id),
  teacher_id UUID REFERENCES teachers(id),
  date DATE NOT NULL,
  status ENUM('present', 'absent', 'late', 'excused') NOT NULL,
  marked_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  UNIQUE(class_id, student_id, date)
);
```

### **7. Assessments Table**
```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  teacher_id UUID REFERENCES teachers(id),
  title VARCHAR(255) NOT NULL,
  type ENUM('exam', 'quiz', 'assignment', 'practical') NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  duration INTEGER, -- in minutes
  total_marks INTEGER NOT NULL,
  status ENUM('upcoming', 'active', 'graded') DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **8. Grades Table**
```sql
CREATE TABLE grades (
  id UUID PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id),
  student_id UUID REFERENCES students(id),
  subject_id UUID REFERENCES subjects(id),
  marks_obtained DECIMAL(5,2) NOT NULL,
  total_marks DECIMAL(5,2) NOT NULL,
  grade VARCHAR(5), -- A+, A, B+, etc.
  remarks TEXT,
  term VARCHAR(50), -- e.g., "Mid-Term 2026"
  graded_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(assessment_id, student_id)
);
```

### **9. Timetable Table**
```sql
CREATE TABLE timetable (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  subject_id UUID REFERENCES subjects(id),
  teacher_id UUID REFERENCES teachers(id),
  day_of_week INTEGER NOT NULL, -- 1=Monday, 2=Tuesday, etc.
  period_number INTEGER NOT NULL, -- 1-7
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number VARCHAR(20),
  is_exam_period BOOLEAN DEFAULT FALSE,
  academic_year VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(class_id, day_of_week, period_number)
);
```

### **10. Academic Calendar Table**
```sql
CREATE TABLE academic_calendar (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type ENUM('academic', 'event', 'meeting', 'exam', 'holiday') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  time_start TIME,
  time_end TIME,
  location VARCHAR(255),
  target_audience TEXT[], -- ['all', 'teachers', 'students', 'grade_10']
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **11. Announcements Table**
```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY,
  author_id UUID REFERENCES users(id),
  author_role VARCHAR(20), -- 'admin', 'teacher'
  type ENUM('announcement', 'reminder', 'system', 'grade_submitted') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
  is_pinned BOOLEAN DEFAULT FALSE,
  target_audience TEXT[], -- ['all', 'teachers', 'students', 'class_10a']
  class_id UUID REFERENCES classes(id), -- Optional, for class-specific
  assessment_id UUID REFERENCES assessments(id), -- Optional, for grade submissions
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **12. Events Table**
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type VARCHAR(50), -- Sports, Cultural, Academic, etc.
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255),
  participants INTEGER DEFAULT 0,
  max_participants INTEGER,
  organizer_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **13. Payroll Table**
```sql
CREATE TABLE payroll (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES teachers(id),
  month VARCHAR(20) NOT NULL, -- e.g., "February 2024"
  basic_salary DECIMAL(10,2) NOT NULL,
  allowances DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  net_salary DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processed', 'paid') DEFAULT 'pending',
  paid_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **14. Messages Table (Parent-Teacher Communication)**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  sender_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  student_id UUID REFERENCES students(id), -- Related student
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  parent_message BOOLEAN DEFAULT FALSE, -- true if from parent
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);
```

### **15. Class Materials Table**
```sql
CREATE TABLE class_materials (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes(id),
  teacher_id UUID REFERENCES teachers(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type VARCHAR(50), -- 'pdf', 'docx', 'pptx', etc.
  file_size INTEGER, -- in bytes
  category VARCHAR(50), -- 'notes', 'assignment', 'reading', 'video'
  upload_date TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 API Endpoints

### **Authentication**
```
POST   /api/auth/login           - Login user
POST   /api/auth/logout          - Logout user
POST   /api/auth/refresh         - Refresh JWT token
GET    /api/auth/me              - Get current user info
POST   /api/auth/register        - Register new school (Admin only)
```

### **Admin Endpoints**

#### **Dashboard**
```
GET    /api/admin/stats                    - Get admin dashboard statistics
GET    /api/admin/enrollment-trends        - Get enrollment trend data
GET    /api/admin/attendance-summary       - Get school-wide attendance data
GET    /api/admin/recent-activities        - Get recent system activities
```

#### **Students Management**
```
GET    /api/admin/students                 - Get all students (with filters)
GET    /api/admin/students/:id             - Get student details
POST   /api/admin/students                 - Add new student
PUT    /api/admin/students/:id             - Update student
DELETE /api/admin/students/:id             - Delete student
GET    /api/admin/students/stats           - Get student statistics
```

#### **Teachers Management**
```
GET    /api/admin/teachers                 - Get all teachers (with filters)
GET    /api/admin/teachers/:id             - Get teacher details
POST   /api/admin/teachers                 - Add new teacher
PUT    /api/admin/teachers/:id             - Update teacher
DELETE /api/admin/teachers/:id             - Delete teacher
GET    /api/admin/teachers/stats           - Get teacher statistics
```

#### **Classes Management**
```
GET    /api/admin/classes                  - Get all classes (with filters)
GET    /api/admin/classes/:id              - Get class details with students
POST   /api/admin/classes                  - Create new class
PUT    /api/admin/classes/:id              - Update class
DELETE /api/admin/classes/:id              - Delete class
GET    /api/admin/classes/stats            - Get class statistics
```

#### **Subjects Management**
```
GET    /api/admin/subjects                 - Get all subjects (with filters)
GET    /api/admin/subjects/:id             - Get subject details
POST   /api/admin/subjects                 - Create new subject
PUT    /api/admin/subjects/:id             - Update subject
DELETE /api/admin/subjects/:id             - Delete subject
GET    /api/admin/subjects/categories      - Get subject categories
```

#### **Timetable Management**
```
GET    /api/admin/timetable/class/:classId - Get timetable for class
GET    /api/admin/timetable/teacher/:id    - Get timetable for teacher
POST   /api/admin/timetable                - Create timetable entry
PUT    /api/admin/timetable/:id            - Update timetable entry
DELETE /api/admin/timetable/:id            - Delete timetable entry
POST   /api/admin/timetable/bulk           - Bulk create timetable
```

#### **Grades Management**
```
GET    /api/admin/grades                   - Get all grades (with filters)
GET    /api/admin/grades/student/:id       - Get student grades
GET    /api/admin/grades/class/:classId    - Get class grades
GET    /api/admin/grades/distribution      - Get grade distribution data
POST   /api/admin/grades/publish           - Publish grades
```

#### **User Management**
```
GET    /api/admin/users                    - Get all users (with filters)
GET    /api/admin/users/:id                - Get user details
POST   /api/admin/users                    - Create new user
PUT    /api/admin/users/:id                - Update user
DELETE /api/admin/users/:id                - Delete user
PUT    /api/admin/users/:id/reset-password - Reset user password
PUT    /api/admin/users/:id/status         - Toggle user status
GET    /api/admin/users/roles              - Get user roles
```

#### **Academic Calendar**
```
GET    /api/admin/calendar                 - Get all calendar events
GET    /api/admin/calendar/:id             - Get event details
POST   /api/admin/calendar                 - Create calendar event
PUT    /api/admin/calendar/:id             - Update calendar event
DELETE /api/admin/calendar/:id             - Delete calendar event
GET    /api/admin/calendar/upcoming        - Get upcoming events
```

#### **Exams Management**
```
GET    /api/admin/exams                    - Get all exams
GET    /api/admin/exams/:id                - Get exam details
POST   /api/admin/exams                    - Create exam
PUT    /api/admin/exams/:id                - Update exam
DELETE /api/admin/exams/:id                - Delete exam
```

#### **Attendance**
```
GET    /api/admin/attendance               - Get attendance overview
GET    /api/admin/attendance/class/:id     - Get class attendance
GET    /api/admin/attendance/trends        - Get attendance trends
GET    /api/admin/attendance/reports       - Generate attendance reports
```

#### **Events**
```
GET    /api/admin/events                   - Get all events
GET    /api/admin/events/:id               - Get event details
POST   /api/admin/events                   - Create event
PUT    /api/admin/events/:id               - Update event
DELETE /api/admin/events/:id               - Delete event
```

#### **Announcements**
```
GET    /api/admin/announcements            - Get all announcements
GET    /api/admin/announcements/:id        - Get announcement details
POST   /api/admin/announcements            - Create announcement
PUT    /api/admin/announcements/:id        - Update announcement
DELETE /api/admin/announcements/:id        - Delete announcement
PUT    /api/admin/announcements/:id/pin    - Pin/unpin announcement
```

#### **Reports**
```
GET    /api/admin/reports/academic         - Get academic performance report
GET    /api/admin/reports/attendance       - Get attendance report
GET    /api/admin/reports/enrollment       - Get enrollment report
POST   /api/admin/reports/custom           - Generate custom report
GET    /api/admin/reports/:id/download     - Download report
```

#### **Settings**
```
GET    /api/admin/settings                 - Get system settings
PUT    /api/admin/settings/school          - Update school information
PUT    /api/admin/settings/academic        - Update academic year settings
PUT    /api/admin/settings/notifications   - Update notification preferences
PUT    /api/admin/settings/security        - Update security settings
```

### **Teacher Endpoints**

#### **Profile**
```
GET    /api/teachers/profile/:id         - Get teacher profile
PUT    /api/teachers/profile/:id         - Update teacher profile
GET    /api/teachers/:id/stats           - Get dashboard statistics
```

#### **Classes**
```
GET    /api/teachers/:teacherId/classes           - Get all classes for teacher
GET    /api/classes/:classId                      - Get class details
GET    /api/classes/:classId/students             - Get students in class
GET    /api/classes/:classId/attendance-history   - Get attendance history
GET    /api/classes/:classId/performance          - Get performance data
```

#### **Students**
```
GET    /api/teachers/:teacherId/students    - Get all students taught by teacher
GET    /api/students/:studentId             - Get student details
GET    /api/students/:studentId/attendance  - Get student attendance record
GET    /api/students/:studentId/grades      - Get student grades
```

#### **Attendance**
```
GET    /api/attendance/class/:classId/date/:date  - Get attendance for specific date
POST   /api/attendance                            - Mark attendance (bulk)
PUT    /api/attendance/:id                        - Update attendance record
GET    /api/attendance/schedules/:classId         - Get class schedule for validation
```

**POST /api/attendance Request Body:**
```json
{
  "classId": "uuid",
  "teacherId": "uuid",
  "date": "2024-01-11",
  "attendance": [
    {
      "studentId": "uuid",
      "status": "present",
      "notes": ""
    }
  ]
}
```

#### **Assessments**
```
GET    /api/assessments/teacher/:teacherId           - Get all assessments by teacher
POST   /api/assessments                              - Create new assessment
GET    /api/assessments/:assessmentId                - Get assessment details
PUT    /api/assessments/:assessmentId                - Update assessment
DELETE /api/assessments/:assessmentId                - Delete assessment
GET    /api/assessments/:assessmentId/students       - Get students for grading
POST   /api/assessments/:assessmentId/grades         - Submit grades (bulk)
```

**POST /api/assessments/:assessmentId/grades Request Body:**
```json
{
  "grades": [
    {
      "studentId": "uuid",
      "marksObtained": 85,
      "grade": "A",
      "remarks": ""
    }
  ]
}
```

#### **Timetable**
```
GET    /api/timetable/teacher/:teacherId            - Get teacher's timetable
GET    /api/timetable/class/:classId                - Get class timetable
POST   /api/timetable                               - Create timetable entry
PUT    /api/timetable/:id                           - Update timetable entry
GET    /api/timetable/exam-period                   - Check if exam period
```

#### **Announcements**
```
GET    /api/announcements                           - Get all announcements
GET    /api/announcements/teacher/:teacherId        - Get teacher's notifications
POST   /api/announcements                           - Create announcement (admin only)
PUT    /api/announcements/:id/read                  - Mark as read
DELETE /api/announcements/:id                       - Delete announcement
```

#### **Payroll**
```
GET    /api/payroll/teacher/:teacherId              - Get teacher's payroll history
GET    /api/payroll/:id                             - Get specific payroll details
GET    /api/payroll/:id/download                    - Download payslip PDF
```

#### **Messages (Parent-Teacher Communication)**
```
GET    /api/messages/teacher/:teacherId             - Get all messages for teacher
GET    /api/messages/:messageId                     - Get message details
POST   /api/messages                                - Send message to parent
PUT    /api/messages/:messageId/read                - Mark message as read
DELETE /api/messages/:messageId                     - Delete message
GET    /api/messages/student/:studentId             - Get conversation about student
```

**POST /api/messages Request Body:**
```json
{
  "senderId": "uuid",
  "recipientId": "uuid",
  "studentId": "uuid",
  "subject": "Meeting Request",
  "message": "I would like to discuss..."
}
```

#### **Class Materials**
```
GET    /api/materials/class/:classId                - Get all materials for class
GET    /api/materials/teacher/:teacherId            - Get all materials uploaded by teacher
GET    /api/materials/student/:studentId            - Get all materials for student's classes
POST   /api/materials                               - Upload new material (teacher only)
GET    /api/materials/:materialId                   - Get material details
DELETE /api/materials/:materialId                   - Delete material (teacher only)
GET    /api/materials/:materialId/download          - Download material
PUT    /api/materials/:materialId/mark-downloaded   - Track student download
```

**POST /api/materials Request Body (multipart/form-data):**
```
classId: uuid
teacherId: uuid
title: string
description: string
category: enum('notes', 'assignment', 'reading', 'video', 'other')
file: File
```

**GET /api/materials/student/:studentId Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "classId": "uuid",
      "className": "Class 10-A",
      "subject": "Mathematics",
      "teacherId": "uuid",
      "teacherName": "Prof. Sarah Anderson",
      "teacherAvatar": "url",
      "title": "Chapter 5: Quadratic Equations",
      "description": "Complete notes...",
      "fileUrl": "https://storage.../file.pdf",
      "fileName": "chapter5-notes.pdf",
      "fileType": "pdf",
      "fileSize": 2048000,
      "category": "notes",
      "uploadDate": "2024-01-09T10:00:00Z",
      "isNew": true,
      "downloaded": false
    }
  ]
}
```

**POST /api/materials Request Body (multipart/form-data):**
```
classId: uuid
teacherId: uuid
title: string
description: string
category: string
file: File
```

---

### **Student Endpoints**

#### **Profile**
```
GET    /api/students/profile/:id         - Get student profile
PUT    /api/students/profile/:id         - Update student profile
GET    /api/students/:id/stats           - Get dashboard statistics
```

#### **Attendance**
```
GET    /api/students/:studentId/attendance           - Get student's attendance records
GET    /api/students/:studentId/attendance/summary   - Get attendance summary/stats
```

#### **Grades**
```
GET    /api/students/:studentId/grades               - Get all grades
GET    /api/students/:studentId/grades/:subjectId    - Get grades by subject
GET    /api/students/:studentId/report-card          - Get report card data
```

#### **Materials**
```
GET    /api/materials/student/:studentId             - Get all materials for student's classes
GET    /api/materials/:materialId/download           - Download material
PUT    /api/materials/:materialId/mark-downloaded    - Mark material as downloaded
```

**GET /api/materials/student/:studentId Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "subject": "Mathematics",
      "className": "Class 10-A",
      "teacherName": "Prof. Sarah Anderson",
      "teacherAvatar": "url",
      "title": "Chapter 5 Notes",
      "description": "Complete notes on quadratic equations",
      "fileName": "chapter5-notes.pdf",
      "fileType": "pdf",
      "fileSize": 2048000,
      "category": "notes",
      "uploadDate": "2024-01-09T10:00:00Z",
      "isNew": true,
      "downloaded": false
    }
  ]
}
```

#### **Fees**
```
GET    /api/students/:studentId/fees                 - Get fee records
GET    /api/students/:studentId/fees/pending         - Get pending fees
POST   /api/students/:studentId/fees/pay             - Process payment
```

#### **Timetable**
```
GET    /api/timetable/student/:studentId             - Get student's timetable
GET    /api/timetable/class/:classId                 - Get class timetable
```

#### **Announcements**
```
GET    /api/announcements/student/:studentId         - Get announcements for student
PUT    /api/announcements/:id/read                   - Mark announcement as read
```

---

## 🔐 Authentication & Authorization

### **JWT Token Structure**
```json
{
  "userId": "uuid",
  "email": "teacher@school.edu",
  "role": "teacher",
  "teacherId": "uuid",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### **Protected Routes**
All `/api/*` routes except `/api/auth/login` require:
- Header: `Authorization: Bearer <jwt_token>`
- Token validation middleware
- Role-based access control

### **Frontend Token Storage**
- Store JWT in `httpOnly` cookie (preferred) OR
- Store in localStorage with XSS protection
- Auto-refresh token before expiration

---

## 📤 File Upload Specifications

### **Storage Options**
1. **AWS S3** (Recommended)
2. **Google Cloud Storage**
3. **Local storage** (development only)

### **File Upload Limits**
- Maximum file size: **50MB** per file
- Allowed types: PDF, DOCX, PPTX, XLSX, PNG, JPG, MP4
- Virus scanning required before storage

### **File URL Format**
```
https://storage.example.com/materials/{classId}/{filename}
```

---

## 🔔 Real-time Features (Optional)

### **WebSocket Events**
```javascript
// Teacher receives notification
socket.on('new-message', (data) => {
  // data: { messageId, studentName, preview }
})

// Grade submission notification
socket.on('grade-submitted', (data) => {
  // data: { assessmentId, className, totalGraded }
})
```

---

## 📊 Response Format

### **Success Response**
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### **Error Response**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [ /* validation errors */ ]
  }
}
```

---

## 🧪 Testing Requirements

### **Backend Must Provide**
1. **Postman Collection** - All API endpoints documented
2. **Seed Data** - Sample data for testing
3. **API Documentation** - Swagger/OpenAPI specs
4. **Environment Variables** - `.env.example` file

### **Frontend Integration Points**
Location of API calls in frontend:
- `/lib/api/` - Create this folder for API service functions
- Example: `/lib/api/attendance.ts`, `/lib/api/assessments.ts`

---

## 🚀 Deployment Considerations

### **Environment Variables Needed**
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@school.edu
SMTP_PASSWORD=your-password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### **CORS Configuration**
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
```

---

## 📝 Frontend Changes Needed After Backend Integration

### **1. Create API Service Layer**
```typescript
// lib/api/client.ts
export async function apiCall(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options?.headers
    }
  })
  return response.json()
}
```

### **2. Replace Mock Data**
Search for and replace:
- `const studentsData = [...]` → API call
- `const classData = {...}` → API call
- `localStorage.getItem(...)` → API call

### **3. Add Loading States**
```typescript
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)
```

### **4. Add Error Handling**
```typescript
try {
  const data = await apiCall('/api/endpoint')
  // Handle success
} catch (error) {
  toast({
    title: "Error",
    description: error.message,
    variant: "destructive"
  })
}
```

---

## 📞 Contact

For frontend-backend integration questions:
- Frontend Dev: [Your Contact]
- Backend Dev: [To be assigned]
- Project Manager: [PM Contact]

---

**Last Updated:** January 14, 2026
**Version:** 2.0
**Changes:** Added Admin endpoints, Subjects table, Academic Calendar table, Events table, User Management, Grades Management, Timetable improvements, and parent role support.
