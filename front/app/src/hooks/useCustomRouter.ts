import { useRouter } from "next/router";

export const useCustomRouter = () => {
  const router = useRouter();
  // ?userId=?的なのを取得する
  const getQueryId = router.query.id;
  // page遷移
  const routerPush = (path: string) => {
    router.push(path);
  };
  // 戻る
  const routerBack = () => {
    router.back();
  };

  return { routerPush, routerBack, getQueryId };
};
