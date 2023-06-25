import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ data: 'Aqui_Modelos' })
})

export { router }
