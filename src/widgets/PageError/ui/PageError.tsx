import { Button } from "@/shared/ui/button";

export const PageError = () => {
  const reloadPage = () => {
    location.reload();
  };
  return (
    <div>
      <p>{"Произошла непредвиденная ошибка"}</p>
      <Button onClick={reloadPage}>{"Обновить страницу"}</Button>
    </div>
  );
};
