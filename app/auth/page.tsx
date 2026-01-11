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
} from "lucide-react"

const roles = [
  { value: "student", label: "Student", icon: BookOpen },
  { value: "teacher", label: "Teacher", icon: Briefcase },
  { value: "admin", label: "Admin", icon: Lock },
  { value: "parent", label: "Parent", icon: Users },
  { value: "accountant", label: "Accountant", icon: BarChart3 },
]

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    role: "student",
  })

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  })

  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Mock authentication validation
    const validCredentials = [
      { email: "student@school.edu", password: "password", role: "student" },
      { email: "teacher@school.edu", password: "password", role: "teacher" },
      { email: "admin@school.edu", password: "password", role: "admin" },
    ]

    const isValid = validCredentials.some(
      (cred) =>
        cred.email === signInData.email &&
        cred.password === signInData.password &&
        cred.role === signInData.role
    )

    setTimeout(() => {
      if (!isValid) {
        setError("Invalid credentials. Please check your email, password, and selected role.")
        setLoading(false)
        return
      }

      if (signInData.role === "student") router.push("/dashboard/student")
      else if (signInData.role === "admin") router.push("/dashboard/admin")
      else if (signInData.role === "teacher") router.push("/dashboard/teacher")
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
      setSignInData({ ...signInData, email: signUpData.email })
      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
      })
      setLoading(false)
    }, 1000)
  }

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
          {/* Logo / Title */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduManage</h1>
          </div>

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
                Sign Up
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

                <div className="space-y-3">
                  <Label htmlFor="signin-role" className="text-gray-700 font-semibold">
                    Sign In As
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {roles.map((role) => {
                      const IconComponent = role.icon
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() =>
                            setSignInData((prev) => ({
                              ...prev,
                              role: role.value,
                            }))
                          }
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                            signInData.role === role.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs font-medium text-gray-700">{role.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

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
                <p className="text-xs text-gray-600 mb-3 font-semibold">Demo Credentials:</p>
                <div className="space-y-2 text-xs bg-gray-100 p-3 rounded-lg">
                  <p>
                    <span className="font-semibold">Student:</span> student@school.edu / password
                  </p>
                  <p>
                    <span className="font-semibold">Teacher:</span> teacher@school.edu / password
                  </p>
                  <p>
                    <span className="font-semibold">Admin:</span> admin@school.edu / password
                  </p>
                  <p className="mt-2 text-gray-500 italic">
                    Remember to select the correct role before signing in!
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup" className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-600 mt-2">Join EduManage and manage your school efficiently</p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{error}</div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="signup-role" className="text-gray-700 font-semibold">
                    Sign Up As
                  </Label>
                  <div className="grid grid-cols-5 gap-2">
                    {roles.map((role) => {
                      const IconComponent = role.icon
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() =>
                            setSignUpData((prev) => ({
                              ...prev,
                              role: role.value,
                            }))
                          }
                          className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                            signUpData.role === role.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="text-xs font-medium text-gray-700">{role.label}</span>
                        </button>
                      )
                    })}
                  </div>
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
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
