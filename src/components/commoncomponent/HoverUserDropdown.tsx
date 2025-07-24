import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import zustandStore from "@/store";
import { User } from "lucide-react";
import { useState, useRef } from "react";

export default function HoverUserDropdown() {
    const [open, setOpen] = useState(false);
    const { user } = zustandStore();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleLogout = () => {
        // localStorage.removeItem("token");
        zustandStore.getState().logout();
    }
    return (
        <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <div className="flex gap-2 items-center cursor-pointer p-2 rounded-full">
                        <User />
                        {user && <span>{user?.name}</span>}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2 cursor-pointer">
                    {/* <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem> */}
                    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
