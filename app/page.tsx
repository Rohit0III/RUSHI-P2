"use client"

import { useState } from "react"
import { Bell, Calendar, HardDrive, Laptop, Monitor, Server, Smartphone, Users, Wifi } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

const assetSummary = {
  total: 1247,
  active: 1156,
  inactive: 91,
  categories: [
    { name: "Laptops", count: 456, icon: Laptop },
    { name: "Desktops", count: 234, icon: Monitor },
    { name: "Servers", count: 67, icon: Server },
    { name: "Mobile Devices", count: 189, icon: Smartphone },
    { name: "Network Equipment", count: 123, icon: Wifi },
    { name: "Storage", count: 178, icon: HardDrive },
  ],
}

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "License Expiring Soon",
    description: "Microsoft Office licenses for 45 users expire in 15 days",
    priority: "high",
    date: "2024-01-20",
  },
  {
    id: 2,
    type: "error",
    title: "Warranty Expired",
    description: "12 Dell laptops have expired warranties",
    priority: "medium",
    date: "2024-01-19",
  },
  {
    id: 3,
    type: "info",
    title: "Inactive Devices",
    description: "23 devices haven't been active for 30+ days",
    priority: "low",
    date: "2024-01-18",
  },
]

const recentActivity = [
  { id: 1, action: "Asset Added", item: 'MacBook Pro 16"', user: "John Doe", time: "2 hours ago" },
  { id: 2, action: "License Renewed", item: "Adobe Creative Suite", user: "Jane Smith", time: "4 hours ago" },
  { id: 3, action: "Asset Retired", item: "Dell OptiPlex 7090", user: "Mike Johnson", time: "6 hours ago" },
  { id: 4, action: "Software Installed", item: "Slack Desktop", user: "Sarah Wilson", time: "8 hours ago" },
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Management Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your enterprise assets</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Asset Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetSummary.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetSummary.active.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((assetSummary.active / assetSummary.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Assets</CardTitle>
              <div className="h-4 w-4 bg-red-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assetSummary.inactive}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <Progress value={94} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset Categories */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Asset Categories</CardTitle>
              <CardDescription>Distribution of assets by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {assetSummary.categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">{category.count} units</p>
                        </div>
                      </div>
                      <Link href="/assets">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Important notifications requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <Alert
                  key={alert.id}
                  className={
                    alert.type === "error"
                      ? "border-red-200"
                      : alert.type === "warning"
                        ? "border-yellow-200"
                        : "border-blue-200"
                  }
                >
                  <Bell className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    {alert.title}
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.priority}
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="text-sm">{alert.description}</AlertDescription>
                </Alert>
              ))}
              <Link href="/notifications">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Alerts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes and updates to your assets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div>
                      <p className="font-medium">
                        {activity.action}: {activity.item}
                      </p>
                      <p className="text-sm text-muted-foreground">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <Link href="/assets">
            <Button>View All Assets</Button>
          </Link>
          <Link href="/software">
            <Button variant="outline">Software Inventory</Button>
          </Link>
          <Link href="/reports">
            <Button variant="outline">Generate Report</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
