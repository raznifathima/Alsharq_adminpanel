'use client'
import React from 'react';
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createuser } from '../createuser/action';

export default function User(){
  const [formState,formAction]=useActionState(createuser,null)
return(
    <Layout>
      <main className="flex justify-center items-center" style={{ height: "100vh" }}>
        
        <div>
        {formState && formState.error && <span>{formState.error}</span>}
        {formState && formState.message && <span>{formState.message}</span>}
        <form action={formAction}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Create User</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" name="username" placeholder="Enter your username" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" name="password" placeholder="Enter your password" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm your password" />
                </div>

              </div>
              
            </CardContent>

            <CardFooter className="flex justify-between">
              
              <Button variant="default" type="submit">Submit</Button>
            </CardFooter>
          </Card>
          </form>
        </div>
        
      </main>
      
    </Layout>

)
   

}