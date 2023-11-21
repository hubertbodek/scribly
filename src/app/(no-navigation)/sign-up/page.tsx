import SignupForm from '@/components/shared/signup-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const SignUpPage = () => {
  return (
    <main className="flex h-screen">
      <div className="flex-1 bg-primary flex items-center justify-center">
        <h1 className="text-primary-foreground text-h1 font-bold">Scribly</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default SignUpPage
