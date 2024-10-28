import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class UpdateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.data.title,
      desc: this.props.data.desc
    }
  }
  modifyValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  compute

  render() {
    return (
      <section>
        <article>
          <h2>Update Article</h2>
          <Form onSubmit={(e) => {
            e.preventDefault();
            this.props.onsubmit(
              this.state.title,
              this.state.desc
            );
          }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="title" value={this.state.title}
                onChange={this.modifyValue} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="desc" rows={3} value={this.state.desc}
                onChange={this.modifyValue} />
            </Form.Group>
            <Button type="submit" variant="primary">submit</Button>
          </Form>
        </article>
      </section>
    )
  }
}
