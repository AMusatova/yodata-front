export const getAllUsers = () => fetch("/yodata/admin/users", {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  }
})
.then(response => response.json())

export const createUser = (user) => {
  return fetch("/yodata/admin/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.text())
}