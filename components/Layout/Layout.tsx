import Nav from "./Nav";
import {
    Card,
    CardContent,
    CardDescription,
  
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const Layout = ({children, title, description}:any) => {
    return (<>
    <header>
        <Nav />
    </header>
    <main className="mt-3">
    <Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent>
    {children}
    </CardContent>
    </Card>
    </main>
    </>)
}


export default Layout;