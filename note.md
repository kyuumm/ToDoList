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

&nbsp;	main jsx --导入App js

&nbsp;			--样式文件index css

 	Appjs --导入EventBar、TaskBox

&nbsp;			--样式文件App css 、event css 、 task css

&nbsp;	EventBar --样式文件event css

&nbsp;			--AddEventButton jsx 添加新事件的按钮

&nbsp;	TaskBox --样式文件 task css

&nbsp;			--Column jsx任务状态列，显示列标题，管理任务列表，拖放，添加新任务

&nbsp;				--样式文件task css

&nbsp;					--AddTasjButton jsx 添加新任务的按钮

&nbsp;				--Task jsx 单个子任务的组件，显示任务，编辑，拖拽，删除

&nbsp;					--task css



App.jsx

├── EventBar.jsx

│   		└── AddEventButton.jsx

│

└── TaskBox.jsx

&nbsp;  		 └── Column.jsx

&nbsp;     				  ├── Task.jsx

&nbsp;   			          └── AddTaskButton.jsx





events：所有事件数据

setEvents：更新事件数据的函数

currentEvent：当前选中的事件

setCurrentEvent：更新当前事件的函数

