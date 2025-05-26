"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"

// import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "@/components/FormField"
import { Input} from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
// import e from "cors"



const authFormSchema =(type : FormType) => {
  return z.object({
    name : type === "sign-up" ? z.string().min(3, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })
}

const AuthForm = ({type}: { type: FormType } ) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     name: "",
     email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
 try{
      if (type === "sign-in") {
        toast.success("Sign in successful!");
        router.push("/");
      } else {
        toast.success("Registration successful! Redirecting to sign in...");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred during authentication: ${error}`);

 }
    }

     const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[56px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-center">
                <Image src="/logo.svg" alt="Logo" height={32} width={38} />
                <h2 className="text-primary-100">JobTune</h2>
            </div>

          <h3>
          Smarter interview prep starts here
          </h3>
      
         <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
            className="w-full space-y-6 mt-4 form">
              {!isSignIn &&(
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />
              )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

        <Button className="btn" type="submit">
          {isSignIn ? "Sign In" : "Sign Up/ Register"}
        </Button>
      </form>
    </Form>

      <p className="text-center">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="font-bold text-user-primary ml-1">
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
    </div>
  )
}

export default AuthForm