"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Plus } from "lucide-react"

const vendors = [
  { name: "Metro Supplies", category: "Stationery", terms: "Net 15", contact: "metro@example.com" },
  { name: "Bright Transport", category: "Transport", terms: "Net 30", contact: "ops@bright.com" },
  { name: "GreenCaf", category: "Cafeteria", terms: "Net 15", contact: "billing@greencaf.com" },
]

export default function VendorsPage() {
  return (
    <AccountantLayout title="Vendors">
      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Active vendors</CardTitle>
            <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add vendor</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendors.map((vendor) => (
              <div key={vendor.name} className="p-4 border rounded-lg flex items-center justify-between hover:border-amber-200 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.category}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{vendor.terms}</div>
                <div className="text-sm text-muted-foreground">{vendor.contact}</div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
