import express, { Request, Response } from "express";
import { producterRoute } from "../middleware/prdoucterRoute";  // Import the middleware function
import { login } from "../Controllor/Login";  // Import the login function
import signup from "../Controllor/Signup";
import logut from "../Controllor/Logout";
import getme from "../Controllor/GetuserProfile";
import { WatchVidoes } from "../ControllorPost/watchvideo";
import { AddPointes } from "../ControllorPost/WatchVideo_Points";
import { getAll } from "../ControllorPost/getAll_vidoe";
import { createpost, videoUpload } from "../ControllorPost/CreatePost";
import { delitePost } from "../ControllorPost/DelitePost";
import { clickvidoe } from "../ControllorPost/clikvidoe";
import { comments } from "../ControllorPost/Comment";
import { likeunlike } from "../ControllorPost/LikeUnlike";
import { CommentsLike_unLike } from "../ControllorPost/CommentLike_unLike";
import { updateuser } from "../ControllorPost/updateprofile";
import { subcriptionfun } from "../ControllorPost/subscription";
import { updatesubscription } from "../ControllorPost/updatesubscription";
export const Allroute=express.Router()

Allroute.post('/login',login)
Allroute.post('/signup',signup) 
Allroute.post('/out',logut)
Allroute.get('/get',producterRoute,getme)
Allroute.get('/watch',producterRoute,WatchVidoes)
Allroute.post('/add',producterRoute,AddPointes)
Allroute.get('/vidoe',getAll)
Allroute.post('/post',producterRoute,videoUpload, createpost)
Allroute.post('/delitepost/:id',producterRoute,delitePost)
Allroute.get('/clickvidoe/:id',clickvidoe)
Allroute.post('/comment/:id',producterRoute,comments)
Allroute.post('/like/:id',producterRoute,likeunlike)
Allroute.post('/post/:id/comment/:commentid',producterRoute,CommentsLike_unLike)
Allroute.post('/get/update',producterRoute,updateuser)
Allroute.get('/getsub',producterRoute,subcriptionfun)
Allroute.post('/updatesub',producterRoute,updatesubscription)