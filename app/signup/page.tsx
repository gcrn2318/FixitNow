"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Wrench,
  Mail,
  Lock,
  Phone,
  MapPin,
  Upload,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Camera,
  Award,
  Zap,
  Brain,
  Sparkles,
  Globe,
  Users,
  TrendingUp,
  AlertCircle,
  X,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"



const services = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "HVAC",
  "Appliance Repair",
  "Security Systems",
  "Painting",
  "Landscaping",
  "Cleaning",
  "Roofing",
]

const certifications = [
  "Licensed Professional",
  "Insured & Bonded",
  "Background Checked",
  "EPA Certified",
  "OSHA Compliant",
  "Trade School Graduate",
  "Manufacturer Certified",
  "Safety Trained",
]

const states = [
  { value: "al", label: "Alabama" },
  { value: "ak", label: "Alaska" },
  { value: "az", label: "Arizona" },
  { value: "ar", label: "Arkansas" },
  { value: "ca", label: "California" },
  { value: "co", label: "Colorado" },
  { value: "ct", label: "Connecticut" },
  { value: "de", label: "Delaware" },
  { value: "fl", label: "Florida" },
  { value: "ga", label: "Georgia" },
  { value: "hi", label: "Hawaii" },
  { value: "id", label: "Idaho" },
  { value: "il", label: "Illinois" },
  { value: "in", label: "Indiana" },
  { value: "ia", label: "Iowa" },
  { value: "ks", label: "Kansas" },
  { value: "ky", label: "Kentucky" },
  { value: "la", label: "Louisiana" },
  { value: "me", label: "Maine" },
  { value: "md", label: "Maryland" },
  { value: "ma", label: "Massachusetts" },
  { value: "mi", label: "Michigan" },
  { value: "mn", label: "Minnesota" },
  { value: "ms", label: "Mississippi" },
  { value: "mo", label: "Missouri" },
  { value: "mt", label: "Montana" },
  { value: "ne", label: "Nebraska" },
  { value: "nv", label: "Nevada" },
  { value: "nh", label: "New Hampshire" },
  { value: "nj", label: "New Jersey" },
  { value: "nm", label: "New Mexico" },
  { value: "ny", label: "New York" },
  { value: "nc", label: "North Carolina" },
  { value: "nd", label: "North Dakota" },
  { value: "oh", label: "Ohio" },
  { value: "ok", label: "Oklahoma" },
  { value: "or", label: "Oregon" },
  { value: "pa", label: "Pennsylvania" },
  { value: "ri", label: "Rhode Island" },
  { value: "sc", label: "South Carolina" },
  { value: "sd", label: "South Dakota" },
  { value: "tn", label: "Tennessee" },
  { value: "tx", label: "Texas" },
  { value: "ut", label: "Utah" },
  { value: "vt", label: "Vermont" },
  { value: "va", label: "Virginia" },
  { value: "wa", label: "Washington" },
  { value: "wv", label: "West Virginia" },
  { value: "wi", label: "Wisconsin" },
  { value: "wy", label: "Wyoming" },
]

// Customer Form Component
const CustomerForm = ({ 
  formData, 
  errors, 
  handleInputChange, 
  states, 
  handleSubmit, 
  isLoading 
}: {
  formData: any;
  errors: Record<string, string>;
  handleInputChange: (field: string, value: any) => void;
  states: Array<{value: string, label: string}>;
  handleSubmit: () => void;
  isLoading: boolean;
}) => (
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h2>
      <p className="text-gray-600 dark:text-gray-400">Join thousands of satisfied customers</p>
    </div>

    <Card className="border-2 border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="Smith"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address *</label>
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number *</label>
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Address *</label>
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.address
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="123 Main Street"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* City, State, ZIP */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">City *</label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.city
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">State *</label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ZIP Code *</label>
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.zipCode
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password *</label>
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 h-12 rounded-xl border-2 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Confirm Password *</label>
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`pl-10 h-12 rounded-xl border-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-gray-900 dark:text-white font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-900 dark:text-white font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={formData.marketingEmails}
                onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                className="mt-1"
              />
              <label htmlFor="marketing" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                I would like to receive marketing emails about new features and promotions (optional)
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-14 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-gray-900 dark:border-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Create Account</span>
              </div>
            )}
          </Button>

          {errors.submit && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-600 dark:text-red-400">{errors.submit}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Provider Form Component
const ProviderForm = ({ 
  formData, 
  errors, 
  handleInputChange, 
  handleServiceToggle,
  handleCertificationToggle,
  handleFileUpload,
  removeUploadedFile,
  states, 
  services,
  certifications,
  uploadedFiles,
  handleSubmit, 
  isLoading,
  success 
}: {
  formData: any;
  errors: Record<string, string>;
  handleInputChange: (field: string, value: any) => void;
  handleServiceToggle: (service: string) => void;
  handleCertificationToggle: (cert: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeUploadedFile: (fileName: string) => void;
  states: Array<{value: string, label: string}>;
  services: string[];
  certifications: string[];
  uploadedFiles: string[];
  handleSubmit: () => void;
  isLoading: boolean;
  success: boolean;
}) => (
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join Our Provider Network</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Start growing your business with advanced tools and AI-powered customer matching
      </p>
    </div>

    {success && (
      <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          Provider account created successfully! Redirecting to login...
        </AlertDescription>
      </Alert>
    )}

    {errors.submit && (
      <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        <AlertDescription className="text-red-800 dark:text-red-200">{errors.submit}</AlertDescription>
      </Alert>
    )}

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Personal & Business Info */}
      <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <User className="w-5 h-5" />
            <span>Personal & Business Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="Smith"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Business Name (Optional)
            </label>
            <Input
              value={formData.businessName}
              onChange={(e) => handleInputChange("businessName", e.target.value)}
              className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              placeholder="Smith Plumbing Services"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address *</label>
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
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number *</label>
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Address *</label>
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.address
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="123 Main Street"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* City, State, ZIP */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">City *</label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.city
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">State *</label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ZIP Code *</label>
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.zipCode
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services & Professional Info */}
      <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <Wrench className="w-5 h-5" />
            <span>Services & Professional Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Services */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Services Offered * <span className="text-xs text-gray-500">(Select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                  />
                  <label htmlFor={service} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {service}
                  </label>
                </div>
              ))}
            </div>
            {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Experience Level *</label>
            <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                <SelectItem value="experienced">Experienced (6-10 years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Hourly Rate ($) *</label>
            <Input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
              className={`h-12 rounded-xl border-2 ${
                errors.hourlyRate
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="75"
              min="1"
            />
            {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
          </div>

          {/* Service Description */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Service Description * <span className="text-xs text-gray-500">(Min. 50 characters)</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`rounded-xl border-2 min-h-[100px] ${
                errors.description
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="Describe your services, specialties, and what makes you unique..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              <p className="text-xs text-gray-500 ml-auto">{formData.description.length}/50</p>
            </div>
          </div>

          {/* Service Radius */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Service Radius *</label>
            <Select value={formData.serviceRadius} onValueChange={(value) => handleInputChange("serviceRadius", value)}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white">
                <SelectValue placeholder="Select service radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">Within 5 miles</SelectItem>
                <SelectItem value="10">Within 10 miles</SelectItem>
                <SelectItem value="25">Within 25 miles</SelectItem>
                <SelectItem value="50">Within 50 miles</SelectItem>
                <SelectItem value="100">Within 100 miles</SelectItem>
                <SelectItem value="statewide">Statewide</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceRadius && <p className="text-red-500 text-sm mt-1">{errors.serviceRadius}</p>}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Certifications & Documents */}
    <Card className="mt-8 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
          <Award className="w-5 h-5" />
          <span>Certifications & Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            Certifications <span className="text-xs text-gray-500">(Optional - helps build trust)</span>
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <Checkbox
                  id={cert}
                  checked={formData.certifications.includes(cert)}
                  onCheckedChange={() => handleCertificationToggle(cert)}
                />
                <label htmlFor={cert} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {cert}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Upload Documents <span className="text-xs text-gray-500">(License, Insurance, Certifications)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
            </label>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files:</p>
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{fileName}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeUploadedFile(fileName)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>

    {/* Password & Terms */}
    <Card className="mt-8 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
          <Shield className="w-5 h-5" />
          <span>Security & Agreement</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password *</label>
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Confirm Password *</label>
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`pl-10 h-12 rounded-xl border-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
              }`}
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms-provider"
              checked={formData.agreeToTerms}
              onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
              className="mt-1"
            />
            <label htmlFor="terms-provider" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-gray-900 dark:text-white font-semibold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-gray-900 dark:text-white font-semibold hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="background-check"
              checked={formData.agreeToPrivacy}
              onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked)}
              className="mt-1"
            />
            <label htmlFor="background-check" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I consent to background checks and verification processes required for service providers *
            </label>
          </div>
          {errors.agreeToPrivacy && <p className="text-red-500 text-sm">{errors.agreeToPrivacy}</p>}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="marketing-provider"
              checked={formData.marketingEmails}
              onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
              className="mt-1"
            />
            <label htmlFor="marketing-provider" className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              I would like to receive marketing emails about new features and business opportunities (optional)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-14 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-gray-900 dark:border-white"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
              <span>Creating Account...</span>
            </div>
          ) : success ? (
            <>
              Account Created!
              <CheckCircle className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Create Provider Account
              <CheckCircle className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  </div>
);

// User Type Selection Component
const UserTypeSelection = ({ 
  userType, 
  setUserType, 
  setStep, 
  step 
}: {
  userType: "customer" | "provider" | null;
  setUserType: (type: "customer" | "provider" | null) => void;
  setStep: (step: number) => void;
  step: number;
}) => (
  <div className="text-center space-y-8">
    <div>
      <h1 className="text-5xl font-black mb-4">
        <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
          Join FixItNow
        </span>
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">Choose how you want to experience our platform</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Customer Card */}
      <Card
        className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 rounded-3xl overflow-hidden ${
          userType === "customer"
            ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onClick={() => {
          setUserType("customer")
          // Auto-progress to step 2 after a short delay for better UX
          setTimeout(() => setStep(2), 500)
        }}
      >
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <User className="w-10 h-10 text-white dark:text-gray-900" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">I need services</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Find trusted professionals for all your home service needs with AI-powered matching and real-time
            tracking.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { icon: Brain, text: "AI-Powered Matching" },
              { icon: Shield, text: "Verified Professionals" },
              { icon: Sparkles, text: "Real-Time Tracking" },
              { icon: Star, text: "Quality Guarantee" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <feature.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>

          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            50k+ Happy Customers
          </Badge>
        </CardContent>
      </Card>

      {/* Provider Card */}
      <Card
        className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 rounded-3xl overflow-hidden ${
          userType === "provider"
            ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
        onClick={() => {
          setUserType("provider")
          // Auto-progress to step 2 after a short delay for better UX
          setTimeout(() => setStep(2), 500)
        }}
      >
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Wrench className="w-10 h-10 text-white dark:text-gray-900" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">I provide services</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Join our network of trusted professionals and grow your business with advanced tools and AI-powered
            customer matching.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { icon: TrendingUp, text: "Grow Your Business" },
              { icon: Zap, text: "Smart Job Matching" },
              { icon: Globe, text: "Expand Your Reach" },
              { icon: Award, text: "Build Your Reputation" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <feature.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
              </div>
            ))}
          </div>

          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            10k+ Active Providers
          </Badge>
        </CardContent>
      </Card>
    </div>

    {userType && step === 1 && (
      <div className="mt-8">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Proceeding to registration form...
        </div>
        <Button
          onClick={() => setStep(2)}
          className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold px-12 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-900 dark:border-white"
        >
          Continue as {userType === "customer" ? "Customer" : "Service Provider"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    )}
  </div>
);

export default function SignupPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"customer" | "provider" | null>(null)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // Common fields
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Provider specific
    businessName: "",
    services: [] as string[],
    experience: "",
    hourlyRate: "",
    description: "",
    certifications: [] as string[],
    availability: "",
    serviceRadius: "",

    // Terms and privacy
    agreeToTerms: false,
    agreeToPrivacy: false,
    marketingEmails: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/
    return phoneRegex.test(phone)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const validateZipCode = (zipCode: string) => {
    const zipRegex = /^\d{5}(-\d{4})?$/
    return zipRegex.test(zipCode)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Common validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!validateZipCode(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code"
    }

    // Provider specific validations
    if (userType === "provider") {
      if (formData.services.length === 0) {
        newErrors.services = "Please select at least one service"
      }
      if (!formData.experience) newErrors.experience = "Experience level is required"
      if (!formData.hourlyRate.trim()) {
        newErrors.hourlyRate = "Hourly rate is required"
      } else if (isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) <= 0) {
        newErrors.hourlyRate = "Please enter a valid hourly rate"
      }
      if (!formData.description.trim()) {
        newErrors.description = "Service description is required"
      } else if (formData.description.length < 50) {
        newErrors.description = "Description must be at least 50 characters long"
      }
      if (!formData.serviceRadius) newErrors.serviceRadius = "Service radius is required"
      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = "You must agree to background checks"
      }
    }

    // Terms agreement
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service"
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

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
    // Clear services error
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }))
    }
  }

  const handleCertificationToggle = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setUploadedFiles((prev) => [...prev, ...fileNames])
    }
  }

  const removeUploadedFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file !== fileName))
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/login?signup=success")
      }, 2000)
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const UserTypeSelection = () => (
    <div className="text-center space-y-8">
      <div>
        <h1 className="text-5xl font-black mb-4">
          <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-300 dark:to-white">
            Join FixItNow
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">Choose how you want to experience our platform</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Customer Card */}
        <Card
          className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 rounded-3xl overflow-hidden ${
            userType === "customer"
              ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onClick={() => {
            setUserType("customer")
            // Auto-progress to step 2 after a short delay for better UX
            setTimeout(() => setStep(2), 500)
          }}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <User className="w-10 h-10 text-white dark:text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">I need services</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Find trusted professionals for all your home service needs with AI-powered matching and real-time
              tracking.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Brain, text: "AI-Powered Matching" },
                { icon: Shield, text: "Verified Professionals" },
                { icon: Sparkles, text: "Real-Time Tracking" },
                { icon: Star, text: "Quality Guarantee" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <feature.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50k+ Happy Customers
            </Badge>
          </CardContent>
        </Card>

        {/* Provider Card */}
        <Card
          className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-2 rounded-3xl overflow-hidden ${
            userType === "provider"
              ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
              : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onClick={() => {
            setUserType("provider")
            // Auto-progress to step 2 after a short delay for better UX
            setTimeout(() => setStep(2), 500)
          }}
        >
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Wrench className="w-10 h-10 text-white dark:text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">I provide services</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Grow your business with our advanced platform. Get more customers, manage bookings, and increase revenue.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: TrendingUp, text: "Increase Revenue by 40%" },
                { icon: Globe, text: "Expand Your Reach" },
                { icon: Zap, text: "Instant Notifications" },
                { icon: Award, text: "Build Your Reputation" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <feature.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-0 px-4 py-2">
              <Wrench className="w-4 h-4 mr-2" />
              5k+ Active Providers
            </Badge>
          </CardContent>
        </Card>
      </div>

      {userType && step === 1 && (
        <div className="mt-8">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Proceeding to registration form...
          </div>
          <Button
            onClick={() => setStep(2)}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold px-12 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-900 dark:border-white"
          >
            Continue as {userType === "customer" ? "Customer" : "Service Provider"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )

  const CustomerForm = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Your Account</h2>
        <p className="text-gray-600 dark:text-gray-400">Join thousands of satisfied customers</p>
      </div>

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Account created successfully! Redirecting to login...
          </AlertDescription>
        </Alert>
      )}

      {errors.submit && (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{errors.submit}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardContent className="p-8 space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address *</label>
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

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`pl-10 h-12 rounded-xl border-2 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Address *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`pl-10 h-12 rounded-xl border-2 ${
                  errors.address
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="123 Main Street"
              />
            </div>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">City *</label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.city
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">State *</label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                <SelectTrigger
                  className={`h-12 rounded-xl border-2 ${
                    errors.state
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                >
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ZIP Code *</label>
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className={`h-12 rounded-xl border-2 ${
                  errors.zipCode
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="10001"
              />
              {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-gray-900 dark:text-white hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-900 dark:text-white hover:underline font-medium">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <div className="flex items-start space-x-3">
              <Checkbox
                checked={formData.marketingEmails}
                onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I'd like to receive marketing emails about new features and promotions
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || success}
            className="w-full h-14 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border-2 border-gray-900 dark:border-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : success ? (
              <>
                Account Created!
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Create Account
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const ProviderForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join Our Provider Network</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Start growing your business with advanced tools and AI-powered customer matching
        </p>
      </div>

      {success && (
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Provider account created successfully! Redirecting to login...
          </AlertDescription>
        </Alert>
      )}

      {errors.submit && (
        <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-200">{errors.submit}</AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal & Business Info */}
        <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span>Personal & Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">First Name *</label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`h-12 rounded-xl border-2 ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="John"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last Name *</label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`h-12 rounded-xl border-2 ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="Smith"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Business Name (Optional)
              </label>
              <Input
                value={formData.businessName}
                onChange={(e) => handleInputChange("businessName", e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                placeholder="Smith Plumbing Services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address *</label>
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
                  placeholder="john@smithplumbing.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Service Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.address
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="123 Business Ave"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">City *</label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`h-12 rounded-xl border-2 ${
                    errors.city
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="New York"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">State *</label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger
                    className={`h-12 rounded-xl border-2 ${
                      errors.state
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                    }`}
                  >
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ZIP Code *</label>
                <Input
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={`h-12 rounded-xl border-2 ${
                    errors.zipCode
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="10001"
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card className="shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span>Service Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                Services Offered *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <div
                    key={service}
                    onClick={() => handleServiceToggle(service)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.services.includes(service)
                        ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-700"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    <div className="text-sm font-medium text-center flex items-center justify-center space-x-2">
                      {formData.services.includes(service) && (
                        <Check className="w-4 h-4 text-gray-900 dark:text-white" />
                      )}
                      <span>{service}</span>
                    </div>
                  </div>
                ))}
              </div>
              {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Years of Experience *
                </label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                  <SelectTrigger
                    className={`h-12 rounded-xl border-2 ${
                      errors.experience
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                    }`}
                  >
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Hourly Rate ($) *
                </label>
                <Input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                  className={`h-12 rounded-xl border-2 ${
                    errors.hourlyRate
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="75"
                  min="1"
                />
                {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Service Description *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={`rounded-xl border-2 min-h-[100px] ${
                  errors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                }`}
                placeholder="Describe your services, specialties, and what makes you unique... (minimum 50 characters)"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                <p className="text-gray-500 text-sm ml-auto">{formData.description.length}/50 characters minimum</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Service Radius (miles) *
              </label>
              <Select
                value={formData.serviceRadius}
                onValueChange={(value) => handleInputChange("serviceRadius", value)}
              >
                <SelectTrigger
                  className={`h-12 rounded-xl border-2 ${
                    errors.serviceRadius
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                >
                  <SelectValue placeholder="Select radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 miles</SelectItem>
                  <SelectItem value="10">10 miles</SelectItem>
                  <SelectItem value="25">25 miles</SelectItem>
                  <SelectItem value="50">50+ miles</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceRadius && <p className="text-red-500 text-sm mt-1">{errors.serviceRadius}</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certifications & Documents */}
      <Card className="mt-8 shadow-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span>Certifications & Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Certifications & Qualifications
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  onClick={() => handleCertificationToggle(cert)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.certifications.includes(cert)
                      ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {formData.certifications.includes(cert) && (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">Upload Documents</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Upload your documents</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                License, insurance, certifications, and portfolio images
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-full px-6 border-2 border-gray-900 dark:border-white"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG (Max 10MB each)</p>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Uploaded Files:</h4>
                {uploadedFiles.map((fileName, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{fileName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUploadedFile(fileName)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`pl-10 h-12 rounded-xl border-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-gray-900 dark:text-white hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-900 dark:text-white hover:underline font-medium">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <div className="flex items-start space-x-3">
              <Checkbox
                checked={formData.agreeToPrivacy}
                onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked)}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I understand that my information will be verified and I may be subject to background checks *
              </label>
            </div>
            {errors.agreeToPrivacy && <p className="text-red-500 text-sm">{errors.agreeToPrivacy}</p>}

            <div className="flex items-start space-x-3">
              <Checkbox
                checked={formData.marketingEmails}
                onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                className="mt-1"
              />
              <label className="text-sm text-gray-700 dark:text-gray-300">
                I'd like to receive business tips, platform updates, and promotional offers
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || success}
            className="w-full h-14 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border-2 border-gray-900 dark:border-white"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white dark:border-gray-900 border-t-transparent rounded-full animate-spin" />
                <span>Creating Provider Account...</span>
              </div>
            ) : success ? (
              <>
                Provider Account Created!
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Join Provider Network
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        {userType && (
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Step {step} of 2</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {Math.round((step / 2) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-200 dark:to-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Back Button */}
        {step > 1 && (
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => (step === 2 ? setStep(1) : setUserType(null))}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back
            </Button>
          </div>
        )}

        {/* Content */}
        {!userType && (
          <UserTypeSelection 
            userType={userType}
            setUserType={setUserType}
            setStep={setStep}
            step={step}
          />
        )}
        {userType === "customer" && step === 2 && (
          <CustomerForm 
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            states={states}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        )}
        {userType === "provider" && step === 2 && (
          <ProviderForm 
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleServiceToggle={handleServiceToggle}
            handleCertificationToggle={handleCertificationToggle}
            handleFileUpload={handleFileUpload}
            removeUploadedFile={removeUploadedFile}
            states={states}
            services={services}
            certifications={certifications}
            uploadedFiles={uploadedFiles}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            success={success}
          />
        )}

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 dark:text-white hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
