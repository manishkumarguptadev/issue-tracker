"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { issueSchema } from "@/schemas/issueSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormData = z.infer<typeof issueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(issueSchema),
  });

  const { isValid, isSubmitting, errors } = formState;

  const onSuccess: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
      toast.success("Issue created successfully");
    } catch (error) {
      toast.error("Issue could not be created");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground">New Issue</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSuccess)}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <div>
                  <Input
                    id="title"
                    type="text"
                    className="w-full"
                    placeholder="Title"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="mt-2 text-xs text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <div>
                  <Textarea
                    id="description"
                    placeholder="Description"
                    className="min-h-40"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="mt-2 text-xs text-destructive ">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="max-w-32"
              >
                Submit Issue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewIssuePage;
