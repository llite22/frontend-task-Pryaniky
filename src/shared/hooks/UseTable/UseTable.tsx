import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { $api } from "@/shared/api/api";

export interface TableData {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

export interface CreateUpdateTableData {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

interface ApiResponse {
  data: TableData[];
  error_code: number;
  error_message: string;
}

export const useTable = () => {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["testmethods"],
    queryFn: async () =>
      await $api.get<ApiResponse>("/ru/data/v3/testmethods/docs/userdocs/get"),
    select: (response) => response.data,
  });

  const {
    mutate: createMutation,
    isPending: isCreating,
    isError: isCreatingError,
  } = useMutation({
    mutationFn: async (newData: CreateUpdateTableData) =>
      await $api.post<ApiResponse>(
        "/ru/data/v3/testmethods/docs/userdocs/create",
        newData
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testmethods"] });
    },
  });

  const {
    mutate: updateMutation,
    isPending: isUpdating,
    isError: isUpdatingError,
  } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CreateUpdateTableData;
    }) =>
      await $api.post<ApiResponse>(
        `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testmethods"] });
    },
  });

  const {
    mutate: deleteMutation,
    isPending: isDeleting,
    isError: isDeletingError,
  } = useMutation({
    mutationFn: async (id: string) =>
      await $api.post<ApiResponse>(
        `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testmethods"] });
    },
  });

  return {
    data: data?.data,
    isPending,
    isError,
    createMutation,
    isCreating,
    isCreatingError,
    updateMutation,
    isUpdating,
    isUpdatingError,
    deleteMutation,
    isDeleting,
    isDeletingError,
  };
};
