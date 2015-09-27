Meteor.publish('sherlock', function(){
	return Sherlock.find({})
});

Meteor.publish('bobs', function(){
	return Bobs.find({})
})

Meteor.publish('replies', function(){
	return Replies.find({})
})