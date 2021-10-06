import express from 'express';
import linkService from '../services/linkService';
import { toNewLink, validateToken, toUpdateLink } from '../utils';
import userService from '../services/userService';
const router = express.Router();
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
router.get('/', async (_req, res) => {
    return res.send(await linkService.getData());
});

router.get('/:id', async (req, res) => {
    if(!isString(req.params.id)) {
      return res.sendStatus(404);
    }
    const link = await linkService.findById(String(req.params.id));
    if(link)
      return res.send(link);
    else 
      return res.sendStatus(404);
});

router.post('/', async (req, res) => {
  console.log(req.headers)
  const decodedToken = validateToken(<string>req.headers["authorization"]);
  const user = await userService.findById(decodedToken);
  if(!user) return res.sendStatus(404);
  const link = toNewLink(req.body);
  const fullLink = await linkService.addData(link, user._id);
  console.log(fullLink);
  return res.send(fullLink);
});

router.put('/:id', async (req, res) => {
  if(!isString(req.params.id)) {
    return res.sendStatus(404);
  }

  const decodedToken = validateToken(<string>req.headers["authorization"]);
  const user = await userService.findById(decodedToken);
  if(!user) return res.sendStatus(404);

  const link = toUpdateLink(req.body);
  const updatedLink = await linkService.updateLink(link, req.params.id);

  return res.send(updatedLink);
});

export default router;