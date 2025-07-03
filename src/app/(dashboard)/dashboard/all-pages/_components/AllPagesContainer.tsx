"use client";
import React, { useState } from "react";
import AddNewPage from "./AddNewPage";

export interface PageData {
  id: number;
  name: string;
  body: string;
  status?: string;
}

const AllPagesContainer = () => {
  const [addNewPageOpen, setAddNewPageOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);

  const allPagesData: PageData[] = [
    { id: 1, name: "Home", body: "hello home" },
    { id: 2, name: "About", body: "hello about" },
    { id: 3, name: "Blog", body: "hello blog" },
    { id: 4, name: "Contact", body: "hello contact" },
    { id: 5, name: "Products", body: "hello products" },
    { id: 6, name: "Services", body: "hello services" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Pages</h2>

      <div className="flex justify-end mb-4">
        <button onClick={() => {setAddNewPageOpen(true); setSelectedPage(null);}} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Add New Page
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Page Name</th>
              <th className="py-3 px-4 border-b">Body</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {allPagesData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td className="py-2 px-4 border-b font-medium">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.body}</td>
                <td className="py-2 px-4 border-b text-gray-500">
                  {item.status || "Draft"}
                </td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => {setSelectedPage(item) ; setAddNewPageOpen(true)}} className="text-blue-600 hover:underline mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* add new page  */}
      {
        addNewPageOpen && (
            <AddNewPage initialData={selectedPage} isOpen={addNewPageOpen} setIsOpen={setAddNewPageOpen}/>
        )
      }
    </div>
  );
};

export default AllPagesContainer;

