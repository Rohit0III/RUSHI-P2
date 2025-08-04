"use client"

import { useState } from "react"
import { Save, Users, Shield, Bell, Database, Globe, Key, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for settings
const userRoles = [
  { id: 1, name: "System Administrator", permissions: ["Full Access"], users: 2, color: "bg-red-500" },
  { id: 2, name: "Asset Manager", permissions: ["Asset Management", "Reports"], users: 5, color: "bg-blue-500" },
  { id: 3, name: "IT Support", permissions: ["Asset View", "Software Management"], users: 12, color: "bg-green-500" },
  { id: 4, name: "Department Head", permissions: ["Department Assets", "Reports"], users: 8, color: "bg-yellow-500" },
  { id: 5, name: "End User", permissions: ["View Assigned Assets"], users: 156, color: "bg-gray-500" },
]

const systemUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "System Administrator",
    status: "Active",
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Asset Manager",
    status: "Active",
    lastLogin: "2024-01-19",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "IT Support",
    status: "Active",
    lastLogin: "2024-01-18",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    role: "Department Head",
    status: "Inactive",
    lastLogin: "2024-01-10",
  },
]

const initialNotificationSettings = [
  {
    id: "license_expiry",
    name: "License Expiry Alerts",
    description: "Notify when licenses are about to expire",
    enabled: true,
    days: 30,
  },
  {
    id: "warranty_expiry",
    name: "Warranty Expiry Alerts",
    description: "Notify when warranties are about to expire",
    enabled: true,
    days: 60,
  },
  {
    id: "inactive_devices",
    name: "Inactive Device Alerts",
    description: "Notify about devices that haven't been used",
    enabled: true,
    days: 30,
  },
  {
    id: "compliance_issues",
    name: "Compliance Alerts",
    description: "Notify about compliance violations",
    enabled: true,
    days: 1,
  },
  {
    id: "security_updates",
    name: "Security Update Alerts",
    description: "Notify about available security updates",
    enabled: false,
    days: 7,
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    companyName: "Enterprise Corp",
    companyEmail: "admin@enterprise.com",
    timezone: "UTC-5",
    currency: "USD",
    language: "English",
    autoBackup: true,
    maintenanceMode: false,
    dataRetention: "7",
  })

  const [notifications, setNotifications] = useState(initialNotificationSettings)
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.company.com",
    smtpPort: "587",
    smtpUsername: "notifications@company.com",
    smtpPassword: "",
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupTime: "03:00",
    retentionPeriod: "30",
  })

  const [securitySettings, setSecuritySettings] = useState({
    minPasswordLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    sessionTimeout: "60",
    forceLogoutOnClose: false,
    rememberLogin: true,
    require2FAForAdmins: true,
    allow2FAForAll: true,
    apiRateLimit: "100",
    requireApiKey: true,
    currentApiKey: "ak_1234567890abcdef",
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleEmailSettingChange = (key: string, value: string) => {
    setEmailSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleBackupSettingChange = (key: string, value: any) => {
    setBackupSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecuritySettingChange = (key: string, value: any) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleNotificationToggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, enabled: !notification.enabled } : notification,
      ),
    )
  }

  const handleNotificationDaysChange = (id: string, days: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, days } : notification)),
    )
  }

  const saveSettings = () => {
    console.log("Saving settings:", { settings, notifications, emailSettings, backupSettings, securitySettings })
    // In a real application, this would make an API call
  }

  const regenerateApiKey = () => {
    const newApiKey = "ak_" + Math.random().toString(36).substring(2, 34)
    handleSecuritySettingChange("currentApiKey", newApiKey)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure system preferences and user management</p>
          </div>
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="grid w-full grid-cols-6 h-auto p-0 bg-transparent">
                  <TabsTrigger value="general" className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50">
                    <Globe className="h-4 w-4" />
                    General
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50">
                    <Users className="h-4 w-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="roles" className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50">
                    <Shield className="h-4 w-4" />
                    Roles
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50"
                  >
                    <Bell className="h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="database" className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50">
                    <Database className="h-4 w-4" />
                    Database
                  </TabsTrigger>
                  <TabsTrigger value="security" className="flex items-center gap-2 py-4 data-[state=active]:bg-blue-50">
                    <Key className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="general" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            value={settings.companyName}
                            onChange={(e) => handleSettingChange("companyName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="companyEmail">Company Email</Label>
                          <Input
                            id="companyEmail"
                            type="email"
                            value={settings.companyEmail}
                            onChange={(e) => handleSettingChange("companyEmail", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select
                            value={settings.timezone}
                            onValueChange={(value) => handleSettingChange("timezone", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                              <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                              <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                              <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Select
                            value={settings.currency}
                            onValueChange={(value) => handleSettingChange("currency", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">US Dollar (USD)</SelectItem>
                              <SelectItem value="EUR">Euro (EUR)</SelectItem>
                              <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                              <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select
                            value={settings.language}
                            onValueChange={(value) => handleSettingChange("language", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                              <SelectItem value="Japanese">Japanese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">System Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="autoBackup">Automatic Backup</Label>
                            <p className="text-sm text-gray-500">Automatically backup system data daily</p>
                          </div>
                          <Switch
                            id="autoBackup"
                            checked={settings.autoBackup}
                            onCheckedChange={(checked) => handleSettingChange("autoBackup", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                            <p className="text-sm text-gray-500">Enable maintenance mode for system updates</p>
                          </div>
                          <Switch
                            id="maintenanceMode"
                            checked={settings.maintenanceMode}
                            onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dataRetention">Data Retention (years)</Label>
                          <Select
                            value={settings.dataRetention}
                            onValueChange={(value) => handleSettingChange("dataRetention", value)}
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 year</SelectItem>
                              <SelectItem value="3">3 years</SelectItem>
                              <SelectItem value="5">5 years</SelectItem>
                              <SelectItem value="7">7 years</SelectItem>
                              <SelectItem value="10">10 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="mt-0">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">User Management</h3>
                        <p className="text-sm text-gray-500">Manage system users and their access</p>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add User
                      </Button>
                    </div>

                    <Card>
                      <CardContent className="p-0">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>User</TableHead>
                              <TableHead>Role</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Last Login</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {systemUsers.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{user.role}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                    {user.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">
                                      Edit
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="roles" className="mt-0">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">Role-Based Access Control</h3>
                        <p className="text-sm text-gray-500">Define roles and permissions for system access</p>
                      </div>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Role
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userRoles.map((role) => (
                        <Card key={role.id}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{role.name}</CardTitle>
                              <div className={`w-3 h-3 rounded-full ${role.color}`} />
                            </div>
                            <CardDescription>{role.users} users assigned</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <Label className="text-sm font-medium">Permissions:</Label>
                                <div className="mt-2 space-y-1">
                                  {role.permissions.map((permission, index) => (
                                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                                      {permission}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Notification Settings</h3>
                      <p className="text-sm text-gray-500">Configure when and how users receive notifications</p>
                    </div>

                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <Card key={notification.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <Switch
                                    checked={notification.enabled}
                                    onCheckedChange={() => handleNotificationToggle(notification.id)}
                                  />
                                  <div>
                                    <Label className="font-medium">{notification.name}</Label>
                                    <p className="text-sm text-gray-500">{notification.description}</p>
                                  </div>
                                </div>
                              </div>
                              {notification.enabled && (
                                <div className="flex items-center gap-2">
                                  <Label className="text-sm">Alert</Label>
                                  <Input
                                    type="number"
                                    value={notification.days}
                                    onChange={(e) =>
                                      handleNotificationDaysChange(notification.id, Number.parseInt(e.target.value))
                                    }
                                    className="w-20"
                                    min="1"
                                    max="365"
                                  />
                                  <Label className="text-sm">days before</Label>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-4">Email Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="smtpServer">SMTP Server</Label>
                          <Input
                            id="smtpServer"
                            value={emailSettings.smtpServer}
                            onChange={(e) => handleEmailSettingChange("smtpServer", e.target.value)}
                            placeholder="smtp.company.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input
                            id="smtpPort"
                            value={emailSettings.smtpPort}
                            onChange={(e) => handleEmailSettingChange("smtpPort", e.target.value)}
                            placeholder="587"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpUsername">Username</Label>
                          <Input
                            id="smtpUsername"
                            value={emailSettings.smtpUsername}
                            onChange={(e) => handleEmailSettingChange("smtpUsername", e.target.value)}
                            placeholder="notifications@company.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPassword">Password</Label>
                          <Input
                            id="smtpPassword"
                            type="password"
                            value={emailSettings.smtpPassword}
                            onChange={(e) => handleEmailSettingChange("smtpPassword", e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="database" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Database Management</h3>
                      <p className="text-sm text-gray-500">Manage database connections and maintenance</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Database Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Connection Status</span>
                            <Badge variant="default">Connected</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Database Size</span>
                            <span className="font-medium">2.4 GB</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Last Backup</span>
                            <span className="font-medium">2024-01-20 03:00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Records Count</span>
                            <span className="font-medium">1,247,892</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Maintenance Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Database className="h-4 w-4 mr-2" />
                            Create Backup
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Database className="h-4 w-4 mr-2" />
                            Optimize Database
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Database className="h-4 w-4 mr-2" />
                            Check Integrity
                          </Button>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Database className="h-4 w-4 mr-2" />
                            View Logs
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Backup Schedule</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Automatic Daily Backup</Label>
                              <p className="text-sm text-gray-500">Backup database every day at 3:00 AM</p>
                            </div>
                            <Switch
                              checked={backupSettings.autoBackup}
                              onCheckedChange={(checked) => handleBackupSettingChange("autoBackup", checked)}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Backup Time</Label>
                              <Input
                                type="time"
                                value={backupSettings.backupTime}
                                onChange={(e) => handleBackupSettingChange("backupTime", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Retention Period (days)</Label>
                              <Select
                                value={backupSettings.retentionPeriod}
                                onValueChange={(value) => handleBackupSettingChange("retentionPeriod", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="7">7 days</SelectItem>
                                  <SelectItem value="30">30 days</SelectItem>
                                  <SelectItem value="90">90 days</SelectItem>
                                  <SelectItem value="365">1 year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Security Settings</h3>
                      <p className="text-sm text-gray-500">Configure security policies and authentication</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Password Policy</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Minimum Password Length</Label>
                            <Select
                              value={securitySettings.minPasswordLength}
                              onValueChange={(value) => handleSecuritySettingChange("minPasswordLength", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6">6 characters</SelectItem>
                                <SelectItem value="8">8 characters</SelectItem>
                                <SelectItem value="12">12 characters</SelectItem>
                                <SelectItem value="16">16 characters</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Require Special Characters</Label>
                            <Switch
                              checked={securitySettings.requireSpecialChars}
                              onCheckedChange={(checked) => handleSecuritySettingChange("requireSpecialChars", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Require Numbers</Label>
                            <Switch
                              checked={securitySettings.requireNumbers}
                              onCheckedChange={(checked) => handleSecuritySettingChange("requireNumbers", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Require Uppercase Letters</Label>
                            <Switch
                              checked={securitySettings.requireUppercase}
                              onCheckedChange={(checked) => handleSecuritySettingChange("requireUppercase", checked)}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Session Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Session Timeout (minutes)</Label>
                            <Select
                              value={securitySettings.sessionTimeout}
                              onValueChange={(value) => handleSecuritySettingChange("sessionTimeout", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                                <SelectItem value="240">4 hours</SelectItem>
                                <SelectItem value="480">8 hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Force Logout on Browser Close</Label>
                            <Switch
                              checked={securitySettings.forceLogoutOnClose}
                              onCheckedChange={(checked) => handleSecuritySettingChange("forceLogoutOnClose", checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Remember Login</Label>
                            <Switch
                              checked={securitySettings.rememberLogin}
                              onCheckedChange={(checked) => handleSecuritySettingChange("rememberLogin", checked)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Require 2FA for Administrators</Label>
                            <p className="text-sm text-gray-500">Force two-factor authentication for admin users</p>
                          </div>
                          <Switch
                            checked={securitySettings.require2FAForAdmins}
                            onCheckedChange={(checked) => handleSecuritySettingChange("require2FAForAdmins", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Allow 2FA for All Users</Label>
                            <p className="text-sm text-gray-500">Allow all users to enable two-factor authentication</p>
                          </div>
                          <Switch
                            checked={securitySettings.allow2FAForAll}
                            onCheckedChange={(checked) => handleSecuritySettingChange("allow2FAForAll", checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">API Security</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>API Rate Limit (requests per minute)</Label>
                          <Select
                            value={securitySettings.apiRateLimit}
                            onValueChange={(value) => handleSecuritySettingChange("apiRateLimit", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50">50</SelectItem>
                              <SelectItem value="100">100</SelectItem>
                              <SelectItem value="200">200</SelectItem>
                              <SelectItem value="500">500</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Require API Key Authentication</Label>
                          <Switch
                            checked={securitySettings.requireApiKey}
                            onCheckedChange={(checked) => handleSecuritySettingChange("requireApiKey", checked)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Current API Key</Label>
                          <div className="flex gap-2">
                            <Input value={securitySettings.currentApiKey} readOnly className="font-mono" />
                            <Button variant="outline" onClick={regenerateApiKey}>
                              Regenerate
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
