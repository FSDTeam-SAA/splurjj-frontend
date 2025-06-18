// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import { ColumnDef } from "@tanstack/react-table";
// import { Role } from "./RoleManagementDataType";

// export const SubscriberColumn: ColumnDef<Role>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     header: "Full Name",
//     cell: ({ row }) => {
//       return (
//         <div className="flex justify-center gap-[2px]">
//           <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
//             {row.original.full_name}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     header: "Email Address",
//     cell: ({ row }) => {
//       return (
//         <div className="flex justify-center gap-[2px]">
//           <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
//             {row.original.email}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     header: "Phone",
//     cell: ({ row }) => {
//       return (
//         <div className="flex justify-center gap-[2px]">
//           <span className="text-base font-normal leading-[19px] text-[#444444] text-center">
//             {row.original.phone}
//           </span>
//         </div>
//       );
//     },
//   }
// ];
