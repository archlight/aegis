Template.social.helpers({
	selected: function(){
		return Session.get("jid")?true:false
	},
	bobpost: function(){
		jid = Session.get("jid")
		if (!Bobs.findOne({jid:jid}))
			Meteor.call("bobsay", jid)
		post = Bobs.findOne({jid:jid})
		return {
			"name": post.name,
			"message": post.message,
			"followers": _.size(post.followers),
			"ts": moment(post.ts).format()
		}
	},
	replies: function(){
		jid = Session.get("jid")
		return Replies.find({jid:jid})
	}
})

Template.social.rendered = function(){
	Tracker.autorun(function(){
	})
}

Template.social.events({
	'keyup #reply': function(e) {
	    if (e.type == "keyup" && e.which == 13) {
	    	jid = Session.get("jid")
	    	if(jid){
	    		me = Meteor.user().username
	    		Replies.insert({jid:jid, name:me, message:$("#reply").val(), ts:moment().toDate()})
	    		$("#reply").val("")
	    		bob = Bobs.findOne({jid:jid},{followers:1, _id:0})
	    		if (_.indexOf(bob.followers, me)<0){
	    			bob.followers.push(me)
	    			Bobs.update({_id:bob._id}, {$set:{followers:bob.followers}})
	    		}
	    	}
	    }
  	}
})