import React, { Component } from 'react'

export default class Nav extends Component {
  shouldComponentUpdate(newProps, newState){
    //변경사항이 없어도 기본값 true 업데이트, 렌더 실행
    //첫번째 매개변수(newProps) - 변경된 속성값 newProps.data
    //이전값 this.props.data
    console.log(newProps.data, this.props.data);
    
    if(newProps.data === this.props.data){
      return false;
    } else{
      return true;
    }
    
  }
  render() {
    console.log('Nav render');
    let list = [];
    let data = this.props.data;
    data.forEach((item)=>{
      list.push(<li key={item.id}><a 
        href="#"
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(item.id);
        }}
        >{item.title}</a></li>);
    })
    /*
    let i = 0;
    console.log(data[i].id-1);

    while(i<data.length){
      list.push(<li key={data[i].id}><a 
        data-id={data[i].id-1}
        href="#"
        onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage(e.target.dataset.id);
        }}
        >{data[i].title}</a></li>);
      // i+=1;
      i++;
    }
    */
    return (
      <nav>
          <ul>
              {list}
          </ul>
      </nav>
    )
  }
}
