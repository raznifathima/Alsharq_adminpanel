'use client'

import {
    Table,
    TableBody,
    TableCaption,
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
  
  export default function Blog() {
     const initBlogs:any=null;
     const [blogs,setBlogs] =useState(initBlogs);
     const [status, setStatus] = useState<string | null>(null);
     useEffect(() => {
      getBlogs();
     }, []);

     const getBlogs =() => {
      axios.get('/api/blog').then((response:any) => {
        if(response.data.status)
        {
          setBlogs(response.data.data);
        }
      })
     }

     const handleDelete = async (id:number) =>{
      try{
        const response = await axios.delete(`/api/blog/${id}`);
        if(response.status){
          setStatus('Blog deleted succesfully');
          setBlogs((prev:any) => {
            let copy:any=prev;
            copy = copy.filter((item:any) => item.id != id);
            return [...copy];
          });
        }
        else{
          setStatus('Error:Could not delete blog');
        }
      }
      catch(error:unknown){
        setStatus(`Error:${(error as Error).message}`);
      }
     }

    return (
       <Layout>
        <div><h1>Blog Lists</h1></div>
        {status &&  <Alert variant={"default"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{"Success"}</AlertTitle>
        <AlertDescription>{status}</AlertDescription>
      </Alert>}
      <Table>
        <TableCaption>A list of your Blogs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
         {blogs && blogs.map((item:any) => (
          <TableRow key={item.id}>
              <TableCell >{item.id}</TableCell>
              <TableCell >{item.title}</TableCell>
              <TableCell ><Link href={`/portal/blog/${item.id}`}>Edit</Link></TableCell>
              <TableCell> <button onClick={() => handleDelete(item.id)}>Delete</button></TableCell>
              
            </TableRow>
         ))}
            
          
      
        </TableBody>
        <TableFooter>
         
        </TableFooter>
      </Table>
      </Layout> 
    )
  }
  