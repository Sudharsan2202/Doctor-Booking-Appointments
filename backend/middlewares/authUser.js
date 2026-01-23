import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = (req, res, next) => {
  try {
    const token = req.headers.token

    if (!token) {
      return res.json({ success: false, message: "Not Authorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id

    next()
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


export default authUser;