// npm modules
import { useState } from "react"
// css
import styles from './NewTrivia.module.css'

const NewTrivia = (props) => {
  const [formData, setFormData ] = useState({
    title: '',
    text: '',
    category: 'Keyboard Shortcuts',
    question1: '',
    answer1: '', 
    answer2: '',
    answer3: '',
    answer4: '' 
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddTrivia(formData)
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input 
          type="text" 
          name="title"
          id="title-input"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select 
          name="category" 
          id="category-input" 
          value={formData.category}
          onChange={handleChange}
        >
            <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
            <option value="Programming">Programming</option>
            <option value="Pop-culture">Pop Culture</option>
            <option value="History">History</option>
            <option value="Games">Games</option>
            <option value="Languages">Languages</option>
            <option value="Television">Television</option>
        </select>
        <label htmlFor="question1-input">Question 1</label>
        <textarea
          required
          type="text"
          name="question1"
          id="text-input"
          value={formData.question}
          onChange={handleChange}
        >
        </textarea>
        <label htmlFor="answer1-input">Answer 1</label>
        <input 
          required
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />
        <label htmlFor="answer2-input">Answer 2</label>
        <input 
          required
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />
        <label htmlFor="answer3-input">Answer 3</label>
        <input 
          required
          type="text"
          name="answer3"
          value={formData.answer3}
          onChange={handleChange}
        />
        <label htmlFor="answer4-input">Answer 4</label>
        <input 
          required
          type="text"
          name="answer4"
          value={formData.answer4}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </main>
  )
}

export default NewTrivia