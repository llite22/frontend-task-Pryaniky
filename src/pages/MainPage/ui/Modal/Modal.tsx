import {
  CreateUpdateTableData,
  TableData,
} from "@/shared/hooks/UseTable/UseTable";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  documentStatus: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  employeeNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  documentType: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  documentName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  companySignatureName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  employeeSignatureName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  employeeSigDate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  companySigDate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Modal = ({
  openModal,
  updateData,
  createMutation,
  updateMutation,
}: {
  openModal: (data: TableData | null) => void;
  updateData: TableData | null;
  createMutation: (data: CreateUpdateTableData) => void;
  updateMutation: (data: { id: string; data: CreateUpdateTableData }) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentStatus: updateData?.documentStatus || "",
      employeeNumber: updateData?.employeeNumber || "",
      documentType: updateData?.documentType || "",
      documentName: updateData?.documentName || "",
      companySignatureName: updateData?.companySignatureName || "",
      employeeSignatureName: updateData?.employeeSignatureName || "",
      employeeSigDate: updateData?.employeeSigDate
        ? new Date(updateData.employeeSigDate).toISOString().slice(0, 16)
        : "",
      companySigDate: updateData?.companySigDate
        ? new Date(updateData.companySigDate).toISOString().slice(0, 16)
        : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      employeeSigDate: new Date(values.employeeSigDate).toISOString(),
      companySigDate: new Date(values.companySigDate).toISOString(),
    } as CreateUpdateTableData;
    if (!!updateData) {
      updateMutation({ id: updateData.id, data: formattedValues });
    } else {
      createMutation(formattedValues);
    }
    openModal(null);
  }

  return (
    <div className="border rounded-lg p-10 space-y-5 shadow-md shadow-gray-300 max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="documentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>documentStatus</FormLabel>
                <FormControl>
                  <Input placeholder="documentStatus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>documentType</FormLabel>
                <FormControl>
                  <Input placeholder="employeeNumber" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>documentType</FormLabel>
                <FormControl>
                  <Input placeholder="documentType" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="documentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>documentName</FormLabel>
                <FormControl>
                  <Input placeholder="documentName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySignatureName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>companySignatureName</FormLabel>
                <FormControl>
                  <Input placeholder="companySignatureName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeSignatureName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>employeeSignatureName</FormLabel>
                <FormControl>
                  <Input placeholder="employeeSignatureName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeSigDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>employeeSigDate</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="employeeSigDate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySigDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>companySigDate</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="companySigDate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button className="bg-blue-500 hover:bg-blue-700" type="submit">
              {updateData ? "Обновить" : "Добавить"}
            </Button>
            <Button
              onClick={() => openModal(null)}
              className="bg-red-500 hover:bg-red-700"
            >
              Закрыть
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Modal;
