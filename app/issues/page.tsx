import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function IssuesPage() {
  return (
    <>
      <div className="mb-4 flex items-center">
        <Button>New Issue</Button>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent">
              <TableHead>Issue</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <Badge className="sm:hidden">Fulfilled</Badge>
                <div className="font-medium md:hidden">2023-06-23</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs">Fulfilled</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
