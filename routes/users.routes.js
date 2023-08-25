import { Router } from 'express';
import * as User from '../models/index.models.js'

const router = Router();

router.get('/api/users'), async(req,res)=>{
    const users = await User.findAll()
    return res.json(users)
}

export default router