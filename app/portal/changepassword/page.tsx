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
import { savePassword } from './actions';
export default function LoginPage() {
  const [formState,formAction]=useActionState(savePassword,null)
  return (
    <Layout>
      <main className="flex justify-center items-center" style={{ height: "100vh" }}>
        {formState && formState.error && <span>{formState.error}</span>}
        {formState && formState.message && <span>{formState.message}</span>}
        <div>
        <form action={formAction}>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Current Password</Label>
                  <Input id="currentpassword" type="password" name="currentpassword" placeholder="Enter your current password" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="newpassword" type="password" name="newpassword" placeholder="Enter your new password" />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input id="confirmpassword" type="password" name="confirmpassword" placeholder="Confirm your new password" />
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
  );
}
