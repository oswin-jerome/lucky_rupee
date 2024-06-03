import { Text } from "@radix-ui/themes";
import React from "react";
import { FieldError } from "react-hook-form";

function ErrorMessage({ message }: { message?: FieldError | any }) {
  return (
    <div>
      {message && (
        <Text size={"1"} color="red">
          {message.message}
        </Text>
      )}
    </div>
  );
}

export default ErrorMessage;
