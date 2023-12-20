export const getUsersRoles = () => fetch("/yodata/admin/users/roles", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())

export const saveRole = (request) => fetch("/yodata/admin/users/roles", {
  method: "PUT",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify(request)
})
  .then(response => response.text())

export const deleteRole = (request) => fetch("/yodata/admin/users/roles", {
  method: "Delete",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify(request)
})
  .then(response => response.text())
