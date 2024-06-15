"use client";
import { createAdminClient } from "@/actions/appwrite";
import { login, loginWithSession } from "@/actions/auth";
import ErrorMessage from "@/components/ErrorMessage";
import { account } from "@/utils/appWrite";
import { loginSchema, registerSchema } from "@/validation/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Heading, Text, TextField, Link as TLink } from "@radix-ui/themes";
import { AppwriteException } from "appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { PiPassword } from "react-icons/pi";
import { InferType } from "yup";
type Login = InferType<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setError,

    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(loginSchema),
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
            Login into LuckyRupee
          </Heading>
          <Text className="mt-2 block">
            Don't have an account?{" "}
            <Link className="text-blue-500" href={"/auth/register"}>
              <span>Sign up</span>
            </Link>
          </Text>
        </div>
        <div className="bg-slate-200 mt-2 h-[2px]"></div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await loginWithSession(data);
            } catch (e: AppwriteException | any) {
              setError("root", {
                message: e.message,
              });
            }
          })}
          className="grid gap-4 mt-8 "
        >
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
          <ErrorMessage message={errors.root} />

          <Button className="w-full mt-4 block" size={"3"} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
