'use server';

import prisma from "@/lib/prisma";



export const saveCategory = async (currentState:any, formData:any) => {
    const categoryName = formData.get("catName");
    const idString = formData.get("id");
    const id = Number(idString);
        
    if(id)
    {
        console.log("mm", id);
    }

    if(categoryName.length < 1)
    {
        return { status: false, message: "Category name field is required" };
    }
    
    let where:any = {
        title: categoryName
    };

    if(id)
    {
        where = {
            title: categoryName,
            NOT: {
                id: id
            } 
        }
    }
    const category = await prisma.categories.findFirst({
        where: where
    });

    if(category)
    {
        return {status: false, message: "Category already exists"}
    }
    let save:any = null;

    if(!id)
    {
        save = await prisma.categories.create({
            data: {
                title: categoryName
            }
        });
    }else{
        save = await prisma.categories.update({
            data: {
                title: categoryName
            },
            where: {
                id: id
            }
        });
    }
    if(save)
    {

        return {status: true, message: "Category Created Successfully"}
    }

    return {}
}


