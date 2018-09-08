import React from 'react'
import uniqueId from 'lodash/uniqueId'
import sortBy from 'lodash/sortBy'
import List from './List'
import './styles.css';

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)

    const total = this.props.list.length
    const placeholder = total > 50 ? this.props.placeholder : this.props.placeholderSelect
    const select = total > 50 ? false : true

    this.state={
      value:'',
      list: this.props.list,
      id: uniqueId('autocomplete_'),
      total,
      placeholder,
    }
  }
  componentDidMount() {

  }
  autocomplete = (val) => {
    let autocomplete = [];
    if (!val) return autocomplete
    val = val.toLowerCase()
    for (let i = 0; i < this.state.total; i++) {
      const str = this.state.list[i].City.toLowerCase()
      const item = this.state.list[i]
      const indexOf = str.indexOf(val)
      if (indexOf !== -1) {
        item.indexOf = indexOf
        autocomplete.push(item)
      }
    }
    autocomplete = sortBy(autocomplete, (e) => e.indexOf)
    this.setState({ autocomplete })
  }
  handleChange = (newValue) => {
    console.log(newValue)
    this.setState({
      value: newValue,
    })

    this.autocomplete(newValue)
    if (this.props.onChange) this.props.onChange(newValue)
  }
  handleChangeInput = (e) => {
    const newValue = e.target.value
    this.handleChange(newValue)
  }
  handleFocus = () => {
    this.setState({
      focus: true,
    })
    this.autocomplete(this.state.value)
  }
  handleBlur = () => {
    this.setState({
      focus: false,
    })
  }
  render() {
    return(
      <div className="autocomplete">
        {
          this.props.label &&
          <label htmlFor={this.state.id} className="autocomplete__label">
            {this.props.label}
          </label>
        }
        <input
          id={this.state.id}
          type="text"
          ref={el => this.input = el}
          onChange={this.handleChangeInput}
          onFocus={this.handleFocus}
          // onBlur={this.handleBlur}
          value={this.state.value}
          placeholder={this.state.placeholder}
          className="autocomplete__input"
        />
        {
          this.state.autocomplete &&
          <List
            list={this.state.autocomplete}
            className={`autocomplete__list ${this.state.focus ? 'autocomplete__list_active' : null}`}
            handleClick={this.handleChange}
          />
        }
      </div>
    )
  }
}

Autocomplete.defaultProps = {
  list: [],
  placeholderSelect: 'Введите или выберите из списка',
  placeholder: 'Начните вводить код или название',
}

export default Autocomplete
