import Logo from "../assets/fakeX.png";
import GoogleLogo from "../assets/google.webp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/pages/input";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(/^[a-z_]+$/, {
      message: "Username must contain only lowercase letters and underscores.",
    }),
  password: z.string().min(8, {
    message: "Password must be 8 character minimum",
  }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <section className="min-h-dvh flex items-center justify-center w-full p-10 lg:p-3">
      <section className="w-full grid lg:grid-cols-2 items-center gap-40">
        <img src={Logo} alt="logo" className="w-[200px] mx-auto" />
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
                        placeholder="Username"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="User password"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-right">
                      <Link to="/forgot-password" className="text-blue-500">
                        Forgot password?
                      </Link>
                    </FormDescription>
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
            <Link to="/sign-up">
              Haven`t an account?,{" "}
              <span className="text-blue-500">Sign-up here</span>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default SignIn;
