(this.webpackJsonpmetrognome=this.webpackJsonpmetrognome||[]).push([[0],[,,,,,,,,,,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var a=n(0),s=n(1),o=n.n(s),i=n(3),c=n.n(i),r=(n(14),n.p,n(15),n(6)),u=n(4),m=n(5),l=n(8),p=n(7),d=(n(16),n.p+"static/media/on.fd8c0096.svg"),g=n.p+"static/media/off.e0c05eab.svg",f=n.p+"static/media/plus.d5048b9a.svg",h=n.p+"static/media/minus.fa839e7c.svg",j=function(t){Object(l.a)(n,t);var e=Object(p.a)(n);function n(t){var a;return Object(u.a)(this,n),(a=e.call(this,t)).nextNote=function(){var t=60/a.state.tempo;a.setState({nextNoteTime:a.state.nextNoteTime+t,currentQuarterNote:a.state.currentQuarterNote+1}),4===a.state.currentQuarterNote&&a.setState({currentQuarterNote:0})},a.scheduleNote=function(t,e){a.setState({notesInQueue:[].concat(Object(r.a)(a.state.notesInQueue),[{note:t,time:e}])});var n=a.state.audioContext.createOscillator(),s=a.state.audioContext.createGain();n.frequency.value=t%4===0?1300:1e3,s.gain.value=1,s.gain.exponentialRampToValueAtTime(1,e+.001),s.gain.exponentialRampToValueAtTime(.001,e+.02),n.connect(s),s.connect(a.state.audioContext.destination),n.start(e),n.stop(e+.03)},a.scheduler=function(){for(;a.state.nextNoteTime<a.state.audioContext.currentTime+a.state.scheduleAheadTime;)a.scheduleNote(a.state.currentQuarterNote,a.state.nextNoteTime),a.nextNote()},a.start=function(){a.state.isRunning||(null===a.state.audioContext&&a.setState({audioContext:new(window.AudioContext||window.webkitAudioContext)}),a.setState({isRunning:!0,currentQuarterNote:0,nextNoteTime:.05,intervalID:setInterval((function(){return a.scheduler()}),a.state.lookahead)}))},a.stop=function(){a.setState({isRunning:!1}),clearInterval(a.state.intervalID)},a.startStop=function(){console.log(a.state.tempo),a.state.isRunning?a.stop():a.start()},a.tweakTempo=function(t){"minus"===t&&a.setState({tempo:parseInt(a.state.tempo)-1}),"add"===t?a.setState({tempo:parseInt(a.state.tempo)+1}):console.log("error")},a.checkTempo=function(){console.log(a.state.tempo),a.state.tempo<120&&a.setState({message:"This be some love making music"}),a.state.tempo>=120&&a.state.tempo<139&&a.setState({message:"DIS BOPS DOE"}),a.state.tempo>=139&&a.state.tempo<159&&a.setState({message:"We rarely play in this tempo range. Challenge accepted?"}),a.state.tempo>=159&&a.state.tempo<180&&a.setState({message:"Get in the zone, your comfort zone"}),a.state.tempo>=181&&a.setState({message:"You drank a lot of coffee..."})},a.state={audioContext:null,notesInQueue:[],currentQuarterNote:0,tempo:120,lookahead:25,scheduleAheadTime:.1,nextNoteTime:0,isRunning:!1,intervalID:null,message:"Quit all the malarkey and start practicing!"},a}return Object(m.a)(n,[{key:"render",value:function(){var t=this;return Object(a.jsxs)("div",{className:"metronome",children:[Object(a.jsx)("p",{children:this.state.message}),Object(a.jsxs)("p",{className:"current-bpm",children:[" ",this.state.tempo," bpm"]}),Object(a.jsxs)("div",{className:"slider",children:[Object(a.jsx)("img",{className:"tempo-change",src:h,alt:"decrease BPM by 1",onClick:function(){t.tweakTempo("minus")}}),Object(a.jsx)("input",{type:"range",min:"60",max:"240",value:this.state.tempo,onChange:function(e){return t.setState({tempo:e.target.value},t.checkTempo())}}),Object(a.jsx)("img",{className:"tempo-change",src:f,alt:"increase BPM by 1",onClick:function(){t.tweakTempo("add")}})]}),Object(a.jsx)("button",{onClick:function(){return t.startStop()},children:this.state.isRunning?Object(a.jsx)("img",{className:"on-off",src:g,alt:"turn off"}):Object(a.jsx)("img",{className:"on-off",src:d,alt:"turn on"})})]})}}]),n}(o.a.Component),x=(n(17),function(){return Object(a.jsx)("div",{className:"header",children:"metrognome."})});var b=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(x,{}),Object(a.jsx)(j,{})]})},v=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,a=e.getFID,s=e.getFCP,o=e.getLCP,i=e.getTTFB;n(t),a(t),s(t),o(t),i(t)}))};c.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root")),v()}],[[18,1,2]]]);
//# sourceMappingURL=main.1bf1717b.chunk.js.map