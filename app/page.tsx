 'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react"
import { LoginUser } from "./actions"
import { getCookie } from "@/utils/helper"
import { useRouter } from "next/navigation"
import axios from "axios"


export default function Home() {

  const [formState, formAction] = useActionState(LoginUser, null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access = getCookie("access_key");
    if(access)
    {
      (async () => {
        const response = await axios.get("/api/login");
        if(response.data.status)
        {
          router.push("/portal/dashboard");
        }else{
          setLoading(false)
        }

      })()
    }else{
      setLoading(false)
    }
  },[]);

  if(loading)
  {
    return <div>Loading...</div>
  }
  
  return (
    <main className="flex justify-center items-center" style={{height: "100vh"}}>
      <div>
      <form action={formAction}>

<Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>              
              <Input id="name" name="username" placeholder="Enter your username" />
              {formState && formState.message && formState.message.username && <span className="text-red-500">{formState.message.username}</span>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input id="passwrd" type="password" name="password" placeholder="Enter your password" />
              {formState && formState.message && formState.message.password && <span className="text-red-500">{formState.message.password}</span>}
              </div>
            
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Register</Button>
        <Button variant={"default"} type="submit">Login</Button>
      </CardFooter>
    </Card>
    </form>

    </div>
    </main>
  );
}
