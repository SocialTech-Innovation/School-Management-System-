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
    <div className="min-h-screen flex">
      {/* Left side - Image only */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/image-login.jpg" 
          alt="Auth visual"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            onClick={() => setStep("role")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Change Role</span>
          </button>

          {/* Logo / Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduManage</h1>
          </div>

          {/* Role Selector Dropdown */}
          {currentRole && (
            <div className="mb-6 p-4 rounded-xl border-2 border-gray-200 bg-white">
              <Label className="text-sm text-gray-600 mb-2 block">Signing in as</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full border-none shadow-none p-0 h-auto focus:ring-0">
                  <SelectValue>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentRole.color} flex items-center justify-center`}>
                        <currentRole.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900">{currentRole.label}</p>
                        <p className="text-xs text-gray-500">Click to change role</p>
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
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Register School
                </TabsTrigger>
              </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
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
                  <Label htmlFor="signin-password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
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
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 h-auto"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 mb-3 font-semibold">Demo Credentials:</p>
                <div className="space-y-2 text-sm bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <p className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Student:</span>
                    <span className="font-mono text-gray-600">student@school.edu / password</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Teacher:</span>
                    <span className="font-mono text-gray-600">teacher@school.edu / password</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Admin:</span>
                    <span className="font-mono text-gray-600">admin@school.edu / password</span>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Parent:</span>
                    <span className="font-mono text-gray-600">parent@school.edu / password</span>
                  </p>
                  <p className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600 italic">
                    💡 Remember to select the correct role above before signing in!
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Sign Up Tab - Admin Only */}
            <TabsContent value="signup" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Register Your School</h2>
                <p className="text-gray-600 mt-2">Create an administrative account for your institution</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
                )}

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  <p className="font-semibold mb-1">Administrator Account</p>
                  <p className="text-xs text-blue-600">You'll be able to add teachers, students, and other staff after registration.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-firstName" className="text-gray-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-firstName"
                        placeholder="John"
                        className="pl-10"
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
                    <Label htmlFor="signup-lastName" className="text-gray-700">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        id="signup-lastName"
                        placeholder="Doe"
                        className="pl-10"
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
                  <Label htmlFor="signup-email" className="text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
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
                  <Label htmlFor="signup-password" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
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
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirmPassword" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signup-confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
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
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 h-auto"
                  disabled={loading}
                >
                  {loading ? "Registering school..." : "Register School"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          ) : (
            /* Non-Admin: Sign In Only */
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600 mt-2">Sign in with your provided credentials</p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
                )}

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
                  <p className="font-semibold mb-1">🔒 Credentials Required</p>
                  <p className="text-xs text-amber-600">
                    {selectedRole === "teacher" && "Use the credentials provided by your school administrator."}
                    {selectedRole === "student" && "Use the credentials provided by your school."}
                    {selectedRole === "parent" && "Use the credentials linked to your child's account."}
                    {selectedRole === "accountant" && "Use the credentials provided by your school administrator."}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-email-nonadmin" className="text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-email-nonadmin"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
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
                  <Label htmlFor="signin-password-nonadmin" className="text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="signin-password-nonadmin"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
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
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 h-auto"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="pt-4 border-t border-gray-200 mt-6">
                <p className="text-sm text-gray-700 mb-3 font-semibold">Demo Credentials:</p>
                <div className="space-y-2 text-sm bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  {selectedRole === "student" && (
                    <p className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Student:</span>
                      <span className="font-mono text-gray-600">student@school.edu / password</span>
                    </p>
                  )}
                  {selectedRole === "teacher" && (
                    <p className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Teacher:</span>
                      <span className="font-mono text-gray-600">teacher@school.edu / password</span>
                    </p>
                  )}
                  {selectedRole === "parent" && (
                    <p className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Parent:</span>
                      <span className="font-mono text-gray-600">parent@school.edu / password</span>
                    </p>
                  )}
                  {selectedRole === "accountant" && (
                    <p className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Accountant:</span>
                      <span className="font-mono text-gray-600">accountant@school.edu / password</span>
                    </p>
                  )}
                  <p className="mt-3 pt-3 border-t border-blue-200 text-xs text-gray-600 italic">
                    💡 For demo purposes only
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold">Need access?</span>
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
