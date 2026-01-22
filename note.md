##### **DAY1**

* 

*npm install -g yarn*

yarn是什么》》yarn 和 npm 是同一类东西：前端包管理器



*yarn install*



（npm install -g yarn

只是安装了一个“工具”



yarn install

是在用这个工具，给“当前项目”安装它需要的东西）



* **添加gitignore**

\#xxxx    //是注释

忽略某个文件

config.json



表示：忽略所有路径下叫 config.json 的文件



忽略某类文件（通配符 \*）

\*.log





表示：



app.log



忽略目录

node\_modules

dist

logs

表示：



整个目录 + 里面所有内容



不管嵌套多深



##### **DAY2**

events是所有的数据，使用useEffect监听events变化，执行updateEvents

两个组件，EventBar，TaskBox



* vite搭建环境

 	npm create vite@latest

选择JavaScript，选择······



新建上述两个组件，在Appjs中导入，

写了基础的events的useState，以及useEffect更新函数updateEvents



* 项目结构：

 	main jsx --导入App js

 			--样式文件index css

 	Appjs --导入EventBar、TaskBox

 			--样式文件App css 、event css 、 task css

 	EventBar --样式文件event css

 			--AddEventButton jsx 添加新事件的按钮

 	TaskBox --样式文件 task css

 			--Column jsx任务状态列，显示列标题，管理任务列表，拖放，添加新任务

 				--样式文件task css

 					--AddTasjButton jsx 添加新任务的按钮

 				--Task jsx 单个子任务的组件，显示任务，编辑，拖拽，删除

 					--task css



App.jsx

├── EventBar.jsx

│   		└── AddEventButton.jsx

│

└── TaskBox.jsx

   		 └── Column.jsx

      				  ├── Task.jsx

    			          └── AddTaskButton.jsx





events：所有事件数据

setEvents：更新事件数据的函数

currentEvent：当前选中的事件

setCurrentEvent：更新当前事件的函数

##### **DAY3**

initevent，设置默认值

events用state管理，初始时判断localStorage有无，有-》JSON parse获取，无-》initevent用初始值

写了updateEvents



##### DAY4

拖拽组件

npm install react-beautiful-dnd --save

react19版本冲突，使用18.2

npm uninstall react react-dom

npm install react@^18.2.0 react-dom@^18.2.0 --save



* save的作用：没有 --save：包只会下载到本地 node\_modules 文件夹，但 package.json 不记录这个依赖；别人拿到你的项目，执行 npm install 时不会自动安装这个包。
* 加了 --save：package.json 会记录依赖（比如 "react-beautiful-dnd": "^13.1.1"），其他人 / 部署环境执行 npm install 时，会自动下载这个包到项目中。



* react-beautiful-dnd

DragDropContext - 建立一個可 DnD 的範圍。

 	onDragStart

 	onDragUpdate

 	onDragEnd

Droppable - 建立可以被拖曳放入的區塊。

Draggalbe - 可被拖拉元件



* 在App jsx入口中提前导入所有css文件，在之后的文件中不用分别导入了





* 拖拽系统架构：



使用了DragDropContext（在父组件TaskBox中）作为整个拖拽系统的上下文

Droppable组件定义可放置区域

Draggable组件定义可拖拽元素



* ##### **ref**

一种“直接访问真实 DOM 的通道”



* provided 是 react-beautiful-dnd 注入的“拖拽控制对象”



在 Draggable 场景下，provided 主要包含：



provided = {

  innerRef,

  draggableProps,

  dragHandleProps

}



* **provided.innerRef**

ref={provided.innerRef}

作用：

把 DOM 节点注册给 DnD 系统



用于：

计算拖拽元素的位置

判断边界

生成占位 placeholder

* **provided.draggableProps**

{...provided.draggableProps}

作用：



提供拖拽过程中需要的：



style（transform、position）

data 属性

无障碍相关属性



本质：

告诉浏览 器：这个元素是“可被拖拽控制的”

* **provided.dragHandleProps**

{...provided.dragHandleProps}

作用：

指定“从哪里开始拖拽”



现在的写法是：

整个 Task 都可以拖



* ### ***使用 {} 表示代码块，需要显式使用 return 语句***
* ### ***使用 () 表示隐式返回，直接返回后面的表达式***



* # **JSX 注释不能直接写在 () 的最外层**

**.map((item, index) => (**



**{/\* Draggable组件定义可拖拽元素 \*/ }**

**<Draggable ...>**

&nbsp;   \*\*...\*\*


**</Draggable>**

**));**

**因为注释报错**



#### **DAY5**



* ### ***使用 {} 表示代码块，需要显式使用 return 语句***

### ***使用 () 表示隐式返回，直接返回后面的表达式***

能用 map / filter / reduce，就不要用 push / splice / sort



* 删除task时：

&nbsp;   setEvents((prev) =>

&nbsp;     prev.map((event) => {

&nbsp;       if (event.title === currentEvent.title) {

&nbsp;         /\* const taskList = event\[tag];

&nbsp;         const index = taskList.findIndex((item) => item.id === id);

&nbsp;         taskList.splice(index, 1);

&nbsp;         return { ...event, \[tag]: \[...taskList] }; \*/

&nbsp;         return {

&nbsp;           ...event,

&nbsp;           \[tag]: event\[tag].filter(item => item.id !== id)

&nbsp;         };

&nbsp;       } else {

&nbsp;         return event;}}))

新建立数组，而不是在原数组上修改

