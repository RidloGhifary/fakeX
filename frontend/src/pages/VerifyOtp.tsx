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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseVerifyOtp } from "@/api/AuthApi";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const VerifyOtp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = params;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: UseVerifyOtp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/sign-in");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      userId && mutate({ data, userId });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Sign up: failed!",
        description: "An error occurred during sending OTP code.",
      });
    }
  }

  return (
    <section className="flex h-dvh w-full items-center justify-center p-10 lg:p-3">
      <section className="grid w-full items-center gap-40 lg:grid-cols-2">
        <img src={Logo} alt="logo" className="mx-auto w-[200px] lg:w-[300px]" />
        <div className="-mt-20 lg:mt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputOTP maxLength={4} {...field}>
                        <InputOTPGroup className="w-full">
                          <InputOTPSlot index={0} className="w-full" />
                          <InputOTPSlot index={1} className="w-full" />
                          <InputOTPSlot index={2} className="w-full" />
                          <InputOTPSlot index={3} className="w-full" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the otp that have send to your email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black"
              >
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </section>
  );
};

export default VerifyOtp;
