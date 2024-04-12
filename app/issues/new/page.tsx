"use client";

import { issueSchema } from "@/schemas/issueSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormData = z.infer<typeof issueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState("");
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
    } catch (error) {
      setError("Something went wrong, Try submitting again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {error && (
        <Alert variant="destructive" className="mb-6 max-w-2xl">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
