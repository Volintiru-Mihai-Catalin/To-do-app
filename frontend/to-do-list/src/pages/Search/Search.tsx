import { useState, useEffect } from 'react';
import { Task, columns as getColumns } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios"
import {EditCard} from "@/pages/Search/EditCard.tsx";
import Menu from "@/pages/Menu.tsx";

async function getData(): Promise<Task[]> {
    try {
        const res = await axios.get("http://localhost:8080/api/tasks");
        return res.data as Task[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function deleteData(id: number): Promise<void | undefined> {
    try {
        const res = await axios.delete(`http://localhost:8080/api/tasks/${id}`);
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

async function updateData(task: Task): Promise<void> {
    try {
        const res = await axios.put(`http://localhost:8080/api/tasks`, {
            id: task.id,
            title: task.title,
            description: task.description,
            state: task.state,
            date: new Date(task.date).toISOString(),
        });
        console.log(res);
    } catch (error) {
        console.error(error);
    }
}

export default function Search() {

    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingTask, setEditingTask] = useState<Task | null>(null)

    const getTaskById = (id: number): Task | null => {
        if (!data)
            return null;

        const result = data.filter((task) => task.id === id);
        if (! result)
            return null;

        return result[0];
    }

    const deleteRow = (id: number) => {
        deleteData(id);
        setData((prevData) => prevData.filter((task) => task.id !== id))
    }

    const editRow = (task: Task) => {
        setEditingTask(task);
    }

    const saveTask = (updateTask: Task) => {
        setData((prevData) => prevData.map((task) => (task.id === updateTask.id ? updateTask : task)));
        updateData(updateTask);
        setEditingTask(null);
    }

    const columns = getColumns(editRow, deleteRow);

    useEffect(() => {
        getData().then(fetchedData => {
            setData(fetchedData);
            setLoading(false);
        })
    }, []);

    return (
        <>
            <Menu/>
            <div className="container mx-auto py-10">
                {loading ? <div>Loading...</div> : <DataTable
                    columns={columns}
                    data={data}
                    taskEditor={editRow}
                    getTaskById={getTaskById}
                />}
                {editingTask && (
                    <EditCard task={editingTask} onClose={() => setEditingTask(null)} onSave={saveTask}/>
                )}
            </div>
        </>
    );
}