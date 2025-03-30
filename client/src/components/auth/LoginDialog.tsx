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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  onSwitchToSignup: () => void;
}

export function LoginDialog({ open, onOpenChange, onSuccess, onSwitchToSignup }: LoginDialogProps) {
  const { toast } = useToast();
  const { login } = useAuth();
  
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      // In a real app, we would call an API endpoint
      // For now, we simulate an API call
      // This would normally come from the server
      return {
        id: 1,
        name: "Test User",
        email: values.email,
        plan: "free" as const,
        credits: 2
      };
    },
    onSuccess: (data) => {
      login(data);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "success",
      });
      
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      // For now, simulate a successful login since we don't have a backend
      // This will be replaced with actual API calls later
      login({
        id: 1,
        name: "Test User",
        email: form.getValues().email,
        plan: "free",
        credits: 2 // Default to 2 credits for new users
      });
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
        variant: "success",
      });
      
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Sign In</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
            <div className="flex flex-col space-y-3">
              <GradientButton 
                type="submit" 
                disabled={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </GradientButton>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal" 
                  onClick={onSwitchToSignup}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}