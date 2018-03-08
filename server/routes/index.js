var express = require('express');
var router = express.Router();

var Classify = require('../Model/Classify');
var Article = require('../Model/Article');
var Comment = require('../Model/Comment');
var User = require('../Model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*获取*/
router.get('/classify',function(req,res){
	
	Classify.find({},function(err,result){
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
})


/*添加*/
router.get('/addClass',function(req,res){
	var cl = req.query.clazz;
	var clazz = new Classify({
		classify:cl,
	    createdtime:new Date()
	})
	
	clazz.save(function(err,result){
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
})


/*删除分类*/
router.get('/delClass',function(req,res){
	
	var id = req.query.id;
	
	Classify.findByIdAndRemove(id,function(err,result){
		if(err){
			console.log('Error',err)
		}else{
//			console.log('Res:',res)
			Classify.find({},function(err,result){
				if(err){
					console.log(err)
				}else{
//					console.log(result)
					res.send(result)
				}
			})
			
		}

	})
})

/*发布文章*/
router.post('/publish',function(req,res){
	
	var content = req.body.content;
	var title = req.body.title;
	var classify = req.body.classify;
	
	var classify = new Article({
		authorId:null,
		classify:classify,
		title:title,
		content:content,
		createdtime:new Date,
		stars:100,
		views:999
	})
	
	classify.save(function(err,result){
		if(err){
			console.log(err)
		}else{
//			console.log(result)
			res.send({msg:'success'})
		}
	})
	
})


/*获取所有文章*/
router.get('/articles',function(req,res){
	
	Article.find({},function(err,result){
		if(err){
			console.log(err)
		}else{
//			console.log(result)
			res.send(result)
		}
	})
})


/*删除文章*/
router.get('/delarticle',function(req,res){
	var id = req.query.id;
	
	Article.findByIdAndRemove(id,function(err,result){
		if(err){
			console.log('Error',err)
		}else{
//			console.log('Res:',res)
			Article.find({},function(err,result){
				if(err){
					console.log(err)
				}else{
//					console.log(result)
					res.send(result)
				}
			})
			
		}

	})
})


/*获取文章详情*/
router.get('/article',function(req,res){
	
	var id = req.query.id;
	Article.findById(id,function(err,article){
		if(err){
			console.log(err)
		}else{
			
			res.send(article)
//			Comment.find({articleId:id},function(err,comments){
//				if(err){
//					console.log(err)
//				}else{
//					var result = Object.assign(article,comments);
//					console.log(result)
//					res.json(result)
//				}
//			})
		}
	})
})

/*获取评论*/
router.get('/getcomment',function(req,res){
	var articleId = req.query.articleId;
	Comment.find({articleId:articleId},function(err,result){
		if(err){
			console.log(err)
		}else{
			console.log(result)
			res.send(result)
		}
	})
})

/*添加评论*/
router.post('/addcomment',function(req,res){

	var articleId = req.body.articleId;
	var author = req.body.author;
	var content = req.body.content;
	
	var com = new Comment({
			articleId:articleId,
			author:author,
			content:content,
			createtime:new Date
	})
	
	com.save(function(err,result){
		if(err){
			console.log(err)
		}else{
			Comment.find({articleId:articleId},function(err,result){
				if(err){
					console.log(err)
				}else{
					res.send(result)
				}
			})
		}
	})
})


/*点赞*/
router.post('/addstar',function(req,res){
	var id = req.body.articleId;
	var stars = req.body.stars;
	var updatestr = {stars:parseInt(stars) + 1}
	Article.findByIdAndUpdate(id,updatestr,function(err,result){
		if(err){
			console.log('Error',err)
		}else{
			console.log('Res:',res)
			res.send(result)
		}
	})
})


/*用户注册*/
router.post('/regist',function(req,res){
	var username = req.body.username;
	var userpwd = req.body.userpwd;
	
	var user = new User({
		name:username,
		pwd:userpwd,
		avatar:"",
		createtime:new Date
	})
	user.save(function(err,result){
		if(err){
			console.log(err)
		}else{
			res.send(result)
		}
	})
})

router.post('/login',function(req,res){
	var username = req.body.username;
	var userpwd = req.body.userpwd;
	
	console.log(username,userpwd)
	User.find({name:username,pwd:userpwd},function(err,result){
		if(err){
			console.log(err)
		}else{
			console.log(result)
			res.send(result)
		}
	})
})

module.exports = router;
