import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/api/users";
import UserForm from "@/components/UserForm";
import { Button } from "@/components/ui/button";
import UserTable from "@/components/UserTable";




function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [formError, setFormError] = useState("");

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handleUserCreated = async (userData) => {
    const newUser = await createUser(userData);

    setUsers((currentUsers) => [...currentUsers, newUser]);
  };

  const handleUserUpdated = async (userData) => {
    const updatedUser = await updateUser(editingUser.id, userData);

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    setEditingUser(null);
  };


  const handleUserDeleted = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id);

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };


  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }



    loadUsers();
  }, []);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              User Management Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your users.
            </p>
          </div>
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