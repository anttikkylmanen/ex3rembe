(this.webpackJsonpreminder=this.webpackJsonpreminder||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var i=n(2),a=n.n(i),r=n(13),d=n.n(r),s=n(14),c=n(15),m=n(17),o=n(16),u=n(0),l=function(e){var t=e.reminder,n=e.del;return Object(u.jsxs)("li",{children:[t.timestamp,"  ",t.name," ",Object(u.jsx)("button",{onClick:n,children:"Delete"})]})},h=function(e){var t=e.name,n=e.time,i=e.fname,a=e.fdate,r=e.add;return Object(u.jsxs)("form",{onSubmit:r,children:[Object(u.jsxs)("div",{children:["Topic:",Object(u.jsx)("input",{value:t,onChange:i})]}),Object(u.jsxs)("div",{children:["At time:",Object(u.jsx)("input",{type:"datetime-local",value:n,onChange:a})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"Add"})})]})},j=n(3),b=n.n(j),f="/api/reminders",p=function(e){Object(m.a)(n,e);var t=Object(o.a)(n);function n(e){var i;return Object(s.a)(this,n),(i=t.call(this,e)).addTopic=function(e){e.preventDefault();var t={name:i.state.newName,timestamp:i.state.newTime,id:i.state.reminders.length+1};i.state.reminders.map((function(e){return e.name})).includes(i.state.newName)?alert("Already in the list. Add a new reminder"):b.a.post(f,t).then((function(e){i.setState({reminders:i.state.reminders.concat(e.data),newName:"",newTime:""})}))},i.deleteEntry=function(e){return function(){var t="".concat(f,"/").concat(e),n=i.state.reminders.filter((function(t){return t.id!==e}));window.confirm("Do you really want to delete this?")&&b.a.delete(t).then((function(e){i.setState({reminders:n})}))}},i.handleTopicChange=function(e){i.setState({newName:e.target.value})},i.handleDateChange=function(e){i.setState({newTime:e.target.value})},i.state={reminders:[],newName:"",newTime:""},i}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;b.a.get(f).then((function(t){e.setState({reminders:t.data})}))}},{key:"render",value:function(){var e=this;return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Add Reminder"}),Object(u.jsx)(h,{name:this.state.newName,time:this.state.newTime,fname:this.handleTopicChange,fdate:this.handleDateChange,add:this.addTopic}),Object(u.jsx)("h2",{children:"Reminders"}),Object(u.jsx)("ul",{children:this.state.reminders.map((function(t){return Object(u.jsx)(l,{reminder:t,del:e.deleteEntry(t.id)},t.id)}))}),Object(u.jsxs)("div",{children:["debug: ",this.state.newName]})]})}}]),n}(a.a.Component);d.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(p,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.d4565239.chunk.js.map