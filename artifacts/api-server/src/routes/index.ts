import { Router, type IRouter } from "express";
import healthRouter from "./health";
import analyticsRouter from "./analytics";
import commerceRouter from "./commerce";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(analyticsRouter);
router.use(commerceRouter);
router.use(adminRouter);

export default router;
