import { TableData, useTable } from "@/shared/hooks/UseTable/UseTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { MoonLoader } from "react-spinners";
import Modal from "../Modal/Modal";
import { Button } from "@/shared/ui/button";
import { useCallback, useState } from "react";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { useNavigate } from "react-router";
import { getRouteLogin } from "@/shared/const/router";

const MainPage = () => {
  const {
    data,
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
  } = useTable();
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<TableData | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    navigate(getRouteLogin());
  };

  const openModal = useCallback((data: TableData | null) => {
    setUpdateData(data);
    setActiveModal((prev) => !prev);
  }, []);

  if (isPending || isDeleting || isCreating || isUpdating) {
    return (
      <div className="flex w-full justify-center items-center h-[100vh]">
        <MoonLoader color={"#36d7b7"} loading={true} size={70} />
      </div>
    );
  }

  if (isError || isDeletingError || isCreatingError || isUpdatingError) {
    return (
      <div className="flex justify-center items-center h-[100vh]">Error</div>
    );
  }

  const tableHead = [
    "id",
    "documentStatus",
    "employeeNumber",
    "documentType",
    "documentName",
    "companySignatureName",
    "employeeSignatureName",
    "employeeSigDate",
    "companySigDate",
    "update",
    "delete",
  ];

  return (
    <>
      <div className="flex justify-end mt-5 mr-5">
        <Button
          onClick={() => openModal(null)}
          className="bg-blue-500 hover:bg-blue-700"
        >
          Добавить
        </Button>
      </div>
      {activeModal && (
        <div
          onClick={() => openModal(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto"
          >
            <Modal
              createMutation={createMutation}
              updateMutation={updateMutation}
              openModal={openModal}
              updateData={updateData}
            />
          </div>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {tableHead.map((item) => (
              <TableHead className="text-center" key={item}>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((invoice) => (
              <TableRow className="text-center" key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.documentStatus}</TableCell>
                <TableCell>{invoice.employeeNumber}</TableCell>
                <TableCell>{invoice.documentType}</TableCell>
                <TableCell>{invoice.documentName}</TableCell>
                <TableCell>{invoice.companySignatureName}</TableCell>
                <TableCell>{invoice.employeeSignatureName}</TableCell>
                <TableCell>{invoice.employeeSigDate}</TableCell>
                <TableCell>{invoice.companySigDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => openModal(invoice)}
                    className="bg-green-500 hover:bg-green-700"
                  >
                    Обновить
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteMutation(invoice.id)}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <Button onClick={logout} className="bg-blue-500 hover:bg-blue-700">
          Выйти
        </Button>
      </div>
    </>
  );
};

export default MainPage;
