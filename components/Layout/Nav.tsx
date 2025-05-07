'use client'
import Link from "next/link";
import { useRouter } from "next/navigation"



import {
    Menubar,
   
    MenubarContent,
    MenubarItem,
    MenubarMenu,
   
    MenubarSeparator,

    MenubarTrigger,
  } from "@/components/ui/menubar"
import axios from "axios";


const Nav = () => {

  const router = useRouter(); 
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
 
    const gotoPage = (url:string) => {
        console.log(url);
    }
   

    const logout = () => {
      
  axios.delete('/api/logout').then((res:any) => {
    if(res.data.status)
    {
      router.push('/');
    }
  });
    

  };

    return (
        <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Create</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => gotoPage('/portal/blog/create')}>
          <Link href={`/portal/category/create`} > Create Blog Category </Link> 
          </MenubarItem>
          <MenubarItem>
          <Link href={`/portal/blog/create`} >   Create Blog Post </Link>
          </MenubarItem>
          <MenubarItem>
          <Link href={`/portal/createuser`} >   Create User </Link>
          </MenubarItem>
          <MenubarSeparator /> 
        </MenubarContent>
      
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => gotoPage('/portal/blog/create')}>
          <Link href={`/portal/category`} > Categories</Link> 
          </MenubarItem>
          <MenubarItem>
          <Link href={`/portal/blog`} > Blogs </Link>
          </MenubarItem>
          <MenubarItem>
          <Link href={`/portal/users`} >   User </Link>
          </MenubarItem>
          <MenubarSeparator /> 
        </MenubarContent>
      
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Application</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
          <Link href={`/portal/changepassword`}>Change Password </Link> 
          </MenubarItem>
         
          <MenubarSeparator />
         
          </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
        <MenubarTrigger onClick={logout} >Logout</MenubarTrigger>
        
          </MenubarMenu>
         
      
    </Menubar>
    );
}

export default Nav;