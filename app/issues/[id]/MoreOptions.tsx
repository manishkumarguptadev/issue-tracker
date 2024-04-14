"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function MoreOptions({ id }: { id: number }) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/issues/${id}`);
      router.push("/issues");
      router.refresh();
      toast.success("Issue deleted successfully");
    } catch (error) {
      toast.error("Issue could not be deleted");
    }
  };
  return (
    <>
      <Button asChild>
        <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
      </Button>
      <Button variant={"destructive"} onClick={() => handleDelete(id)}>
        Delete Issue
      </Button>
    </>
  );
}

export default MoreOptions;
