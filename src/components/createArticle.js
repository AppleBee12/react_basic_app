import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class createArticle extends Component {
  render() {
    return (
      <section>
          <article>
              <h2>Create Article</h2>
              <Form onSubmit={(e)=>{
                e.preventDefault();         
                this.props.onsubmit(
                  e.target.title.value,
                  e.target.desc.value,
                  e.target.difficulty.value
                );
              }}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="desc" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control type="number" name="difficulty" min="0" max="5" placeholder="0~5까지 숫자를 넣어주세요" />
                </Form.Group>
                <Button type="submit" variant="primary">submit</Button>
              </Form>
          </article>
      </section> 
    )
  }
}
