import Myheader from './components/Myheader';
import Nav from './components/Nav';
import Article from './components/Article';
import CreateArticle from './components/createArticle';
import UpdateArticle from './components/UpdateArticle';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_menu_id = 3;
    this.state = {
      mode: 'welcome',
      selected_id: 0,

      subject: { title: 'React', desc: 'Single page Application' },
      welcome: { title: 'Welcome', desc: "Welcome to React" },
      menus: [
        { id: 1, title: 'HTML', desc: 'Hypertext Markup Language' },
        { id: 2, title: 'CSS', desc: 'CSS for design' },
        { id: 3, title: 'javascript', desc: 'Javascript for interaction' },
        { id: 4, title: 'React', desc: 'Single Page Application' }
      ]
    };
  }
  //여기부터는 자바스크립트 문법 쓸 수 있으나, render 위쪽 return 아래쪽으로는 입력불가
  getReadArticles() {
    const idx = this.state.menus.findIndex(item => item.id === this.state.selected_id);
    let data = this.state.menus[idx];
    console.log(data);
    return data;
  }
  getArticles() {
    let _article = null;
    if (this.state.mode === 'welcome') {
      let _data = this.state.welcome;
      _article = <Article data={_data} mode={this.state.mode} ></Article>;
    } else if (this.state.mode === 'read') {
      let _data = this.getReadArticle();

      _article = <Article data={_data} onChangePage={(_mode) => {
        this.setState({
          mode: _mode
        })
      }}
      ></Article>;
    } else if (this.state.mode === 'create') {
      _article = <CreateArticle onsubmit={(_title, _desc) => {
        //지금은 APP이 계속해서 rendering되면서 불필요한 렌더링을 하고있었음
        // 그래서 기존 배열을 복사 + 새 배열 -> 기존 배열원본과 비교
        //let c = a.concat(b)
        //a+b (배열+배열, 배열+새로운 값)

        this.max_menu_id += 1;

        //push방법
        // this.state.menus.push(
        //   {id:this.max_menu_id, title: _title, desc:_desc}
        // )

        //concat 방법
        //let _menus = this.state.menus.concat({id:this.max_menu_id, title: _title, desc:_desc});

        //Array.from사용방법
        // let _menus = Array.from(this.state.menus);
        // _menus.push(
        //   {id:this.max_menu_id, title: _title, desc:_desc}
        // );

        //스프레드 방법
        let _menus = [...this.state.menus, { id: this.max_menu_id, title: _title, desc: _desc }];


        this.setState({
          menus: _menus
          //menus:this.state.menus
        });
        //console.log(_title, _desc);
      }}> </CreateArticle>
    } else if (this.state.mode === 'modify') {
      let _data = this.getReadArticle();
      _article = <UpdateArticle title={_data.title} desc={_data.desc} onsubmit={(_title, _desc) => {
        let _menus = [...this.state.menus];
        const idx = this.state.menus.findIndex(item => item.id === this.state.selected_id);
        _menus[idx] = { id: this.state.selected_id, title: _title, desc: _desc }//값 수정
        this.setState({
          menus: _menus,
          mode: 'read'
        })
      }}></UpdateArticle>

      // 새로운 배열만드는법1,2,3 1.concat

    } else if (this.state.mode === 'delete') {
      /*
   기존 메뉴를 복사해서 복사본_menus를 생성하고
  삭제하고자하는 번호번째 값을 제거
  제거된 메뉴를 menus에 할당,
  selected_id는 0으로 변경
  mode는 welcome으로 변경

  삭제 a.splice(0,1)
  */
      if (window.confirm('정말 삭제할까요?')) {
        let _menus = [...this.state.menus];
        let id = this.state.menus.findIndex(item => item.id === this.state.selected_id);
        _menus.splice(id, 1)
        this.setState({
          menus: _menus,
          mode: 'welcome',
          selected_id: 0
        });
        alert('삭제했습니다.')
      } else {
        alert('취소했습니다.');
        this.setState({
        mode:'welcome',
        selected_id:0
      })
      }
    }

    return _article;
  }
  render() {
    console.log('APP render')

    this.getArticles();

    return (
      <div className='App'>
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangePage={(id) => {
            this.setState({
              mode: 'welcome'
            })
          }}
        ></Myheader>
        {/* <header>
          <h1 className="logo" onClick={()=>{
            this.setState({
              mode: 'welcome'
           })
          }}>{this.state.subject.title}</h1>
          <p>{this.state.subject.desc}</p>
      </header> */}
        <Nav
          data={this.state.menus}
          //목록만들기
          onChangePage={(id) => {
            this.setState({
              mode: 'read',
              selected_id: id
            })
          }}
        //클릭했을때 this.props.목록으로 받음
        > </Nav>
        {this.getArticles()}
        {/* <Article title={_title} desc={_desc} ></Article> */}
        <div className="d-flex justify-content-end">
          <Button variant="primary"
            onClick={() => {
              this.setState({
                mode: 'create'
              })
            }}
          >+ Create</Button>{' '}
        </div>
      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">

//         <img src={logo} className="App-logo" alt="logo" />
//        <h1>
//         안녕
//         </h1>
//         {/* 
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a> */}
//       </header>
//     </div>
//   );
// }

export default App;
