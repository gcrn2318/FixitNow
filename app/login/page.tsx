"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Shield, Zap, User, Briefcase } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth, UserType } from "@/contexts/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const signupSuccess = searchParams.get("signup") === "success"
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "" as UserType | "",
    rememberMe: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (!formData.userType) {
      newErrors.userType = "Please select your account type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      await login(formData.email, formData.password, formData.userType as UserType)
      // Redirect is handled by the auth context
    } catch (error: any) {
      setErrors({ submit: error.message || "Invalid email or password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
              Welcome Back
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Sign in to your FixItNow account</p>
        </div>

        {/* Success Alert */}
        {signupSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Account created successfully! Please sign in with your credentials.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {errors.submit && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">{errors.submit}</AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-12 rounded-xl border-2 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 h-12 rounded-xl border-2 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Account Type</label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger className={`h-12 rounded-xl border-2 ${
                    errors.userType
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}>
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Customer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="provider">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4" />
                        <span>Service Provider</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.userType && <p className="text-red-500 text-sm mt-1">{errors.userType}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-900 dark:text-white hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border-2 border-gray-900 dark:border-white"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
            <Shield className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure Login</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
            <Zap className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast Access</p>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-gray-900 dark:text-white hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
