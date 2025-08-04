"use client"

import { useState } from "react"
import { Bell, AlertTriangle, Calendar, Shield, Wifi, CheckCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const notifications = [
  {
    id: 1,
    type: "license_expiry",
    title: "Microsoft Office 365 Licenses Expiring",
    description:
      "45 Microsoft Office 365 licenses will expire on February 15, 2024. Immediate renewal required to avoid service disruption.",
    priority: "high",
    date: "2024-01-20",
    category: "License Management",
    affected: "45 users",
    action: "Renew licenses",
    icon: Calendar,
    read: false,
  },
  {
    id: 2,
    type: "warranty_expiry",
    title: "Dell Laptop Warranties Expired",
    description:
      "12 Dell Latitude 7420 laptops have expired warranties as of January 15, 2024. Consider extending warranty or planning replacements.",
    priority: "medium",
    date: "2024-01-19",
    category: "Hardware Management",
    affected: "12 devices",
    action: "Extend warranty",
    icon: Shield,
    read: false,
  },
  {
    id: 3,
    type: "inactive_device",
    title: "Inactive Devices Detected",
    description:
      "23 devices haven't been active for more than 30 days. These may be unused assets that can be reallocated or retired.",
    priority: "low",
    date: "2024-01-18",
    category: "Asset Optimization",
    affected: "23 devices",
    action: "Review devices",
    icon: Wifi,
    read: true,
  },
  {
    id: 4,
    type: "compliance_alert",
    title: "Adobe Creative Suite Over-Allocation",
    description:
      "Current usage (48/50) is approaching license limit. Consider purchasing additional licenses or monitoring usage.",
    priority: "medium",
    date: "2024-01-17",
    category: "Compliance",
    affected: "2 licenses remaining",
    action: "Purchase licenses",
    icon: AlertTriangle,
    read: false,
  },
  {
    id: 5,
    type: "security_update",
    title: "Critical Security Updates Available",
    description: "Security updates are available for 156 Windows devices. Schedule maintenance window for updates.",
    priority: "high",
    date: "2024-01-16",
    category: "Security",
    affected: "156 devices",
    action: "Schedule updates",
    icon: Shield,
    read: true,
  },
]

const notificationStats = {
  total: notifications.length,
  unread: notifications.filter((n) => !n.read).length,
  high: notifications.filter((n) => n.priority === "high").length,
  medium: notifications.filter((n) => n.priority === "medium").length,
  low: notifications.filter((n) => n.priority === "low").length,
}

export default function NotificationsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [notificationList, setNotificationList] = useState(notifications)

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const dismissNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = notificationList.filter((notification) => {
    if (selectedTab === "all") return true
    if (selectedTab === "unread") return !notification.read
    if (selectedTab === "high") return notification.priority === "high"
    if (selectedTab === "medium") return notification.priority === "medium"
    if (selectedTab === "low") return notification.priority === "low"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications & Alerts</h1>
            <p className="text-gray-600">Stay informed about critical asset management events</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Notification Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.total}</div>
              <p className="text-xs text-muted-foreground">Active notifications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <div className="h-4 w-4 bg-blue-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.unread}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <div className="h-4 w-4 bg-red-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.high}</div>
              <p className="text-xs text-red-600">Critical issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medium Priority</CardTitle>
              <div className="h-4 w-4 bg-yellow-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.medium}</div>
              <p className="text-xs text-yellow-600">Moderate issues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
              <div className="h-4 w-4 bg-green-500 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notificationStats.low}</div>
              <p className="text-xs text-green-600">Minor issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Management</CardTitle>
            <CardDescription>Monitor and manage system notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({notificationStats.total})</TabsTrigger>
                <TabsTrigger value="unread">Unread ({notificationStats.unread})</TabsTrigger>
                <TabsTrigger value="high">High ({notificationStats.high})</TabsTrigger>
                <TabsTrigger value="medium">Medium ({notificationStats.medium})</TabsTrigger>
                <TabsTrigger value="low">Low ({notificationStats.low})</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <Alert
                        key={notification.id}
                        className={`${
                          notification.priority === "high"
                            ? "border-red-200 bg-red-50"
                            : notification.priority === "medium"
                              ? "border-yellow-200 bg-yellow-50"
                              : "border-blue-200 bg-blue-50"
                        } ${!notification.read ? "border-l-4 border-l-blue-500" : ""}`}
                      >
                        <Icon className="h-4 w-4" />
                        <AlertTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {notification.title}
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                notification.priority === "high"
                                  ? "destructive"
                                  : notification.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {notification.priority}
                            </Badge>
                            <span className="text-sm text-gray-500">{notification.date}</span>
                          </div>
                        </AlertTitle>
                        <AlertDescription className="mt-2">
                          <p className="text-sm mb-3">{notification.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>Category: {notification.category}</span>
                              <span>Affected: {notification.affected}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                {notification.action}
                              </Button>
                              {!notification.read && (
                                <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                                  Mark Read
                                </Button>
                              )}
                              <Button size="sm" variant="ghost" onClick={() => dismissNotification(notification.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </AlertDescription>
                      </Alert>
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
