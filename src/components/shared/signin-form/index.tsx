'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { handleSignin } from './signin.action'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type SigninFormData = z.infer<typeof formSchema>

export default function SigninForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'example@email.com',
      password: 'example-password',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const error = await handleSignin(values)

    if (error) {
      form.setError('root.serverError', {
        type: 'manual',
        message: error.message,
      })

      return
    }

    router.refresh()
    router.back()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.serverError && (
          <FormMessage>{form.formState.errors.root.serverError.message}</FormMessage>
        )}
        <Button type="submit" className="w-full" loading={form.formState.isSubmitting}>
          Sign In
        </Button>
      </form>
    </Form>
  )
}
