Router.configure({
    layoutTemplate: 'mainLayout'
});

if (Meteor.isClient){
	Meteor.subscribe('sherlock')
	Meteor.subscribe('bobs')
	Meteor.subscribe('replies')
}



