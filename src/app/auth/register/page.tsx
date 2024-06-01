"use client";
import { Button, Heading, Link as TLink, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { CiMail, CiUser } from "react-icons/ci";
import { PiPassword } from "react-icons/pi";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validation/schema";
import { InferType } from "yup";
import ErrorMessage from "@/components/ErrorMessage";
import { account } from "@/utils/appWrite";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
type Register = InferType<typeof registerSchema>;
function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Register>({
    resolver: yupResolver(registerSchema),
  });

  return (
    <div className="grid grid-cols-[3fr,2fr] h-screen">
      <div className="bg-slate-500">s</div>
      <div className="p-4">
        {/* App Logo */}
        <div>
          <h1 className="font-bold italic text-lg">LuckyRupee</h1>
        </div>

        <div className="bg-slate-200 mt-2 h-[2px]"></div>
        <div className="py-8">
          <Heading size={"8"} className="font-bold">
            Create an account
          </Heading>
          <Text className="mt-2 block">
            Have an account already? <TLink>sign in</TLink>
          </Text>
        </div>
        <div className="bg-slate-200 mt-2 h-[2px]"></div>
        <form
          onSubmit={handleSubmit(async (data) => {
            const da = await account.create(ID.unique(), data.email, data.password, data.name);
            router.push("/auth/login");
          })}
          className="grid gap-4 mt-8 "
        >
          <div>
            <TextField.Root size={"3"} placeholder="John Doe" {...register("name")}>
              <TextField.Slot>
                <CiUser />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage message={errors.name} />
          </div>
          <div>
            <TextField.Root size={"3"} placeholder="john@gmail.com" {...register("email")}>
              <TextField.Slot>
                <CiMail />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage message={errors.email} />
          </div>
          <div>
            <TextField.Root type="password" size={"3"} placeholder="*********" {...register("password")}>
              <TextField.Slot>
                <PiPassword />
              </TextField.Slot>
            </TextField.Root>
            <ErrorMessage message={errors.password} />
          </div>
          <Button className="w-full mt-4 block" size={"3"} type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
