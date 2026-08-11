import{o as r,ay as n,az as c,aJ as o,aK as u,aH as s}from"./index-BIo_ZhZ7.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=r("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=r("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]),d={async listMedia(){return(await n.get("/admin/media")).data.data},async uploadMedia(a,e,i){const t=new FormData;return t.append("file",a),e&&t.append("name",e),i&&t.append("altText",i),(await n.post("/admin/media",t,{headers:{"Content-Type":"multipart/form-data"}})).data.data},async deleteMedia(a){return(await n.delete(`/admin/media/${a}`)).data}};function f(){return c({queryKey:["admin-media"],queryFn:d.listMedia})}function M(){const a=o();return u({mutationFn:({file:e,name:i,altText:t})=>d.uploadMedia(e,i,t),onSuccess:()=>{a.invalidateQueries({queryKey:["admin-media"]}),s.success("File uploaded successfully")},onError:e=>s.error(e.message||"Failed to upload file")})}function g(){const a=o();return u({mutationFn:e=>d.deleteMedia(e),onSuccess:()=>{a.invalidateQueries({queryKey:["admin-media"]}),s.success("File deleted successfully")},onError:e=>s.error(e.message||"Failed to delete file")})}export{m as I,p as U,M as a,g as b,f as u};
