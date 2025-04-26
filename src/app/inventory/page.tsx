"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useEffect, useState} from 'react';
import {Skeleton} from '@/components/ui/skeleton';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Layout} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bookNo: z.string().min(2, {
    message: "Book No must be at least 2 characters.",
  }),
  pageNo: z.number().min(1, {
    message: "Page No must be greater than 0.",
  }),
  quantity: z.number().min(1, {
    message: "Quantity must be greater than 0.",
  }),
});

interface InventoryItem {
  id: string;
  name: string;
  bookNo: string;
  pageNo: number;
  quantity: number;
}

const columns = [
  {
    id: "rowNumber",
    label: "#",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "bookNo",
    label: "Book No",
  },
  {
    id: "pageNo",
    label: "Page No",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "actions",
    label: "Actions",
  },
];


const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockInventoryItems: InventoryItem[] = [
        {
          id: "1",
          name: "Notebook",
          bookNo: "NB-001",
          pageNo: 120,
          quantity: 200,
        },
        {
          id: "2",
          name: "Pen",
          bookNo: "PN-002",
          pageNo: 1,
          quantity: 500,
        },
        {
          id: "3",
          name: "Chair",
          bookNo: "CH-003",
          pageNo: 1,
          quantity: 100,
        },
      ];
      resolve(mockInventoryItems);
    }, 500);
  });
};

const createInventoryItem = async (data: z.infer<typeof FormSchema>): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Inventory item created:", data);
      resolve();
    }, 500);
  });
};

const deleteInventoryItem = async (id: string): Promise<void> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Deleted inventory item with id: ${id}`);
      resolve();
    }, 500);
  });
};

export default function InventoryPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
   const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      bookNo: "",
      pageNo: 1,
      quantity: 1,
    },
  });

  const { control, handleSubmit } = form;

    useEffect(() => {
    const loadInventoryItems = async () => {
      setLoading(true);
      const inventoryData = await fetchInventoryItems();
      setInventoryItems(inventoryData);
      setLoading(false);
    };

    loadInventoryItems();
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createInventoryItem(data);

    setOpen(false);
    setInventoryItems([...inventoryItems, { id: Math.random().toString(), ...data }]); // Optimistically update the UI
    toast({
      title: "Item added.",
      description: `Item "${data.name}" has been created.`,
    });
  };

  const onDelete = async (id: string) => {
    await deleteInventoryItem(id);
    setInventoryItems(inventoryItems.filter((item) => item.id !== id));
    toast({
      title: "Inventory item deleted.",
      description: "The inventory item has been deleted successfully.",
    });
  };


  return (
    <Layout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Manage inventory items.</CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Item</DialogTitle>
                <DialogDescription>
                  Add a new item to the inventory.
                </DialogDescription>
              </DialogHeader>
               <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                   <Controller
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                         <Input id="name" placeholder="Item Name" className="col-span-3" {...field} />
                      )}
                    />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bookNo" className="text-right">
                    Book No
                  </Label>
                   <Controller
                      name="bookNo"
                      control={form.control}
                      render={({ field }) => (
                         <Input id="bookNo" placeholder="Book No" className="col-span-3" {...field} />
                      )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pageNo" className="text-right">
                    Page No
                  </Label>
                   <Controller
                      name="pageNo"
                      control={form.control}
                      render={({ field }) => (
                         <Input id="pageNo" placeholder="Page No" type="number" className="col-span-3" {...field} />
                      )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                   <Controller
                      name="quantity"
                      control={form.control}
                      render={({ field }) => (
                         <Input id="quantity" placeholder="Quantity" type="number" className="col-span-3" {...field} />
                      )}
                    />
                </div>
                 <Button type="submit">Add</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <>
                  {Array.from({length: 3}).map((_, i) => (
                    <TableRow key={i}>
                     <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80%]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80%]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80%]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-[80%]" />
                      </TableCell>
                       <TableCell>
                        <Skeleton className="h-4 w-[60%]" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                inventoryItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.bookNo}</TableCell>
                    <TableCell>{item.pageNo}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                     <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the inventory item
                              and remove their data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 text-red-50"  onClick={() => onDelete(item.id)}>Delete</AlertDialogAction>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}

