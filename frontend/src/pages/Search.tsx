import { useQuery } from "@tanstack/react-query";
import PostContent from "@/components/home/PostContent";
import { Post } from "@/models/Post";
import React from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { UseSearchPost } from "@/api/PostApi";
import LazyLoadedComponent from "@/components/LazyLoadedComponent";

const FormSchema = z.object({
  search: z.string().min(1, {
    message: "Search must be at least 1 characters.",
  }),
});

const Search = () => {
  const [urlQuery, setUrlQuery] = React.useState<string>("");

  const location = useLocation();

  const urlParams = new URLSearchParams(window.location.search);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: urlQuery || "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    urlParams.set("q", data.search);
    const newUrl = `${location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
    setUrlQuery(newUrl.split("=")[1]);
  }

  const { data, isPending } = useQuery({
    queryKey: ["search-post", urlQuery],
    queryFn: () => UseSearchPost(urlQuery),
  });

  return (
    <React.Fragment>
      <div className="mx-auto max-w-[600px] space-y-8 px-3 pb-56 pt-4 md:px-0 md:py-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
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
        {urlQuery !== "" && !data && (
          <p className="text-center">Ups sorry we cannot find anything</p>
        )}
        {urlQuery === "" ? (
          <p className="text-center">Ups sorry we cannot find anything</p>
        ) : (
          data?.map((result: Post) => (
            <LazyLoadedComponent key={result?._id}>
              <PostContent data={result} />
            </LazyLoadedComponent>
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default Search;
