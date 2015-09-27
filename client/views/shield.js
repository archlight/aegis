regionsort = {"APAC":1, "EMEA":2, "NA":3, "Global":4}
severitysort = {"critical":1, "medium":2, "low":3}

Template.shield.helpers({
	alerts: function(){

		d = _.groupBy(Sherlock.find({}).fetch(), function(v, k){
				return v.region
			})

		_.each(regionsort, function(v, k){
				if (!_.has(d, k))
					d[k] = []
		})

		total = _.map(d, function(val, region){
			dd = _.groupBy(val, function(v){
					if (v.level<=3)
						return "critical"
					else if (v.level==4)
						return "medium"
					else
						return "low"			
				})

			_.each(severitysort, function(v, k){
				if (!_.has(dd, k))
					dd[k] = []
			})

			cnts = _.map(dd, function(v, k){return {"region":region, "severity":k, "cnt":_.size(v)}})
			cnts = _.sortBy(cnts, function(v){return severitysort[v]})
			data = _.map(dd, function(v, k){return {"region":region, "severity":k, "bobs":v}})
			data = _.sortBy(data, function(v){return severitysort[v]})

			return {"region":region, "cnts":cnts, "data":data}
		})

		return _.sortBy(total, function(v){return regionsort[v.region]})
	}
})

Template.shield_title.helpers({
	bgcolor:function(){
		cnts = _.pluck(this.cnts, "cnt")
		if (cnts[0]>0)
			return "red-bg"
		else if (cnts[0]>2)
			return "yellow-bg"
		else
			return "navy-bg"
	}
})

Template.desklist.helpers({
	desks: function(){
		d = _.groupBy(this.bobs, function(v){
				return v.desk
			})
		return _.map(d, function(v, k){
			var cnts = _.pluck(v, "level")
			var color = "btn-primary"
			if (_.indexOf(cnts, 2) >=0 || _.indexOf(cnts, 3)>=0)
				color = "btn-danger"
			if (_.indexOf(cnts, 4)>=0)
				color = "btn-warning"
			return {"desk":k, "btncolor":color, "bobitems":v}
		})
	}
})

Template.shield.events({
    'click .collapse-link': function (event) {
        var element = $(event.target);
        var ibox = element.closest('div.ibox');
        var button = ibox.find("i.fa");
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    }
})

Template.boblist.events({
	'click .bob-list a': function(event){
		jid = $(event.target).attr("id")
		if(jid){
			Session.set("jid", jid)
			Meteor.call("bobtree", {jid: jid}, function(error, result){
				if (result["statusCode"]!="200"){
		          $("#bobtree").empty()
		          $("<p></p").text(error).appendTo($("#bobtree"))
		        }
		        else{
		        	$("#bobtree").append(result.content)
		        }
			})
		}

	}
})