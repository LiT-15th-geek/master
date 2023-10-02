import { useRouter } from "next/router";

export const useCustomRouter = () => {
  const router = useRouter();
  const getQueryId = router.query.id;
  const routerPush = (path: string) => {
    router.push(path);
  };

  return { routerPush, getQueryId };
};
