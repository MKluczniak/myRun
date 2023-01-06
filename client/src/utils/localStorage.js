export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user)) //bc we can only store strings in local storage
}
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user")
}
