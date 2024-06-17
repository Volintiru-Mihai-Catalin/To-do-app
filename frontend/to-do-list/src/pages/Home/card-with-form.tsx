import {useState} from "react";
import axios from "axios";
import { Button } from "@/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx"
import { Calendar } from "@/components/ui/calendar.tsx"
import {useToast} from "@/components/ui/use-toast.ts";
import Menu from "@/pages/Menu.tsx";



function CardWithForm() {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [taskState, setTaskState] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();


  function handleAddTask() {

    if (title.length < 1 || description.length < 1 || taskState.length < 1 || date === undefined) {
      toast({
        title: "Ooops!",
        description: "You did not complete everything.",
        duration: 2000,
      })
      return;
    }

    axios.post("http://localhost:8080/api/tasks", {
      title: title,
      description: description,
      state: taskState,
      date: date.toISOString(),
    }).then((res) => {
      console.log(res.data);
      toast({
        title: "Done!",
        description: "Task created successfully.",
        duration: 2000,
      })

      setTitle("");
      setDescription("");
      setTaskState("");
      setDate(undefined);
    }).catch((err: string) => {
      console.error("Error creating task: ", err);
      toast({
        title: "Oops!",
        description: "Something went wrong.",
        duration: 2000,
      })
    })
  }

  function handleClear() {
    setTitle("");
    setDescription("");
    setTaskState("");
    setDate(undefined);
  }

  function chooseState(): string {
    switch (taskState) {
      case "CREATED": {
        return "Created";
      }
      case "IN_PROGRESS": {
        return "In progress";
      }
      case "DONE": {
        return "Done";
      }
      default: {
        return "Choose state";
      }
    }
  }

  return (
      <>
        <Menu />

        <div className="parent-card-container">
          <Card className="card-with-form">
            <CardHeader>
              <CardTitle>Create task</CardTitle>
              <CardDescription>Deploy your task in one-click</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="form-content">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Title of your task"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={setTaskState} value={taskState}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder={"Choose state"}>{chooseState()}</SelectValue>
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="CREATED">Created</SelectItem>
                        <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Description of your task"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Select date</Button>
                      </PopoverTrigger>
                      <PopoverContent className="inline-block p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border content-center"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleClear}>Clear</Button>
              <Button type="submit" onClick={handleAddTask}>Add Task</Button>
            </CardFooter>
          </Card>
        </div>
      </>
  )
}

export default CardWithForm;
