"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

// Define form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Handle form submission
  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true)

    setTimeout(() => {
      console.log(values)
      setFormSubmitted(true)
      setIsSubmitting(false)
      form.reset()
    }, 1500)
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">For general inquiries and support</p>
                  <a href="mailto:info@shopverse.com" className="text-primary hover:underline">
                    info@shopverse.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">Mon-Fri from 8am to 5pm</p>
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Visit Us</h3>
                  <p className="text-sm text-muted-foreground mb-2">Our flagship store</p>
                  <address className="not-italic text-sm">
                    123 Fashion Street
                    <br />
                    New York, NY 10001
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            {formSubmitted ? (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertDescription>
                  Thank you for your message! We'll get back to you as soon as possible.
                </AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your message" className="min-h-[150px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Store Hours</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Opening Hours</h3>
                    <p className="text-sm text-muted-foreground">We're here to serve you</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "10:00 AM - 8:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
                    { day: "Sunday", hours: "12:00 PM - 5:00 PM" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <span className="font-medium">{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-md">
                  <p className="text-sm">
                    <strong>Note:</strong> Hours may vary on holidays. Please check our social media for updates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Find Us</h2>
              <div className="bg-muted h-[250px] rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Map will be displayed here</p>
                {/* In a real implementation, you would embed a Google Map or similar here */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="mb-6">
            Can't find the answer you're looking for? Check out our{" "}
            <a href="/faq" className="text-primary hover:underline">
              FAQ page
            </a>{" "}
            or send us a message.
          </p>
        </div>
      </div>
    </div>
  )
}

