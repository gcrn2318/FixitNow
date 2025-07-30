"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Shield,
  CreditCard,
  User,
  Smartphone,
  Palette,
  Moon,
  Sun,
  Lock,
  Eye,
  EyeOff,
  Camera,
  DollarSign,
  MessageCircle,
  Briefcase,
  FileText,
  Download,
  Upload,
  Trash2,
  Save,
  RotateCcw,
} from "lucide-react"

const mockSettings = {
  profile: {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Professional service provider with over 8 years of experience.",
    location: "New York, NY",
    timezone: "America/New_York",
    language: "English",
    currency: "USD",
  },
  notifications: {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    jobAlerts: true,
    messageAlerts: true,
    reviewAlerts: true,
    promotionalEmails: false,
    weeklyDigest: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showPhone: true,
    showLocation: true,
    allowMessages: true,
    allowReviews: true,
    dataSharing: false,
    analyticsTracking: true,
    twoFactorAuth: false,
    loginAlerts: true,
  },
  appearance: {
    theme: "system",
    fontSize: "medium",
    compactMode: false,
    animations: true,
    highContrast: false,
    colorBlindMode: false,
  },
  business: {
    businessName: "Smith Professional Services",
    businessType: "Individual",
    taxId: "123-45-6789",
    licenseNumber: "LIC-123456",
    insuranceProvider: "State Farm",
    hourlyRate: 85,
    serviceRadius: 25,
    availability: "weekdays",
    autoAcceptJobs: false,
    instantBooking: true,
  },
  payment: {
    defaultPaymentMethod: "stripe",
    autoWithdraw: true,
    withdrawalThreshold: 100,
    paymentReminders: true,
    invoiceTemplate: "standard",
    taxReporting: true,
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    // Save settings logic here
    setHasChanges(false)
    setIsEditing(false)
  }

  const resetSettings = () => {
    setSettings(mockSettings)
    setHasChanges(false)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-black dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and configuration</p>
          </div>

          {hasChanges && (
            <div className="flex items-center space-x-3">
              <Button
                onClick={resetSettings}
                variant="outline"
                className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={saveSettings}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold px-6"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-1 flex flex-wrap lg:grid lg:grid-cols-6 gap-1 w-full">
            <TabsTrigger
              value="profile"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <User className="w-3 h-3 mr-1" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <Bell className="w-3 h-3 mr-1" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <Shield className="w-3 h-3 mr-1" />
              Privacy
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <Palette className="w-3 h-3 mr-1" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <Briefcase className="w-3 h-3 mr-1" />
              Business
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="rounded-xl px-3 py-2 font-medium data-[state=active]:bg-black dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-black text-xs flex items-center justify-center whitespace-nowrap flex-1 lg:flex-none"
            >
              <CreditCard className="w-3 h-3 mr-1" />
              Payment
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <User className="w-6 h-6 mr-3" />
                    Profile Picture
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-6">
                    <Avatar className="w-32 h-32 border-4 border-gray-200 dark:border-gray-700">
                      <AvatarImage src={settings.profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-black dark:bg-white text-white dark:text-black text-3xl font-black">
                        {settings.profile.firstName[0]}
                        {settings.profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-black dark:bg-white text-white dark:text-black border-2 border-white dark:border-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Photo
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Photo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-8">
                <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                    <CardTitle className="text-2xl font-black text-black dark:text-white">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-black dark:text-white">First Name</label>
                        <Input
                          value={settings.profile.firstName}
                          onChange={(e) => updateSetting("profile", "firstName", e.target.value)}
                          className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-black dark:text-white">Last Name</label>
                        <Input
                          value={settings.profile.lastName}
                          onChange={(e) => updateSetting("profile", "lastName", e.target.value)}
                          className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">Email Address</label>
                      <Input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSetting("profile", "email", e.target.value)}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">Phone Number</label>
                      <Input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => updateSetting("profile", "phone", e.target.value)}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">Bio</label>
                      <Textarea
                        value={settings.profile.bio}
                        onChange={(e) => updateSetting("profile", "bio", e.target.value)}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-black dark:text-white">Location</label>
                        <Input
                          value={settings.profile.location}
                          onChange={(e) => updateSetting("profile", "location", e.target.value)}
                          className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-black dark:text-white">Timezone</label>
                        <Select
                          value={settings.profile.timezone}
                          onValueChange={(value) => updateSetting("profile", "timezone", value)}
                        >
                          <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                    <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                      <Lock className="w-6 h-6 mr-3" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white pr-12"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">New Password</label>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Bell className="w-6 h-6 mr-3" />
                    General Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Push Notifications</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Email Notifications</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Get updates via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">SMS Notifications</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Receive SMS alerts</p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSetting("notifications", "smsNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Sound Effects</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Play sounds for notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.soundEnabled}
                      onCheckedChange={(checked) => updateSetting("notifications", "soundEnabled", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Vibration</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Vibrate for notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.vibrationEnabled}
                      onCheckedChange={(checked) => updateSetting("notifications", "vibrationEnabled", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    Activity Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Job Alerts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">New job opportunities</p>
                    </div>
                    <Switch
                      checked={settings.notifications.jobAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "jobAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Message Alerts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">New messages from customers</p>
                    </div>
                    <Switch
                      checked={settings.notifications.messageAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "messageAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Review Alerts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">New customer reviews</p>
                    </div>
                    <Switch
                      checked={settings.notifications.reviewAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "reviewAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Promotional Emails</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Marketing and promotional content</p>
                    </div>
                    <Switch
                      checked={settings.notifications.promotionalEmails}
                      onCheckedChange={(checked) => updateSetting("notifications", "promotionalEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Weekly Digest</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Weekly summary of activity</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyDigest}
                      onCheckedChange={(checked) => updateSetting("notifications", "weeklyDigest", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Profile Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                      Profile Visibility
                    </label>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onValueChange={(value) => updateSetting("privacy", "profileVisibility", value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="customers-only">Customers Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Show Email Address</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Display email on public profile</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(checked) => updateSetting("privacy", "showEmail", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Show Phone Number</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Display phone on public profile</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showPhone}
                      onCheckedChange={(checked) => updateSetting("privacy", "showPhone", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Show Location</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Display location on public profile</p>
                    </div>
                    <Switch
                      checked={settings.privacy.showLocation}
                      onCheckedChange={(checked) => updateSetting("privacy", "showLocation", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Lock className="w-6 h-6 mr-3" />
                    Security & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Add extra security to your account</p>
                    </div>
                    <Switch
                      checked={settings.privacy.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting("privacy", "twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Login Alerts</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Get notified of new logins</p>
                    </div>
                    <Switch
                      checked={settings.privacy.loginAlerts}
                      onCheckedChange={(checked) => updateSetting("privacy", "loginAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Data Sharing</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Share data with partners</p>
                    </div>
                    <Switch
                      checked={settings.privacy.dataSharing}
                      onCheckedChange={(checked) => updateSetting("privacy", "dataSharing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Analytics Tracking</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Help improve our services</p>
                    </div>
                    <Switch
                      checked={settings.privacy.analyticsTracking}
                      onCheckedChange={(checked) => updateSetting("privacy", "analyticsTracking", checked)}
                    />
                  </div>

                  <div className="pt-4 border-t-2 border-gray-100 dark:border-gray-800">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:border-red-300 dark:hover:border-red-700 font-bold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                  <Palette className="w-6 h-6 mr-3" />
                  Appearance & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-4 text-black dark:text-white">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant={settings.appearance.theme === "light" ? "default" : "outline"}
                          onClick={() => updateSetting("appearance", "theme", "light")}
                          className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                            settings.appearance.theme === "light"
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <Sun className="w-6 h-6" />
                          <span className="font-bold">Light</span>
                        </Button>
                        <Button
                          variant={settings.appearance.theme === "dark" ? "default" : "outline"}
                          onClick={() => updateSetting("appearance", "theme", "dark")}
                          className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                            settings.appearance.theme === "dark"
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <Moon className="w-6 h-6" />
                          <span className="font-bold">Dark</span>
                        </Button>
                        <Button
                          variant={settings.appearance.theme === "system" ? "default" : "outline"}
                          onClick={() => updateSetting("appearance", "theme", "system")}
                          className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                            settings.appearance.theme === "system"
                              ? "bg-black dark:bg-white text-white dark:text-black"
                              : "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <Smartphone className="w-6 h-6" />
                          <span className="font-bold">System</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-4 text-black dark:text-white">Font Size</label>
                      <Select
                        value={settings.appearance.fontSize}
                        onValueChange={(value) => updateSetting("appearance", "fontSize", value)}
                      >
                        <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="extra-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-black dark:text-white">Compact Mode</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Reduce spacing and padding</p>
                      </div>
                      <Switch
                        checked={settings.appearance.compactMode}
                        onCheckedChange={(checked) => updateSetting("appearance", "compactMode", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-black dark:text-white">Animations</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Enable smooth transitions</p>
                      </div>
                      <Switch
                        checked={settings.appearance.animations}
                        onCheckedChange={(checked) => updateSetting("appearance", "animations", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-black dark:text-white">High Contrast</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Improve accessibility</p>
                      </div>
                      <Switch
                        checked={settings.appearance.highContrast}
                        onCheckedChange={(checked) => updateSetting("appearance", "highContrast", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-black dark:text-white">Color Blind Mode</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Adjust colors for accessibility</p>
                      </div>
                      <Switch
                        checked={settings.appearance.colorBlindMode}
                        onCheckedChange={(checked) => updateSetting("appearance", "colorBlindMode", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <Briefcase className="w-6 h-6 mr-3" />
                    Business Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Business Name</label>
                    <Input
                      value={settings.business.businessName}
                      onChange={(e) => updateSetting("business", "businessName", e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Business Type</label>
                    <Select
                      value={settings.business.businessType}
                      onValueChange={(value) => updateSetting("business", "businessType", value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Tax ID</label>
                    <Input
                      value={settings.business.taxId}
                      onChange={(e) => updateSetting("business", "taxId", e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">License Number</label>
                    <Input
                      value={settings.business.licenseNumber}
                      onChange={(e) => updateSetting("business", "licenseNumber", e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                      Insurance Provider
                    </label>
                    <Input
                      value={settings.business.insuranceProvider}
                      onChange={(e) => updateSetting("business", "insuranceProvider", e.target.value)}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <DollarSign className="w-6 h-6 mr-3" />
                    Service Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">Hourly Rate ($)</label>
                      <Input
                        type="number"
                        value={settings.business.hourlyRate}
                        onChange={(e) => updateSetting("business", "hourlyRate", Number.parseInt(e.target.value))}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                        Service Radius (miles)
                      </label>
                      <Input
                        type="number"
                        value={settings.business.serviceRadius}
                        onChange={(e) => updateSetting("business", "serviceRadius", Number.parseInt(e.target.value))}
                        className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Availability</label>
                    <Select
                      value={settings.business.availability}
                      onValueChange={(value) => updateSetting("business", "availability", value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="all-week">All Week</SelectItem>
                        <SelectItem value="custom">Custom Schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Auto-Accept Jobs</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Automatically accept matching jobs</p>
                    </div>
                    <Switch
                      checked={settings.business.autoAcceptJobs}
                      onCheckedChange={(checked) => updateSetting("business", "autoAcceptJobs", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Instant Booking</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Allow customers to book instantly</p>
                    </div>
                    <Switch
                      checked={settings.business.instantBooking}
                      onCheckedChange={(checked) => updateSetting("business", "instantBooking", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <CreditCard className="w-6 h-6 mr-3" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                      Default Payment Method
                    </label>
                    <Select
                      value={settings.payment.defaultPaymentMethod}
                      onValueChange={(value) => updateSetting("payment", "defaultPaymentMethod", value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Auto-Withdraw</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Automatically withdraw earnings</p>
                    </div>
                    <Switch
                      checked={settings.payment.autoWithdraw}
                      onCheckedChange={(checked) => updateSetting("payment", "autoWithdraw", checked)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">
                      Withdrawal Threshold ($)
                    </label>
                    <Input
                      type="number"
                      value={settings.payment.withdrawalThreshold}
                      onChange={(e) => updateSetting("payment", "withdrawalThreshold", Number.parseInt(e.target.value))}
                      className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Payment Reminders</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Send payment reminders to customers</p>
                    </div>
                    <Switch
                      checked={settings.payment.paymentReminders}
                      onCheckedChange={(checked) => updateSetting("payment", "paymentReminders", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="border-b-2 border-gray-100 dark:border-gray-800">
                  <CardTitle className="text-2xl font-black text-black dark:text-white flex items-center">
                    <FileText className="w-6 h-6 mr-3" />
                    Invoicing & Tax
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-black dark:text-white">Invoice Template</label>
                    <Select
                      value={settings.payment.invoiceTemplate}
                      onValueChange={(value) => updateSetting("payment", "invoiceTemplate", value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white focus:border-black dark:focus:border-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="detailed">Detailed</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-black dark:text-white">Tax Reporting</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Generate tax reports automatically</p>
                    </div>
                    <Switch
                      checked={settings.payment.taxReporting}
                      onCheckedChange={(checked) => updateSetting("payment", "taxReporting", checked)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-bold">
                      <Download className="w-4 h-4 mr-2" />
                      Download Tax Documents
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600 font-bold"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Payment History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
