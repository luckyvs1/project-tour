import db from "./db"

const Auth = () => {
    return {
        authenticate: (username, done) => {
            db.select('password', 'user_id', 'username')
            .from('users')
            .where({username:username})
            .then(done)
        }
    }
}

export default Auth;