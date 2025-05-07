'use server';

import prisma from "@/lib/prisma";
export const saveBlog = async(currentState:any, formData:any) =>{

const title =formData.get("title");
const author =formData.get("author");
const moderator = formData.get("moderator");
const publishDate=formData.get("publishDate");
const content = formData.get("content");
const idString = formData.get("id");
const id = Number(idString);
const categoryId=Number(formData.get("categoryId"))

if(!title || title.length<1){
    return{status:false,message:"Title is Required"};
}
if(!author || author.length<1){
    return{status:false,message:"Author name is Required"};
}
if(!moderator || moderator.length<1){
    return{status:false,message:"Moderator name is Required"};
}
if(!publishDate){
    return{status:false,message:"Publish date is Required"};
}
if(!content || content.length<1){
    return{status:false,message:"Content is Required"};
}

let where:any={title};
if(id){
    where = {title,NOT:{id}};
}
const existingBlog = await prisma.blogs.findFirst({
    where,
});
if(existingBlog){
    return{status:false,message:"A blog with this title already exists"}
}
const blogData = {
 
        title,
        author,
        moderator,
        publish_on: new Date(publishDate),
        body:content,
        status:true,
        categoryId,

};
let savedBlog;
if(id){
    savedBlog = await prisma.blogs.update({
        where:{id},
        data:blogData,
    });
}else{
    savedBlog = await prisma.blogs.create({
              data:blogData, 
    })
}
if(savedBlog){
    return{
        status:true,
        message:id?"Blog post updated succesfully":"Blog post created successfully"
    }
    
}
return{status:false,message:"Failed to save blog post"}
}