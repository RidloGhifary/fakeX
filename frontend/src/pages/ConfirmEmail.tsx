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
import { ArrowLeftToLine } from "lucide-react";
import { Link } from "react-router-dom";

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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <section className="h-dvh flex items-center justify-center w-full relative p-10 lg:p-3">
      <div className="absolute top-10 left-10 lg:left-0">
        <Link to="/sign-in" className="flex items-center gap-2 hover:underline">
          <ArrowLeftToLine />
          Back to sign in
        </Link>
      </div>
      <section className="w-full grid lg:grid-cols-2 items-center gap-40">
        <img src={Logo} alt="logo" className="w-[200px] lg:w-[300px] mx-auto" />
        <div className="-mt-20 lg:mt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 text-black">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Reset password link will be send to your email
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

export default ConfirmEmail;
