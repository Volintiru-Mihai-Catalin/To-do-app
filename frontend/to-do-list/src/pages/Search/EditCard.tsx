import {useEffect, useState} from 'react';
import { Task } from './columns';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";

interface EditCardProps {
    task: Task;
    onClose: () => void;
    onSave: (task: Task) => void;
}

export function EditCard({ task, onClose, onSave }: EditCardProps) {
    const [editedTask, setEditedTask] = useState<Task>({ ...task });
    const [date, setDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        date ? setEditedTask({ ...task, date : date.getFullYear().toString() + "-" +
                (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
                date.getDate().toString().padStart(2, '0')})
            : null;
    }, [task, date]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Card className="card-with-form">
                <CardHeader>
                    <CardTitle>Edit task</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="form-content">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Title of your task"
                                    value={editedTask.title}
                                    onChange={(e) => {
                                        setEditedTask({ ...editedTask, title: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={editedTask.state} onValueChange={
                                    (value) => setEditedTask({...editedTask, state: value})
                                }>
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder={"Choose state"} />
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
                                    value={editedTask.description}
                                    onChange={(e) => {
                                        setEditedTask({ ...editedTask, description: e.target.value });
                                    }}
                                />
                            </div>
                            <div>
                                <Popover>
                                    <PopoverTrigger>Select date</PopoverTrigger>
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
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    <Button type="submit" onClick={() => onSave(editedTask)}>Save</Button>
                </CardFooter>
            </Card>
        </div>
    );
}