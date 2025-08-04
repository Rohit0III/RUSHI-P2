"use client"

import { useState } from "react"
import { Search, Download, Plus, AlertTriangle, CheckCircle, Users, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const softwareInventory = [
  {
    id: "SW-001",
    name: "Microsoft Office 365",
    vendor: "Microsoft",
    category: "Productivity",
    totalLicenses: 500,
    usedLicenses: 456,
    availableLicenses: 44,
    cost: "$6,000/month",
    renewalDate: "2024-12-31",
    complianceStatus: "Compliant",
    riskLevel: "Low",
  },
  {
    id: "SW-002",
    name: "Adobe Creative Suite",
    vendor: "Adobe",
    category: "Design",
    totalLicenses: 50,
    usedLicenses: 48,
    availableLicenses: 2,
    cost: "$2,649.50/month",
    renewalDate: "2024-08-15",
    complianceStatus: "At Risk",
    riskLevel: "High",
  },
  {
    id: "SW-003",
    name: "Slack Enterprise",
    vendor: "Slack Technologies",
    category: "Communication",
    totalLicenses: 1000,
    usedLicenses: 789,
    availableLicenses: 211,
    cost: "$8,000/month",
    renewalDate: "2025-03-20",
    complianceStatus: "Compliant",
    riskLevel: "Low",
  },
  {
    id: "SW-004",
    name: "Antivirus Pro",
    vendor: "Security Corp",
    category: "Security",
    totalLicenses: 1200,
    usedLicenses: 1156,
    availableLicenses: 44,
    cost: "$4,800/year",
    renewalDate: "2024-06-30",
    complianceStatus: "Expiring Soon",
    riskLevel: "Medium",
  },
]

const userAssignments = [
  {
    user: "John Doe",
    department: "Engineering",
    software: "Microsoft Office 365",
    assignedDate: "2023-01-15",
    lastUsed: "2024-01-20",
  },
  {
    user: "Jane Smith",
    department: "Design",
    software: "Adobe Creative Suite",
    assignedDate: "2023-03-20",
    lastUsed: "2024-01-19",
  },
  {
    user: "Mike Johnson",
    department: "Marketing",
    software: "Slack Enterprise",
    assignedDate: "2023-06-10",
    lastUsed: "2024-01-20",
  },
  {
    user: "Sarah Wilson",
    department: "HR",
    software: "Microsoft Office 365",
    assignedDate: "2023-02-28",
    lastUsed: "2024-01-18",
  },
]

const auditLogs = [
  {
    date: "2024-01-20",
    action: "License Assignment",
    details: "Assigned Adobe Creative Suite to John Doe",
    user: "IT Admin",
    risk: "Low",
  },
  {
    date: "2024-01-19",
    action: "Compliance Check",
    details: "Detected over-allocation in Adobe Creative Suite",
    user: "System",
    risk: "High",
  },
  {
    date: "2024-01-18",
    action: "License Renewal",
    details: "Renewed Microsoft Office 365 licenses",
    user: "Procurement",
    risk: "Low",
  },
  {
    date: "2024-01-17",
    action: "Usage Monitoring",
    details: "Detected inactive license for Slack Enterprise",
    user: "System",
    risk: "Medium",
  },
]

export default function SoftwarePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [complianceFilter, setComplianceFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("inventory")

  const filteredSoftware = softwareInventory.filter((software) => {
    const matchesSearch =
      software.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      software.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompliance =
      complianceFilter === "all" || software.complianceStatus.toLowerCase().includes(complianceFilter.toLowerCase())

    return matchesSearch && matchesCompliance
  })

  const totalLicenses = softwareInventory.reduce((sum, sw) => sum + sw.totalLicenses, 0)
  const usedLicenses = softwareInventory.reduce((sum, sw) => sum + sw.usedLicenses, 0)
  const utilizationRate = (usedLicenses / totalLicenses) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Software Inventory</h1>
            <p className="text-gray-600">Manage licenses, compliance, and user assignments</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Software
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLicenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across {softwareInventory.length} applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Utilization</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{utilizationRate.toFixed(1)}%</div>
              <Progress value={utilizationRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-red-600">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-yellow-600">Within 90 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Software Management</CardTitle>
            <CardDescription>Comprehensive software license and compliance management</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inventory">License Inventory</TabsTrigger>
                <TabsTrigger value="assignments">User Assignments</TabsTrigger>
                <TabsTrigger value="audit">Audit Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="inventory" className="mt-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search software by name or vendor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={complianceFilter} onValueChange={setComplianceFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by compliance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="compliant">Compliant</SelectItem>
                      <SelectItem value="risk">At Risk</SelectItem>
                      <SelectItem value="expiring">Expiring Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Software Inventory Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Software</TableHead>
                      <TableHead>License Usage</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Renewal Date</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Risk Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSoftware.map((software) => {
                      const utilizationPercent = (software.usedLicenses / software.totalLicenses) * 100

                      return (
                        <TableRow key={software.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{software.name}</p>
                              <p className="text-sm text-gray-500">
                                {software.vendor} • {software.category}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>
                                  {software.usedLicenses} / {software.totalLicenses}
                                </span>
                                <span>{utilizationPercent.toFixed(0)}%</span>
                              </div>
                              <Progress value={utilizationPercent} />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{software.cost}</TableCell>
                          <TableCell>{software.renewalDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                software.complianceStatus === "Compliant"
                                  ? "default"
                                  : software.complianceStatus === "At Risk"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {software.complianceStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                software.riskLevel === "Low"
                                  ? "default"
                                  : software.riskLevel === "Medium"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {software.riskLevel}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="assignments" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Software</TableHead>
                      <TableHead>Assigned Date</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAssignments.map((assignment, index) => {
                      const daysSinceLastUsed = Math.floor(
                        (new Date().getTime() - new Date(assignment.lastUsed).getTime()) / (1000 * 3600 * 24),
                      )
                      const isInactive = daysSinceLastUsed > 30

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{assignment.user}</TableCell>
                          <TableCell>{assignment.department}</TableCell>
                          <TableCell>{assignment.software}</TableCell>
                          <TableCell>{assignment.assignedDate}</TableCell>
                          <TableCell>{assignment.lastUsed}</TableCell>
                          <TableCell>
                            <Badge variant={isInactive ? "destructive" : "default"}>
                              {isInactive ? "Inactive" : "Active"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="audit" className="mt-6">
                <div className="space-y-4">
                  {auditLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          log.risk === "High" ? "bg-red-500" : log.risk === "Medium" ? "bg-yellow-500" : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{log.action}</p>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                log.risk === "High" ? "destructive" : log.risk === "Medium" ? "secondary" : "default"
                              }
                            >
                              {log.risk} Risk
                            </Badge>
                            <span className="text-sm text-gray-500">{log.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{log.details}</p>
                        <p className="text-xs text-gray-500">by {log.user}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
