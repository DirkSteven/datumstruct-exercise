export function filterUsers(users, search) {
  const query = search.trim().toLowerCase();

  if (!query) {
    return users;
  }

  return users.filter((user) =>
    [user.name, user.username, user.email].some((field) =>
      field.toLowerCase().includes(query)
    )
  );
}