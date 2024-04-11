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

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyOtp = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <section className="h-dvh flex items-center justify-center w-full p-10 lg:p-3">
      <section className="w-full grid lg:grid-cols-2 items-center gap-40">
        <img src={Logo} alt="logo" className="w-[200px] lg:w-[300px] mx-auto" />
        <div className="-mt-20 lg:mt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pin"
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
                type="submit"
                className="w-full bg-white text-black hover:bg-white hover:text-black">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </section>
  );
};

export default VerifyOtp;
