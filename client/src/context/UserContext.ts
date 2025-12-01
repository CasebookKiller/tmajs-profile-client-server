import { createContext, type Dispatch, type SetStateAction } from "react";

export type User = {
  id: number,
  name: string,
  email: string,
  password?: string,
  token?: string
}

interface UserContextType {
  user: User | null; // Данные пользователя
  setUser: Dispatch<SetStateAction<User | null>>; // Функция обновления
  loginVisible: boolean; // Видимость формы авторизации
  setLoginVisible: Dispatch<SetStateAction<boolean>>; // Функция обновления
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loginVisible: false,
  setLoginVisible: () => {}
});