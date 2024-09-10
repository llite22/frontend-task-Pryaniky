import { Suspense } from "react";
import { MoonLoader } from "react-spinners";
import AppRouter from "./providers/router/ui/AppRouter";

const App = () => {
  return (
    <div className="bg-white dark:bg-black">
      <Suspense
        fallback={
          <div className="flex w-full justify-center items-center h-[100vh]">
            <MoonLoader color={"#36d7b7"} loading={true} size={70} />
          </div>
        }
      >
        <div className="flex dark:bg-black">
          <div className="flex flex-col w-full">
            <AppRouter />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
