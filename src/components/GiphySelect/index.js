import 'isomorphic-fetch'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GiphyList from '../GiphyList'
import styles from './styles.css'

export default class GiphySelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
    this.loadNextPage = this.loadNextPage.bind(this)
    this._onQueryChange = this._onQueryChange.bind(this)
    this._fetchItems = this._fetchItems.bind(this)
    this._updateItems = this._updateItems.bind(this)
    this._theme = {
      select: styles.select,
      selectInput: styles.selectInput,
      attribution: styles.attribution,
      ...this.props.theme,
    }
    this._query = ''
    this._requestTimer = null
    this._offset = 0
    this._totalCount = 0
    this._activeFetch = false
  }

  componentDidMount () {
    this._fetchItems()
  }

  // shouldComponentUpdate = () => !this._activeFetch

  loadNextPage () {
    if (this._offset < this._totalCount) {
      this._fetchItems()
    }
  }

  _onQueryChange (e) {
    const query = e.target.value.trim()

    if (this._requestTimer) {
      clearTimeout(this._requestTimer)
      this._requestTimer = null
    }

    this._requestTimer = setTimeout(() => {
      if (query !== this._query) {
        this._query = query
        this._offset = 0
        this._activeFetch = true
        this.setState({
          items: [],
        })
        this._fetchItems()
      }
    }, this.props.requestDelay)
  }

  _fetchItems () {
    const { requestKey, requestLang, requestRating } = this.props
    let endpoint = ''
    if (this._query) {
      endpoint = `search?q=${encodeURIComponent(this._query)}&`
    } else {
      endpoint = 'trending?'
    }
    const offset = this._offset

    fetch(`https://api.giphy.com/v1/gifs/${endpoint}offset=${offset}&lang=${requestLang}&rating=${requestRating}&api_key=${requestKey}`)
      .then(response => response.json())
      .then(this._updateItems)
      .catch(console.error) // eslint-disable-line no-console
  }

  _updateItems (response) {
    this._activeFetch = false
    this.setState(prevState => ({
      items: [...prevState.items, ...response.data],
    }))
    this._offset = response?.pagination?.offset + response?.pagination?.count
    this._totalCount = response?.pagination?.total_count
  }

  render() {
    const { placeholder, renderEntry, onEntrySelect } = this.props
    const theme = this._theme
    return (
      <div className={theme.select}>
        <input className={theme.selectInput} placeholder={placeholder} onChange={this._onQueryChange} />
        <GiphyList
          theme={theme}
          items={this.state.items}
          renderEntry={renderEntry}
          onEntrySelect={onEntrySelect}
          loadNextPage={this.loadNextPage} />
        <div className={theme.attribution}>Powered by Giphy</div>
      </div>
    )
  }
}

GiphySelect.defaultProps = {
  theme: {},
  placeholder: 'Search GIFs',
  requestDelay: 500,
  requestKey: 'dc6zaTOxFJmzC',
  requestLang: '',
  requestRating: 'pg',
  renderEntry: GiphyList.defaultProps.renderEntry,
  onEntrySelect: GiphyList.defaultProps.onEntrySelect,
}

GiphySelect.propTypes = {
  theme: PropTypes.shape({
    select: PropTypes.string,
    selectInput: PropTypes.string,
    attribution: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  requestDelay: PropTypes.number,
  requestKey: PropTypes.string,
  requestLang: PropTypes.string,
  requestRating: PropTypes.string,
  renderEntry: PropTypes.func,
  onEntrySelect: PropTypes.func,
}
