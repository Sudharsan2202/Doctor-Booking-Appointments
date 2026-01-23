import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ CREATE req.user FIRST
        req.user = {
            docId: decoded.id
        };

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authDoctor;
