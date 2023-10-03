import { auth } from "@/lib/firebase/client";
import {
  AuthProvider,
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const useFirebase = () => {
  /**
   * 現在ログインしているユーザーを取得します
   * @returns User | null
   */
  const getCurrentUser = async (): Promise<User | null> => {
    try {
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          resolve(user);
          unsubscribe(); // リスナーの登録解除
        });
      });
    } catch (error) {
      console.error("ユーザー取得エラー:", error);
      throw error; // エラーを呼び出し元に伝播させる
    }
  };

  /**
   * 現在ログインしているユーザーのUIDを取得します
   * @returns string
   */
  const getUId = async (): Promise<string> => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("ユーザーが存在しません");
      return user.uid;
    } catch (error) {
      console.error("ユーザーID取得エラー:", error);
      throw error; // エラーを呼び出し元に伝播させる
    }
  };

  /**
   * 現在ログインしているユーザーのトークンを取得します
   * @returns string
   */
  const getToken = async (): Promise<string> => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("ユーザーが存在しません");
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("トークン取得エラー:", error);
      throw error; // エラーを呼び出し元に伝播させる
    }
  };

  /**
   * SNSログインを行います
   * @param provider
   * @returns User
   */
  const SNSSignIn = async (provider: AuthProvider) => {
    try {
      const result = await setPersistence(auth, browserLocalPersistence).then(
        async () => {
          // 以降の認証が指定した永続性で行われる
          const result = await signInWithPopup(auth, provider);

          return result.user;
        }
      );
      return "success";
    } catch (error) {
      console.error("ログインエラー:", error);
      throw error; // エラーを呼び出し元に伝播させる
    }
  };

  /**
   * メールアドレスとパスワードを使ってログインします
   * @param email
   * @param password
   * @returns User | string
   */
  const emailSignIn = async (email: string, password: string) => {
    try {
      // メールアドレスとパスワードを使ってユーザーをログインさせます
      await signInWithEmailAndPassword(auth, email, password);

      // ログインしたユーザー情報を返します
      return "success"
    } catch (error) {
      if (error instanceof Error) {
        // エラーの型チェック
        const errorCode = (error as FirebaseError).code; // FirebaseErrorとして扱う
        return errorCode;
      }
      throw error;
    }
  };

  /**
   * メールアドレスとパスワードを使ってユーザーを登録します
   * @param email
   * @param password
   * @returns User | string
   */
  const emailSignUp = async (email: string, password: string) => {
    try {
      // メールアドレスとパスワードを使ってユーザーを登録します
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 登録したユーザー情報を返します
      return "success";
    } catch (error) {
      if (error instanceof Error) {
        // エラーの型チェック
        const errorCode = (error as FirebaseError).code; // FirebaseErrorとして扱う
        return errorCode;
      }
      throw error;
    }
  };

  /**
   * ログアウトします
   */
  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (e) {
      if (e instanceof FirebaseError) {
        // console.log(e)
        throw e;
      }
    }
  };

  /**
   * アカウントを削除します
   */
  const deleteAccount = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error("ユーザーが存在しません");
      await user.delete();
    } catch (e) {
      if (e instanceof FirebaseError) {
        // console.log(e)
        throw e;
      }
    }
  };
  return {
    getCurrentUser,
    getUId,
    getToken,
    SNSSignIn,
    emailSignIn,
    emailSignUp,
    signOut,
    deleteAccount,
  }
};
