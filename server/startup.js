var bobs = [
{"region":"NA", "desk":"Flow", "level":2, "name":"NA Flow 2"},
{"region":"NA", "desk":"Flow", "level":4, "name":"NA Flow 4"},
{"region":"NA", "desk":"Option", "level":3, "name":"NA Option 3"},
{"region":"EMEA", "desk":"Flow", "level":5, "name":"EMEA A"},
{"region":"EMEA", "desk":"Securities", "level":2, "name":"EMEA A"},
{"region":"APAC", "desk":"Flow", "level":2, "name":"bob A"},
{"region":"APAC", "desk":"Flow", "level":3, "name":"bob A"},
{"region":"NA", "desk":"Flow", "level":2, "name":"bob A"},
{"region":"NA", "desk":"Option", "level":5, "name":"bob A"},
{"region":"NA", "desk":"Flow", "level":2, "name":"bob A"},
];


if (Sherlock.find().count() ==0){
    _.each(bobs, function(v,i){
      v["jid"] = 1000+i
      Sherlock.insert(v);
    })
}

Meteor.methods({
  "bobtree":function(param){
    return Meteor.http.get("http://localhost:8080/bobtree",param)
  },
  "bobsay":function(jid){
  	logerr = "error message"
  	Bobs.insert({jid:jid, name:"bob", message:logerr, followers:[]})
  }
}) 



