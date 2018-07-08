import React, { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      color:'white',    //当前是白方落子还是黑方落子
      data:[]           //保存当前棋盘上所有棋子的数据
    }
  }
  componentDidMount(){
    let self=this;
    let container=document.getElementsByClassName('container')[0];
    //画棋盘，每个格子为一个单位，每行18个格子，每列18个格子
    for(let i=0;i<18;i++){
      for(let j=0;j<18;j++){
        var item=document.createElement('div');
        item.className='item';
        item.setAttribute('style','height:40px;width:40px;position:absolute;left:'+i*40+'px;top:'+j*40+'px;border:1px solid #000;margin-top:-1px;margin-left:-1px');
        item.id=i+':'+j;//将每个格子元素的id设为该格子的位置
        // 监听棋盘点击事件
        item.addEventListener('click',function(e){
          let chessman={x:0,y:0,color:'white'};
          if (e.offsetX>20) {
            chessman.x=parseInt(this.id.split(':')[0],10)+1;
          }else{
            chessman.x=parseInt(this.id.split(':')[0],10);
          }
          if (e.offsetY>20) {
            chessman.y=parseInt(this.id.split(':')[1],10)+1;
          }else{
            chessman.y=parseInt(this.id.split(':')[1],10);
          }
          chessman.color=self.state.color;
          let color='white';
          if (chessman.color==='white') {
            color='black';
          }else{
            color='white';
          }
          let data=self.state.data;
          //这里判断一下该位置有没有棋子
          for(let i in data){
            if (data[i].x===chessman.x&&data[i].y===chessman.y) {
              return
            }
          }
          data.push(chessman);
          self.setState({
            data:data,
            color:color
          },()=>{
            let colArr=[];
            let rowArr=[];
            let rightSlantArr=[];
            let leftSlantArr=[];
            for(let i in data){
              if (data[i].x==chessman.x&&data[i].color==chessman.color) {
                colArr.push(data[i].y);
              }
              if (data[i].y==chessman.y&&data[i].color==chessman.color) {
                rowArr.push(data[i].x);
              }
              if (data[i].x+data[i].y==chessman.x+chessman.y&&data[i].color==chessman.color) {
                rightSlantArr.push(data[i].x);
              }
              if (data[i].x-data[i].y==chessman.x-chessman.y&&data[i].color==chessman.color) {
                leftSlantArr.push(data[i].x);
              }
            }
            let colTotal=self.connectNum(colArr,chessman.y);
            let rowTotal=self.connectNum(rowArr,chessman.x);
            let rightSlantTotal=self.connectNum(rightSlantArr,chessman.x);
            let leftSlantTotal=self.connectNum(leftSlantArr,chessman.x);
            if (colTotal>=5||rowTotal>=5||rightSlantTotal>=5||leftSlantTotal>=5) {
              let words=chessman.color==='white'?'白方赢！':'黑方赢！';
              let confirm=window.confirm(words);
              if (confirm) {
                self.setState({
                  data:[],
                  color:'white'
                }); 
              }
            }
          });
        });
        container.appendChild(item);
      }
    }
  }
  
  // 相同颜色棋子最多相连的个数
  connectNum(arr,index){
    let total=1;
    if (arr.indexOf(index-1)>-1) {
      total+=1;
      if (arr.indexOf(index-2)>-1) {
        total+=1;
        if (arr.indexOf(index-3)>-1) {
          total+=1;
          if (arr.indexOf(index-4)>-1) {
            total+=1;
          }
        }
      }
    }
    if (arr.indexOf(index+1)>-1) {
      total+=1;
      if (arr.indexOf(index+2)>-1) {
        total+=1;
        if (arr.indexOf(index+3)>-1) {
          total+=1;
          if (arr.indexOf(index+4)>-1) {
            total+=1;
          }
        }
      }
    }
    return total;
  }
  renderChessman(){
    return <div className="container" style={{height:'720px',width:'720px',position:'relative',margin:'20px'}}>
      {this.state.data.map((item,index)=>{
        return <div key={index} style={{height:'40px',width:'40px',position:'absolute',left:item.x*40-20+'px',top:item.y*40-20+'px',borderRadius:'20px',backgroundColor:item.color}}></div>
      })}
    </div>
  }
  render() {
    return (
      <div className="App" style={{height:'760px',width:'760px',marginLeft:'200px'}}>
        {this.renderChessman()}
      </div>
    );
  }
}

export default App;
