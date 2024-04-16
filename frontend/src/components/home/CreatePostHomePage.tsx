import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseCreatePost } from "@/api/PostApi";
import { useToast } from "../ui/use-toast";
import ProfilePicture from "../ProfilePicture";

const FormSchema = z.object({
  content: z.string().min(1, {
    message: "Content must be at least 2 characters.",
  }),
});

const CreatePostHomePage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: UseCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
      toast({
        title: "Create: success!",
        description: "Successfully posting a new post.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Create: failed!",
        description: "An error occurred during posting.",
      });
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await mutate(data);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Create: failed!",
        description: "An error occurred during posting.",
      });
    }
  }

  return (
    <section className="hidden w-full md:block">
      <div className="flex gap-1">
        <ProfilePicture />
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
                      disabled={isPending}
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
              {isPending ? "Wait" : "Post"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreatePostHomePage;
