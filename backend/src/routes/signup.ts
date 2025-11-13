import { Request, Response, Router } from "express";

const router = Router();

let Users: { email: string; password: string }[] = [];

router.post("/register", (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    return res.json({
      error: "Incomplete credentials",
    });
  }
  try {
    Users.map((user) => {
      if (user.email === email) {
        return res.json({
          error: "User already exists",
        });
      }
    });
    Users.push({ email, password });
  } catch (error) {
    console.log("Error doing registration");
    return res.json({
      error,
    });
  }
});



export default router;
