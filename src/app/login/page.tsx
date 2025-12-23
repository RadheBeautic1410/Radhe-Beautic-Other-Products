'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SiteHeader } from '@/components/site-header'
import { login, register } from '@/src/action/auth-actions'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Phone, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    name: '',
  })

  const redirectTo = searchParams.get('redirect') || '/kurtis'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let result

      if (isLogin) {
        result = await login(formData.phoneNumber, formData.password)
      } else {
        if (!formData.name.trim()) {
          toast({
            title: 'Name required',
            description: 'Please enter your name to register',
            variant: 'destructive',
          })
          setIsLoading(false)
          return
        }
        result = await register(formData.phoneNumber, formData.password, formData.name)
      }

      if (result.success) {
        toast({
          title: isLogin ? 'Login successful' : 'Registration successful',
          description: isLogin
            ? 'Welcome back!'
            : 'Your account has been created successfully.',
        })
        router.push(redirectTo)
        router.refresh()
      } else {
        toast({
          title: isLogin ? 'Login failed' : 'Registration failed',
          description: result.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* <SiteHeader />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-serif font-bold">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? 'Login to continue shopping'
                : 'Sign up to start shopping with us'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required={!isLogin}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="pl-10"
                    required
                    disabled={isLoading}
                    minLength={10}
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Login' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setFormData({ phoneNumber: '', password: '', name: '' })
                }}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
                disabled={isLoading}
              >
                {isLogin ? (
                  <>
                    Don't have an account? <span className="font-semibold text-accent">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account? <span className="font-semibold text-accent">Login</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </main> */}
    </>
  )
}

