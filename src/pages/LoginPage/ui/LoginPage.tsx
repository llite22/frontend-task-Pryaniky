import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useAuth } from "@/shared/hooks/useAuth/useAuth";
import { MoonLoader } from "react-spinners";

const LoginPage = () => {
  const { mutate, isPending, isError } = useAuth();

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters",
    }),
    password: z
      .string()
      .min(2, { message: "Password must be at least 2 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (isPending) {
    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <MoonLoader color={"#36d7b7"} loading={true} size={70} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[100vh]">Error</div>
    );
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => mutate(data);

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md border-4 border-dashed rounded-lg border-sky-500 p-4 sm:p-8 md:p-16"
        >
          <div className="space-y-6 sm:space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Username"}</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      className="border-4 border-double rounded-lg border-sky-500"
                      placeholder={"Username"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{"Password"}</FormLabel>
                  <FormControl>
                    <Input
                      className="border-4 border-double rounded-lg border-sky-500"
                      placeholder={"Password"}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full border-4 border-double rounded-lg border-sky-500 bg-blue-500 hover:bg-blue-700"
              type="submit"
            >
              {"Login"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
