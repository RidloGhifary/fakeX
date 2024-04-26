import { UseSearchPost } from "@/api/PostApi";
import PostContent from "@/components/home/PostContent";
import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Post } from "@/models/Post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  search: z.string().min(1, {
    message: "Search must be at least 2 characters.",
  }),
});

const Search = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    mutate: searchMutate,
    data,
    isPending,
  } = useMutation({
    mutationKey: ["search-post"],
    mutationFn: (data: { search: string }) => UseSearchPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (err) => {
      console.log("🚀 ~ Search ~ err:", err);
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    searchMutate(data);
  }

  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <div className="mx-auto max-w-[600px] space-y-8 px-3 pb-56 pt-4 md:px-0 md:py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isPending}
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      className="rounded-xl border-white/30 bg-transparent p-6 text-white  focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Search"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        {isPending && <p className="text-center">Loading...</p>}
        {data?.data && data?.data.length === 0 ? (
          <p className="text-center">Ups sorry we cannot find anything</p>
        ) : (
          data?.data?.map((result: Post) => <PostContent data={result} />)
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;
