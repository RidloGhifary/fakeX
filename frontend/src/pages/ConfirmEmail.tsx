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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeftToLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";

const FormSchema = z.object({
  email: z.string().email("Email is incorrect"),
});

const ConfirmEmail = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["confirm-email"],
    mutationFn: async (data) => {
      const response = await makeRequest.post(
        "/credentials/forgot-password",
        data,
      );
      return response;
    },
    onSuccess: () => {
      alert("Success");
    },
    onError: (err) => {
      console.log("🚀 ~ ConfirmEmail ~ err:", err);
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data);
  };

  return (
    <section className="relative flex h-dvh w-full items-center justify-center p-10 lg:p-3">
      <div className="absolute left-10 top-10 lg:left-0">
        <Link to="/sign-in" className="flex items-center gap-2 hover:underline">
          <ArrowLeftToLine />
          Back to sign in
        </Link>
      </div>
      <section className="grid w-full items-center gap-40 lg:grid-cols-2">
        <img src={Logo} alt="logo" className="mx-auto w-[200px] lg:w-[300px]" />
        <div className="-mt-20 lg:mt-0">
          <Form {...form}>
            <form
              aria-disabled={isPending}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 text-black"
            >
              <FormField
                disabled={isPending}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">User email :</FormLabel>
                    <FormControl>
                      <Input placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Reset password link will be send to your email
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
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </section>
  );
};

export default ConfirmEmail;
