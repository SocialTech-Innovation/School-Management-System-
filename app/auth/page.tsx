"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BookOpen,
  Briefcase,
  Users,
  BarChart3,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ChevronDown,
  ArrowLeft,
} from "lucide-react"

const roles = [
  { value: "student", label: "Student", icon: BookOpen, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500" },
  { value: "teacher", label: "Teacher", icon: Briefcase, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500" },
  { value: "admin", label: "Admin", icon: Lock, color: "from-red-500 to-orange-500", bgColor: "bg-red-500" },
  { value: "parent", label: "Parent", icon: Users, color: "from-green-500 to-emerald-500", bgColor: "bg-green-500" },
  { value: "accountant", label: "Accountant", icon: BarChart3, color: "from-yellow-500 to-amber-500", bgColor: "bg-yellow-500" },
]

export default function AuthPage() {
  const router = useRouter()
  const [step, setStep] = useState<"role" | "auth">("role")
  const [selectedRole, setSelectedRole] = useState("")
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setStep("auth")
  }

  const getCurrentRoleData = () => {
    return roles.find((r) => r.value === selectedRole)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Mock authentication validation
    const validCredentials = [
      { email: "student@school.edu", password: "password", role: "student" },
      { email: "teacher@school.edu", password: "password", role: "teacher" },
      { email: "admin@school.edu", password: "password", role: "admin" },
      { email: "parent@school.edu", password: "password", role: "parent" },
      { email: "accountant@school.edu", password: "password", role: "accountant" },
    ]

    const isValid = validCredentials.some(
      (cred) =>
        cred.email === signInData.email &&
        cred.password === signInData.password &&
        cred.role === selectedRole
    )

    setTimeout(() => {
      if (!isValid) {
        setError("Invalid credentials. Please check your email, password, and selected role.")
        setLoading(false)
        return
      }

      if (selectedRole === "student") router.push("/dashboard/student")
      else if (selectedRole === "admin") router.push("/dashboard/admin")
      else if (selectedRole === "teacher") router.push("/dashboard/teacher")
      else if (selectedRole === "parent") router.push("/dashboard/parent")
      else if (selectedRole === "accountant") router.push("/dashboard/accountant")
      else router.push("/dashboard/student")
      setLoading(false)
    }, 1000)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setActiveTab("signin")
      setSignInData({ email: signUpData.email, password: "" })
      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setLoading(false)
    }, 1000)
  }

  const currentRole = getCurrentRoleData()

  // Step 1: Role Selection Landing
  if (step === "role") {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Simplified background - removed heavy blur animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
          {/* Logo and branding */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white">Skops</h1>
            </div>
            <p className="text-xl text-blue-200 font-light">School Management System</p>
          </div>

          {/* Role selection cards - optimized */}
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-5xl">
            {roles.map((role) => {
              const IconComponent = role.icon
              return (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="group relative w-40 h-40 rounded-3xl bg-white/10 border border-white/20 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-white/15 hover:-translate-y-1 flex flex-col items-center justify-center gap-4"
                >
                  {/* Icon container with gradient */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Role label */}
                  <p className="text-lg font-semibold text-white">{role.label}</p>
                </button>
              )
            })}
          </div>

          {/* Subtle footer hint */}
          <p className="mt-16 text-blue-300/60 text-sm">Select your role to access the platform</p>
        </div>
      </div>
    )
  }

  // Step 2: Authentication Form with split screen
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Left side - Branding & Visual */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg text-center lg:text-left">
          {/* Logo and branding */}
          <div className="flex items-center gap-4 mb-8 justify-center lg:justify-start">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Skops
            </h1>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Welcome to Your School Management System
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Streamline your educational institution with our comprehensive platform designed for students, teachers, and administrators.
          </p>

          {/* Features */}
          <div className="space-y-4 text-left hidden lg:block">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Learning</h3>
                <p className="text-sm text-gray-600">Track progress and manage coursework efficiently</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Collaboration</h3>
                <p className="text-sm text-gray-600">Connect students, teachers, and parents seamlessly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Analytics</h3>
                <p className="text-sm text-gray-600">Gain insights with powerful reporting tools</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form in rounded card */}
      <div className="flex items-center justify-center p-6 lg:p-12 lg:w-[480px] xl:w-[560px]">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 lg:p-10 border">
          
          {/* Role Selector Dropdown */}
          {currentRole && (
            <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
              <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">Signing in as</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full border-none shadow-none p-0 h-auto focus:ring-0 hover:opacity-80 transition-opacity">
                  <SelectValue>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentRole.color} flex items-center justify-center shadow-md`}>
                        <currentRole.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-gray-900 text-lg">{currentRole.label}</p>
                        
                      </div>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => {
                    const IconComponent = role.icon
                    return (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-3 py-1">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{role.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Admin gets Sign Up option, others only Sign In */}
          {selectedRole === "admin" ? (
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="signin" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <UserPlus className="w-4 h-4" />
                  Register
                </TabsTrigger>
              </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-500 mt-1 text-sm">Sign in to continue to your dashboard</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-black-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signInData.email}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-black-400" />
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-11 pr-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signInData.password}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="pt-5 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Demo Credentials</p>
                <div className="space-y-2 text-sm bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Student:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">student@school.edu / password</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Teacher:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">teacher@school.edu / password</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Admin:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">admin@school.edu / password</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Parent:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">parent@school.edu / password</span>
                    </div>
                  </div>
                  <p className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600">
                    Remember to select the correct role above before signing in
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Sign Up Tab - Admin Only */}
            <TabsContent value="signup" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Register Your School</h2>
                <p className="text-gray-500 mt-1 text-sm">Create an admin account for your institution</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                    <span>{error}</span>
                  </div>
                )}

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
                  <p className="font-semibold mb-1">Administrator Account</p>
                  <p className="text-xs text-blue-600">You'll be able to add teachers, students, and staff after registration.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstName" className="text-gray-700 font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-firstName"
                        placeholder="John"
                        className="pl-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signUpData.firstName}
                        onChange={(e) =>
                          setSignUpData((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-lastName" className="text-gray-700 font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-lastName"
                        placeholder="Doe"
                        className="pl-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        value={signUpData.lastName}
                        onChange={(e) =>
                          setSignUpData((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-11 pr-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirmPassword" className="text-gray-700 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-11 pr-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Registering...
                    </span>
                  ) : (
                    "Register School"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          ) : (
            /* Non-Admin: Sign In Only */
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-500 mt-1 text-sm">Sign in with your provided credentials</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">!</div>
                    <span>{error}</span>
                  </div>
                )}

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  <p className="font-semibold mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Credentials Required
                  </p>
                  <p className="text-xs text-amber-600">
                    {selectedRole === "teacher" && "Use the credentials provided by your school administrator."}
                    {selectedRole === "student" && "Use the credentials provided by your school."}
                    {selectedRole === "parent" && "Use the credentials linked to your child's account."}
                    {selectedRole === "accountant" && "Use the credentials provided by your school administrator."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-email-nonadmin" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-email-nonadmin"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signInData.email}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password-nonadmin" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-password-nonadmin"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-11 pr-11 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      value={signInData.password}
                      onChange={(e) =>
                        setSignInData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="pt-5 border-t border-gray-200 mt-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Demo Credentials</p>
                <div className="space-y-2 text-sm bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                  {selectedRole === "student" && (
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Student:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">student@school.edu / password</span>
                    </div>
                  )}
                  {selectedRole === "teacher" && (
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Teacher:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">teacher@school.edu / password</span>
                    </div>
                  )}
                  {selectedRole === "parent" && (
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Parent:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">parent@school.edu / password</span>
                    </div>
                  )}
                  {selectedRole === "accountant" && (
                    <div className="flex items-center justify-between py-1">
                      <span className="font-medium text-gray-700">Accountant:</span>
                      <span className="font-mono text-xs text-gray-600 bg-white px-2 py-1 rounded">accountant@school.edu / password</span>
                    </div>
                  )}
                  <p className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600">
                    For demo purposes only
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-700 mb-1 font-medium">
                  Need access?
                </p>
                <p className="text-xs text-gray-600">
                  Contact your school administrator to receive your login credentials.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
