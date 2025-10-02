import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#16A34A", backgroundColor: "#ECFDF5" }}
      text1Style={{ fontSize: 16, fontWeight: "600", color: "#166534" }}
      text2Style={{ fontSize: 14, color: "#166534" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#DC2626", backgroundColor: "#FEF2F2" }}
      text1Style={{ fontSize: 16, fontWeight: "600", color: "#991B1B" }}
      text2Style={{ fontSize: 14, color: "#991B1B" }}
    />
  ),
};
