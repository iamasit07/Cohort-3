const { Router } = require('express');
const { admin } = require('googleapis/build/src/apis/admin');
const adminRouter = Router();


adminRouter.post('/signup', async (req, res) => {

})

adminRouter.post('/login', async (req, res) => {

})

adminRouter.use(adminMiddleware);

adminRouter.post('/courses', async (req, res) => {

})

adminRouter.put('/courses', async (req, res) => {

})

adminRouter.get('/courses', async (req, res) => {

})

module.exports({
    adminRouter: adminRouter
})