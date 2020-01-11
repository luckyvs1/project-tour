import Auth from '../models/AuthModel'

export default class AuthController {

    login(req, res) {
        const username = req.body.username;
        
        Auth().authenticate(username, (value) => {
            if (value.length != 0) {
                // Valid login
                console.log('Success')
                return res.redirect('/');
              } else {
                // Incorrect password
                console.log('Fail')
                return res.redirect('/login');
            }
        })
    }
}


