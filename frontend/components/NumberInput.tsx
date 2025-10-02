import React, { forwardRef } from "react";
import Input, { InputProps } from "./Input";
import { InputRef } from "./Input/types";

export interface NumberInputProps
  extends Omit<
    InputProps,
    "numeric" | "value" | "defaultValue" | "onChangeText"
  > {
  kind?: "integer" | "decimal"; // default: decimal
  value?: number | null;
  defaultValue?: number | null;
  onChangeNumber?: (num: number | null) => void;
}

// #TODO: Something feels broken when removing a number
const toText = (n: number | null | undefined) =>
  n === null || n === undefined ? "" : String(n);

const NumberInput = forwardRef<InputRef, NumberInputProps>(
  (
    { kind = "decimal", value, defaultValue, onChangeNumber, ...props },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        // turn numeric values into text for TextInput
        value={value !== undefined ? toText(value) : undefined}
        defaultValue={
          defaultValue !== undefined ? toText(defaultValue) : undefined
        }
        // keep using Input's numeric machinery
        numeric={kind}
        onChangeNumber={onChangeNumber}
        keyboardType={
          props.keyboardType ??
          (kind === "integer" ? "number-pad" : "decimal-pad")
        }
        {...props}
      />
    );
  }
);

export default NumberInput;
