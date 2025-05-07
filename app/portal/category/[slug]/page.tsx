"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout/Layout";
import { useActionState, useEffect, useState } from "react";
import { saveCategory } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Category () {
  const initCategoryName = null;
  const [categoryName, setcategoryName] = useState(initCategoryName);
  const [formState, formAction] = useActionState(saveCategory, null);

  const params = useParams();

  const { slug }:any = params;

  useEffect(() => {
    if (formState !== null && formState?.status) {
      setcategoryName(initCategoryName);
    }
    if(slug !== "create")
    {
      getCategory(slug);
    }
  }, [formState]);

  const getCategory = (id:string) => {
    axios.get(`/api/category/${id}`).then((response:any) =>{
      if(response.data.status)
      {
        setcategoryName(response.data.data.title);
      }
    });
  }
 

  

  const changeHandler = (e: any) => {
    setcategoryName(e.target.value);
  };
  let messages = null;
  if (formState !== null) {
    messages = (
      <Alert variant={formState?.status ? "default" : "destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{formState?.status ? "Success" : "Error"}</AlertTitle>
        <AlertDescription>{formState?.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Layout>
      <div>
        <div className="max-w-4xl mx-auto p-6">
          <h2>Blog Category Form</h2>
        </div>
        {messages}
        <form action={formAction}>
          <div className="max-w-4xl mx-auto p-6">
            <Label htmlFor="name">Category</Label>
            <Input
              id="name"
              placeholder="Category"
              name="catName"
              onChange={changeHandler}
              value={categoryName ?? ""}
            />
            {slug !== "create" ? <Input type="hidden" name="id" value={slug} />: ""}
          </div>
          <div className="max-w-4xl mx-auto p-6">
            <Button>Save</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
