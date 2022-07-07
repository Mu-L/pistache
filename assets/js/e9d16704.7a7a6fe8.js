(self.webpackChunkpistache_io=self.webpackChunkpistache_io||[]).push([[536],{2955:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return p},metadata:function(){return l},toc:function(){return d},default:function(){return m}});var a=n(2122),i=n(9756),s=(n(7294),n(3905)),o=["components"],r={id:"http-handler",title:"HTTP handler"},p=void 0,l={unversionedId:"http-handler",id:"http-handler",isDocsHomePage:!1,title:"HTTP handler",description:"\x3c!--",source:"@site/docs/http-handler.md",sourceDirName:".",slug:"/http-handler",permalink:"/pistache/docs/http-handler",editUrl:"https://github.com/pistacheio/pistache/edit/master/pistache.io/docs/http-handler.md",version:"current",frontMatter:{id:"http-handler",title:"HTTP handler"},sidebar:"leftSidebar",previous:{title:"Headers",permalink:"/pistache/docs/headers"},next:{title:"Getting started",permalink:"/pistache/docs/"}},d=[{value:"Sending a response",id:"sending-a-response",children:[]},{value:"Response streaming",id:"response-streaming",children:[]},{value:"Static file serving",id:"static-file-serving",children:[]},{value:"Controlling timeout",id:"controlling-timeout",children:[]}],c={toc:d};function m(e){var t=e.components,n=(0,i.Z)(e,o);return(0,s.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"Requests that are received by Pistache are handled by a special class called ",(0,s.kt)("inlineCode",{parentName:"p"},"Http::Handler"),". This class declares a bunch of virtual methods that can be overriden to handle special events that occur on the socket and/or connection."),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"onRequest()")," function must be overriden. This function is called whenever Pistache received data and correctly parsed it as an HTTP request."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"virtual void onRequest(const Http::Request& request, Http::ResponseWriter response);\n")),(0,s.kt)("p",null,"The first argument is an object of type ",(0,s.kt)("inlineCode",{parentName:"p"},"Http::Request")," representing the request itself. It contains a bunch of informations including:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"The resource associated to the request"),(0,s.kt)("li",{parentName:"ul"},"The query parameters"),(0,s.kt)("li",{parentName:"ul"},"The headers"),(0,s.kt)("li",{parentName:"ul"},"The body of the request")),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"Request")," object gives a read-only access to these informations. You can access them through a couple of getters but can not modify them. An HTTP request is ",(0,s.kt)("strong",{parentName:"p"},"immutable"),"."),(0,s.kt)("h2",{id:"sending-a-response"},"Sending a response"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," is an object from which the final HTTP response is sent to the client. The ",(0,s.kt)("inlineCode",{parentName:"p"},"onRequest()")," function does not return anything (",(0,s.kt)("inlineCode",{parentName:"p"},"void"),"). Instead, the response is sent through the ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," class. This class provides a bunch of ",(0,s.kt)("inlineCode",{parentName:"p"},"send()")," function overloads to send the response:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"Async::Promise<ssize_t> send(Code code);\n")),(0,s.kt)("p",null,"You can use this overload to send a response with an empty body and a given HTTP Code (e.g ",(0,s.kt)("inlineCode",{parentName:"p"},"Http::Code::Ok"),")"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"Async::Promise<ssize_t> send(\n    Code code,\n    const std::string& body,\n    const Mime::MediaType &mime = Mime::MediaType()\n);\n")),(0,s.kt)("p",null,"This overload can be used to send a response with static, fixed-size content (body). A MIME type can also be specified, which will be sent through the ",(0,s.kt)("inlineCode",{parentName:"p"},"Content-Type")," header."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"template<size_t N>\nAsync::Promise<ssize_t> send(\n    Code code,\n    const char (&arr)[N],\n    const Mime::MediaType& mime = Mime::MediaType()\n);\n")),(0,s.kt)("p",null,"This version can also be used to send a fixed-size response with a body except that it does not need to construct a string (no memory is allocated). The size of the content is directly deduced by the compiler. This version only works with raw string literals."),(0,s.kt)("p",null,"These functions are asynchronous, meaning that they do not return a plain old ",(0,s.kt)("inlineCode",{parentName:"p"},"ssize_t")," value indicating the number of bytes being sent, but instead a ",(0,s.kt)("inlineCode",{parentName:"p"},"Promise")," that will be fulfilled later on. See the next section for more details on asynchronous programming with Pistache."),(0,s.kt)("h2",{id:"response-streaming"},"Response streaming"),(0,s.kt)("p",null,"Sometimes, content that is to be sent back to the user can not be known in advance, thus the length can not be determined in advance. For that matter, the HTTP specification defines a special data-transfer mechanism called ",(0,s.kt)("a",{parentName:"p",href:"https://tools.ietf.org/html/rfc7230#section-4.1"},"chunked encoding")," where data is sent in a series of ",(0,s.kt)("em",{parentName:"p"},"chunks"),". This mechanism uses the ",(0,s.kt)("inlineCode",{parentName:"p"},"Transfer-Encoding")," HTTP header in place of the ",(0,s.kt)("inlineCode",{parentName:"p"},"Content-Length")," one."),(0,s.kt)("p",null,"To stream content, Pistache provides a special ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseStream")," class. To get a ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseStream")," from a ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter"),", call the ",(0,s.kt)("inlineCode",{parentName:"p"},"stream()")," member function:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"auto stream = response.stream(Http::Code::Ok);\n")),(0,s.kt)("p",null,"To initate a stream, you have to pass the HTTP status code to the stream function (here ",(0,s.kt)("inlineCode",{parentName:"p"},"Http::Code::Ok")," or ",(0,s.kt)("inlineCode",{parentName:"p"},"HTTP 200"),"). The ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseStream")," class provides an ",(0,s.kt)("inlineCode",{parentName:"p"},"iostream")," like interface that overloads the ",(0,s.kt)("inlineCode",{parentName:"p"},"<<")," operator."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},'stream << "PO"\nstream << "NG"\n')),(0,s.kt)("p",null,"The first line will write a chunk of size 2 with the content ",(0,s.kt)("em",{parentName:"p"},"PO")," to the stream's buffer. The second line will write a second chunk of size 2 with the content ",(0,s.kt)("em",{parentName:"p"},"NG"),". To end the stream and flush the content, use the special ",(0,s.kt)("inlineCode",{parentName:"p"},"ends")," marker:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"stream << ends\n")),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"ends")," marker will write the last chunk of size 0 and send the final data over the network. To simply flush the stream's buffer without ending the stream, you can use the ",(0,s.kt)("inlineCode",{parentName:"p"},"flush")," marker:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"stream << flush\n")),(0,s.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"Headers writing")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"After starting a stream, headers become immutable. They must be written to the response before creating a ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseStream"),":"),(0,s.kt)("pre",{parentName:"div"},(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},'response.headers()\n    .add<Header::Server>("lys")\n    .add<Header::ContentType>(MIME(Text, Plain));\n\nauto stream = response.stream();\nstream << "PO" << "NG" << ends;\n')))),(0,s.kt)("h2",{id:"static-file-serving"},"Static file serving"),(0,s.kt)("p",null,"In addition to text content serving, Pistache provides a way to serve static files through the ",(0,s.kt)("inlineCode",{parentName:"p"},"Http::serveFile")," function:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},'if (request.resource() == "/doc" && request.method == Http::Method::Get) {\n    Http::serveFile(response, "README.md");\n}\n')),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Return value")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},(0,s.kt)("inlineCode",{parentName:"p"},"serveFile")," also returns a ",(0,s.kt)("inlineCode",{parentName:"p"},"Promise")," representing the total number of bytes being sent to the wire"))),(0,s.kt)("h2",{id:"controlling-timeout"},"Controlling timeout"),(0,s.kt)("p",null,"Sometimes, you might require to timeout after a certain amount of time. For example, if you are designing an HTTP API with soft real-time constraints, you will have a time constraint to send a response back to the client. That is why Pistache provides the ability to control the timeout on a per-request basis. To arm a timeout on a response, you can use the ",(0,s.kt)("inlineCode",{parentName:"p"},"timeoutAfter()")," member function directly on the ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," object:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"response.timeoutAfter(std::chrono::milliseconds(500));\n")),(0,s.kt)("p",null,"This will trigger a timeout if a response has not been sent within 500 milliseconds. ",(0,s.kt)("inlineCode",{parentName:"p"},"timeoutAfter")," accepts any kind of duration."),(0,s.kt)("p",null,"When a timeout triggers, the ",(0,s.kt)("inlineCode",{parentName:"p"},"onTimeout()")," function from your handler will be called. By default, this method does nothing. If you want to handle your timeout properly, you should then override this function inside your own handler:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-cpp"},"void onTimeout(const Http::Request& request, Http::ResponseWriter writer) {\n    request.send(Http::Code::No_Content);\n}\n")),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"Request")," object that is passed to the ",(0,s.kt)("inlineCode",{parentName:"p"},"onTimeout")," is the exact same request that triggered the timeout. The ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," is a complete new writer object."),(0,s.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,s.kt)("div",{parentName:"div",className:"admonition-heading"},(0,s.kt)("h5",{parentName:"div"},(0,s.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,s.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,s.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"ResponseWriter state")),(0,s.kt)("div",{parentName:"div",className:"admonition-content"},(0,s.kt)("p",{parentName:"div"},"Since the ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," object is a complete new object, state is not preserved with the ",(0,s.kt)("inlineCode",{parentName:"p"},"ResponseWriter")," from the ",(0,s.kt)("inlineCode",{parentName:"p"},"onRequest()")," callback, which means that you will have to write the complete response again, including headers and cookies."))))}m.isMDXComponent=!0}}]);