//Components
import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"

export default function Layout() {
    return (
        <>
            <Header />
            <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}