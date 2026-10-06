import { Button } from "@/components/ui/button";

function UserTable({
  users,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-[1.5fr_1.5fr_2fr_auto] gap-4 border-b p-4 font-medium">
        <span>Name</span>
        <span>Username</span>
        <span>Email</span>
        <span className="text-right">Actions</span>
      </div>

      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-[1.5fr_1.5fr_2fr_auto] items-center gap-4 border-b p-4 last:border-b-0"
        >
          <span>{user.name}</span>
          <span>{user.username}</span>
          <span>{user.email}</span>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onEdit(user)}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserTable;