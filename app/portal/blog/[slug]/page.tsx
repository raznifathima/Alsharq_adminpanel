"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Layout from "@/components/Layout/Layout";
import { useActionState, useEffect, useState } from "react";
import {saveBlog} from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import axios from "axios";
import { useParams } from "next/navigation";

export default function Blogdetail() {
  const [title,setTitle]=useState("");
  const [author,setAuthor] =useState("");
  const [moderator,setModerator] = useState("");
  const [publishDate,setPublishDate] = useState("");
  const [content,setContent] = useState("");

  const [formState,formAction]=useActionState(saveBlog,null);
  const [category, setCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [id,setId]=useState(0);
  const initBlog = null

//const [blog,setBlog]= useState(initBlog);
const params =useParams();
const { slug }:any =params

  useEffect(() => {
    axios
      .get("/api/blog/categories")
      .then((response) => {
               if (response.data.data) {
        
          setCategories(response.data.data || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  useEffect(()=>{
  if(formState !== null && formState?.status){
    setTitle("");
  setAuthor("");
  setModerator("");
  setPublishDate("");
  setContent("");
}
  },[formState]);


  useEffect(() => {
    if(formState !== null && formState?.status){
    //  setBlog(initBlog)
    }
    if(slug !== "create"){
      setId(slug)
     getBlogdata(slug)
    }
    }, [slug, formState])

const changeHandler = (e:any)=>{
  switch(e.target.name){
    case 'title':
      setTitle(e.target.value);
      break;
      case 'author':
        setAuthor(e.target.value);
        break;
        case 'moderator':
      setModerator(e.target.value);
      break;
      case 'publishDate':
      setPublishDate(e.target.value);
      break;
      case 'content':
      setContent(e.target.value);
      break;
      default :break;
  }
};


const getBlogdata =(id:string) => {
  axios.get(`/api/blog/${id}`).then((response:any) => {
    if(response.data.status){
   const data=response.data.data;
   //setBlog(data);
      setTitle(data.title || "");
      setAuthor(data.author || "");
      setPublishDate(data.publish_on || "");
      setContent(data.body || "");
      setModerator(data.moderator || "");
      console.log("publish_on", data.publish_on);


     
    }
  })
}




let messages = null;
if(formState!== null){
  messages=(
    <Alert variant={formState?.status ? "default" : "destructive"}>
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{formState?.status ? "Success" : "Error"}</AlertTitle>
    <AlertDescription>{formState?.message}</AlertDescription>
  </Alert>
  );
}




    return(
        <Layout>
  <div>
    <div className="max-w-4xl mx-auto p-6">
        <h2>Create Blog Post</h2>
        <br/>
        {messages}
        <form action={formAction} > 
        <div className="max-w-4xl mx-auto p-6">
    <Label htmlFor="name">Blog Title</Label>              
    <Input id="name" 
    placeholder="Enter blog title"
    name ="title"
    value={title}
    onChange={changeHandler}
    />
    {id && <input type="hidden" name="id" value = {id} />}
   </div>

    <div className="max-w-4xl mx-auto p-6">
        <div className="flex">
      
    <div className="m-1 flex-1 ml-0">
    <Label htmlFor="name">Author</Label> 
    <Input
     id="name" 
     placeholder="Name"
     name ="author"
      value={author}
      onChange={changeHandler}
     />  
    </div>
    <div className="m-1 flex-1">
    <Label htmlFor="name">Blog Moderator</Label>              
    <Input 
     id="name"
      placeholder="Name"
      name ="moderator"
      value={moderator}
      onChange={changeHandler}
      />  
    </div>
    <div className="m-1 mr-0 flex-1">
    <Label htmlFor="name">Publish Date</Label>              
    <Input id="date" 
    type="date" 
    placeholder="Date"
    
    name ="publishDate"
    value={publishDate}
    onChange={changeHandler}/>  
    </div>
    </div>
    <div className="m-1 flex-1">
    <Label htmlFor="name">Category</Label>
    <Select
    name="categoryId"
    value ={category?.toString()|| ""}
    onValueChange={(value)=> setCategory(Number(value))}
    >
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Categories" />
  </SelectTrigger>
  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.title}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value ="null" >No categories available</SelectItem>
                    )}
                  </SelectContent>
</Select>

        </div>
       

    <div className="mt-4">
    <Textarea
     name ="content"
     value={content}
     onChange={changeHandler}
    
    />
    </div>
    
    <Button>Post</Button>
  </div>
  </form>
    </div>
  </div>


</Layout>


);
}
