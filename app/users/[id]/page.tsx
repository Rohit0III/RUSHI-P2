"use client"

import { useState } from "react"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Laptop,
  Monitor,
  Smartphone,
  Key,
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertTriangle,
  Settings,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Mock data for user details
const userDetails = {
  id: 1,
  name: "John Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  role: "System Administrator",
  location: "New York Office",
  status: "Active",
  joinDate: "2022-03-15",
  lastLogin: "2024-01-20 14:30",
  avatar: "/placeholder.svg?height=80&width=80&text=JD",
  manager: "Jane Smith",
  employeeId: "EMP-001",
  apiKey: "ak_live_1234567890abcdef1234567890abcdef",
  apiKeyGenerated: "2024-01-15 10:30:00",
  apiKeyLastUsed: "2024-01-20 09:15:00",
  licenseKey: "LK-ENG-2024-A1B2C3D4E5F6",
  licenseKeyGenerated: "2024-01-01 00:00:00",
  licenseKeyExpiry: "2024-12-31 23:59:59",
}

// Mock data for allocated assets
const allocatedAssets = [
  {
    id: "AST-001",
    name: 'MacBook Pro 16"',
    category: "Laptop",
    model: "MacBook Pro 16-inch (2023)",
    serialNumber: "C02XK1XJMD6T",
    manufacturer: "Apple Inc.",
    assignedDate: "2023-06-15",
    status: "Active",
    location: "New York Office",
    icon: Laptop,
    specifications: {
      processor: "Apple M2 Pro 12-core CPU",
      memory: "32GB Unified Memory",
      storage: "1TB SSD",
      os: "macOS Sonoma 14.2.1",
    },
    systemInfo: {
      hostname: "Johns-MacBook-Pro.local",
      ipAddress: "192.168.1.105",
      macAddress: "A4:83:E7:2B:1F:3C",
      os: "macOS Sonoma 14.2.1 (23C71)",
      bios: "Apple System Firmware 10151.101.3",
      cpu: "Apple M2 Pro (12-core CPU, 19-core GPU)",
      ram: "32 GB LPDDR5-6400",
      disk: "1TB Apple SSD AP1024Z - 945.2 GB Available",
      gpu: "Apple M2 Pro (19-core GPU)",
      lastUpdated: "2024-01-20 14:30:00",
    },
  },
  {
    id: "AST-002",
    name: "iPhone 14 Pro",
    category: "Mobile",
    model: "iPhone 14 Pro 256GB",
    serialNumber: "F2LN8K9JQ1MN",
    manufacturer: "Apple Inc.",
    assignedDate: "2023-09-22",
    status: "Active",
    location: "Mobile",
    icon: Smartphone,
    specifications: {
      processor: "A16 Bionic chip",
      memory: "6GB RAM",
      storage: "256GB",
      os: "iOS 17.2.1",
    },
    systemInfo: {
      hostname: "Johns-iPhone",
      ipAddress: "192.168.1.142",
      macAddress: "B8:27:EB:4F:2A:1D",
      os: "iOS 17.2.1 (21C62)",
      bios: "iBoot-8020.101.4",
      cpu: "Apple A16 Bionic (6-core)",
      ram: "6 GB LPDDR5",
      disk: "256 GB - 189.3 GB Available",
      gpu: "Apple A16 Bionic GPU (5-core)",
      lastUpdated: "2024-01-20 12:15:00",
    },
  },
  {
    id: "AST-003",
    name: "Dell UltraSharp Monitor",
    category: "Monitor",
    model: "Dell U2723QE 27-inch",
    serialNumber: "CN-0H7K2M-74180",
    manufacturer: "Dell Technologies",
    assignedDate: "2023-06-15",
    status: "Active",
    location: "New York Office",
    icon: Monitor,
    specifications: {
      resolution: "4K UHD (3840 x 2160)",
      size: "27 inches",
      connectivity: "USB-C, HDMI, DisplayPort",
      features: "Height adjustable, Pivot",
    },
    systemInfo: {
      hostname: "DELL-U2723QE-Monitor",
      ipAddress: "192.168.1.201",
      macAddress: "2C:F0:5D:8A:3B:7E",
      os: "Dell Monitor Firmware v1.2.3",
      bios: "Dell Monitor BIOS v2.1.0",
      cpu: "ARM Cortex-M4 (Monitor Controller)",
      ram: "512 MB DDR3",
      disk: "64 MB Flash Storage",
      gpu: "Integrated Display Controller",
      lastUpdated: "2024-01-19 08:00:00",
    },
  },
]

// Update the installedSoftware mock data to include more detailed information and license keys

const installedSoftware = [
  {
    id: "SW-001",
    name: "Microsoft Office 365",
    publisher: "Microsoft Corporation",
    version: "16.80.23121017",
    installedDate: "2023-06-16",
    lastUsed: "2024-01-20",
    licenseType: "Enterprise",
    licenseKey: "NKJV6-CVHVF-HV8XK-2XDKD-F3J4K",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 156,
    category: "Productivity",
    size: "3.2 GB",
    installPath: "/Applications/Microsoft Office 365.app",
    autoStart: true,
    lastUpdate: "2024-01-15",
  },
  {
    id: "SW-002",
    name: "Adobe Creative Suite",
    publisher: "Adobe Inc.",
    version: "2024.1.0",
    installedDate: "2023-07-01",
    lastUsed: "2024-01-19",
    licenseType: "Team License",
    licenseKey: "1330-1002-8392-4847-3698-8131",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 89,
    category: "Design",
    size: "8.7 GB",
    installPath: "/Applications/Adobe Creative Suite",
    autoStart: false,
    lastUpdate: "2024-01-10",
  },
  {
    id: "SW-003",
    name: "Slack",
    publisher: "Slack Technologies",
    version: "4.36.140",
    installedDate: "2023-06-16",
    lastUsed: "2024-01-20",
    licenseType: "Enterprise",
    licenseKey: "SLACK-ENT-2024-A1B2C3D4E5",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 234,
    category: "Communication",
    size: "145 MB",
    installPath: "/Applications/Slack.app",
    autoStart: true,
    lastUpdate: "2024-01-18",
  },
  {
    id: "SW-004",
    name: "Xcode",
    publisher: "Apple Inc.",
    version: "15.1",
    installedDate: "2023-06-20",
    lastUsed: "2024-01-18",
    licenseType: "Free",
    licenseKey: "N/A - Free Software",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 178,
    category: "Development",
    size: "12.4 GB",
    installPath: "/Applications/Xcode.app",
    autoStart: false,
    lastUpdate: "2024-01-12",
  },
  {
    id: "SW-005",
    name: "WhatsApp Business",
    publisher: "Meta Platforms",
    version: "23.24.79",
    installedDate: "2023-09-25",
    lastUsed: "2024-01-20",
    licenseType: "Free",
    licenseKey: "N/A - Free Software",
    status: "Active",
    assetId: "AST-002",
    assetName: "iPhone 14 Pro",
    usageHours: 45,
    category: "Communication",
    size: "89 MB",
    installPath: "/var/containers/Bundle/Application/WhatsApp",
    autoStart: true,
    lastUpdate: "2024-01-16",
  },
  {
    id: "SW-006",
    name: "Visual Studio Code",
    publisher: "Microsoft Corporation",
    version: "1.85.2",
    installedDate: "2023-06-18",
    lastUsed: "2024-01-19",
    licenseType: "Free",
    licenseKey: "N/A - Open Source",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 198,
    category: "Development",
    size: "312 MB",
    installPath: "/Applications/Visual Studio Code.app",
    autoStart: false,
    lastUpdate: "2024-01-14",
  },
  {
    id: "SW-007",
    name: "Figma",
    publisher: "Figma Inc.",
    version: "116.16.4",
    installedDate: "2023-07-15",
    lastUsed: "2024-01-17",
    licenseType: "Professional",
    licenseKey: "FIG-PRO-2024-X7Y8Z9A0B1",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 67,
    category: "Design",
    size: "198 MB",
    installPath: "/Applications/Figma.app",
    autoStart: false,
    lastUpdate: "2024-01-11",
  },
  {
    id: "SW-008",
    name: "Zoom",
    publisher: "Zoom Video Communications",
    version: "5.17.0",
    installedDate: "2023-06-17",
    lastUsed: "2024-01-20",
    licenseType: "Business",
    licenseKey: "ZOOM-BIZ-2024-M3N4O5P6Q7",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 89,
    category: "Communication",
    size: "67 MB",
    installPath: "/Applications/zoom.us.app",
    autoStart: true,
    lastUpdate: "2024-01-13",
  },
  {
    id: "SW-009",
    name: "Docker Desktop",
    publisher: "Docker Inc.",
    version: "4.26.1",
    installedDate: "2023-08-10",
    lastUsed: "2024-01-19",
    licenseType: "Business",
    licenseKey: "DOCK-BUS-2024-R8S9T0U1V2",
    status: "Active",
    assetId: "AST-001",
    assetName: 'MacBook Pro 16"',
    usageHours: 134,
    category: "Development",
    size: "1.2 GB",
    installPath: "/Applications/Docker.app",
    autoStart: true,
    lastUpdate: "2024-01-08",
  },
  {
    id: "SW-010",
    name: "Spotify",
    publisher: "Spotify AB",
    version: "1.2.26",
    installedDate: "2023-09-28",
    lastUsed: "2024-01-20",
    licenseType: "Premium",
    licenseKey: "SPOT-PREM-2024-W3X4Y5Z6A7",
    status: "Active",
    assetId: "AST-002",
    assetName: "iPhone 14 Pro",
    usageHours: 156,
    category: "Entertainment",
    size: "134 MB",
    installPath: "/var/containers/Bundle/Application/Spotify",
    autoStart: false,
    lastUpdate: "2024-01-17",
  },
]

// Mock data for software usage analytics
const softwareUsage = [
  { software: "Slack", hours: 234, percentage: 35 },
  { software: "Xcode", hours: 178, percentage: 27 },
  { software: "Microsoft Office", hours: 156, percentage: 23 },
  { software: "Adobe Creative Suite", hours: 89, percentage: 13 },
  { software: "WhatsApp Business", hours: 45, percentage: 7 },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    action: "Software Installed",
    details: "Installed Adobe Creative Suite 2024.1.0",
    timestamp: "2024-01-20 14:30",
    asset: 'MacBook Pro 16"',
    type: "software",
  },
  {
    id: 2,
    action: "Asset Login",
    details: "Logged into MacBook Pro",
    timestamp: "2024-01-20 09:15",
    asset: 'MacBook Pro 16"',
    type: "access",
  },
  {
    id: 3,
    action: "Software Updated",
    details: "Updated Slack to version 4.36.140",
    timestamp: "2024-01-19 16:45",
    asset: 'MacBook Pro 16"',
    type: "software",
  },
  {
    id: 4,
    action: "Asset Accessed",
    details: "Accessed iPhone 14 Pro",
    timestamp: "2024-01-19 08:30",
    asset: "iPhone 14 Pro",
    type: "access",
  },
]

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("assets")
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeyCopied, setApiKeyCopied] = useState(false)
  const [isAdmin] = useState(true) // Mock admin status - in real app, this would come from auth context

  const copyApiKey = () => {
    navigator.clipboard.writeText(userDetails.apiKey)
    setApiKeyCopied(true)
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  const generateNewApiKey = () => {
    // Mock API key generation
    console.log("Generating new API key for user:", userDetails.id)
    // In real app, this would make an API call
  }

  const revokeApiKey = () => {
    // Mock API key revocation
    console.log("Revoking API key for user:", userDetails.id)
    // In real app, this would make an API call
  }

  const uninstallSoftware = (softwareId: string, assetId: string) => {
    // Mock remote software uninstallation using license key
    console.log(
      `Remotely uninstalling software ${softwareId} from asset ${assetId} using license key: ${userDetails.licenseKey}`,
    )
    console.log("System information will be retrieved and updated after uninstallation")
    // In real app, this would use the license key to make a secure remote call
    // The license key would authenticate the request and provide system access
  }

  const totalUsageHours = softwareUsage.reduce((sum, item) => sum + item.hours, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/users">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userDetails.avatar || "/placeholder.svg"} alt={userDetails.name} />
                <AvatarFallback>
                  {userDetails.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userDetails.name}</h1>
                <p className="text-gray-600">
                  {userDetails.role} • {userDetails.department}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={userDetails.status === "Active" ? "default" : "secondary"}>{userDetails.status}</Badge>
            <Button variant="outline">Edit User</Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* User Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Allocated Assets</CardTitle>
              <Laptop className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allocatedAssets.length}</div>
              <p className="text-xs text-muted-foreground">Active assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Installed Software</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{installedSoftware.length}</div>
              <p className="text-xs text-muted-foreground">Applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsageHours}h</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">2 hours ago</div>
              <p className="text-xs text-muted-foreground">MacBook Pro login</p>
            </CardContent>
          </Card>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-600">{userDetails.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-600">{userDetails.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-600">{userDetails.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Manager</p>
                  <p className="text-sm text-gray-600">{userDetails.manager}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Join Date</p>
                  <p className="text-sm text-gray-600">{userDetails.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Key Management - Admin Only */}
          {isAdmin && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Key Management
                  <Badge variant="destructive" className="ml-2">
                    Admin Only
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Manage API key for remote device management and software uninstallation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Security Notice</AlertTitle>
                  <AlertDescription>
                    This API key allows remote access to user devices for software management. Handle with extreme care.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={userDetails.apiKey}
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={copyApiKey}>
                        {apiKeyCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Generated</p>
                      <p className="text-gray-600">{userDetails.apiKeyGenerated}</p>
                    </div>
                    <div>
                      <p className="font-medium">Last Used</p>
                      <p className="text-gray-600">{userDetails.apiKeyLastUsed}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={generateNewApiKey}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate Key
                    </Button>
                    <Button variant="destructive" onClick={revokeApiKey}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Revoke Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {isAdmin && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  License Key Management
                  <Badge variant="secondary" className="ml-2">
                    Software Control
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Unique license key for remote software uninstallation and system monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>License Key Active</AlertTitle>
                  <AlertDescription>
                    This license key enables remote software management and system information retrieval from user
                    devices.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="licenseKey">License Key</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="licenseKey"
                        value={userDetails.licenseKey}
                        readOnly
                        className="font-mono bg-green-50"
                      />
                      <Button variant="outline" size="sm" onClick={copyApiKey}>
                        {apiKeyCopied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Generated</p>
                      <p className="text-gray-600">{userDetails.licenseKeyGenerated}</p>
                    </div>
                    <div>
                      <p className="font-medium">Expires</p>
                      <p className="text-gray-600">{userDetails.licenseKeyExpiry}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={generateNewApiKey}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate License
                    </Button>
                    <Button variant="destructive" onClick={revokeApiKey}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Revoke License
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Detailed Information Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>User Assets & Software</CardTitle>
            <CardDescription>Detailed information about allocated assets and installed software</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="assets">Allocated Assets</TabsTrigger>
                <TabsTrigger value="software">Installed Software</TabsTrigger>
                <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="system">System Information</TabsTrigger>
              </TabsList>
              <TabsContent value="assets" className="mt-6">
                <div className="space-y-6">
                  {allocatedAssets.map((asset) => {
                    const Icon = asset.icon
                    return (
                      <Card key={asset.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Icon className="h-8 w-8 text-blue-500 mt-1" />
                              <div className="space-y-3">
                                <div>
                                  <h3 className="font-semibold text-lg">{asset.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {asset.model} • {asset.serialNumber}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <Badge variant="outline">{asset.category}</Badge>
                                    <Badge variant={asset.status === "Active" ? "default" : "secondary"}>
                                      {asset.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <p className="font-medium">Manufacturer</p>
                                    <p className="text-gray-600">{asset.manufacturer}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Assigned Date</p>
                                    <p className="text-gray-600">{asset.assignedDate}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-gray-600">{asset.location}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Asset ID</p>
                                    <p className="text-gray-600">{asset.id}</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium mb-2">Specifications</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    {Object.entries(asset.specifications).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="capitalize text-gray-600">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Button variant="outline" size="sm">
                                View System Info
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
              // Replace the software TabsContent with enhanced detailed view
              <TabsContent value="software" className="mt-6">
                <div className="space-y-6">
                  {/* Software Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{installedSoftware.length}</div>
                        <p className="text-sm text-gray-600">Total Applications</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {installedSoftware.filter((s) => s.licenseType !== "Free").length}
                        </div>
                        <p className="text-sm text-gray-600">Licensed Software</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">
                          {(
                            installedSoftware.reduce(
                              (sum, s) => sum + Number.parseFloat(s.size.replace(/[^\d.]/g, "")),
                              0,
                            ) / 1000
                          ).toFixed(1)}{" "}
                          GB
                        </div>
                        <p className="text-sm text-gray-600">Total Size</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold">{installedSoftware.filter((s) => s.autoStart).length}</div>
                        <p className="text-sm text-gray-600">Auto-Start Apps</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Software List */}
                  <div className="space-y-4">
                    {installedSoftware.map((software) => (
                      <Card key={software.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                  {software.name.charAt(0)}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{software.name}</h3>
                                  <p className="text-sm text-gray-600">by {software.publisher}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">{software.category}</Badge>
                                    <Badge variant={software.status === "Active" ? "default" : "secondary"}>
                                      {software.status}
                                    </Badge>
                                    {software.autoStart && (
                                      <Badge variant="secondary" className="text-xs">
                                        Auto-Start
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">Installed on</p>
                                <p className="text-sm text-gray-600">{software.assetName}</p>
                                <p className="text-xs text-gray-500">{software.assetId}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                              <div>
                                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Version & Dates
                                </Label>
                                <div className="mt-2 space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Version</p>
                                    <p className="font-mono text-sm">{software.version}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Install Date</p>
                                    <p className="text-sm">{software.installedDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Last Update</p>
                                    <p className="text-sm">{software.lastUpdate}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  License Information
                                </Label>
                                <div className="mt-2 space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">License Type</p>
                                    <Badge
                                      variant={software.licenseType === "Free" ? "secondary" : "default"}
                                      className="text-xs"
                                    >
                                      {software.licenseType}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">License Key</p>
                                    <div className="flex items-center gap-2">
                                      <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded max-w-[200px] truncate">
                                        {software.licenseKey}
                                      </p>
                                      {software.licenseKey !== "N/A - Free Software" &&
                                        software.licenseKey !== "N/A - Open Source" && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => navigator.clipboard.writeText(software.licenseKey)}
                                          >
                                            <Copy className="h-3 w-3" />
                                          </Button>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  Usage & Performance
                                </Label>
                                <div className="mt-2 space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Usage Hours</p>
                                    <p className="text-sm font-medium">{software.usageHours}h this month</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Last Used</p>
                                    <p className="text-sm">{software.lastUsed}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Size</p>
                                    <p className="text-sm">{software.size}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  System Details
                                </Label>
                                <div className="mt-2 space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Install Path</p>
                                    <p
                                      className="font-mono text-xs bg-gray-50 p-1 rounded truncate"
                                      title={software.installPath}
                                    >
                                      {software.installPath}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-2 h-2 rounded-full ${software.status === "Active" ? "bg-green-500" : "bg-gray-400"}`}
                                    ></div>
                                    <p className="text-xs text-gray-600">
                                      {software.status === "Active" ? "Running" : "Stopped"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Software ID: {software.id}</span>
                                <span>•</span>
                                <span>Category: {software.category}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Activity className="h-4 w-4 mr-2" />
                                  View Logs
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Settings className="h-4 w-4 mr-2" />
                                  Configure
                                </Button>
                                {isAdmin && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => uninstallSoftware(software.id, software.assetId)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Uninstall
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Software Categories Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Software by Category</CardTitle>
                      <CardDescription>Distribution of installed software across different categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from(new Set(installedSoftware.map((s) => s.category))).map((category) => {
                          const categoryApps = installedSoftware.filter((s) => s.category === category)
                          const totalSize = categoryApps.reduce(
                            (sum, app) => sum + Number.parseFloat(app.size.replace(/[^\d.]/g, "")),
                            0,
                          )
                          return (
                            <div key={category} className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold">{categoryApps.length}</div>
                              <div className="text-sm font-medium">{category}</div>
                              <div className="text-xs text-gray-500">
                                {totalSize > 1000
                                  ? `${(totalSize / 1000).toFixed(1)} GB`
                                  : `${totalSize.toFixed(0)} MB`}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="usage" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Software</TableHead>
                      <TableHead>Usage (Hours)</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {softwareUsage.map((item) => (
                      <TableRow key={item.software}>
                        <TableCell className="font-medium">{item.software}</TableCell>
                        <TableCell>{item.hours}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="activity" className="mt-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <Card key={activity.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{activity.action}</h3>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                            <p className="text-xs text-gray-500">
                              {activity.timestamp} • Asset: {activity.asset}
                            </p>
                          </div>
                          <Badge variant="outline">{activity.type}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="system" className="mt-6">
                <div className="space-y-6">
                  {allocatedAssets.map((asset) => {
                    const Icon = asset.icon
                    return (
                      <Card key={asset.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Icon className="h-8 w-8 text-blue-500 mt-1" />
                              <div className="space-y-3">
                                <div>
                                  <h3 className="font-semibold text-lg">{asset.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {asset.model} • {asset.serialNumber}
                                  </p>
                                  <div className="flex items-center gap-4 mt-2">
                                    <Badge variant="outline">{asset.category}</Badge>
                                    <Badge variant={asset.status === "Active" ? "default" : "secondary"}>
                                      {asset.status}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <p className="font-medium">Manufacturer</p>
                                    <p className="text-gray-600">{asset.manufacturer}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Assigned Date</p>
                                    <p className="text-gray-600">{asset.assignedDate}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-gray-600">{asset.location}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Asset ID</p>
                                    <p className="text-gray-600">{asset.id}</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="font-medium mb-2">System Information</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    {Object.entries(asset.systemInfo).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="capitalize text-gray-600">{key}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
