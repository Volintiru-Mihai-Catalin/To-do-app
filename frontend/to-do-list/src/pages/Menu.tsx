import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";

function Menu() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Menu</Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 flex flex-col items-center">
                <div className="grid gap-4">
                    <Button className="w-full" onClick={() => {window.location.href = "http://localhost:5173/search"}}>
                        Search tasks
                    </Button>
                    <Button className="w-full" onClick={() => {window.location.href = "http://localhost:5173/"}}>
                        Add Task
                    </Button>

                </div>
            </PopoverContent>
        </Popover>
    );
}
export default Menu;