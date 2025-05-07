'use client'
import React from 'react';
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { useActionState,useState ,useEffect} from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';

import { Updateuser } from './action';
import { useParams } from "next/navigation";

export default function UpdateUser() {
    const initUser =null;
    const [user,setUser]= useState(initUser);
 const [formState,formAction] = useActionState(Updateuser,null)
   const params = useParams();

 
   const { slug }:any = params;
   useEffect(() => {
    if (formState !== null && formState?.status) {
      setUser(initUser);
    }
    if(slug !== "create")
    {
      getCategory(slug);
    }
  }, [formState]);

  const getCategory = (id:string) => {
    axios.get(`/api/users/${id}`).then((response:any) =>{
      if(response.data.status)
      {
        setUser(response.data.data.username);
      }
    });
  }
  const changeHandler = (e:any) => {
setUser(e.target.value);
  }

   
    return(
        <Layout>
           {formState && formState.error && <span>{formState.error}</span>}
        {formState && formState.message && <span>{formState.message}</span>}
        <form action={formAction}>


<Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Update user</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
               
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" name="username" value={user ?? ""} onChange={changeHandler} placeholder="Enter your username" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password"> Password</Label>
                  <Input id="password" type="password" name="password" placeholder="Enter your new password" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm your new password" />
                </div>

              </div>
              {slug !== "create" ? <Input type="hidden" name="id" value={slug} />: ""}
              
            </CardContent>

            <CardFooter className="flex justify-between">
              
              <Button variant="default" type="submit">Submit</Button>
            </CardFooter>
          </Card>


            </form>
        </Layout>
    )
}