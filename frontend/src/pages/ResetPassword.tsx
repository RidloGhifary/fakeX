import Logo from "../assets/fakeX.png";
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
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { UserResetPassword } from "@/api/UserApi";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  newPassword: z.string().min(8, {
    message: "Password must be 8 character minimum",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be 8 character minimum",
  }),
});

const ResetPassword = () => {
  const { toast } = useToast();
  const { search } = useLocation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (data: { data: string; search: string }) =>
      UserResetPassword(data),
    onSuccess: () => {
      navigate("/sign-in");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Reset password, Failed!",
        description: "An error occurred during resetting password",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate({ data: data.newPassword as string, search });
  };

  return (
    <section className="flex h-dvh w-full items-center justify-center">
      <section className="grid w-full grid-cols-2 items-center gap-40">
        <img src={Logo} alt="logo" className="mx-auto w-[200px] lg:w-[300px]" />
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 text-black"
            >
              <FormField
                disabled={isPending}
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        className="text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is will be your new password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isPending}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        className="text-black"
                        {...field}
                        {...form.register("confirmPassword", {
                          validate: (value) => {
                            if (!value) return "This field is required";
                            else if (form.watch("newPassword") !== value)
                              return "Your password do not match";
                          },
                        })}
                      />
                    </FormControl>
                    <FormDescription>Confirm your new password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </section>
  );
};

export default ResetPassword;
