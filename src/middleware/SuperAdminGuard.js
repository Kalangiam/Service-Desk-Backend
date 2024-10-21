import Auth from "../common/Auth.js";

let SuperAdminGuard = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization?.split(" ")[1]
        if (token) {
            let data = await Auth.decodeToken(token)
            let user = req.headers.user
            if (data.role === "superadmin" && user.role === "superadmin") {
                next()
            }
            else {
                res.status(401).send({
                    message: "UnAuthorized Access"
                })
            }
        }
        else {
            res.status(401).send({
                message: "unauthorized Access"
            })
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal server Error"
        })
    }
}

export default SuperAdminGuard
