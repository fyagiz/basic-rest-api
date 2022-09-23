import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const NAMESPACE = 'Health Check Controller';

function healthCheck(req: Request, res: Response, next: NextFunction) {
    logger.info(NAMESPACE, `/api/v1/healthcheck`);

    return res.status(200).json({
        currentDate: new Date().toString()
    });
}

export default { healthCheck };
