import AdminLayout from "@/layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaRegTimesCircle, FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Pagination from "@/Components/Pagination";
import toast from "react-hot-toast";
import PopupTodo from "@/Components/PopupTodo";

const Todo = ({ todos }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [todoProps, setTodoProps] = useState({
        id: "",
        name: "",
    });
    const { flash, errors } = usePage().props;

    const { data, setData, reset } = useForm({
        name: "",
    });

    const storeTodo = (e) => {
        e.preventDefault();
        router.post("/todo", data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        flash.message && toast.success(flash.message);
    }, [flash]);

    const handleComplete = (id, name, isComplete) => {
        let title = document.getElementById(id);
        title.innerText = "Processing...";
        router.patch(
            `/todo/edit-complete/${id}`,
            {
                is_complete: !isComplete,
            },
            {
                onSuccess: () => {
                    title.innerText = name;
                },
            }
        );
    };

    const handleShowConfirmation = (id, name) => {
        setShowConfirm(true);
        setTodoProps({id: id, name: name});
    };

    return (
        <>
            <Head title="TODO" />
            <AdminLayout>
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-semibold text-4xl my-8 text-center">
                        Todo App
                    </h2>
                    {/* {flash.message && (
                        <div className="py-2 px-4 rounded-md bg-green-300 text-center mb-6">
                            {flash.message}
                        </div>
                    )} */}
                    <form onSubmit={storeTodo}>
                        <div className="mb-6">
                            <div className="flex gap-4 items-center">
                                <input
                                    type="text"
                                    placeholder="Enter todo here"
                                    className="px-4 py-2 rounded-md grow"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    value={data.name}
                                />
                                <button className="py-2 px-4 rounded-md bg-indigo-500 text-white">
                                    Save
                                </button>
                            </div>
                            {errors.name && (
                                <p className="text-red-700 text-sm mt-2">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </form>
                    <div className="flex flex-col gap-4">
                        {todos.data.map((todo, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center py-3 px-6 ${
                                        todo.is_complete
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                    } rounded-md`}
                                >
                                    <h3 id={todo.id}>{todo.name}</h3>
                                    <div className="flex items-center justify-center gap-2">
                                        {todo.is_complete ? (
                                            <FaRegTimesCircle
                                                className="cursor-pointer text-red-600"
                                                size={20}
                                                onClick={() =>
                                                    handleComplete(
                                                        todo.id,
                                                        todo.name,
                                                        todo.is_complete
                                                    )
                                                }
                                            />
                                        ) : (
                                            <FaCheckCircle
                                                className="cursor-pointer"
                                                size={20}
                                                onClick={() =>
                                                    handleComplete(
                                                        todo.id,
                                                        todo.name,
                                                        todo.is_complete
                                                    )
                                                }
                                            />
                                        )}
                                        <Link href={`todo/edit/${todo.id}`}>
                                            <HiMiniPencilSquare size={20} />
                                        </Link>
                                        |{" "}
                                        <FaTrash
                                            size={17}
                                            className="cursor-pointer"
                                            onClick={() => handleShowConfirmation(todo.id, todo.name)}
                                        />
                                        {showConfirm && (<PopupTodo todoProps={todoProps} setShowConfirm={setShowConfirm}/>)}
                                        
                                    </div>
                                </div>
                            );
                        })}
                        {/* <div className="flex justify-between items-center py-3 px-6 bg-red-100 rounded-md">
                            <h3>Lorem, ipsum dolor.</h3>
                            <div className="flex items-center justify-center gap-2">
                                <HiMiniPencilSquare size={20} /> | {" "} <FaTrash size={17}/>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-3 px-6 bg-green-100 rounded-md">
                            <h3>Lorem, ipsum dolor.</h3>
                            <div className="flex items-center justify-center gap-2">
                                <FaCheckCircle size={20} /> | <FaTrash size={17}/>
                            </div>
                        </div> */}
                    </div>

                    <div className="mt-8 flex justify-end items-center">
                        <Pagination todos={todos} />
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default Todo;
