import { useState } from "react";
import { Input } from "@/components/ui/input";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import useUsers from "@/hooks/useUsers";
import { filterUsers } from "@/utils/userUtils";

function App() {
  const {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const filteredUsers = filterUsers(users, search);

  const handleUserCreated = async (userData) => {
    await createUser(userData);
  };

  const handleUserUpdated = async (userData) => {
    await updateUser(editingUser.id, userData);
    setEditingUser(null);
  };

  const handleUserDeleted = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    await deleteUser(id);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            User Management Dashboard
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage your users.
          </p>
        </div>

        <UserForm
          onUserCreated={handleUserCreated}
          onUserUpdated={handleUserUpdated}
          editingUser={editingUser}
          onCancelEdit={handleCancelEdit}
        />

        <Input
          placeholder="Search users..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mb-4"
        />

        {loading && <p>Loading users...</p>}

        {error && (
          <p className="text-destructive">
            {error}
          </p>
        )}

        {!loading && !error && (
          <UserTable
            users={filteredUsers}
            onEdit={setEditingUser}
            onDelete={handleUserDeleted}
          />
        )}
      </div>
    </main>
  );
}

export default App;