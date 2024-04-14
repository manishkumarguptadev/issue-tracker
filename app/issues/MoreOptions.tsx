"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import axios from "axios";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
function MoreOptions({ id }: { id: number }) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/issues/${id}`);
      router.refresh();
      toast.success("Issue deleted successfully");
    } catch (error) {
      toast.error("Issue could not be deleted");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Link href={`/issues/edit/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn("focus:bg-destructive")}
          onClick={() => handleDelete(id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MoreOptions;
