WASM在V8引擎中引入的时机

## 一个c/c++程序如何编译为WASM模块

第一种方法，首先将C/C++源代码通过Emscripten工具链编译成ASM.js代码，然后通过Binaryen工具链中的asm2wasm工具将这些ASM.js代码转译成一个标准的Wasm模块。

第二种方法，不需要ASM.js作为中间媒介，首先直接将C/C++源代码编译成基于LLVM的中间比特码，然后再将中间比特码通过LLVM工具链编译成与处理器架构相关的本地汇编代码，最后用Binaryen工具链中的s2wasm工具来作为Wasm基于LLVM的编译器后端，将基于LLVM的本地汇编代码编译成一个标准的Wasm模块。



## 基本概念

#### Module

一段二进制序列，可直接被机器执行，与计算机程序概念类似，其本身是无状态的。

#### Memory

一段线性内存，供 WebAssembly 读写，和普通内存几乎没有区别，所有 WebAssembly Module 在运行时只能访问 Memory 里的数据。

#### Instance

Module 加上运行时所必须的 Memory、Table 以及一些 JS 实现等等；因此 Instance 具有状态，与进程的概念类似。



## 从 C++ 到 wasm

Emscripten 工具能够将 C/C++ 代码编译成 .wasm，加上一些必需的 JS 胶水代码加载和运行 WebAssembly。



简而言之，工作流程如下：

1. Emscripten 将 C/C++ 喂给 LLVM 的编译前端 clang，生成 LLVM IR
2. Emscripten 将 LLVM IR 经由其实现的 LLVM 编译后端生成 .wasm 二进制文件
3. 由于当前 WebAssembly 不能直接访问 DOM，需要 JS 传整型和浮点型数据给 C/C++，所以 Emscripten 会在生成 .wasm 的同时产生一份 JS 胶水代码用于加载、运行以及提供 Web API 给 C/C++



像是 [Rust](https://www.rust-lang.org/)、Golang、C# 等等这样实现了 LLVM 前端的语言，理论上都能转换成 WebAssembly。



## Hello world

下面是一段输出“Hello world”的 C 代码：

```C
#include<string.h>

extern void jslog(const char*, int);

void hello() {

  const char* str = "Hello world";

  jslog(str, strlen(str));

}
```

- `extern void jslog(const char*, int);` 声明该函数由外部实现，本例中 JS 实现了 jslog 函数，打印“Hello world"
- `jslog(str, strlen(str));` 调用 JS 中的 jslog 函数，需要传指针和长度的原因在于 JS 和 WebAssembly 之间的数据交换是通过**原始内存**实现的



使用 [emcc](https://emscripten.org/docs/getting_started/downloads.html) 将其编译为 hello.wasm，在 JS 中加载并调用 hello 函数：

```JavaScript
fetch('./hello.wasm')

.then(response => response.arrayBuffer())

// .then(bytes => WebAssembly.instantiate(bytes, importObject))

.then(bytes => WebAssembly.compile(bytes))

.then(module => new WebAssembly.Instance(module, importObject))

.then(instance => {

  instance.exports._hello(); // 控制台输出：Hello world

});
```

- `WebAssembly.compile(bytes)` 将 hello.wasm 二进制数组**编译**成 [Module](https://bytedance.feishu.cn/space/doc/doccn4vuzKHgTqG162kzHxM4Ile#njeBJF)
- `new WebAssembly.Instance(module, importObject))` **实例化**生成一个 [Instance](https://bytedance.feishu.cn/space/doc/doccn4vuzKHgTqG162kzHxM4Ile#wufhuK)，importObject 指定了运行时必需的 [Memory](https://bytedance.feishu.cn/space/doc/doccn4vuzKHgTqG162kzHxM4Ile#khplJP) 以及 JS 函数实现（比如 jslog）等等参数
- 第三行注释代码可以合并编译和实例化两步操作
- instance.exports._hello(); **同步调用** C 函数，需要在函数名前加上 “_”
- 整个过程是**异步**完成的，编译 WebAssembly 不会占用其它资源的加载、解析时间