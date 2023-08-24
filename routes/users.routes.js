const {User} = require('../models/index.model.js')

router.get('/api/users'), async(req,res)=>{
    const users = await User.findAll()
    return res.json(users)
}

module.exports = router