'use client'

import {
    Table,
    TableBody,
    
    TableCell,
 
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Layout from "@/components/Layout/Layout"
  import axios from 'axios';
import { useEffect, useState } from "react";
import Link from "next/link";
//import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


  export default function Userlist(){
    const initUsers:any=null;
    const [users,setUsers] =useState(initUsers);
    const [status, setStatus] = useState<string | null>(null);
    useEffect(() => {
        getUsers();
       }, []);
  
       const getUsers =() => {
        axios.get('/api/users').then((response:any) => {
          if(response.data.data)
          {
            setUsers(response.data.data);
          }
        })
       }
       const handleDelete = async (id:number) =>{
        try{
          const response = await axios.delete(`/api/users/${id}`);
          if(response.status){
            setStatus('User deleted succesfully');
            setUsers((prev:any) => {
              let copy:any=prev;
              copy = copy.filter((item:any) => item.id != id);
              return [...copy];
            });
          }
          else{
            setStatus('Error:Could not delete user');
          }
        }
        catch(error:unknown){
          setStatus(`Error:${(error as Error).message}`);
        }
       }

    return(
        <Layout>
        <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Users</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
         
      
             {users &&users.map((item:any) => (
              <TableRow key={item.id}>
                <TableCell >{item.id}</TableCell>
                <TableCell >{item.username}</TableCell>
                <TableCell ><Link href={`/portal/users/${item.id}`}> Edit</Link></TableCell>
                <TableCell><button onClick={() => handleDelete(item.id)}>Delete</button></TableCell>    
            </TableRow>
          ))}
        
         
      
        </TableBody>
        </Table>
        </Layout>
    )
  }