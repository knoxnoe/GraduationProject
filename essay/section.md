## 1、NW.js和Electron 的区别？

> https://www.codehawke.com/blogs/electron_vs_nwjs.html

NW.js是以HTML页面为入口，会在browser window打开我们的入口文件。

Electron是一个Script文件为入口，然后通过脚本文件去创建一个browser window。



## 2、C++ 和 JS交互

由于C++原生数据类型和JavaScript数据类型有很大的差异，因此V8提供了Value类，来对齐JavaScript和C++之间的关系。

```c++
Handle<Value> Add(const Arguments& args) {
  int a = args[0]->Uint32Value();
  int b = args[1]->Uint32Value();
  
  return Integer::New(a+b);
}
```

Integer即就是Value的一个子类。

V8中，有两个模板（Template）类（并非C++中的模版类）

- 对象模版（ObjectTemplate)
- 函数模版（FunctionTemplate）

这两个模版类以定义JavaScript对象和JavaScript函数。通过ObjectTemplate，可以将C++对象暴露给JavaScript脚本环境，同样的FunctionTemplate会讲C++函数暴露给脚本环境，以供脚本使用。





## 3、JS使用C++变量

```c++
static char sname[512] = {0}; 

static Handle<Value> NameGetter(Local<String> name, const AccessorInfo& info) {
    return String::New((char*)&sname,strlen((char*)&sname)); 
 } 

static void NameSetter(Local<String> name, Local<Value> value, const AccessorInfo& info) {
   Local<String> str = value->ToString(); 
   str->WriteAscii((char*)&sname); 
 }
```

