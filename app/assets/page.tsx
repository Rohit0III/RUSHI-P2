"use client"

import { useState } from "react"
import { Search, Download, Plus, Eye, Edit, Trash2, Laptop, Monitor, Server, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const assets = [
  {
    id: "AST-001",
    name: 'MacBook Pro 16"',
    category: "Laptop",
    status: "Active",
    assignedTo: "John Doe",
    location: "New York Office",
    purchaseDate: "2023-06-15",
    warrantyExpiry: "2026-06-15",
    value: "$2,499",
    icon: Laptop,
  },
  {
    id: "AST-002",
    name: "Dell OptiPlex 7090",
    category: "Desktop",
    status: "Active",
    assignedTo: "Jane Smith",
    location: "London Office",
    purchaseDate: "2023-03-20",
    warrantyExpiry: "2026-03-20",
    value: "$1,299",
    icon: Monitor,
  },
  {
    id: "AST-003",
    name: "HP ProLiant DL380",
    category: "Server",
    status: "Active",
    assignedTo: "IT Department",
    location: "Data Center",
    purchaseDate: "2022-11-10",
    warrantyExpiry: "2025-11-10",
    value: "$4,999",
    icon: Server,
  },
  {
    id: "AST-004",
    name: "iPhone 14 Pro",
    category: "Mobile",
    status: "Inactive",
    assignedTo: "Mike Johnson",
    location: "Remote",
    purchaseDate: "2023-09-22",
    warrantyExpiry: "2024-09-22",
    value: "$1,099",
    icon: Smartphone,
  },
  {
    id: "AST-005",
    name: "Surface Pro 9",
    category: "Laptop",
    status: "Active",
    assignedTo: "Sarah Wilson",
    location: "Chicago Office",
    purchaseDate: "2023-08-05",
    warrantyExpiry: "2026-08-05",
    value: "$1,799",
    icon: Laptop,
  },
]

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || asset.status.toLowerCase() === statusFilter
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleExport = () => {
    // Mock export functionality
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,Name,Category,Status,Assigned To,Location,Purchase Date,Warranty Expiry,Value\n" +
      filteredAssets
        .map(
          (asset) =>
            `${asset.id},${asset.name},${asset.category},${asset.status},${asset.assignedTo},${asset.location},${asset.purchaseDate},${asset.warrantyExpiry},${asset.value}`,
        )
        .join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "assets_export.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Management</h1>
            <p className="text-gray-600">Manage and track all your enterprise assets</p>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search assets by name, ID, or assignee..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="desktop">Desktop</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Assets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assets ({filteredAssets.length})</CardTitle>
            <CardDescription>Complete list of enterprise assets</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Warranty</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => {
                  const Icon = asset.icon
                  const isWarrantyExpiring =
                    new Date(asset.warrantyExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)

                  return (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-gray-500">{asset.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{asset.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={asset.status === "Active" ? "default" : "secondary"}>{asset.status}</Badge>
                      </TableCell>
                      <TableCell>{asset.assignedTo}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={isWarrantyExpiring ? "text-red-600" : "text-gray-900"}>
                            {asset.warrantyExpiry}
                          </span>
                          {isWarrantyExpiring && (
                            <Badge variant="destructive" className="text-xs">
                              Expiring
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{asset.value}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link href={`/assets/${asset.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Asset
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Asset
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
