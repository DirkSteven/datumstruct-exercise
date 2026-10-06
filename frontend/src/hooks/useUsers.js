import { useEffect, useState } from "react";
import {
  getUsers,
  createUser as createUserRequest,
  updateUser as updateUserRequest,
  deleteUser as deleteUserRequest,
} from "@/api/users";

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const createUser = async (userData) => {
    const newUser = await createUserRequest(userData);

    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);
  };

  const updateUser = async (id, userData) => {
    const updatedUser = await updateUserRequest(id, userData);

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const deleteUser = async (id) => {
    await deleteUserRequest(id);

    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
}

export default useUsers;