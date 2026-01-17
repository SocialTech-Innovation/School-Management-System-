"use client"

import { AccountantLayout } from "@/components/dashboard/accountant-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"

export default function AccountantSettingsPage() {
  return (
    <AccountantLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Bank accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank name</Label>
              <Input id="bank-name" placeholder="Acme Bank" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Account number</Label>
              <Input id="account-number" placeholder="XXXX-XXXX-1234" />
            </div>
            <Button className="gap-2"><Save className="w-4 h-4" /> Save</Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="p-3 border rounded-lg">Send reminders for overdue invoices.</div>
            <div className="p-3 border rounded-lg">Notify when payables exceed weekly limit.</div>
          </CardContent>
        </Card>
      </div>
    </AccountantLayout>
  )
}
