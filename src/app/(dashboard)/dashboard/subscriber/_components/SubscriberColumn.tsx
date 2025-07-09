"use client";

import { Subscriber } from "@/components/types/SubscriberDataType";
// import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export const SubscriberColumn: ColumnDef<Subscriber>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    header: "Email Address",
    cell: ({ row }) => {
      return (
        <div className="flex justify-left gap-[2px]">
          <span className="text-base font-normal leading-[19px] text-[#444444] dark:text-black text-center">
            {row.original.email}
          </span>
        </div>
      );
    },
  },
];
