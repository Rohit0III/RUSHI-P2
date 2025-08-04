"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  User,
  HardDrive,
  Cpu,
  MemoryStickIcon as Memory,
  Monitor,
  Wifi,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock data for asset details
const assetDetails = {
  id: "AST-001",
  name: 'MacBook Pro 16"',
  category: "Laptop",
  status: "Active",
  assignedTo: "John Doe",
  location: "New York Office",
  purchaseDate: "2023-06-15",
  warrantyExpiry: "2026-06-15",
  value: "$2,499",
  serialNumber: "C02XK1XJMD6T",
  model: "MacBook Pro 16-inch (2023)",
  manufacturer: "Apple Inc.",
  condition: "Excellent",
}

const hardwareSpecs = [
  { component: "Processor", details: "Apple M2 Pro 12-core CPU", icon: Cpu },
  { component: "Memory", details: "32GB Unified Memory", icon: Memory },
  { component: "Storage", details: "1TB SSD", icon: HardDrive },
  { component: "Display", details: "16.2-inch Liquid Retina XDR", icon: Monitor },
  { component: "Graphics", details: "19-core GPU", icon: Monitor },
  { component: "Connectivity", details: "Wi-Fi 6E, Bluetooth 5.3", icon: Wifi },
]

const installedSoftware = [
  { name: "macOS Sonoma", version: "14.2.1", license: "OEM", status: "Active" },
  { name: "Microsoft Office 365", version: "16.80", license: "Enterprise", status: "Active" },
  { name: "Adobe Creative Suite", version: "2024", license: "Team", status: "Active" },
  { name: "Slack", version: "4.36.140", license: "Free", status: "Active" },
  { name: "Google Chrome", version: "120.0.6099", license: "Free", status: "Active" },
]

const licenses = [
  { software: "Microsoft Office 365", type: "Enterprise", expires: "2024-12-31", cost: "$12/month", status: "Active" },
  {
    software: "Adobe Creative Suite",
    type: "Team License",
    expires: "2024-08-15",
    cost: "$52.99/month",
    status: "Expiring Soon",
  },
  { software: "Antivirus Pro", type: "Corporate", expires: "2025-03-20", cost: "$45/year", status: "Active" },
]

const historyLogs = [
  { date: "2024-01-15", action: "Software Update", details: "Updated macOS to 14.2.1", user: "System Admin" },
  {
    date: "2024-01-10",
    action: "License Renewal",
    details: "Renewed Adobe Creative Suite license",
    user: "IT Manager",
  },
  { date: "2023-12-20", action: "Hardware Check", details: "Routine maintenance completed", user: "Tech Support" },
  {
    date: "2023-11-15",
    action: "Assignment Change",
    details: "Reassigned from Jane Smith to John Doe",
    user: "HR Manager",
  },
  { date: "2023-06-15", action: "Asset Created", details: "Initial asset registration", user: "Procurement" },
]

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("hardware")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/assets">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assets
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{assetDetails.name}</h1>
              <p className="text-gray-600">
                {assetDetails.id} • {assetDetails.category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={assetDetails.status === "Active" ? "default" : "secondary"}>{assetDetails.status}</Badge>
            <Button variant="outline">Edit Asset</Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Asset Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned To</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{assetDetails.assignedTo}</div>
              <p className="text-xs text-muted-foreground">{assetDetails.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{assetDetails.purchaseDate}</div>
              <p className="text-xs text-muted-foreground">6 months ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{assetDetails.value}</div>
              <p className="text-xs text-muted-foreground">Current market value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warranty</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{assetDetails.warrantyExpiry}</div>
              <p className="text-xs text-green-600">2.4 years remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Details</CardTitle>
            <CardDescription>Comprehensive information about this asset</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hardware">Hardware</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="hardware" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Serial Number:</span>
                          <span className="text-sm">{assetDetails.serialNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Model:</span>
                          <span className="text-sm">{assetDetails.model}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Manufacturer:</span>
                          <span className="text-sm">{assetDetails.manufacturer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Condition:</span>
                          <Badge variant="outline">{assetDetails.condition}</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Health Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>CPU Usage</span>
                            <span>23%</span>
                          </div>
                          <Progress value={23} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Memory Usage</span>
                            <span>67%</span>
                          </div>
                          <Progress value={67} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Storage Usage</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Hardware Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hardwareSpecs.map((spec) => {
                          const Icon = spec.icon
                          return (
                            <div key={spec.component} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Icon className="h-5 w-5 text-blue-500" />
                              <div>
                                <p className="font-medium">{spec.component}</p>
                                <p className="text-sm text-gray-600">{spec.details}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="software" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Installed Software</CardTitle>
                    <CardDescription>Software applications currently installed on this asset</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Software Name</TableHead>
                          <TableHead>Version</TableHead>
                          <TableHead>License Type</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {installedSoftware.map((software, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{software.name}</TableCell>
                            <TableCell>{software.version}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{software.license}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={software.status === "Active" ? "default" : "secondary"}>
                                {software.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="licenses" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Software Licenses</CardTitle>
                    <CardDescription>License information for software on this asset</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Software</TableHead>
                          <TableHead>License Type</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {licenses.map((license, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{license.software}</TableCell>
                            <TableCell>{license.type}</TableCell>
                            <TableCell>{license.expires}</TableCell>
                            <TableCell>{license.cost}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  license.status === "Active"
                                    ? "default"
                                    : license.status === "Expiring Soon"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {license.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Asset History</CardTitle>
                    <CardDescription>Complete audit trail of changes and activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {historyLogs.map((log, index) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{log.action}</p>
                              <span className="text-sm text-gray-500">{log.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                            <p className="text-xs text-gray-500">by {log.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
