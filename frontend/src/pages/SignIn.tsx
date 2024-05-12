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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseSignIn } from "@/api/AuthApi";
import { AxiosError } from "axios";

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
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: UseSignIn,
    mutationKey: ["sign-in"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Sign in: failed!",
        description: "An error occurred during sign-in.",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data);
  };

  return (
    <section className="flex min-h-dvh w-full items-center justify-center p-10 lg:p-3">
      <section className="grid w-full items-center gap-40 lg:grid-cols-2">
        <img src={Logo} alt="logo" className="mx-auto w-[200px] lg:w-[300px]" />
        <div className="-mt-20 lg:mt-0">
          {isError && (
            <div className="mb-2 text-center text-sm text-red-500">
              {(error as AxiosError)?.response?.data?.message ||
                "An error occurred during sign-in."}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 text-black"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
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
                      <div className="relative">
                        <Input
                          disabled={isPending}
                          type={showPassword ? "text" : "password"}
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
                    <FormDescription className="text-right">
                      <Link to="/forgot-password" className="text-blue-500">
                        Forgot password?
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black"
              >
                {isPending && (
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPending ? "PLease wait" : "Submit"}
              </Button>
            </form>
          </Form>
          <div className="relative my-7">
            <Separator />
            <p className="absolute right-[50%] top-[-13px] translate-x-[50%] bg-black px-3">
              or
            </p>
          </div>
          <Button
            disabled={isPending}
            className="flex w-full items-center justify-center gap-1 bg-white text-black hover:bg-white hover:text-black"
            onClick={() => alert("This feature is not available yet")}
          >
            <img src={GoogleLogo} alt="google logo" className="w-6" />
            Sign in with Google
          </Button>
          <div className="mt-8 text-center">
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
