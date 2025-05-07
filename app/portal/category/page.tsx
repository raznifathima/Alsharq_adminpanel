'use client';

import {
    Table,
    TableBody,
  
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Layout from "@/components/Layout/Layout"
  import axios from 'axios';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
  
  
  export default function Categorydetail() {
    const initCategories:any = null;
    const [categories, setCategories] = useState(initCategories);
      const [status, setStatus] = useState<string | null>(null);
    useEffect(() => {
      getCategories();
    }, []);

    const getCategories = () => {
      axios.get('/api/category').then((response:any) => {
          if(response.data.status)
          {
            // console.log(response.data.data);
            setCategories(response.data.data);
          }
      })
    }

  
    const handleDelete = async (id:number) => {
      try{
        const response = await axios.delete(`/api/category/${id}`);
        if(response.status){
          setStatus('Category deleted succesfully');
          setCategories((prev:any) => {
            let copy: any = prev;
            copy = copy.filter((item:any) => item.id != id);
            return [...copy];
          });
        }
        else {
          setStatus('Error :Could not delete category');
        }
      }
      catch(error:unknown){
        setStatus(`Error:${(error as Error).message}`);
      }
    }
     
    return (
       <Layout>
        {status &&  <Alert variant={"default"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{"Success"}</AlertTitle>
        <AlertDescription>{status}</AlertDescription>
      </Alert>}
        <div><h1>Blog Categories</h1></div>
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Category Name</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
         
            {categories && categories.map((item:any) => (
              <TableRow key={item.id}>
                <TableCell >{item.id}</TableCell>
                <TableCell >{item.title}</TableCell>
                <TableCell ><Link href={`/portal/category/${item.id}`}> Edit</Link></TableCell>
                <TableCell><button onClick={() => handleDelete(item.id)}>Delete</button></TableCell>    
            </TableRow>
          ))}
         
      
        </TableBody>
        <TableFooter>
         
        </TableFooter>
      </Table>
      </Layout> 
    )
  }
  