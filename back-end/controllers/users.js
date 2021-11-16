module.exports = {

    signUp: async (req, res, next) => {
        // Username & Password
        console.log('contents of req.value.body', req.value.body)
        console.log('UsersController.signUp() called.')
    },
//comment
    signIn: async (req, res, next) => {
        // Generate token
        console.log('UsersController.signIn() called.')
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called.')
    }

}