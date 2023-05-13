import express from 'express';
import { auth } from '../middleware/auth.js';
import { getAllMobiles, postMobilesInDB , deleteOne } from '../services/mobile.service.js';

const router = express.Router();

router.get("/",auth, async function (request, response) {
    const mobiles = await getAllMobiles();
    response.send(mobiles);
  });

router.delete("/:id", async function (request, response) {
    const { id } = request.params ;
    const roleId = request.header('x-Auth-roleId');
    if(roleId ==="1"){
      const mobiles = await deleteOne(id);
      response.send(mobiles);
    }else{
      response.status(401).send({message:"unauthorized"})
    }
  });
  
router.post("/",auth, async function (request, response) {
    const data = request.body;
    const output = await postMobilesInDB(data);
    response.send(output);
  });

export default router ;


