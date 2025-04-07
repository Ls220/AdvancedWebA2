"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "../store/AuthContext"
import { Loader2 } from "lucide-react"
import { Navigate } from "react-router-dom"

// Define profile form validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

// Define password form validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, updateUserDetails, updatePassword } = useAuth()
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  // Initialize profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

  // Initialize password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Handle profile form submission
  const onProfileSubmit = async (values: ProfileFormValues) => {
    setIsUpdatingProfile(true)
    setProfileSuccess(null)
    setProfileError(null)

    try {
      const success = await updateUserDetails(values.name, values.email)

      if (success) {
        setProfileSuccess("Profile updated successfully!")
      }
    } catch (err) {
      setProfileError("Failed to update profile. Please try again.")
      console.error("Profile update error:", err)
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  // Handle password form submission
  const onPasswordSubmit = async (values: PasswordFormValues) => {
    setIsUpdatingPassword(true)
    setPasswordSuccess(null)
    setPasswordError(null)

    try {
      const success = await updatePassword(values.currentPassword, values.newPassword)

      if (success) {
        setPasswordSuccess("Password updated successfully!")
        passwordForm.reset({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      }
    } catch (err) {
      setPasswordError("Failed to update password. Please check your current password and try again.")
      console.error("Password update error:", err)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: { pathname: "/profile" } }} />
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="p-4 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  {profileSuccess && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                      <AlertDescription>{profileSuccess}</AlertDescription>
                    </Alert>
                  )}

                  {profileError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{profileError}</AlertDescription>
                    </Alert>
                  )}

                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isUpdatingProfile}>
                        {isUpdatingProfile ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Profile"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="p-4 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  {passwordSuccess && (
                    <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                      <AlertDescription>{passwordSuccess}</AlertDescription>
                    </Alert>
                  )}

                  {passwordError && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}

                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your current password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your new password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Confirm your new password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" disabled={isUpdatingPassword}>
                        {isUpdatingPassword ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Member Since</h3>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="font-medium">Account Type</h3>
                <p className="text-sm text-muted-foreground capitalize">{user?.role || "Customer"}</p>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/orders">View Order History</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

