import Navbar from "@/components/Navbar";
import NavbarMobile from "@/components/NavbarMobile";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  search: z.string().min(1, {
    message: "Search must be at least 2 characters.",
  }),
});

const Search = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <React.Fragment>
      <Navbar />
      <NavbarMobile />
      <div className="mx-auto max-w-[600px] px-3 pb-56 pt-4 md:px-0 md:py-20">
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
      </div>
    </React.Fragment>
  );
};

export default Search;
