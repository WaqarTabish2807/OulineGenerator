import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/queryClient";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
}

export function SignupDialog({ open, onOpenChange, onSuccess, onSwitchToLogin }: SignupDialogProps) {
  const { toast } = useToast();
  const { login } = useAuth();
  
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // In a real app, we would call an API endpoint
      // For now, we simulate an API call
      // This would normally come from the server
      return {
        id: 1,
        name: values.name,
        email: values.email,
        plan: "free" as const,
        credits: 2
      };
    },
    onSuccess: (data) => {
      login(data);
      
      toast({
        title: "Account created",
        description: "Welcome to OutlineGenius! You can now create outlines.",
        variant: "success",
      });
      
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      // For now, simulate a successful signup since we don't have a backend
      // This will be replaced with actual API calls later
      login({
        id: 1,
        name: form.getValues().name,
        email: form.getValues().email,
        plan: "free",
        credits: 2 // Default to 2 credits for new users
      });
      
      toast({
        title: "Account created",
        description: "Welcome to OutlineGenius! You can now create outlines.",
        variant: "success",
      });
      
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signupMutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create an account</DialogTitle>
          <DialogDescription>
            Join today to unlock unlimited outline generation
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      className="bg-background"
                    />
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
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="bg-background"
                    />
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
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col space-y-3 pt-2">
              <GradientButton 
                type="submit" 
                disabled={signupMutation.isPending}
                className="w-full"
              >
                {signupMutation.isPending ? "Creating account..." : "Create account"}
              </GradientButton>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal" 
                  onClick={onSwitchToLogin}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}