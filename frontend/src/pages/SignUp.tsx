import React from "react";
import Logo from "../assets/fakeX.png";
import GoogleLogo from "../assets/google.webp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^[a-z_]+$/, {
      message: "Username must contain only lowercase letters and underscores.",
    }),
  email: z.string().email("Email is incorrect"),
  password: z.string().min(8, {
    message: "Password must be 8 character minimum",
  }),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <section className="h-dvh flex items-center justify-center w-full p-10 lg:p-3">
      <section className="w-full grid lg:grid-cols-2 items-center gap-40">
        <img src={Logo} alt="logo" className="w-[200px] lg:w-[300px] mx-auto" />
        <div className="-mt-20 lg:mt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 text-black">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        className="lowercase"
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
                    <FormControl>
                      <Input placeholder="email" {...field} />
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
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "password" : "text"}
                          placeholder="user password"
                          className="text-black"
                          {...field}
                        />
                        {showPassword ? (
                          <Eye
                            onClick={() => setShowPassword(false)}
                            className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-600"
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShowPassword(true)}
                            className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-600"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black">
                Submit
              </Button>
            </form>
          </Form>
          <div className="relative my-7">
            <Separator />
            <p className="absolute top-[-13px] right-[50%] translate-x-[50%] bg-black px-3">
              or
            </p>
          </div>
          <Button
            className="w-full bg-white text-black hover:bg-white hover:text-black flex justify-center items-center gap-1"
            onClick={() => alert("This feature is not available yet")}>
            <img src={GoogleLogo} alt="google logo" className="w-6" />
            Sign in with Google
          </Button>
          <div className="text-center mt-8">
            <Link to="/sign-in">
              Already have an account,{" "}
              <span className="text-blue-500">Sign-in here</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SignUp;