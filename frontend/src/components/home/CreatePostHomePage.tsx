import User from "../../assets/user.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const FormSchema = z.object({
  content: z.string().min(1, {
    message: "Content must be at least 2 characters.",
  }),
});

const CreatePostHomePage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(form.formState);
    console.log(data);
  }

  return (
    <section className="w-full">
      <div className="flex gap-1">
        <img src={User} alt="user-photo" className="h-10 w-10" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full gap-1"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Create a post..."
                      min="1"
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="rounded-full bg-white uppercase text-black hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-white/50"
              disabled={
                !!form.formState.errors.content || !form.formState.isDirty
              }
            >
              Post
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreatePostHomePage;
