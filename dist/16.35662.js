(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"6z7h":function(e,t,n){"use strict";var r=n("xwgP"),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"more",theme:"outlined"},i=n("OPI+"),c=function(e,t){return r.createElement(i.a,Object.assign({},e,{ref:t,icon:a}))};c.displayName="MoreOutlined";t.a=r.forwardRef(c)},"FSB+":function(e,t,n){"use strict";n.r(t);var r=n("cay0"),a=n("5hNZ"),i=n("I/kE"),c=n("JAAe"),o=(n("SFZ+"),n("imEK"),n("hU/4"),n("zVDO"),n("8s+L"),n("WcSp"),n("nChU"),n("RCf/"),n("iTHT"),n("zRWk"),n("2T1u"),n("Oy8d"),n("ywsi"),n("F3A9"),n("l7U1"),n("xwgP")),u=n.n(o),l=n("q5+0"),f=n("8x1r"),s=n("6z7h"),d=n("efbE"),m=n("eZYV"),p=n("8+cs"),b=n("Nhdc"),h=(n("55Fl"),function(e){var t=e.location.pathname,n=Object(o.useMemo)((function(){return t.split("/").slice(-2)[0]}),[t]);return u.a.createElement(b.d,{isAdd:!0,title:"新增体征",groupId:n})}),y=(n("tftg"),n("zXVS"),n("/ye0"),n("r1Ut"),n("aHDc"),n("mwhO")),g=n("LTyu"),v=n("BxiP"),O=(n("R7Ad"),n("vkqi"),n("Y5O0"),n("jjkY")),E=n.n(O),j=n("RYVt"),S=["startTime","endTime"];function k(){return(k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){x(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var r,a,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P=b.g.Content,Y=function(e){var t=e.history,n=e.match,r=n.url,l=n.params.id,f=T(Object(o.useState)(j.b[0].value),2),s=f[0],p=f[1],h=T(Object(o.useState)([]),2),O=h[0],w=h[1],x=T(Object(o.useState)(!1),2),A=x[0],Y=x[1],D=Object(m.a)("featureConfig/list/list",{publishType:s,classificationId:l}),M=D.loading,z=D.table,R=D.onSearch,B=D.onRefresh,N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];c.a.confirm({centered:!0,title:"提示",content:"确认要删除吗？",onOk:function(){return d.a.post("featureConfig/list/delete",{ids:e}).then((function(){i.b.success("删除成功"),w([]),B()}))}})},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0;return d.a.post("featureConfig/list/state",{ids:e,publishType:t}).then((function(){i.b.success("".concat(n,"成功")),w([]),B()}))},J=function(e,t,n){F(O.filter((function(t){return t.signStatus===Number(e)})).map((function(e){return e.id})),t,n)};Object(o.useEffect)((function(){l&&R({publishType:s,classificationId:l})}),[l]);var U=A&&z.dataSource.length>0,H=A&&O.length>0,L=Object(o.useMemo)((function(){var e=O.length>0;return{enableBatchOperation:e,enableBatchPublish:!!e&&O.every((function(e){return 0===e.signStatus})),enableBatchRetract:!!e&&O.some((function(e){return 1===e.signStatus}))}}),[O]),V=L.enableBatchPublish,W=L.enableBatchRetract,Z={signName:{type:"string",title:"体征名称"},signTag:{type:"string",title:"体征标签"},"[startTime,endTime]":{type:"daterange",title:"上线时间"}};return u.a.createElement(P,{title:"全部体征",extra:u.a.createElement(v.a,{type:"primary",onClick:function(){t.push("".concat(r,"/add"))}},"新增体征"),loading:M},u.a.createElement(g.a.Group,{optionType:"button",buttonStyle:"solid",value:s,options:j.b,className:"xm-radio-buttons",onChange:function(e){w([]),p(e.target.value),R({classificationId:l,publishType:e.target.value})}}),u.a.createElement(b.h,{schema:Z,onSearch:function(e){var t=e.startTime,n=e.endTime,r=I(e,S);t&&n&&(r.startTime=E()(t).startOf("day").format("YYYY-MM-DD HH:mm:ss"),r.endTime=E()(n).startOf("day").format("YYYY-MM-DD HH:mm:ss")),R(C(C({},r),{},{classificationId:l,publishType:s}))}}),u.a.createElement(b.a,null,u.a.createElement(y.a,{checked:A,onClick:function(e){Y(e.target.checked),w([])}},"批量选择:"),u.a.createElement(v.a,{type:"link",size:"small",onClick:function(){O.length!==z.dataSource.length?w(z.dataSource):w([])},disabled:!U},"全选"),u.a.createElement(v.a,{type:"link",size:"small",onClick:function(){O.length>0&&N(O.map((function(e){return e.id})))},disabled:!H},"删除"),V&&u.a.createElement(v.a,{type:"link",size:"small",onClick:function(){return J(0,1,"发布")}},"发布"),W&&u.a.createElement(v.a,{type:"link",size:"small",onClick:function(){return J(1,0,"撤回")}},"撤回")),u.a.createElement(b.b,k({},z,{renderRecord:function(e){return u.a.createElement(b.c,{key:e.id,record:e,enableChecked:A,onClick:function(){return function(e){var n=e.id;t.push("".concat(r,"/edit/").concat(n))}(e)},onSelect:function(t){return function(e,t){w(t?O.concat([e]):O.filter((function(t){return t.id!==e.id})))}(e,t)},checked:O.findIndex((function(t){return t.id===e.id}))>-1,extra:u.a.createElement(a.b,{direction:"vertical"},u.a.createElement("a",{onClick:function(){return N([e.id])}},"删除"),0===e.signStatus&&u.a.createElement("a",{onClick:function(){return F([e.id],1,"发布")}},"发布"))})}})))},D=function(){var e=Object(l.i)().id;return u.a.createElement(b.d,{isEdit:!0,id:e,title:"编辑体征"})},M=n("Jv3X");function z(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var r,a,i=[],c=!0,o=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){o=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(o)throw a}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return R(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return R(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B=b.g.Sider;t.default=function(e){var t=e.history,n=e.match,y=n.path,g=n.url,v=n.params.id,O=Object(m.b)(),E=z(Object(o.useState)([]),2),j=E[0],S=E[1],k=function(){return d.a.get("featureConfig/category",{type:2}).then((function(e){return S(e.data),e.data}))},w=function(e){t.push(y.replace(":id",e.id))},C=function(e,t,n){e.stopPropagation(),"edit"===t&&O.open({title:"编辑体征分组",record:n}),"delete"===t&&c.a.confirm({centered:!0,title:"提示",content:"确定要删除吗？",onOk:function(){return d.a.post("featureConfig/categoryDelete",n).then((function(){i.b.success("删除成功"),k().then((function(e){e.length>0&&w(e[0])}))}))}})};return Object(o.useEffect)((function(){!v&&j.length>0&&w(j[0])}),[j,v]),Object(o.useEffect)((function(){k();var e=p.a.on("reloadFeatureCategories",(function(){k()}));return function(){p.a.off("reloadFeatureCategories",e)}}),[]),u.a.createElement(b.g,{wrapperClassName:"feature-config"},u.a.createElement(B,{title:"体征设置"},u.a.createElement(B.Menus,{title:"分组",extra:u.a.createElement("a",{onClick:function(){O.open({title:"新增体征分组"})}},u.a.createElement(f.a,null))},j.map((function(e){return u.a.createElement(B.Menus.Item,{key:e.id,title:e.name,active:Number(v)===e.id,onClick:function(){return w(e)},extra:1!==(null==e?void 0:e.id)&&u.a.createElement(a.b,null,u.a.createElement(r.a,{content:u.a.createElement(a.b,{direction:"vertical"},u.a.createElement("a",{onClick:function(t){return C(t,"edit",e)}},"编辑"),u.a.createElement("a",{onClick:function(t){return C(t,"delete",e)}},"删除"))},u.a.createElement(s.a,null)))})}))),O.visible&&u.a.createElement(M.a,{params:O.params,onCancel:O.close,onOk:function(){O.close(),k()}})),u.a.createElement(l.b,{exact:!0,path:y,component:Y}),u.a.createElement(l.b,{exact:!0,path:"".concat(g,"/add"),component:h}),u.a.createElement(l.b,{exact:!0,path:"".concat(g,"/edit/:id"),component:D}))}},Y5O0:function(e,t,n){"use strict";var r=n("DJmb"),a=n("joYf").findIndex,i=n("SLkC"),c=!0;"findIndex"in[]&&Array(1).findIndex((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{findIndex:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i("findIndex")},imEK:function(e,t,n){"use strict";var r=n("18CW"),a=n("uLeI"),i=n("ypEt"),c=n("mg4x"),o=n("JLJY"),u=n("FDUM");r("match",1,(function(e,t,n){return[function(t){var n=c(this),r=null==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var c=a(e),l=String(this);if(!c.global)return u(c,l);var f=c.unicode;c.lastIndex=0;for(var s,d=[],m=0;null!==(s=u(c,l));){var p=String(s[0]);d[m]=p,""===p&&(c.lastIndex=o(l,i(c.lastIndex),f)),m++}return 0===m?null:d}]}))}}]);