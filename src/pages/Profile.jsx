import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { Button } from "../components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderPinwheel } from "lucide-react";

const updateSchema = z.object({
  newPassword: z
    .string()
    .min(7, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain at least one uppercase, lowercase, number, and special character",
      }
    ),
  oldPassword: z.string(),
  name: z.string().optional(),
});

const Profile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/profile");
      return response.data.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Profile fetched successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error fetching profile");
    },
  });

  const form = useForm({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      newPassword: "",
      name: "",
      oldPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put("/user/update-profile", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["profile"]);
      toast.success(data?.message || "Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Error updating Profile");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg min-h-[80vh] shadow-lg border border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">{profile.name}</h2>
        <p className="text-lg text-indigo-600">{profile.role}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{profile.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Referral Code:</span>
          <span className="text-gray-600">{profile.referral_code}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Role:</span>
          <span className="text-gray-600">{profile.role}</span>
        </div>

        {/* Password Update Form */}
        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-800">Update Profile</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 lg:space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Name (optional)"
                        type="name"
                        {...field}
                        className="w-full px-2 lg:px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Enter your name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-semibold">
                      old Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your old password"
                        type="oldPassword"
                        {...field}
                        className="w-full px-2 lg:px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Your old password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-700 font-semibold">
                      new Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your new password"
                        type="newPassword"
                        {...field}
                        className="w-full px-2 lg:px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      Your new password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
              >
                {mutation.isPending ? (
                  <LoaderPinwheel className="mr-2 animate-spin" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
