export const unbook = async (token) => {
    unbookCourt(token)
    .then(user => {
        setUser(user)
        setBooked(false)
    })
}