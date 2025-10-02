import Toast from "react-native-toast-message";

type MessageOptions = {
  text1?: string;
  text2?: string;
  visibilityTime?: number;
};

export function useMessage() {
  const success = (message: string, options: MessageOptions = {}) => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: message,
      visibilityTime: 2500,
      ...options,
    });
  };

  const error = (message: string, options: MessageOptions = {}) => {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
      visibilityTime: 4000,
      ...options,
    });
  };

  return { success, error };
}
