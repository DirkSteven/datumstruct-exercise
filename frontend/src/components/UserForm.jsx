import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
});

function UserForm({
    onUserCreated,
    onUserUpdated,
    editingUser,
    onCancelEdit,
}) {

    const [formError, setFormError] = useState("");
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
        },
    });

    useEffect(() => {
        if (editingUser) {
            reset({
                name: editingUser.name,
                username: editingUser.username,
                email: editingUser.email,
            });
        } else {
            reset({
                name: "",
                username: "",
                email: "",
            });
        }
    }, [editingUser, reset]);

    const onSubmit = async (data) => {
        try {
            setFormError("");

            if (editingUser) {
                await onUserUpdated(data);
            } else {
                await onUserCreated(data);
            }

            reset();
        } catch (error) {
            setFormError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 rounded-lg border p-6">

            {formError && (
                <p className="text-sm text-destructive">
                    {formError}
                </p>
            )}
            <div>
                <Input
                    placeholder="Name"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-destructive">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <Input
                    placeholder="Username"
                    {...register("username")}
                />
                {errors.username && (
                    <p className="mt-1 text-sm text-destructive">
                        {errors.username.message}
                    </p>
                )}
            </div>

            <div>
                <Input
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="flex gap-2">


                <Button type="submit">
                    {editingUser ? "Update User" : "Add User"}
                </Button>

                {editingUser && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancelEdit}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}

export default UserForm;