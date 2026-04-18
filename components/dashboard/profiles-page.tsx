"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bluetooth, Calendar, User, Cpu } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* User Profile Card */}
      <Card className="bg-white border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 border-2 border-primary/10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad" alt="Muhammad Arya" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground">Muhammad Arya</h3>
              <p className="text-muted-foreground mb-4">Informatics Student</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Status: <span className="font-medium text-foreground">Researcher</span></span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Project: <span className="font-medium text-foreground">SkinNET Bio Prototype</span></span>
                </div>
              </div>

              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Device Section */}
      <Card className="bg-white border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Linked Device</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border border-border rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">SkinNET Bio ESP32</h4>
                  <p className="text-sm text-muted-foreground">Firmware v2.3.1</p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-none hover:bg-emerald-100">
                <Bluetooth className="w-3 h-3 mr-1" />
                Linked
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-muted-foreground mb-1">Bluetooth ID</p>
              <p className="text-sm font-mono font-medium text-foreground">ESP32-SKINNET-01</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-muted-foreground mb-1">Status Alat</p>
              {/* FIXED: Menghapus text-foreground yang konflik */}
              <p className="text-sm font-medium text-emerald-600">Optimal</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1">
              Reset Config
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Scan for Hardware
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Statistics */}
      <Card className="bg-white border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Monitoring Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">847</p>
              <p className="text-xs text-muted-foreground mt-1">Data Points</p>
            </div>
            <div className="text-center border-x border-slate-100">
              <p className="text-2xl font-bold text-blue-600">92%</p>
              <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">34</p>
              <p className="text-xs text-muted-foreground mt-1">Days Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}