"use client"

import { useState } from "react"
import { Download, FileText, BarChart3, PieChart, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { addDays } from "date-fns"

// Mock data for reports
const assetReports = {
  summary: {
    totalAssets: 1247,
    activeAssets: 1156,
    inactiveAssets: 91,
    totalValue: 2847650,
    averageAge: 2.3,
    complianceScore: 94,
  },
  byCategory: [
    { category: "Laptops", count: 456, value: 1139400, utilization: 92 },
    { category: "Desktops", count: 234, value: 303660, utilization: 88 },
    { category: "Servers", count: 67, value: 334933, utilization: 96 },
    { category: "Mobile Devices", count: 189, value: 207711, utilization: 85 },
    { category: "Network Equipment", count: 123, value: 369000, utilization: 91 },
    { category: "Storage", count: 178, value: 492946, utilization: 89 },
  ],
  byLocation: [
    { location: "New York Office", assets: 423, value: 1056750 },
    { location: "London Office", assets: 298, value: 743500 },
    { location: "Tokyo Office", assets: 234, value: 585000 },
    { location: "Remote Workers", assets: 189, value: 472500 },
    { location: "Data Center", assets: 103, value: 989900 },
  ],
  aging: [
    { ageRange: "0-1 years", count: 345, percentage: 27.7 },
    { ageRange: "1-2 years", count: 412, percentage: 33.0 },
    { ageRange: "2-3 years", count: 298, percentage: 23.9 },
    { ageRange: "3-4 years", count: 134, percentage: 10.7 },
    { ageRange: "4+ years", count: 58, percentage: 4.7 },
  ],
}

const softwareReports = {
  licensing: [
    {
      software: "Microsoft Office 365",
      totalLicenses: 500,
      used: 456,
      available: 44,
      cost: 72000,
      compliance: "Compliant",
    },
    { software: "Adobe Creative Suite", totalLicenses: 50, used: 48, available: 2, cost: 31794, compliance: "At Risk" },
    {
      software: "Slack Enterprise",
      totalLicenses: 1000,
      used: 789,
      available: 211,
      cost: 96000,
      compliance: "Compliant",
    },
    {
      software: "Antivirus Pro",
      totalLicenses: 1200,
      used: 1156,
      available: 44,
      cost: 57600,
      compliance: "Expiring Soon",
    },
  ],
  compliance: {
    compliant: 78,
    atRisk: 15,
    nonCompliant: 7,
  },
}

const complianceReports = [
  { asset: 'MacBook Pro 16"', issue: "License Expiring", severity: "High", dueDate: "2024-02-15", owner: "IT Team" },
  {
    asset: "Dell OptiPlex 7090",
    issue: "Warranty Expired",
    severity: "Medium",
    dueDate: "2024-01-15",
    owner: "Procurement",
  },
  {
    asset: "HP ProLiant DL380",
    issue: "Security Update Required",
    severity: "High",
    dueDate: "2024-01-25",
    owner: "Security Team",
  },
  { asset: "iPhone 14 Pro", issue: "Inactive Device", severity: "Low", dueDate: "2024-02-01", owner: "HR Team" },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedReport, setSelectedReport] = useState("overview")
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  const generateReport = (type: string) => {
    // Mock report generation
    const reportData = {
      overview: "Asset Overview Report",
      software: "Software License Report",
      compliance: "Compliance Report",
      financial: "Financial Report",
    }

    console.log(`Generating ${reportData[type as keyof typeof reportData]}...`)
    // In a real application, this would trigger a report generation API call
  }

  const exportReport = (format: string) => {
    console.log(`Exporting report as ${format}...`)
    // Mock export functionality
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate comprehensive reports and insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Report Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Asset Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${assetReports.summary.totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asset Utilization</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((assetReports.summary.activeAssets / assetReports.summary.totalAssets) * 100).toFixed(1)}%
              </div>
              <Progress
                value={(assetReports.summary.activeAssets / assetReports.summary.totalAssets) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetReports.summary.complianceScore}%</div>
              <p className="text-xs text-green-600">Above target (90%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Asset Age</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetReports.summary.averageAge} years</div>
              <p className="text-xs text-muted-foreground">Within optimal range</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Reports</CardTitle>
            <CardDescription>Comprehensive analysis and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedReport} onValueChange={setSelectedReport}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Asset Overview</TabsTrigger>
                <TabsTrigger value="software">Software Licensing</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  {/* Assets by Category */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Assets by Category</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => exportReport("csv")}>
                          <Download className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => exportReport("pdf")}>
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Total Value</TableHead>
                            <TableHead>Utilization</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assetReports.byCategory.map((category) => (
                            <TableRow key={category.category}>
                              <TableCell className="font-medium">{category.category}</TableCell>
                              <TableCell>{category.count}</TableCell>
                              <TableCell>${category.value.toLocaleString()}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={category.utilization} className="w-16" />
                                  <span className="text-sm">{category.utilization}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Assets by Location */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Assets by Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Location</TableHead>
                            <TableHead>Asset Count</TableHead>
                            <TableHead>Total Value</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {assetReports.byLocation.map((location) => (
                            <TableRow key={location.location}>
                              <TableCell className="font-medium">{location.location}</TableCell>
                              <TableCell>{location.assets}</TableCell>
                              <TableCell>${location.value.toLocaleString()}</TableCell>
                              <TableCell>
                                {((location.assets / assetReports.summary.totalAssets) * 100).toFixed(1)}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  {/* Asset Aging */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Asset Age Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assetReports.aging.map((age) => (
                          <div key={age.ageRange} className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <span className="w-20 text-sm font-medium">{age.ageRange}</span>
                              <Progress value={age.percentage} className="flex-1" />
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span>{age.count} assets</span>
                              <span className="w-12 text-right">{age.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="software" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Software License Utilization</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => exportReport("csv")}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Software</TableHead>
                            <TableHead>License Usage</TableHead>
                            <TableHead>Annual Cost</TableHead>
                            <TableHead>Compliance Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {softwareReports.licensing.map((software) => {
                            const utilizationPercent = (software.used / software.totalLicenses) * 100
                            return (
                              <TableRow key={software.software}>
                                <TableCell className="font-medium">{software.software}</TableCell>
                                <TableCell>
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>
                                        {software.used} / {software.totalLicenses}
                                      </span>
                                      <span>{utilizationPercent.toFixed(0)}%</span>
                                    </div>
                                    <Progress value={utilizationPercent} />
                                  </div>
                                </TableCell>
                                <TableCell>${software.cost.toLocaleString()}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      software.compliance === "Compliant"
                                        ? "default"
                                        : software.compliance === "At Risk"
                                          ? "destructive"
                                          : "secondary"
                                    }
                                  >
                                    {software.compliance}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compliance Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compliant</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                            <span className="font-medium">{softwareReports.compliance.compliant}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">At Risk</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                            <span className="font-medium">{softwareReports.compliance.atRisk}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Non-Compliant</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                            <span className="font-medium">{softwareReports.compliance.nonCompliant}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Compliance Issues</CardTitle>
                    <CardDescription>Assets requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Asset</TableHead>
                          <TableHead>Issue</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {complianceReports.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.asset}</TableCell>
                            <TableCell>{item.issue}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.severity === "High"
                                    ? "destructive"
                                    : item.severity === "Medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {item.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>{item.dueDate}</TableCell>
                            <TableCell>{item.owner}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                Resolve
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Hardware Assets</span>
                          <span className="font-medium">$2,134,750</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Software Licenses</span>
                          <span className="font-medium">$257,394</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Maintenance & Support</span>
                          <span className="font-medium">$455,506</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center font-bold">
                            <span>Total Annual Cost</span>
                            <span>$2,847,650</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">ROI Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Asset Utilization Rate</span>
                          <span className="font-medium">92.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Cost per Active Asset</span>
                          <span className="font-medium">$2,463</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Annual Savings</span>
                          <span className="font-medium text-green-600">$184,320</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center font-bold">
                            <span>ROI</span>
                            <span className="text-green-600">+15.2%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
